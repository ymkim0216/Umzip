import React, { useEffect, useState } from 'react';

import Requests from './Request';
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import Status from './Status';
import axios from "axios"



const MainComponent = () => {

    const [requestDelList, setRequestDelList] = useState([])
    const [requestCLEList, setRequestCLEList] = useState([])
    const [requestList, setrequestList] = useState("용달")
    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
            },
        },
    };

    const DEL_Call = async () => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg';

        try {
            const response = await axios.get('http://192.168.30.125:8080/api/delivery/user/reservation', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRequestDelList(response.data.result)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        DEL_Call();
    }, []);

    const navigate = useNavigate()
    const hadleDelivery = () => {
        navigate('/requestdelivery');
    }
    const hadleCleaning = () => {
        navigate('/requestcleaning');
    }
    const handlestatus = (target) => {
        if (target === "용달") {
            setrequestList("용달")
        }
        else {
            setrequestList("청소")
        }
    }
    return (
        <div className='d-flex  justify-content-center align-items-center' style={{ height: "100vh", width: "100%" }} >
            <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='col-10'>
                <div className="col-12 px-3" >
                    <div className="row my-5 " style={{ height: '40rem' }}  >
                        <div className="col-2 p-3 d-flex flex-column align-items-center justify-content-around text-center border-dark-subtle border-end" >
                            {/* 좌측 컬럼 */}
                            <h3 className='mt-5'>OOO님</h3>
                            <h3>안녕하세요</h3>
                            <div className='d-flex flex-column justify-content-center gap-5' style={{ width: "11rem" }}>
                                <motion.button
                                    type="button"
                                    className="btn btn-primary btn-lg  d-flex justify-content-center gap-4 align-items-center"
                                    variants={buttonVariants}
                                    style={{ width: "10rem" }}
                                    whileHover="hover"
                                >
                                    <img src='/store.png' alt='' style={{ width: "2rem", height: "2rem" }} /> 전체
                                </motion.button>
                                <motion.button
                                    type="button"
                                    className="btn btn-primary btn-lg  d-flex justify-content-center gap-4 align-items-center"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    style={{ width: "10rem" }}
                                    onClick={() => handlestatus("청소")}
                                >
                                    <img style={{ width: "2rem", height: "2rem" }} src='/mop (2) 1.png' alt='' /> 청소
                                </motion.button>
                                <motion.button
                                    type="button"
                                    className="btn btn-primary btn-lg  d-flex justify-content-center gap-4 align-items-center"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    style={{ width: "10rem" }}
                                    onClick={() => handlestatus("용달")}
                                >
                                    <img style={{ width: "2rem", height: "2rem" }} src='/truck 1.png' alt='' /><h5 className='m-0'>용달</h5>

                                </motion.button>
                                <motion.button type="button" className="btn btn-light btn-lg" s variants={buttonVariants}
                                    whileHover="hover"
                                    style={{ width: "10rem" }}>
                                    상담하기 <img src='/Wavy_Help.png' alt='' />
                                </motion.button>
                            </div>

                        </div>
                        <div className="col-md-10 p-5 gap-4 d-flex flex-column">
                            <div className='d-flex justify-content-between mx-5' >
                                <div className='bg-white shadow rounded-3 p-2  justify-content-center align-items-center '>
                                    <Status />
                                </div>
                                <div className='d-flex gap-4'>
                                    <button onClick={hadleDelivery} type="button" className="btn btn-outline-primary rounded-5 shadow-5 " >용달 신청</button>
                                    <button onClick={hadleCleaning} type="button" className="btn btn-outline-primary rounded-5 shadow-5">청소 신청</button>
                                </div>
                            </div>
                            <div className=' rounded-3 mx-5 p-2 d-flex justify-content-around align-items-center text-center' style={{ background: "#D9E4FF" }}>
                                <h5 className='m-0 col-md-2'>일시</h5>
                                <h5 className='m-0 col-md-2' >주문명</h5>
                                <h5 className='m-0 col-md-2' >주문번호</h5>
                                <h5 className='m-0 col-md-2' >상태</h5>
                                <h5 className='m-0  col-md-2' >내가 보낸견적서</h5>
                            </div>
                            <motion.div style={{ width: '100%', minHeight: "10rem" }}>
                                {
                                    (requestList === "용달" ? requestDelList : requestCLEList).map((item) => {
                                        const originalDate = new Date(item.createDt);
                                        const orderDate = new Date(item.startTime);
                                        const formatDate = `${originalDate.getFullYear()}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getDate().toString().padStart(2, '0')}`;
                                        const formatoder = `${(orderDate.getMonth() + 1).toString().padStart(2, '0')}${orderDate.getDate().toString().padStart(2, '0')}/${item.departure}/${requestList}`;
                                        let orderName = "";
                                        if(requestList==="용달"){orderName="DEL"}
                                        else{orderName="CLE"}
                                        
                                        const orderN = (item.id * item.id).toString().padStart(3, '0');
                                        // requests 컴포넌트 반환
                                        return <Requests list={item.list} key={item.id} date={formatDate} orderName={formatoder} orderNumber={`${orderName}${orderN}`} status={item.status} />;
                                    })
                                }


                            </motion.div>

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MainComponent;
