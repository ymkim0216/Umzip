import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import style from "./HelpList.module.css";
import HelpSearchBar from "./HelpSearchBar";
import HelpCategorySelect from "./HelpCategorySelect";
import useStore from "../../store/helpData";
import { motion } from "framer-motion";
import HelpPagination from "./HelpPagination";

function HelpList() {
  const { data, loading, error, fetchData, page } = useStore();
  function formatDate(dateTimeString) {
    const currentDate = new Date();
    const postDate = new Date(dateTimeString);

    // 시간 차이 계산 (밀리초로 변환)
    const timeDifference = currentDate - postDate;

    // 24시간 이내라면 "시간 전"으로 표시
    if (timeDifference < 24 * 60 * 60 * 1000) {
      const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
      return `${hoursDifference}시간 전`;
    } else {
      // 24시간 이상이면 날짜 형식으로 표시
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return postDate.toLocaleDateString(undefined, options);
    }
  }
  const navigate = useNavigate();
  function navigateHandler() {
    navigate("/helpwriting");
  }

  useEffect(() => {
    fetchData(); // 컴포넌트 마운트 시 데이터를 가져옵니다.
  }, [fetchData, page]); // fetchData가 변경될 때마다 호출됩니다.

  // 데이터 로딩 중이면 로딩 인디케이터를 표시합니다.
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러가 있으면 에러 메시지를 표시합니다.
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const content = data?.result?.content;
  // 데이터가 로드되면, 해당 데이터를 사용하여 무언가를 렌더링합니다.
  if (!content) {
    // 데이터가 비어있으면 메시지를 표시합니다.
    return <div>No data found.</div>;
  }
  console.log(content)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={style.helps}
    >
      <div className={style.logoContainer}>
        <span className="d-flex align-items-center gap-1">
          <span className={style.logo}>도움</span>
          <span style={{ fontSize: "20px" }}>을 나눠요</span>
          <img
            style={{ width: "4rem", height: "auto", marginLeft: "15px" }}
            className=""
            src="/free-animated-icon-care-11688516.gif"
            alt=""
          />
        </span>
        <HelpSearchBar />
      </div>
      <div className="row" style={{ marginLeft: "0px" }}>
        <HelpCategorySelect />
      </div>

      <div className={style.head}>
        <span className={style.headType}>글 종류</span>
        <span className={style.headTitle}>제목(댓글)</span>
        <span className={style.headPoint}>포인트</span>
        <span className={style.headDate}>날짜</span>
        <span className={style.headUserName}>작성자</span>
        <span className={style.headView}>조회수</span>
      </div>
      <ul className={style.list}>
        <ListGroup>
          {content.map((helps) => (
            <ListGroup.Item className={style.listGrop} key={helps.id}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/helpdetail/${helps.id}`}
              >
                <motion.div
                  whileHover={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  className={style.content}
                >
                  {helps.codeSmallId === 401 && (
                    <span style={{ color: "#f06565", fontWeight: 'bold' }} className={style.headType}>
                      도와주세요
                    </span>
                  )}
                  {helps.codeSmallId === 402 && (
                    <span
                      style={{ color: "#4A3AFF", fontWeight: 'bold'  }}
                      className={style.headType}
                    >
                      도와줄게요
                    </span>
                  )}
                  {helps.codeSmallId === 403 && (
                    <span style={{ color: "gray", fontWeight: 'bold'  }} className={style.headType}>
                      도와줬어요
                    </span>
                  )}
                  <span className={style.headTitle}>
                    {helps.title}
                    {`(${helps.commentCnt})`}
                  </span>
                  <span className={style.headPoint}>{helps.rewardPoint}P</span>
                  <span className={style.headDate}>
                    {formatDate(helps.createDt)}
                  </span>
                  <span className={style.headUserName}>{helps.writerName}</span>
                  <span className={style.headView}>{helps.readCnt}</span>
                </motion.div>
              </Link>
            </ListGroup.Item>
          ))}
          {content.length === 0 && (
            <div
              className="mt-5 gap-3 d-flex justify-content-center align-items-center"
              style={{ width: "100%" }}
            >
              <img
                style={{ width: "3rem", height: "3rem" }}
                src="/free-animated-icon-note-6172546.gif"
              />
              <h4 className="m-0">아직 글이 없습니다!</h4>
            </div>
          )}
        </ListGroup>
      </ul>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#78cad5",
                    border: 0,
         }}
          onClick={navigateHandler}
        >
          글쓰기
        </button>
      </div>

      <div
        className="m-4 d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        <HelpPagination />
      </div>
    </motion.div>
  );
}
export default HelpList;
