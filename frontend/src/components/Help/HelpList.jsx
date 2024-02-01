import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './HelpList.module.css';
import HelpSearchBar from './HelpSearchBar'
import useStore from '../../store/axiosTest';


function HelpList() {
  const data = useStore(state => state.data);
  const loading = useStore(state => state.loading);
  const error = useStore(state => state.error);
  const fetchData = useStore(state => state.fetchData); // fetchData 함수를 가져옵니다.

  useEffect(() => {
    fetchData(); // 컴포넌트 마운트 시 데이터를 가져옵니다.
  }, [fetchData]); // fetchData가 변경될 때마다 호출됩니다.

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

  return (
    <div className={style.helps}>
      <div className={style.logoContainer}>
        <span>
          <span className={style.logo}>도움</span>
          <span>을 나눠요</span>
        </span>
        <HelpSearchBar/>
      </div>
      <div className={style.head}>
        <span className={style.headType}>글 종류</span>
        <span className={style.headTitle}>제목(댓글)</span>
        <span className={style.headPoint}>포인트</span>
        <span className={style.headDate}>날짜</span>
        <span className={style.headUserName}>작성자</span>
        <span className={style.headLocation}>지역</span>
        <span className={style.headView}>조회수</span>
      </div>
      <ul  className={style.list}>
      <ListGroup>
        {content.map((helps, index) => (
          <ListGroup.Item className={style.listGrop} key={helps.id}>
            <Link to={`/helpdetail/${helps.id}`}>
              <div className={style.content}>
                {helps.codeSmallId === 401 && <span className={style.headType}>도와주세요</span> }
                {helps.codeSmallId === 402 && <span className={style.headType}>도와줄게요</span> }
                {helps.codeSmallId === 403 && <span className={style.headType}>도와줬어요</span> }
                <span className={style.headTitle}>{helps.title}{`(${helps.commentCnt})`}</span> 
                <span className={style.headPoint}>{helps.rewardPoint}P</span>
                <span className={style.headDate}>{helps.createDt}</span>
                <span className={style.headUserName}>{helps.writerName}</span>
                <span className={style.headLocation}>{helps.sigungu}</span>
                <span className={style.headView}>{helps.readCnt}</span>
              </div>
            </Link>
          </ListGroup.Item>
        ))}
        </ListGroup>
      </ul>
    </div>
  );
}
export default HelpList;
