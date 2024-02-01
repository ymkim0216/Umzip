import { useParams } from "react-router-dom";
import classes from './HelpContent.module.css';
import { useSelector, useDispatch } from "react-redux"
import { selectFilteredHelps  } from '../../store/helpRedux'  // 리덕스에서 불러온 데이터
// wiper 임포트들
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';





function HelpDetail() {
  let helpsDetail = useSelector(selectFilteredHelps)  // 데이터 변수에넣고
  console.log(helpsDetail);
  console.log('디테일페이지이동')
  // 받아온 아이디 디테일 페이지로 이동
  let { id } = useParams();
  id = parseInt(id);
  let helpDetail = helpsDetail.find(function (x) {  // 받은 id를 찾기
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
      <span>조회수 : {helpDetail.view}</span>
      <span>댓글 수 : {helpDetail.comment}</span>
    </div>
    {helpDetail.image && helpDetail.image.length > 0 && ( //사진이 없을 경우엔 나타내지 않음
    <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={2}
        centeredSlides = {true}
        spaceBetween={5}
        navigation
        pagination={{ clickable: true }} // clickable을 true로 설정하여 페이지네이션 사용
        loop={false}
        effect="coverflow" // coverflow 효과 설정
        coverflowEffect={{ rotate: 0, stretch: 100, depth: 100, modifier: 1, slideShadows: true }} // coverflow 효과의 설정
        style={{ width: '1100px', height: '500px' }}
    >
        {helpDetail.image.map((img, index) => (
            <SwiperSlide key={index}>
                <img
                    src={img}
                    alt={`${helpDetail.title} image ${index}`}
                    style={{ 
                        width: '300px', // 너비를 700px로 설정
                        height: '300px', // 높이를 300px로 설정
                        margin: '0 auto', // 가로 중앙 정렬을 위한 margin 설정
                        display: 'flex', // Flex 사용
                        justifyContent: 'center', // 가로 중앙 정렬
                        alignItems: 'center', // 세로 중앙 정렬
                    }}
                />
            </SwiperSlide>
        ))}
    </Swiper>
)}
    </>
  );
}

export default HelpDetail;
