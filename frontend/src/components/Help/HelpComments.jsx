import { useEffect,useState } from 'react';
import useStore from '../../store/helpDetailData';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './HelpList.module.css';

function HelpComments() {
  const { fetchData, data, loading, error, sendPostRequest, commentChoic } = useStore();
  const [commentText, setCommentText] = useState(''); // 댓글 텍스트 상태

  useEffect(() => {
    fetchData();
  }, [fetchData]);

    const handleCommentChange = (e) => {
    setCommentText(e.target.value); // 입력 값으로 댓글 텍스트 상태 업데이트
  };

  const handleCommentSubmit = async () => {
    try {
      // 댓글 등록 요청을 보냅니다.
      await sendPostRequest(commentText);
      console.log(typeof(commentText))
      // 성공적으로 댓글이 등록되면 입력 필드를 초기화합니다.
      setCommentText('');
      // 댓글 리스트를 새로고침합니다.
      await fetchData();
    } catch (error) {
      // 에러 처리를 합니다.
      console.error('댓글 등록 실패:', error);
      alert('댓글을 등록하는 중 오류가 발생했습니다.');
    }
  };

  const handleChooseComment = async (writerId) => {
    try {
      // 채택 요청을 보냅니다.
      await commentChoic(writerId);
      // 성공적으로 처리되면 댓글 리스트를 새로고침합니다.
      await fetchData();
    } catch (error) {
      // 에러 처리를 합니다.
      console.error('채택 처리 실패:', error);
      alert('채택 처리 중 오류가 발생했습니다.');
    }
  };


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

  return (
    <>
    {/* 댓글 입력 폼 , 조건 충족시 나타남 */}
    { content.sameMember === false && content.adopted === false && <div className={style.commentForm}>
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
      </div>}

      {/* 댓글 리스트 */}
      <ListGroup>
        {content.commentList.map((item) => (
          <ListGroup.Item className={style.listGrop} key={item.id}>
              <div className={style.content}>
                <span className={style.headPoint}>{item.writerName}P</span>
                <span className={style.headDate}>{item.createDt}</span>
                <span className={style.headUserName}>{item.comment}</span>
                {content.sameMember && !content.adopted && (
                <div className={style.buttonGroup}>
                  <button>
                    채팅하기
                  </button>
                  <button onClick={() => handleChooseComment(item.writerId)} className={style.chooseButton}>
                    채택하기
                  </button>
                </div>
              )}
              </div>
          </ListGroup.Item>
        ))}
        </ListGroup>
    </>
  );
}

export default HelpComments;
