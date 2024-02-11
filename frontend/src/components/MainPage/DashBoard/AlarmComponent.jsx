import React, { useEffect, useState } from "react";
import AlarmMessage from "./AlarmMessage";
import { motion } from "framer-motion"
import { api } from "../../../services/api";
const DUMMY_DATA = [
  { date: "24-01-19", status: true, message: "김씨 용달 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-12", status: true, message: "미친개 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-13", status: false, message: "잡놈 님께서 용달 제안서를 수락하셨습니다" },
  { date: "3시간전", status: true, message: "니짐 내꺼 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-19", status: true, message: "김씨 용달 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-12", status: true, message: "미친개 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-13", status: false, message: "잡놈 님께서 용달 제안서를 수락하셨습니다" },
  { date: "3시간전", status: true, message: "니짐 내꺼 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-19", status: true, message: "김씨 용달 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-12", status: true, message: "미친개 님께서 용달 제안서를 수락하셨습니다" },
  { date: "24-01-13", status: false, message: "잡놈 님께서 용달 제안서를 수락하셨습니다" },
  { date: "3시간전", status: true, message: "니짐 내꺼 님께서 용달 제안서를 수락하셨습니다" },

  // Add more dummy data if needed
];

export default function AlarmComponent() {
  const [visibleAlarms, setVisibleAlarms] = useState(5);
  useEffect(()=>{
    Alarm_Call()
  },[])
  const Alarm_Call = async () => {
    try {
        const response = await api.get('/alarm/all');
        console.log(response)
    } catch (error) {
        console.error(error);
    }
};

  const loadMoreAlarms = () => {
    setVisibleAlarms((prevVisibleAlarms) => prevVisibleAlarms + 5);
  };

  return (
    <>
      <div className="col-12 d-flex justify-content-center " style={{ marginTop: "10rem", marginBottom: "10rem" }}>
        <div className="col-6 justify-content-center align-items-center">
          <p className="fw-bold">OOO 님이 받은 알람</p>
          <div className="d-flex flex-column gap-3">
            {DUMMY_DATA.slice(0, visibleAlarms).map((data, index) => (
              <AlarmMessage key={index} date={data.date} message={data.message} status={data.status} />
            ))}
          </div>
          {visibleAlarms < DUMMY_DATA.length && (
            <div style={{ width: "100%" }} className="d-flex justify-content-center mt-4">
              <motion.button className="btn btn-light shadow" onClick={loadMoreAlarms} style={{ width: "6rem" }}

                whileHover={{ y: -5 }}
              >
                <div className="d-flex justify-content-center align-items-center gap-1">
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-black text-white" style={{ width: "1rem", height: "1rem" }}>
                  +
                </div>
                <p className="m-0">더보기</p>
                </div>
              </motion.button>
            </div>
          )}
        </div >
      </div >
    </>
  );
}
