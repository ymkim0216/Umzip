import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import style from './HelpContent.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { AnimatePresence, motion } from "framer-motion";
import useStore from '../../store/helpDetailData';

function HelpDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate()
  const { setBoardId, fetchData, data, loading, error } = useStore();
  console.log(boardId)
  useEffect(() => {
    setBoardId(boardId);
    fetchData();
  }, [boardId, setBoardId, fetchData]);

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

  

  const newDate = new Date(content.boardCreateDt).toISOString().split('T')[0];
  // console.log(newDate)
  const handleClick = ()=>{
    navigate(`/myprofile/${content.writerId}`)

  }
  return (
    <>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ marginTop: "8rem" }}>
          <div className={style.helps}>
            <div className="d-flex align-items-center gap-4 justify-content-between">
              <div className="d-flex align-items-center gap-4">
                {content.codeSmallId === 401 && <span style={{ fontSize: "2rem", color: "#0077CC", fontWeight: "bold" }} >도와주세요</span>}
                {content.codeSmallId === 402 && <span style={{ fontSize: "2rem", color: "#0077CC", fontWeight: "bold" }}>도와줄게요</span>}
                {content.codeSmallId === 403 && <span style={{ fontSize: "2rem", color: "#0077CC", fontWeight: "bold" }} >도와줬어요</span>}
                <h4 className="m-0">제목: {content.boardTitle}</h4>
              </div>
              <span>포인트: {content.rewardPoint}P</span>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <span className="m-0">작성자 : </span>
                  <div className="d-flex align-items-center gap-2">
                    <motion.img  whileHover={{y:-5,cursor:"pointer"}} onClick={handleClick}  className="rounded-pill" style={{ width: "4rem" }} src={content.writerImageUrl} />
                    <span className="m-0">{content.writerName}</span>
                  </div>
                </div>
                <span className="m-0" >작성 시간 {newDate}</span>
              </div>

            </div>
            <div>{content.boardContent}</div>
            <div>{content.imagePathList && content.imagePathList.length > 0 && ( //사진이 없을 경우엔 나타내지 않음
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={2}
                centeredSlides={true}
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
                        width: '10rem', // 너비를 700px로 설정
                        height: '10rempx', // 높이를 300px로 설정
                        margin: '0 auto', // 가로 중앙 정렬을 위한 margin 설정
                        display: 'flex', // Flex 사용
                        justifyContent: 'center', // 가로 중앙 정렬
                        alignItems: 'center', // 세로 중앙 정렬
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}</div>
            <div className="d-flex gap-3s" style={{ marginLeft: "auto" }}>
              <span>조회수 : {content.readCnt}</span>
              <span>댓글 수 : {content.boardCommentCnt}</span>
            </div>
            {content.sameMember === true && (
              <div>
                <button>글 수정</button>
                <button>글 삭제</button>
              </div>
            )}

          </div>

        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default HelpDetail;
