package com.ssafy.umzip.domain.delivery.service;

import com.ssafy.umzip.domain.alarm.dto.AlarmDto;
import com.ssafy.umzip.domain.alarm.dto.AlarmType;
import com.ssafy.umzip.domain.alarm.entity.Alarm;
import com.ssafy.umzip.domain.alarm.repository.AlarmRepository;
import com.ssafy.umzip.domain.clean.entity.CleanMapping;
import com.ssafy.umzip.domain.code.entity.CodeSmall;
import com.ssafy.umzip.domain.code.repository.CodeSmallRepository;
import com.ssafy.umzip.domain.company.entity.Company;
import com.ssafy.umzip.domain.company.repository.CompanyRepository;
import com.ssafy.umzip.domain.delivery.dto.*;
import com.ssafy.umzip.domain.delivery.entity.Car;
import com.ssafy.umzip.domain.delivery.entity.Delivery;
import com.ssafy.umzip.domain.delivery.entity.DeliveryImage;
import com.ssafy.umzip.domain.delivery.entity.DeliveryMapping;
import com.ssafy.umzip.domain.delivery.repository.*;
import com.ssafy.umzip.domain.member.entity.Member;
import com.ssafy.umzip.domain.member.repository.MemberRepository;
import com.ssafy.umzip.domain.point.repository.PointRepository;
import com.ssafy.umzip.domain.point.service.PointService;
import com.ssafy.umzip.domain.reviewreceiver.dto.ScoreInfoDto;
import com.ssafy.umzip.domain.reviewreceiver.dto.TopTagListRequest;
import com.ssafy.umzip.domain.reviewreceiver.dto.TopTagListResponse;
import com.ssafy.umzip.domain.reviewreceiver.repository.CustomReviewReceiverRepository;
import com.ssafy.umzip.domain.reviewreceiver.repository.ReviewReceiverRepository;
import com.ssafy.umzip.global.common.Role;
import com.ssafy.umzip.global.common.StatusCode;
import com.ssafy.umzip.global.exception.BaseException;
import com.ssafy.umzip.global.util.s3.S3Service;
import com.ssafy.umzip.global.util.s3.S3UploadDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.umzip.global.common.CommonMethods.getLocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class DeliveryUserServiceImpl implements DeliveryUserService {
    private final CarRepository carRepository;
    private final DeliveryRepository deliveryRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final S3Service s3Service;
    private final CodeSmallRepository codeSmallRepository;
    private final DeliveryMappingRepository deliveryMappingRepository;
    private final DeliveryCustomRepository deliveryCustomRepository;
    private final ReviewReceiverRepository reviewReceiverRepository;
    private final AlarmRepository alarmRepository;
    private final PointService pointService;

    @Override
    public List<CarResponseDto> getCarInfo() {
        return deliveryCustomRepository.getCarInfo();
    }

    /*
            예약 신청 ( 101 )
         */
    @Override
    public void createDelivery(DeliveryReservationRequestDto deliveryReservationRequestDto,
                               List<DeliveryRequestCompanyDto> deliveryRequestCompanyDtoList,
                               List<MultipartFile> deliveryImages,
                               Long price,
                               Long memberId
    ) {
        deliveryReservationRequestDto.setPrice(price);
        //Delivery Entity 생성
        //car 가져옴.
        Car car = carRepository.findById(deliveryReservationRequestDto.getCarId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CAR));
        deliveryReservationRequestDto.setCar(car);//car 세팅
        if (deliveryReservationRequestDto.getMovelist() == null) { //null check
            deliveryReservationRequestDto.setMovelist("");
        }
        //Delivery 생성
        Delivery delivery = DeliveryReservationRequestDto.toEntity(deliveryReservationRequestDto);

        //image Setting
        deliveryImgSetting(deliveryImages, delivery);
        //mapping Setting & 알람 저장
        List<Alarm> alarms = deliveryMappingSetting(deliveryRequestCompanyDtoList, price, delivery, memberId);


        //용달 저장
        deliveryRepository.save(delivery);
        //알람 저장
        alarmRepository.saveAll(alarms);
    }

    /*
        계산기 API
     */
    @Override
    public DeliveryCalResponseDto calculateDelivery(MobilityDto mobilityDto, DeliveryCalRequestDto calDto, Double OilPrice) {
        //end Time 구하기
        LocalDateTime end = getEndTime(mobilityDto, calDto);
        //car 조회
        Car car = carRepository.findById(calDto.getCarId()).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CAR));
        Long price = car.getPrice() * 10000; //대여비
        price += getDistancePrice(mobilityDto, OilPrice, car); //거리 당 비용 ( 주유 가격 고려 + 톨게이트 비용 )

        if (calDto.isMove()) { //같이 이동시 30000원 추가
            price += 30000;
        }
        if (calDto.isPackaging()) { //포장 필요시 10000원 추가
            price += 10000;
        }
        if (!calDto.isParking()) { //주차 없으면 10000원 추가
            price += 10000;
        }

        // % 수수료 계산
        if (!calDto.isElevator()) { //엘베 없으면
            price = Math.round(price * 1.15);
        }
        price = getTimeFee(calDto, price); //시간당 수수료 계산.

        long result = Math.round((double) price / 100) * 100; // 반올림

        return new DeliveryCalResponseDto(result, end);
    }

    /*
        취소 ( 105 )
     */
    @Override
    public void cancelDelivery(Long mappingId, Long memberId) {
        //1. delivery_mapping 가져옴.
        DeliveryMapping deliveryMapping = deliveryMappingRepository.findById(mappingId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MAPPING));
        if (!deliveryMapping.getMember().getId().equals(memberId)) {
            throw new BaseException(StatusCode.INVALID_ACCESS_CLEAN_MAPPING);
        }
        //2. 상태 105로 변경 ( 105 : 취소 )
        CodeSmall codeSmall = codeSmallRepository.findById(105L).orElseThrow(() -> new BaseException(StatusCode.CODE_DOES_NOT_EXIST));
        deliveryMapping.setCodeSmall(codeSmall);//업데이트

        //알람
        AlarmDto alarm = AlarmDto.builder()
                .alarmType(AlarmType.DELIVER)
                .read(false)
                .codeSmallId(codeSmall.getId())
                .member(deliveryMapping.getMember())
                .build();
        Alarm companyAlarm = alarm.toCompanyDeliveryAndCleanAlarmEntity(deliveryMapping.getCompany());
        alarmRepository.save(companyAlarm);

    }
    /**
        용달 기사 매칭
     */

    @Override
    public List<DeliveryMatchingCompanyDto> companyMatchingListDelivery(DeliveryCompanyListRequestDto dto) {
        //1. 시간 파싱
        LocalDateTime startTime = getLocalDateTime(dto.getStartTime());
        LocalDateTime endTime = getLocalDateTime(dto.getEndTime());

        //2. 시간 연산은 쿼리에서
        List<DeliveryMatchingCompanyDto> list = deliveryCustomRepository.findCompanyMatchingList(startTime, endTime, dto.getSigungu(), dto.getLimit());
        List<Long> memberIdList = list.stream() //company->memberId만 List로 뽑아옴.
                .map(DeliveryMatchingCompanyDto::getMemberId)
                .toList();

        TopTagListRequest request = TopTagListRequest.builder()
                .memberId(memberIdList)
                .role(Role.DELIVER.toString())
                .limit(dto.getLimit())
                .build();

        List<TopTagListResponse> tagList = reviewReceiverRepository.findTopTagsListByMemberIdAndRole(request);

        List<ScoreInfoDto> scores = reviewReceiverRepository.findScoreByCompanyMemberId(memberIdList,Role.DELIVER);

        Map<Long, Double> memberIdToScoreMap = scores.stream()
                .collect(Collectors.toMap(ScoreInfoDto::getMemberId, ScoreInfoDto::getScore));

        Map<Long, List<String>> tagGroupedByCompanyId = tagList.stream()
                .collect(Collectors.groupingBy(TopTagListResponse::getCompanyId,
                        Collectors.mapping(TopTagListResponse::getTag, Collectors.flatMapping(List::stream, Collectors.toList()))));

        for (DeliveryMatchingCompanyDto companyDto : list) {
            companyDto.setTopTagList(tagGroupedByCompanyId.get(companyDto.getCompanyId()));
            double score = memberIdToScoreMap.get(companyDto.getMemberId()) == null ? 0.0 : memberIdToScoreMap.get(companyDto.getMemberId());
            score = Math.round(score*10)/10.0;
            companyDto.setScore(score);
        }
        list.sort(Comparator.comparing(DeliveryMatchingCompanyDto::getScore).reversed());
        return list;

    }

    /*
        용달 유저 예약 전체 조회
     */
    @Override
    public List<UserDeliveryReservationDto> userReservationDelivery(Long memberId) {
        //distinct한 deliveryId
        return deliveryCustomRepository.findUserReservationInfo(memberId);
    }

    /**
     * 용달 개별 조회
     */

    @Override
    public DeliveryDetailResponseDto getDeliveryDetail(Long deliveryId, Long memberId) {
        Delivery delivery = deliveryRepository.findById(deliveryId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_DELIVERY));
        if (!deliveryMappingRepository.existsByDeliveryIdAndMemberId(deliveryId, memberId)) {
            throw new BaseException(StatusCode.INVALID_ACCESS_CLEAN_MAPPING);
        }
        List<String> images = delivery.getImages().stream()
                .map(DeliveryImage::getPath)
                .toList();
        String carName = delivery.getCar().getName();
        DeliveryDetailResponseDto deliveryDetail = DeliveryDetailResponseDto.builder()
                .id(delivery.getId())
                .carName(carName)
                .startTime(delivery.getStartTime())
                .endTime(delivery.getEndTime())
                .departure(delivery.getDeparture())
                .departureDetail(delivery.getDepartureDetail())
                .destination(delivery.getDestination())
                .destinationDetail(delivery.getDestinationDetail())
                .packaging(delivery.isPackaging())
                .move(delivery.isMove())
                .elevator(delivery.isElevator())
                .parking(delivery.isParking())
                .movelist(delivery.getMovelist())
                .build();
        deliveryDetail.setDeliveryImages(images);
        return deliveryDetail;
    }

    /*
        Mapping 연결 저장 : List<Alarm>리턴
     */
    private List<Alarm> deliveryMappingSetting(List<DeliveryRequestCompanyDto> deliveryRequestCompanyDtoList, Long price, Delivery delivery, Long memberId) {
        // code small 용달은 항상 101(신청중)
        CodeSmall codeSmall = codeSmallRepository.findById(101L).orElseThrow(() -> new BaseException(StatusCode.CODE_DOES_NOT_EXIST));
        // member 가져오기-- 추후 jwt 도입시 변경 필요
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_MEMBER));

        //알람
        AlarmDto alarm = AlarmDto.builder()
                .read(false)
                .codeSmallId(codeSmall.getId())
                .alarmType(AlarmType.DELIVER)
                .member(member)
                .build();
        for (DeliveryRequestCompanyDto company : deliveryRequestCompanyDtoList) {
            Company resultCompany = companyRepository.findByMemberIdAndRole(company.getMemberId(), Role.DELIVER).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_COMPANY));
            DeliveryMapping deliveryMapping = DeliveryMapping.builder()
                    .company(resultCompany)
                    .member(member) //member 임시
                    .codeSmall(codeSmall)
                    .price(price)
                    .delivery(delivery)
                    .reissuing(0L) // 초기값 0
                    .build();
            delivery.addMapping(deliveryMapping);

            //알림에 company추가
            alarm.addCompany(resultCompany);
        }
        List<Alarm> alarmList = new ArrayList<>();
        for (Company company : alarm.getCompanyList()) {
            Alarm companyAlarmEntity = alarm.toCompanyDeliveryAndCleanAlarmEntity(company);
            alarmList.add(companyAlarmEntity);
        }
        return alarmList;
    }

    /**
     * 예약 완료
     */

    @Override
    public Boolean completeReservation(Long mappingId, int point, Long memberId) {
        DeliveryMapping deliveryMapping = deliveryMappingRepository.findById(mappingId).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_DELIVERY));
        CodeSmall codeSmall = codeSmallRepository.findById(103L).orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CODE));

        Member member = deliveryMapping.getMember();
        if (!member.getId().equals(memberId)) {
            throw new BaseException(StatusCode.INVALID_ACCESS_DELIVERY);
        }

        deliveryMapping.setCodeSmall(codeSmall);
        //알람
        AlarmDto alarm = AlarmDto.builder()
                .read(false)
                .codeSmallId(codeSmall.getId())
                .alarmType(AlarmType.DELIVER)
                .member(member)
                .build();

        Alarm companyAlarm = alarm.toCompanyDeliveryAndCleanAlarmEntity(deliveryMapping.getCompany());
        alarmRepository.save(companyAlarm);
        //포인트
        Long finalPrice = (deliveryMapping.getReissuing() == 0) ? deliveryMapping.getPrice() : deliveryMapping.getReissuing();

        pointService.savePointByUsingDeliver(member, (int) Math.round(0.03*finalPrice));
        pointService.usePointByDeliver(member, point);
        return true;
    }


    /*
        delivery Image 세팅
     */
    private void deliveryImgSetting(List<MultipartFile> deliveryImages, Delivery delivery) {
        for (MultipartFile file : deliveryImages) {
            S3UploadDto deliveryImg = uploadFile(file, "deliverImg");
            DeliveryImage deliveryImage = DeliveryImage.builder()
                    .dto(deliveryImg).delivery(delivery)
                    .build();
            delivery.addImage(deliveryImage);
        }
    }

    /*
       계산기 관련 메소드
    */
    /*
        시간당 부가세 계산
     */
    private static Long getTimeFee(DeliveryCalRequestDto calDto, Long price) {
        String time = calDto.getStartTime().split(" ")[1].split(":")[0];
        Integer startTime = Integer.valueOf(time);
        //출퇴근이면 5%
        if (startTime == 7 || startTime == 8 || startTime == 18 || startTime == 19) {
            price = Math.round(price * 1.05);
            //야간 10%
        } else if (startTime >= 22 || (startTime >= 0 && startTime <= 5)) {
            price = Math.round(price * 1.10);
        }
        return price;
    }

    /*
        현재 평균 유가 당 거리 가격 계산
     */
    @NotNull
    private static Long getDistancePrice(MobilityDto mobilityDto, double OilPrice, Car car) {
        double distanceKm = Math.ceil((double) mobilityDto.getDistance() / 1000); //몇 Km?
        return (long) ((distanceKm / car.getMileage()) * OilPrice) + mobilityDto.getToll();
    }

    /*
        거리 계산 결과를 가지고 endTime 계산
     */
    @NotNull
    private static LocalDateTime getEndTime(MobilityDto mobilityDto, DeliveryCalRequestDto calDto) {
        //모빌리티 API로 End Time 계산
        Long hour = (long) Math.ceil(mobilityDto.getDuration() / 3600.0);
        //날짜 포맷
        LocalDateTime start = getLocalDateTime(calDto.getStartTime());
        return start.plusHours(hour);
    }

    //s3
    private S3UploadDto uploadFile(MultipartFile file, String fileNamePrefix) {
        if (file != null && !file.isEmpty()) {
            return s3Service.upload(file, "umzip-service", fileNamePrefix);
        }
        return null;
    }

}
