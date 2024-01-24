import React from 'react';

const Dropdown = () => {
  return (
    <div  style={{ position: 'relative', zIndex: 2,  width:"20rem" ,backgroundColor:"#fff" }} className='shadow rounded-5 p-3' >
<div style={{ borderBottom: '1px solid #ccc' }} className='d-flex'>
    <h3>Chat</h3>
</div>
      <div className='d-flex flex-row p-2'>
       <img style={{width:"3em",height:"3rem"}} src='/randomimg.png'></img> 
       <div>
        <p className='m-0'>닉네임</p>
        <p className='m-0'>채팅</p>
       </div>
       <div>
        <div> 빨간원</div>
        <small className="form-text text-muted">2024.01.01  </small>
       </div>
      </div>
    </div>
  );
};

export default Dropdown;
