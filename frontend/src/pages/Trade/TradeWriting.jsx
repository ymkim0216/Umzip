import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function TradeWriting() {
  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
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

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <>
      <div>
        <h1>trade</h1>
        <label htmlFor="input-file" onChange={handleAddImages}>
          <input type="file" id="input-file" multiple />
          <span>사진 추가</span>
        </label>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {showImages.map((image, id) => (
            <SwiperSlide key={id}>
              <img src={image} alt={`image-${id}`} />
              <button onClick={() => handleDeleteImage(id)}>X</button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default TradeWriting;
