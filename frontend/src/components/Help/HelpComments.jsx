import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import useStore from '../../store/helpDetailData';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './HelpList.module.css';

function HelpComments() {
  const { fetchData, data, loading, error } = useStore();


  useEffect(() => {
    fetchData();
  }, [fetchData]);


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
