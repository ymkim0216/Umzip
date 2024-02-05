import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import style from './HelpContent.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import useStore from '../../store/helpDetailData';

function HelpDetail() {
  const { boardId } = useParams();
  const { setBoardId, fetchData, data, loading, error } = useStore();
  console.log(boardId)
  useEffect(() => {
    setBoardId(boardId);
    fetchData();
  }, [ boardId, setBoardId, fetchData ]);

    // 데이터 로딩 중이면 로딩 인디케이터를 표시합니다.
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // 에러가 있으면 에러 메시지를 표시합니다.
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    const content = data?.result;
    // 데이터가 로드되면, 해당 데이터를 사용하여 무언가를 렌더링합니다.
    if (!content) {
      // 데이터가 비어있으면 메시지를 표시합니다.
      return <div>No data found.</div>;
    }
    console.log(content)
    console.log(content.content)
  return (
    <>
    <div className={style.helps}>
      {content.codeSmallId === 401 && <span>도와주세요</span> }
      {content.codeSmallId === 402 && <span>도와줄게요</span> }
      {content.codeSmallId === 403 && <span>도와줬어요</span> }
      <span>{content.boardTitle}</span>
      <span>{content.rewardPoint}</span>
      <div></div>
      <span>{content.writerName}</span>
      <span>{content.boardCreateDt}</span>
      <div>{content.boardContent}</div>
      <div></div>
      <span>조회수 : {content.view}</span>
      <span>댓글 수 : {content.boardCommentCnt}</span>
      { content.sameMember === true && (
        <div>
      <button>글 수정</button>
      <button>글 삭제</button>
      </div>
      )}
    </div>
    {content.imagePathList && content.imagePathList.length > 0 && ( //사진이 없을 경우엔 나타내지 않음
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
        style={{ 
          width: '100%', /* 부모 요소의 전체 너비를 차지하도록 설정 */
          maxWidth: '1100px', /* 최대 너비 제한 */
          height: '500px', /* 고정 높이 설정 */
          margin: 'auto', /* 가운데 정렬 */
         }}
    >
        {content.imagePathList.map((img, index) => (
            <SwiperSlide key={index}>
                <img
                    src={img}
                    alt={`상세 이미지 image ${index}`}
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
