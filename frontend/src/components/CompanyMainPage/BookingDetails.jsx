import { useEffect } from "react"
import bookingDetailStore from "../../store/bookingDetailStore"
import style from './BookingDetails.module.css';



export default function BookingDetails({ nowId, role, price, reissuing, name }) {

    const {deliveryDetail, data} = bookingDetailStore()

    useEffect(() => {
        deliveryDetail(nowId, role)
    }, [deliveryDetail, nowId, role])

      // console.log(data.result);
  const estimate = data?.result || [];

    return (
        <div className={style.card}>
            <div className="card-content">
        {role === 'delivery' ? (
            <>
                <div>신청자 이름 : {name}</div>
                <div>견적 가격 : {price}</div>
                <div>재견적 가격 : {reissuing}</div>
                <div>작업 시작일시 : {estimate.startTime}</div>
                <div>예상 종료일시 : {estimate.endTime}</div>
                <div>요청 차량 : {estimate.carName}</div>
                <div>출발 지역 : {estimate.departure} / {estimate.departureDetail}</div>
                <div>도착 지역 : {estimate.destination} / {estimate.destinationDetail}</div>
                <div>포장여부 : {estimate.packaging}</div>
                <div>탑승여부 : {estimate.move}</div>
                <div>주차여부 : {estimate.parking}</div>
                <div>엘리베이터 여부 : {estimate.elevator}</div>
                <div>짐 목록 : {estimate.movelist}</div>
                <div>재요청 가격 : {estimate.reissuing}</div>
                <div>사진 : {estimate.deliveryImages}</div>
            </>
        ) : (
            <>
                {/* 청소 관련 정보를 렌더링합니다. */}
                <div>신청자 이름 : {name}</div>
                <div>견적 가격 : {price}</div>
                <div>재견적 가격 : {reissuing}</div>
                <div>청소 진행일 : {estimate.reservationTime}</div>
                <div>장소 : {estimate.address} / {estimate.addressDetail}</div>
                <div>방 크기 : {estimate.roomSize}</div>
                <div>방 갯수 : {estimate.roomCount}</div>
                <div>창 갯수 : {estimate.windowCount}</div>

                <div>발코니 유무 : {estimate.balconyExistence}</div>
                <div>복층 유무 : {estimate.duplexRoom}</div>
                <div>외부 창 청소 : {estimate.externalWindow}</div>
                <div>새집 증후군 제거 : {estimate.houseSyndrome}</div>
                <div>스티커 제거 : {estimate.removeSticker}</div>


                {/* 여기에 필요한 나머지 clean 관련 렌더링을 추가합니다. */}
            </>
        )}
        </div>
    </div>

//     "move": false,
//     "elevator": true,
//     "parking": true,
//     "movelist": "짐3짐2짐1",
//     "deliveryImages": []


/* { 청소 API
    "isSuccess": Boolean,
    "message": String,
    "code": INT,
    "result": {
        "id": Long,
        "reservationTime": LocalDateTime,
        "roomSize": Int,
        "roomCount": Int,
        "balconyExistence": Boolean,
        "windowCount": Int,
        "duplexRoom": Boolean,
        "mold": Boolean,
        "externalWindow": Boolean,
        "houseSyndrome": Boolean,
        "removeSticker": Boolean,
        "sigungu": Int,
        "address": String,
        "addressDetail": String,
        "cleanImages": [
            String
        ]
    }
} */
    )
}