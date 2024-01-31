import ListGroup from 'react-bootstrap/ListGroup';
import style from './PointDetails.module.css';


function PointDetails() {

    const points = [
        {
            "useDate" : "2024.01.15",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
  ]
    return (
      <>
      <div className={style.pointsContainer}>
        <h4>map함수 돌리기 포인트내역</h4>
        <div className={style.head}>
        <span className={style.headDate}>일자</span>
        <span className={style.headContent}>내용</span>
        <span className={style.headPoint}>포인트</span>
      </div>
        <ListGroup>
        {points.map((points, index) => (
            <ListGroup.Item className={style.listContainer} key={index}>
                <span className={style.headDate}>{points.useDate}</span>
                <span className={style.headContent}>{points.content}</span>
                <span className={style.headPoint}>{points.how}</span>
            </ListGroup.Item>
        ))}
        </ListGroup>
        </div>
      </>
    );
  }
  
  export default PointDetails;
  