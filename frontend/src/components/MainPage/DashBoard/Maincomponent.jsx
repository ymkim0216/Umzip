import React from 'react';

import Requests from './Request';
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import Status from './Status';
const DUMMY_DATA = {

}



const MainComponent = () => {
    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3,
            },
        },
    };
    const navigate =useNavigate()
    const hadleDelivery =()=>{
        navigate('/requestdelivery');
    }
    const hadleCleaning =()=>{
        navigate('/requestcleaning');
    }
    return (
        <motion.div  initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="container-fluid px-3" >
                <div className="row my-5 " style={{ height: '40rem' }}  >
                    <div className="col-2 p-3 d-flex flex-column align-items-center justify-content-around text-center border-dark-subtle border-end" >
                        {/* 좌측 컬럼 */}
                        <h3 className='mt-5'>OOO님</h3>
                        <h3>안녕하세요</h3>
                        <div className='d-flex flex-column justify-content-center gap-5' style={{width: "11rem"}}>
                            <motion.button
                                type="button"
                                className="btn btn-primary btn-lg  d-flex justify-content-center gap-4 align-items-center"
                                variants={buttonVariants}
                                style={{width:"10rem"}}
                                whileHover="hover"
                            >
                                <img src='/store.png' alt='' style={{width:"2rem" ,height:"2rem"}} /> 전체
                            </motion.button>
                            <motion.button
                                type="button"
                                className="btn btn-primary btn-lg  d-flex justify-content-center gap-4 align-items-center"
                                variants={buttonVariants}
                                whileHover="hover"
                                style={{width:"10rem"}}
                            >
                                <img style={{width:"2rem" ,height:"2rem"}} src='/mop (2) 1.png' alt='' /> 청소
                            </motion.button>
                            <motion.button
                                type="button"
                                className="btn btn-primary btn-lg  d-flex justify-content-center gap-4 align-items-center"
                                variants={buttonVariants}
                                whileHover="hover"
                                style={{width:"10rem"}}
                            >
                                <img style={{width:"2rem" ,height:"2rem"}} src='/truck 1.png' alt='' /><h5 className='m-0'>용달</h5>
                                
                            </motion.button>
                            <motion.button type="button" className="btn btn-light btn-lg" s variants={buttonVariants}
                            whileHover="hover"
                            style={{width:"10rem"}}>
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
                        <div style={{ width: '100%', minHeight: "10rem" }}>
                            <Requests date="2024.01.01" orderName="0112/명지/용달" orderNumber="FSEX101" status="예약확정" />
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MainComponent;
