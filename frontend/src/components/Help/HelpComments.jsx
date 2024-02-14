import { useEffect,useState } from 'react';
import useStore from '../../store/helpDetailData';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './HelpComments.module.css';
import {motion} from "framer-motion"
function HelpComments({toggleModal}) {
  const { fetchData, loadComment, comments, loading, error, sendPostRequest, commentChoic } = useStore();
  const [commentText, setCommentText] = useState(''); // 댓글 텍스트 상태
  const formatTimeAgo = (dateString) => {
    const currentDate = new Date();
    const itemDate = new Date(dateString);

    const timeDifference = currentDate - itemDate;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursDifference < 24) {
      // 24시간 이내의 경우 시간으로 표시
      const formattedTime = `${hoursDifference}시간 전`;
      return formattedTime;
    } else {
      // 24시간 이후의 경우 날짜로 표시
      const year = itemDate.getFullYear();
      const month = itemDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
      const day = itemDate.getDate();
      const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;
      return formattedDate;
    }
  };
  useEffect(() => {
    loadComment();
  }, [loadComment,]);

  const handleCommentChange = (e) => {
    setCommentText(e.target.value); // 입력 값으로 댓글 텍스트 상태 업데이트
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // 댓글 등록 요청을 보냅니다.
      await sendPostRequest(commentText);
      console.log(typeof commentText);
      // 성공적으로 댓글이 등록되면 입력 필드를 초기화합니다.
      setCommentText("");
      // 댓글 리스트를 새로고침합니다.
      await loadComment();
    } catch (error) {
      // 에러 처리를 합니다.
      console.error("댓글 등록 실패:", error);
      alert("댓글을 등록하는 중 오류가 발생했습니다.");
    }
    fetchData()
  };
  const handleClick = (id) => {
    toggleModal(id);
  };
  const handleAdopt = async (commentId, writerName) => {
    const confirmAdop = window.confirm(`${writerName}님을 채택할까요?`);
    console.log(commentId);
    if (confirmAdop) {
      try {
        // 채택 요청을 보냅니다.
        await commentChoic(commentId);
        // 성공적으로 처리되면 댓글 리스트를 새로고침합니다.
        await loadComment();
      } catch (error) {
        // 에러 처리를 합니다.
        console.error("채택 처리 실패:", error);
        alert("채택 처리 중 오류가 발생했습니다.");
      }
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

  const content = comments?.result;
  // 데이터가 로드되면, 해당 데이터를 사용하여 무언가를 렌더링합니다.
  if (!content) {
    // 데이터가 비어있으면 메시지를 표시합니다.
    return <div>No data found.</div>;
  }

  return (
    <>
      {/* 댓글 입력 폼 , 조건 충족시 나타남 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ width: "100%" }}
        className="d-flex justify-content-center"
      >
        <div className={style.helps}>
          {content.sameMember === false && content.adopted === false && (
            <div className="col-12  mb-3">
              <form
                className="d-flex justify-content-center gap-4"
                style={{ width: "100%" }}
                onSubmit={handleCommentSubmit}
              >
                <input
                  type="text"
                  value={commentText}
                  onChange={handleCommentChange}
                  z
                  style={{ width: "80%" }}
                  className="p-2 rounded-3"
                  placeholder="댓글을 입력하세요"
                />
                <button style={{ width: "10%" }} className="btn btn-primary">
                  댓글 달기
                </button>
              </form>
            </div>
          )}

          {/* 댓글 리스트 */}
          <ListGroup>
            <div className="d-flex flex-column gap-3">
              {content.commentList.map((item, index) => (
                <ListGroup.Item className="rounded-4" key={index}>
                  <div className="d-flex gap-3 p-2 ">
                    <div className="d-flex flex-column">
                      <img
                        src={item.writerImageUrl}
                        alt="Writer"
                        className={style.writerImage}
                      />
                      <span className={style.headPoint}>{item.writerName}</span>
                    </div>
                    <div>
                      <span className={style.headUserName}>{item.comment}</span>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <span className={style.headDate}>
                        {formatTimeAgo(item.createDt)}
                      </span>
                    </div>
                    {content.sameMember && !content.adopted && (
                      <div className={style.buttonGroup}>
                        <button onClick={() => handleClick(item.writerId)}>
                          채팅하기
                        </button>
                        <button
                          onClick={() =>
                            handleAdopt(item.commentId, item.writerName)
                          }
                          className={style.chooseButton}
                        >
                          채택하기
                        </button>
                      </div>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
            </div>
          </ListGroup>
          {content.commentList.length === 0 && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: "100%" }}
            >
              <img
                style={{ width: "3rem", height: "3rem" }}
                src="/free-animated-icon-note-6172546.gif"
              />
              <h2 className="m-0">아직 댓글이 없습니다!</h2>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default HelpComments;
