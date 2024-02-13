import { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './PointDetails.module.css';
import useStorePoint from '../../../../store/pointData';


function PointDetails() {
  const { page, fetchData, data  } = useStorePoint()

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  const points = data?.result?.pointUsageDtoList ?? []; 
    return (
        
      <>
      <div className={style.pointsContainer}>
        <div >
        <img src="/pointImg.gif" style={{width:'100px'}}  />
        <h4>나의 포인트 내역</h4>
        </div>
        
        <div className={style.head}>
        <span className={style.headDate}>일자</span>
        <span className={style.headContent}>내용</span>
        <span className={style.headPoint}>포인트</span>
      </div>
        <ListGroup>
        {points.map((pointData, index) => (
            <ListGroup.Item className={style.listContainer} key={index}>
                <span className={style.headDate}>{pointData.date}</span>
                <span className={style.headContent}>{pointData.message}</span>
                <span className={style.headPoint}>{pointData.change}</span>
            </ListGroup.Item>
        ))}
        </ListGroup>
        {/* <nav>
        <ul className={style.pagination}>
          {pageNumbers.map(number => (
            <li key={number} className={style.pageItem}>
              <button type="button" onClick={() => paginate(number)} className={style.pageLink}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav> */}
        </div>
      </>
    );
  }
  
  export default PointDetails;
  