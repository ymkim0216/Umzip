import { useSubmit, useNavigate } from 'react-router-dom';
import Chat from '../Chat/Chat';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

import classes from './TradeItemDetail.module.css';
import { AnimatePresence, motion } from 'framer-motion';

function ReportModal({ onClose }) {
  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            zIndex: '99',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색 및 투명도 조절
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '40%',
              backgroundColor: 'white', // 내용의 배경색
              padding: '20px',
              borderRadius: '8px', // 내용의 모서리 둥글게
            }}
          >
            <span onClick={onClose}>
              &times;
            </span>
            <h2>신고하기</h2>
            <p>신고 사유를 작성해주세요.</p>
            <button onClick={onClose}>신고 제출</button>
          </div>
        </motion.div>
      
    </AnimatePresence>
  );
}

function TradeItemDetail({ trade }) {
  console.log(trade);
  const submit = useSubmit();

  const createTime = new Date(trade.createDt);
  const now = new Date();
  const diffTime = Math.abs(now - createTime);
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  // Formatting the date part as YY-MM-DD
  const yy = createTime.getFullYear().toString();
  const mm = ('0' + (createTime.getMonth() + 1)).slice(-2); // Adding 1 because months are 0-indexed
  const dd = ('0' + createTime.getDate()).slice(-2);

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
    navigate(-1);
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
        {trade.filePathList.map((img, index) => (
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
              <p className="m-0">{trade.writerName}</p>
              <p>{trade.writerAddress}</p>
            </div>
          </div>
          <div className="position-relative p-2">
            <small className="form-text text-muted">{trade.writerRating}</small>
          </div>
        </div>
      </div>
      <div className={classes.article}>
        <h2 className={classes.title}>제목: {trade.title}</h2>
        <div className={classes.price}>
          <p>{trade.price}원</p>
          <p className={classes.date}>
            {diffHours < 24 ? `${diffHours} 시간 전` : `${yy}-${mm}-${dd}`}
          </p>
        </div>
        <p>{trade.direct ? '직거래' : '택배배송'}</p>
        <p className={classes.content}>{trade.content}</p>
        <div className={classes.report}>
          {trade.writer ? (
            ''
          ) : (
            <div>
              <button onClick={showModal}>신고하기</button>
              {modalShow && <ReportModal onClose={hideModal} />}
            </div>
          )}
        </div>
        <div className={classes.actions}>
          <menu className={classes.edit}>
            <button>수정</button>
          </menu>
          <menu className={classes.cancle}>
            <button onClick={startDeleteHandler}>삭제</button>
          </menu>
        </div>
        <div>
          {trade.writer ? (
            <menu className={classes.sold}>
              <button>판매완료</button>
            </menu>
          ) : (
            <menu className={classes.chat}>
              <button onClick={toggleChat}>채팅</button>
              {isChatOpen && <Chat />}
            </menu>
          )}
        </div>
      </div>
    </article>
  );
}

export default TradeItemDetail;
