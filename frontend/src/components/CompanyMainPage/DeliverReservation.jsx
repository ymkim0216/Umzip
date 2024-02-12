import { useEffect, useState } from 'react';
import companyDeliveryReservation from '../../store/companyDeliveryReservation'
import { motion } from "framer-motion"
import Status from './Status';
import StatusChange from './StatusChange';
import ReplyTo from './ReplyTo';

function DeliverReservation() {
  const { fetchDataDelivery, data } = companyDeliveryReservation();
  const [itemsToShow, setItemsToShow] = useState(4); // 한 번에 보여줄 아이템의 수
  const [visibleItems, setVisibleItems] = useState([]); // 현재 화면에 보여줄 아이템 목록
  const [filterStatus, setFilterStatus] = useState(null); // 필터링할 상태 코드
  const reservationList = data?.result || [];
  console.log(data)

  useEffect(() => {
    fetchDataDelivery();
  }, [ fetchDataDelivery ]);

  // console.log(data.result);

  useEffect(() => {
    let filteredData = data?.result || [];
    if (filterStatus === 1) {
      filteredData = filteredData.filter(item => item.codeSmallId % 100 === 1);
    }
    if (filterStatus === 2) {
      filteredData = filteredData.filter(item => item.codeSmallId % 100 === 2);
    }
    if (filterStatus === 3) { // 예약 확정 상태일 때 시간순 정렬
      filteredData = filteredData.filter(item => item.codeSmallId % 100 === 3);
      filteredData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    }
    if (filterStatus === (4||5)) {
      filteredData = filteredData.filter(item => item.codeSmallId % 100 === (4||5));
    }
    if (filterStatus === 6) {
      filteredData = filteredData.filter(item => item.codeSmallId % 100 === 6);
    }
    setVisibleItems(filteredData.slice(0, itemsToShow));
  }, [data, itemsToShow, filterStatus]);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setItemsToShow(4); // 필터 변경 시 보여주는 아이템 수를 초기화
  };

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 3); // 더 보기 버튼 클릭 시 3개 아이템 추가
  };

  return (
    <>
      <div className="col-md-10 p-5 gap-4 d-flex flex-column">
        <div
          className="d-flex justify-content-between mx-5"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'white',
          }}
        >
          <div className="bg-white shadow rounded-3 p-2  justify-content-center align-items-center ">
            <Status
            handleFilterChange = {handleFilterChange} />
          </div>
        </div>
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
          <div
            className=" rounded-3 mx-5 p-2 d-flex justify-content-around align-items-center text-center"
            style={{ background: '#D9E4FF' }}
          >
            <h5 className="m-0 col-md-2">작업 일시</h5>
            <h5 className="m-0 col-md-2">현재 견적</h5>
            <h5 className="m-0 col-md-2">주문번호/고객명</h5>
            <h5 className="m-0 col-md-2">상태</h5>
            <h5 className="m-0  col-md-2">응답</h5>
          </div>
          <motion.div style={{ width: '100%', minHeight: '10rem' }}>
            {visibleItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3 mx-5 p-2 d-flex justify-content-around text-center align-items-center position-relative"
                style={{
                  border: '1px solid #006EEE',
                  minHeight: '6rem',
                }}
              >
                <h5 className="m-0 col-md-2">{item.startTime}</h5>
                <h5 className="m-0 col-md-2">
                  {item.reissuing ? item.reissuing : item.price}
                </h5>
                <h5 className="m-0 col-md-2">
                  {item.deliveryId}/{item.memberName}
                </h5>
                <div className="m-0 col-md-2">
                  <StatusChange status={item.codeSmallId} />
                </div>
                <h5 className="m-0 col-md-2">
                  <ReplyTo
                    role="delivery"
                    status={item.codeSmallId}
                    id={item.mappingId}
                    price={item.price}
                  />
                </h5>
              </motion.div>
            ))}
            {itemsToShow < reservationList.length && (
              <button onClick={handleShowMore}>더 보기</button>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default DeliverReservation;
