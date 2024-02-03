import { useState } from 'react'
import style from './HelpWrite.module.css';
import useStore from '../../store/helpDetailData';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


function HelpWrite() {
  const { sendPostBulletin } = useStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 여러장의 사진을 보여주기 위한 state
  const [showImages, setShowImages] = useState([]);
  //  401: 도와줘요, 402: 도와줬어요, 403: 도와줄게요
  const [ codeSmall, setCodeSmall ] = useState(401);
  const [ point, setPoint ] = useState(100);

  // 이미지 미리보기를 위한 상대경로
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    if (imageLists.length + showImages.length > 10) {
      alert('이미지는 최대 10개까지 업로드 가능합니다.');
      return;
    }
  
    setShowImages([...showImages, ...imageLists]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

      // 서버로 보낼 묶음
  const boardHelp = {
    codeSmallId: codeSmall,
    title: title,
    content: content, 
    point: point,
  };
  
    const Bulletin = new FormData();
    // 게시글 정보를 JSON 문자열로 변환하여 Bulletin 추가
    Bulletin.append('boardHelp', new Blob([JSON.stringify(boardHelp)], { type: "application/json" }));

      // 이미지 파일을 Bulletin 추가

      showImages.forEach((file) => {
        // 파일 객체를 개별적으로 추가
        Bulletin.append('imageFileList', file);
      });

  // for (let i = 0; i < showImages.length; i++) {
  //   console.log(showImages[i])
  //   Bulletin.append('imageFileList', showImages[i]);
  // }

  // useStore의 sendPostBulletin 함수를 호출하여 FormData 전송
  sendPostBulletin(Bulletin);
};

    // X버튼 클릭 시 이미지 삭제하는 함수
    const handleDeleteImage = (id) => {
      setShowImages(showImages.filter((_, index) => index !== id));
    };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">본문:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageUploa">이미지 업로드:</label>
          <input onChange={handleAddImages} id="image" type="file" multiple />
        </div>
        <button type="submit" className={style.submitButton}>글 등록</button>
      </form>
      <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: false }}
          style={{ width: '100px%', height: '100px' }}
        >
          {showImages.map((image, id) => (
            <SwiperSlide key={id}>
              <img src={image} alt={`image-${id}`} style={{ width: '80%', height: '100%', objectFit: 'cover' }}/>
              <button onClick={() => handleDeleteImage(id)}>X</button>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
}

export default HelpWrite;
