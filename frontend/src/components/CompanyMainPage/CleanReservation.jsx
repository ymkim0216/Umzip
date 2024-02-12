import { useEffect, useState } from 'react';
import companyCleanReservation from '../../store/companyCleanReservation'
import { motion } from "framer-motion"
import Status from './Status';
import StatusChange from './StatusChange';
import ReplyTo from './ReplyTo';

function DeliverReservation() {
  const { fetchDataClean, data } = companyCleanReservation();
  const [itemsToShow, setItemsToShow] = useState(2); // 한 번에 보여줄 아이템의 수
  const [visibleItems, setVisibleItems] = useState([]); // 현재 화면에 보여줄 아이템 목록
  console.log(data)

  useEffect(() => {
    fetchDataClean();
  }, [ fetchDataClean ]);
  
  // console.log(data.result);
  const reservationList = data?.result || [];

  useEffect(() => {
    setVisibleItems(data?.result ? data.result.slice(0, itemsToShow) : []);
  }, [data, itemsToShow]);

  const handleShowMore = () => {
    setItemsToShow(itemsToShow + 2); // 더 보기 버튼 클릭 시 3개 아이템 추가
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
            <Status />
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
                <h5 className="m-0 col-md-2">{item.reservationTime}</h5>
                <h5 className="m-0 col-md-2">
                  {item.reissuing ? item.reissuing : item.price}
                </h5>
                <h5 className="m-0 col-md-2">
                  {item.cleanId}/{item.memberName}
                </h5>
                <div className="m-0 col-md-2">
                  <StatusChange status={item.codeSmallId} />
                </div>
                <h5 className="m-0 col-md-2">
                  <ReplyTo
                    role="clean"
                    status={item.codeSmallId}
                    mappingId={item.mappingId}
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