import React, { useState } from 'react';
import DropDown from './dropdown';
import { AnimatePresence, motion } from "framer-motion";
import StatusChange from './Status_Change';

const DIMMY_DATA = [
    {
        companyName: "아무개 용달",
        price: "75401",
        text: "짐이 너무 많아서 추가요금이 생겨요",
        status: "신청중"
    },
    {
        companyName: "미친개 용달",
        price: "754000001",
        text: " 일단 해요",
        status: "검토중"
    },
    {
        companyName: "아무개 용달",
        price: "75401",
        text: "짐이 너무 많아서 추가요금이 생겨요",
        status: "취소"
    },
    {
        companyName: "미친개 용달",
        price: "754000001",
        text: " 일단 해요",
        status: "거절"
    },
    {
        companyName: "아무개 용달",
        price: "75401",
        text: "짐이 너무 많아서 추가요금이 생겨요",
        status: "예약확정"
    },
    {
        companyName: "미친개 용달",
        price: "754000001",
        text: " 일단 해요",
        status: "완료"
    },
];

export default function Requests({ date, orderName, orderNumber, status }) {
    const containerVariants = {
        visible: {
         opacity: 1, y: 0 ,
          transition: {
            staggerChildren: 0.1, // 자식 요소들에 대한 stagger 효과
          },
        },
        hidden :{ opacity: 0, y: -20 },
        exit:{opacity:0, y: 20 },
      };
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <motion.div  className='rounded-3 mx-5 p-2 d-flex justify-content-around text-center align-items-center position-relative' style={{ border: '1px solid #006EEE', minHeight: '6rem' }}>
            <h5 className="m-0 col-md-2">{date}</h5>
            <h5 className="m-0 col-md-2">{orderName}</h5>
            <h5 className="m-0 col-md-2">{orderNumber}</h5>
            <div className="m-0 col-md-2">
                <StatusChange status={status} />
            </div>
            <div className="col-md-2 ">
                <motion.button
                    type="button"
                    onClick={toggleDropdown}
                    whileHover={{scale:1.2}}
                    style={{ border: 'none', background: 'none', padding: 0 }}
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }} // 이미지가 180도 회전하도록 설정
                    transition={{ duration: 0.3 }}
                >
                    <img src='/Polygon 3.png' alt='dropdown-icon' />
                </motion.button>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            className="position-absolute top-100 start-0 bg-white rounded-3 shadow p-2 d-flex flex-column gap-3"
                            style={{ zIndex: 1, width: '100%' }}
                            initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        >
                            {DIMMY_DATA.map((data, index) => (
                                <motion.div
                                className='shadow'
                                style={{backgroundColor:"white"}}
                                    key={data.companyName}
                                    variants={{ visible: { opacity: 1, y: 0 } }} initial={{ opacity: 0, y: -20 }}
                                    exit={{opacity:0, y: 20 }}
                                    whileHover={{scale:1.02}}
                                    transition={{ duration: 0.3 }}
                                >   
                                    <DropDown
                                        companyName={data.companyName}
                                        price={data.price}
                                        text={data.text}
                                        status={data.status}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
