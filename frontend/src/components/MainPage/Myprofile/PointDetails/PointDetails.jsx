import { useState } from 'react';
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
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
        {
            "useDate" : "2024.01.16",
            "content" : "용달 이용 적립 ```",
            "how" : "+300"
        },
  ]
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 현재 페이지에 맞는 게시물을 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = points.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호를 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(points.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 페이지 번호를 클릭했을 때 실행될 함수
  const paginate = (pageNumber) => {
    console.log(`Current page before update: ${currentPage}`);
    setCurrentPage(pageNumber);
    console.log(`Current page after update: ${pageNumber}`);
  }
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
        {currentItems.map((points, index) => (
            <ListGroup.Item className={style.listContainer} key={index}>
                <span className={style.headDate}>{points.useDate}</span>
                <span className={style.headContent}>{points.content}</span>
                <span className={style.headPoint}>{points.how}</span>
            </ListGroup.Item>
        ))}
        </ListGroup>
        <nav>
        <ul className={style.pagination}>
          {pageNumbers.map(number => (
            <li key={number} className={style.pageItem}>
              <button type="button" onClick={() => paginate(number)} className={style.pageLink}>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
        </div>
      </>
    );
  }
  
  export default PointDetails;
  