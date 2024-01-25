import React from 'react';
import Status from './status';
import Requests from './Request';
const DUMMY_DATA = {

}



const YourComponent = () => {

    return (
        <div style={{ margin: 20 }}>
            <div className="container-fluid px-3" >
                <div className="row my-5 " style={{ height: '40rem' }}>
                    <div className="col-md-2 p-3 d-flex flex-column align-items-center justify-content-around text-center border-dark-subtle border-end">
                        {/* 좌측 컬럼 */}
                        <h3 className='mt-5'>OOO님</h3>
                        <h3>안녕하세요</h3>
                        <div className='d-flex flex-column justify-content-center gap-5 h-100 w-100'>
                            <button type="button" className="btn btn-primary btn-lg w-100 d-flex justify-content-center gap-4 align-items-center ">
                                <img src='/store.png' alt='' /> 전체
                            </button>
                            <button type="button" className="btn btn-primary btn-lg w-100 d-flex justify-content-center gap-4 align-items-center ">
                                <img src='/mop (2) 1.png' alt='' /> 청소
                            </button>
                            <button type="button" className="btn btn-primary btn-lg w-100 d-flex justify-content-center gap-4 align-items-center ">
                                <img src='/truck 1.png' alt='' /><h5 className='m-0'>용달</h5>
                            </button>
                        </div>
                        <button type="button" className="btn btn-light btn-lg w-100">
                            상담하기 <img src='/Wavy_Help.png' alt='' />
                        </button>
                    </div>
                    <div className="col-md-10 p-5 gap-4 d-flex flex-column">
                        <div className='d-flex justify-content-between mx-5' >
                            <div className='bg-white shadow rounded-3 ' style={{ minWidth: 500 }}>
                                <Status />
                            </div>
                            <div className='d-flex gap-4'>
                                <button type="button" class="btn btn-outline-primary rounded-5 shadow-5">용달 신청</button>
                                <button type="button" class="btn btn-outline-primary rounded-5 shadow-5">청소 신청</button>
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
        </div>
    );
};

export default YourComponent;
