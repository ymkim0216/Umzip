import { useState } from 'react'
function HelpWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 타이틀,콘텐트,이미지로 데이터 처리
    console.log({ title, content, image });
    // API 호출을 통해 서버에 데이터를 전송할 수 있습니다.
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
          <label htmlFor="image">이미지 업로드:</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">글 올리기</button>
      </form>
    </div>
  );
}

export default HelpWrite;
