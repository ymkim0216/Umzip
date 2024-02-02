import { useState } from 'react'
import style from './HelpWrite.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


function HelpWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 여러장의 사진을 보여주기 위한 state
  const [showImages, setShowImages] = useState([]);

  // 이미지 미리보기를 위한 상대경로
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 타이틀,콘텐트,이미지로 데이터 처리
    console.log({ title, content, showImages });
    // API 호출을 통해 서버에 데이터를 전송할 수 있습니다.
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
