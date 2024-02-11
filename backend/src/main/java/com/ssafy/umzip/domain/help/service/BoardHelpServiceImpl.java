package com.ssafy.umzip.domain.help.service;

import com.ssafy.umzip.domain.alarm.dto.AlarmType;
import com.ssafy.umzip.domain.alarm.dto.BoardAlarmDto;
import com.ssafy.umzip.domain.alarm.dto.BoardAlarmType;
import com.ssafy.umzip.domain.alarm.entity.Alarm;
import com.ssafy.umzip.domain.alarm.repository.AlarmRepository;
import com.ssafy.umzip.domain.code.entity.CodeSmall;
import com.ssafy.umzip.domain.code.repository.CodeSmallRepository;
import com.ssafy.umzip.domain.help.dto.*;
import com.ssafy.umzip.domain.help.entity.BoardHelp;
import com.ssafy.umzip.domain.help.entity.BoardHelpComment;
import com.ssafy.umzip.domain.help.entity.BoardHelpImage;
import com.ssafy.umzip.domain.help.repository.BoardHelpCustomRepository;
import com.ssafy.umzip.domain.help.repository.BoardHelpImageRepository;
import com.ssafy.umzip.domain.help.repository.BoardHelpRepository;
import com.ssafy.umzip.domain.help.repository.CommentRepository;
import com.ssafy.umzip.domain.member.entity.Member;
import com.ssafy.umzip.domain.member.repository.MemberRepository;
import com.ssafy.umzip.domain.point.service.PointService;
import com.ssafy.umzip.global.common.StatusCode;
import com.ssafy.umzip.global.exception.BaseException;
import com.ssafy.umzip.global.util.s3.S3Service;
import com.ssafy.umzip.global.util.s3.S3UploadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BoardHelpServiceImpl implements BoardHelpService {


    private final MemberRepository memberRepository;
    private final BoardHelpRepository boardHelpRepository;
    private final BoardHelpImageRepository boardHelpImageRepository;
    private final CodeSmallRepository codeSmallRepository;
    private final CommentRepository commentRepository;
    private final AlarmRepository alarmRepository;

    private final BoardHelpCustomRepository boardHelpCustomRepository;

    private final S3Service s3Service;
    private final PointService pointService;

    @Transactional
    @Override
    public void postBoardHelp(Long memberId, int sigungu, PostHelpRequestDto requestDto, List<MultipartFile> files) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_MEMBER_PK));

        if (requestDto.getCodeSmallId() != 402L) {
            if (member.getPoint() < requestDto.getPoint()) {
                throw new BaseException(StatusCode.INSUFFICIENT_POINTS);
            }
            pointService.usePointByHelpMe(member, requestDto.getPoint());
        }

        CodeSmall codeSmall = codeSmallRepository.findById(requestDto.getCodeSmallId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CODE));

        BoardHelp boardHelp = requestDto.toEntity(requestDto, member, sigungu, codeSmall);
        boardHelpRepository.save(boardHelp);

        S3UploadDto s3UploadDto;
        for (MultipartFile file : files) {
            s3UploadDto = s3Service.upload(file, "umzip-service", "boardHelp");
            BoardHelpImage boardHelpImage = new BoardHelpImage(s3UploadDto, boardHelp);
            boardHelpImageRepository.save(boardHelpImage);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public Page<ListHelpDto> listBoardHelp(ListHelpRequestDto requestDto,
                                           @PageableDefault(sort="id", direction = Sort.Direction.DESC) Pageable pageable) {
        
        memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_MEMBER_PK));

        int curPage = pageable.getPageNumber() - 1;
        int size = pageable.getPageSize();
        int sigungu = requestDto.getSigungu();
        String keyword = requestDto.getKeyword();
        Long codeSmallId = requestDto.getCodeSmallId(); // 0, 401, 402

        Page<ListHelpDto> pages = boardHelpCustomRepository.listBoardHelpAndCommentCount(keyword, sigungu, codeSmallId,
                PageRequest.of(curPage, size, Sort.Direction.DESC, "id"));

        return pages;
    }

    @Transactional
    @Override
    public void postComment(PostCommentRequestWrapDto requestDto) {

        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_MEMBER_PK));

        BoardHelp boardHelp = boardHelpRepository.findById(requestDto.getBoardId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_BOARD_PK));

        if (boardHelp.getIsAdopted() || Objects.equals(member.getId(), boardHelp.getMember().getId())) {
            throw new BaseException(StatusCode.NOT_POST_COMMENT);
        }

        BoardHelpComment comment = requestDto.toEntity(requestDto, boardHelp, member);
        commentRepository.save(comment);

        BoardAlarmDto boardAlarmDto = BoardAlarmDto.builder()
                .fromMember(member)
                .toMember(boardHelp.getMember())
                .read(false)
                .alarmType(AlarmType.HELP)
                .boardAlarmType(BoardAlarmType.COMMENT)
                .build();
        Alarm alarm = boardAlarmDto.toBoardHelpUserAlarmEntity(boardHelp.getTitle());
        alarmRepository.save(alarm);
    }

    @Transactional
    @Override
    public DetailHelpDto detailBoardHelp(DetailHelpRequestDto requestDto) {

        Long curMemberId = requestDto.getMemberId();
        Long viewBoardId = requestDto.getBoardId();

        Member member = memberRepository.findById(curMemberId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_MEMBER_PK));

        BoardHelp boardHelp = boardHelpRepository.findById(viewBoardId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_BOARD_PK));

        boardHelp.setReadCnt(boardHelp.getReadCnt() + 1);

        List<BoardHelpImage> boardHelpImages = boardHelpImageRepository.findAllById(viewBoardId);
        List<String> imageList = new ArrayList<>();
        for (BoardHelpImage image : boardHelpImages) {
            if (image.getImageOriginName().isEmpty()) {
                continue;
            }
            imageList.add(image.getImagePath());
        }

        boolean isSameMember = false;
        if (Objects.equals(member.getId(), boardHelp.getMember().getId())) {
            isSameMember = true;
        }

        Long commentCnt = commentRepository.countAllByBoardHelpId(viewBoardId);

        return DetailHelpDto.builder()
                .isSameMember(isSameMember)
                .boardHelp(boardHelp)
                .imagePathList(imageList)
                .commentCnt(commentCnt)
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public ListCommentWithStatusDto commentListBoardHelp(DetailHelpRequestDto requestDto) {

        Long curMemberId = requestDto.getMemberId();
        Long viewBoardId = requestDto.getBoardId();

        Member member = memberRepository.findById(curMemberId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_MEMBER_PK));
        BoardHelp boardHelp = boardHelpRepository.findById(viewBoardId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_BOARD_PK));

        boolean isSameMember = false;
        boolean isAdopted = boardHelp.getIsAdopted();
        if (Objects.equals(member.getId(), boardHelp.getMember().getId())) {
            isSameMember = true;
        }

        List<BoardHelpComment> commentList = commentRepository.findAllByBoardHelpId(viewBoardId);
        List<ListCommentDto> listDto = new ArrayList<>();
        if (!commentList.isEmpty()) {
            listDto = ListCommentDto.toDto(commentList);
        }

        ListCommentWithStatusDto responseDto = ListCommentWithStatusDto.builder()
                .isSameMember(isSameMember)
                .isAdopted(isAdopted)
                .listDto(listDto)
                .build();

        return responseDto;
    }

    @Transactional
    @Override
    public void adoptedBoardHelp(AdoptCommentRequestDto requestDto) {
        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_MEMBER_PK));

        BoardHelpComment boardHelpComment = commentRepository.findById(requestDto.getCommentId())
                .orElseThrow(()-> new BaseException(StatusCode.NOT_EXIST_COMMENT_PK));

        if (boardHelpComment.getBoardHelp().getIsAdopted()) {
            throw new BaseException(StatusCode.ALREADY_ADOPT_BOARD);
        }

        BoardHelp boardHelp = boardHelpRepository.findById(boardHelpComment.getBoardHelp().getId())
                        .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_BOARD_PK));

        Long COMPLETE_HELP_CODE_ID = 403L;
        CodeSmall codeSmall = codeSmallRepository.findById(COMPLETE_HELP_CODE_ID)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_EXIST_CODE));

        boardHelp.setIsAdopted(true);
        boardHelp.setCodeSmall(codeSmall);

        boardHelpRepository.save(boardHelp);

        BoardAlarmDto boardAlarmDto = BoardAlarmDto.builder()
                .fromMember(boardHelp.getMember())
                .toMember(boardHelpComment.getMember())
                .read(false)
                .alarmType(AlarmType.HELP)
                .boardAlarmType(BoardAlarmType.ADOPTED)
                .build();
        Alarm alarm = boardAlarmDto.toBoardHelpUserAlarmEntity(boardHelp.getTitle());
        alarmRepository.save(alarm);

        pointService.savePointByHelpPeople(boardHelpComment.getMember(), boardHelp.getPoint());
    }

    @Transactional
    @Override
    public Page<ProfileDto> listProfileBoardHelpMe(ProfileRequestDto requestDto, Pageable pageable) {

        if (requestDto.isSameMember()) {
            System.out.println("현재 사용자의 프로필 - [도움] 구인 목록");
        }

        int curPage = pageable.getPageNumber() - 1;
        int size = pageable.getPageSize();
        Long viewMemberId = requestDto.getViewMemberId();
        Page<BoardHelp> entityPage = boardHelpRepository.findAllByMemberIdMe(viewMemberId,
                PageRequest.of(curPage, size, Sort.Direction.DESC, "id"));
        Page<ProfileDto> responseDto = ProfileDto.toDto(entityPage);

        return responseDto;
    }

    @Transactional
    @Override
    public Page<ProfileDto> listProfileBoardHelpYou(ProfileRequestDto requestDto, Pageable pageable) {

        if (requestDto.isSameMember()) {
            System.out.println("현재 사용자의 프로필 - [도움] 내역 목록");
        }

        int curPage = pageable.getPageNumber() - 1;
        int size = pageable.getPageSize();
        Long viewMemberId = requestDto.getViewMemberId();

        Page<BoardHelp> entityPage = boardHelpRepository.findAllByMemberIdYou(viewMemberId,
                PageRequest.of(curPage, size, Sort.Direction.DESC, "id"));
        Page<ProfileDto> responseDto = ProfileDto.toDto(entityPage);
        
        return responseDto;
    }

    @Transactional
    @Override
    public void givePointBoardHelp(GivePointRequestDto requestDto) {

        Long giverMemberId = requestDto.getGiverMemberId();
        Long boardId = requestDto.getBoardId();

        Member giverMember = memberRepository.findById(giverMemberId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_MEMBER_PK));

        BoardHelp boardHelp = boardHelpRepository.findById(boardId)
                .orElseThrow(() -> new BaseException(StatusCode.NOT_VALID_BOARD_PK));

        if (giverMember.getPoint() < boardHelp.getPoint()) {
            throw new BaseException(StatusCode.INSUFFICIENT_POINTS);
        }
        pointService.usePointByHelpedByPeople(giverMember, boardHelp.getPoint());

        pointService.savePointByHelpPeople(boardHelp.getMember(), boardHelp.getPoint());
    }

}
