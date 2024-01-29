import { useSubmit } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import classes from './TradeItemDetail.module.css';

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

  let navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  const showModal = () => {
    console.log('모달 보이기'); // 디버깅 메시지
    setModalShow(true);
  };
  const hideModal = () => setModalShow(false);

  function goToChat() {
    navigate('/chat');
  }

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.trade}>
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
      <p>{trade.region}</p>
      <div className={classes.article}>
        <h1 className={classes.title}>{trade.title}</h1>
        <div className={classes.price}>
          <p>{trade.price}원</p>
          <p className={classes.date}>{trade.date}</p>
        </div>
        <p>{trade.isDirectTranscation ? '직거래' : '택배배송'}</p>
        <p className={classes.content}>{trade.content}</p>
        <div>
          <button onClick={showModal}>신고하기</button>
          {modalShow && <ReportModal onClose={hideModal} />}
        </div>
        <menu className={classes.actions}>
          <button onClick={startDeleteHandler}>삭제</button>
        </menu>
        <menu className={classes.chat}>
          <button onClick={goToChat}>채팅</button>
        </menu>
      </div>
    </article>
  );
}

export default TradeItemDetail;
