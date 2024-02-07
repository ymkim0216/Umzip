import React, { useEffect, useState } from 'react';
import companyCleanReservation from '../../store/companyCleanReservation'
import { motion } from "framer-motion"
import Status from './Status';
import StatusChange from './StatusChange';


function DeliverReservation() {

  const {fetchData, data, } = companyCleanReservation()
  const [itemsToShow, setItemsToShow] = useState(2); // 한 번에 보여줄 아이템의 수
  const [visibleItems, setVisibleItems] = useState([]); // 현재 화면에 보여줄 아이템 목록

  useEffect(() => {
    fetchData();
  }, [ fetchData ]);

console.log(data.result)
const reservationList = data?.result || [];

useEffect(() => {
    setVisibleItems(reservationList.slice(0, itemsToShow));
}, [itemsToShow, reservationList]);

const handleShowMore = () => {
    setItemsToShow(itemsToShow + 2); // 더 보기 버튼 클릭 시 3개 아이템 추가
};

  return (
    <>
    <div className="col-md-10 p-5 gap-4 d-flex flex-column">
                <div className="d-flex justify-content-between mx-5">
                  <div className="bg-white shadow rounded-3 p-2  justify-content-center align-items-center ">
                    <Status />
                  </div>
                </div>
                <div
                  className=" rounded-3 mx-5 p-2 d-flex justify-content-around align-items-center text-center"
                  style={{ background: "#D9E4FF" }}
                >
                  <h5 className="m-0 col-md-2">작업 일시</h5>
                  <h5 className="m-0 col-md-2">현재 견적</h5>
                  <h5 className="m-0 col-md-2">주문번호/고객명</h5>
                  <h5 className="m-0 col-md-2">상태</h5>
                  <h5 className="m-0  col-md-2">응답</h5>
                </div>
                <motion.div style={{ width: "100%", minHeight: "10rem" }}>
                  {visibleItems.map((item) => (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-3 mx-5 p-2 d-flex justify-content-around text-center align-items-center position-relative"
                        style={{
                          border: "1px solid #006EEE",
                          minHeight: "6rem",
                        }}
                      >
                        <h5 className="m-0 col-md-2">{item.startTime}</h5>
                        <h5 className="m-0 col-md-2">{item.price}</h5>
                        <h5 className="m-0 col-md-2">
                          {item.deliveryId}/{item.memberName}
                        </h5>
                        <div className="m-0 col-md-2">
                          <StatusChange status={item.codeSmallId} />
                        </div>
                        <h5 className="m-0 col-md-2">{item.deliveryId}</h5>
                        
                        {/* 이부분을 용달일경우에 */}
                      </motion.div>

                      {/* 여기는 청소일경우 추가 */}
                    </>
                  ))}
                  {itemsToShow < reservationList.length && (
                    <button onClick={handleShowMore}>더 보기</button>
                  )}
                </motion.div>
              </div>
    </>
  );
}

export default DeliverReservation;
