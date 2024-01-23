import React from 'react';
import Status from './status';

const YourComponent = () => {
    return (
        <div className="container-fluid px-3" >
            <div className="row my-5" style={{ height: '75vh' }}>
                <div className="col-md-2 p-5 d-flex flex-column align-items-center justify-content-around text-center border-dark-subtle border-end">
                    {/* 좌측 컬럼 */}
                    <h3 className='mt-5'>OOO님</h3>
                    <h3>안녕하세요</h3>
                    <div className='d-flex flex-column justify-content-center gap-5 h-100 w-100'>
                        <button type="button" className="btn btn-primary btn-lg w-100">
                            <img src='/store.png' alt='' /> 전체
                        </button>
                        <button type="button" className="btn btn-primary btn-lg w-100">
                            <img src='/mop (2) 1.png' alt='' /> 청소
                        </button>
                        <button type="button" className="btn btn-primary btn-lg w-100">
                            <img src='/truck 1.png' alt='' /> 용달
                        </button>
                    </div>
                    <button type="button" className="btn btn-light btn-lg w-100">
                        상담하기 <img src='/Circle_Help.png' alt='' />
                    </button>
                </div>
                <div className="col-md-10">
                    <div className='d-flex justify-content-around'>
                        <div className='bg-white shadow'>
                            <Status color="red" text="취소"/>
                        </div>
                        <div>
                        <button type="button" className="btn btn-primary me-3">Primary</button>
                        <button type="button" className="btn btn-primary me-3">Primary</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourComponent;
