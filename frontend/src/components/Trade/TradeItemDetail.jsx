import { useSubmit, useNavigate } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import classes from './TradeItemDetail.module.css';

const data = {
  name: '아무개',
  chat: '그래서 어쩌라고',
  degree: '40.5도',
};

function ReportModal({ onClose }) {
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <h2>신고하기</h2>
        <p>신고 사유를 작성해주세요.</p>
        <button onClick={onClose}>신고 제출</button>
      </div>
    </div>
  );
}

function TradeItemDetail({ trade }) {
  const submit = useSubmit();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const [modalShow, setModalShow] = useState(false);

  const showModal = () => {
    setModalShow(true);
  };
  const hideModal = () => setModalShow(false);

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // or history.goBack() for React Router v5
  };

  return (
    <article className={classes.trade} style={{ marginTop: '4rem' }}>
      <div className={classes.back}>
        <button onClick={goBack}>뒤로</button>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: false }} // clickable을 true로 설정하여 페이지네이션 사용
        style={{ width: '100%', height: '500px' }}
      >
        {trade.image.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${trade.title} image ${index}`}
              style={{ width: '80%', height: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="d-flex flex-row p-2 justify-content-between m-1">
          <div className="d-flex gap-2">
            <img
              style={{ width: '3rem', height: '3rem' }}
              src="/randomimg.png"
              alt="랜덤 이미지"
            ></img>
            <div className="text-start">
              <p className="m-0">{data.name}</p>
              <p>{trade.region}</p>
            </div>
          </div>
          <div className="position-relative p-2">
            <small className="form-text text-muted">{data.degree}</small>
          </div>
        </div>
      </div>
      <div className={classes.article}>
        <h2 className={classes.title}>{trade.title}</h2>
        <div className={classes.price}>
          <p>{trade.price}원</p>
          <p className={classes.date}>{trade.date}</p>
        </div>
        <p>{trade.isDirectTranscation ? '직거래' : '택배배송'}</p>
        <p className={classes.content}>{trade.content}</p>
        <div className={classes.report}>
          <button onClick={showModal}>신고하기</button>
          {modalShow && <ReportModal onClose={hideModal} />}
        </div>
        <div className={classes.actions}>
          <menu className={classes.edit}>
            <button>수정</button>
          </menu>
          <menu className={classes.cancle}>
            <button onClick={startDeleteHandler}>삭제</button>
          </menu>
        </div>
        <menu className={classes.chat}>
          <button onClick={toggleChat}>채팅</button>
          {isChatOpen && <Chat />}
        </menu>
      </div>
    </article>
  );
}

export default TradeItemDetail;
