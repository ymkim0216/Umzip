import { useParams } from "react-router-dom";
import classes from './HelpContent.module.css';
import { useSelector, useDispatch } from "react-redux"
import { selectFilteredHelps  } from '../../store/helpRedux'
// wiper 임포트들
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';





function HelpDetail() {
  let helpsDetail = useSelector(selectFilteredHelps)
  console.log(helpsDetail);
  console.log('디테일페이지이동')
  // 받아온 아이디 디테일 페이지로 이동
  let { id } = useParams();
  id = parseInt(id);
  let helpDetail = helpsDetail.find(function (x) {
    return x.id === id;
  });
  return (
    <>
    <div className={classes.helps}>
      {helpDetail.category === 1 && <span>도와주세요</span> }
      {helpDetail.category === 2 && <span>도와줄게요</span> }
      {helpDetail.category === 3 && <span>도와줬어요</span> }
      <span>{helpDetail.title}</span>
      <span>{helpDetail.point}</span>
      <div></div>
      <span>{helpDetail.userName}</span>
      <span>{helpDetail.date}</span>
      <div>{helpDetail.content}</div>
      <div></div>
      <span>{helpDetail.view}</span>
      <span>{helpDetail.comment}</span>
    </div>
    <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: false }} // clickable을 true로 설정하여 페이지네이션 사용
        style={{ width: '100%', height: '500px' }}
      >
        {helpDetail.image.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${helpDetail.title} image ${index}`}
              style={{ width: '80%', height: '100%', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default HelpDetail;
