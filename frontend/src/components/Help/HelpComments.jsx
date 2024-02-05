import { useEffect,useState } from 'react';
import useStore from '../../store/helpDetailData';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './HelpList.module.css';

function HelpComments() {
  const { fetchData, data, loading, error, sendPostRequest } = useStore();
  const [commentText, setCommentText] = useState(''); // 댓글 텍스트 상태

  useEffect(() => {
    fetchData();
  }, [fetchData]);

    const handleCommentChange = (e) => {
    setCommentText(e.target.value); // 입력 값으로 댓글 텍스트 상태 업데이트
  };

  const handleCommentSubmit = () => {
    sendPostRequest(commentText); // sendPostRequest 함수 호출
    setCommentText(''); // 폼을 제출한 후 입력 필드 초기화
  };


    // 데이터 로딩 중이면 로딩 인디케이터를 표시합니다.
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // 에러가 있으면 에러 메시지를 표시합니다.
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    const content = data?.result?.commentList;
    // 데이터가 로드되면, 해당 데이터를 사용하여 무언가를 렌더링합니다.
    if (!content) {
      // 데이터가 비어있으면 메시지를 표시합니다.
      return <div>No data found.</div>;
    }

  return (
    <>
    {/* 댓글 입력 폼 */}
    <div className={style.commentForm}>
        <input
          type="text"
          value={commentText}
          onChange={handleCommentChange}
          className={style.commentInput}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleCommentSubmit} className={style.commentSubmit}>
          댓글 달기
        </button>
      </div>

      {/* 댓글 리스트 */}
      <ListGroup>
        {content.map((item) => (
          <ListGroup.Item className={style.listGrop} key={item.id}>
              <div className={style.content}>
                <span className={style.headPoint}>{item.writerName}P</span>
                <span className={style.headDate}>{item.createDt}</span>
                <span className={style.headUserName}>{item.comment}</span>
              </div>
          </ListGroup.Item>
        ))}
        </ListGroup>
    </>
  );
}

export default HelpComments;
