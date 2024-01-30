import { Link } from 'react-router-dom';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './HelpList.module.css';
import { useSelector, useDispatch } from "react-redux"
import HelpSearchBar from './HelpSearchBar'
import { selectFilteredHelps  } from '../../store/helpRedux'


function HelpList() {
  const filterHelps = useSelector(selectFilteredHelps);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 현재 페이지에 맞는 게시물을 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterHelps.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호를 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterHelps.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 페이지 번호를 클릭했을 때 실행될 함수
  const paginate = (pageNumber) => {
    console.log(`Current page before update: ${currentPage}`);
    setCurrentPage(pageNumber);
    console.log(`Current page after update: ${pageNumber}`);
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
        {currentItems.map((helps, index) => (
          <ListGroup.Item className={style.listGrop} key={helps.id}>
            <Link to={`/helpdetail/${helps.id}`}>
              <div className={style.content}>
                {helps.category === 1 && <span className={style.headType}>도와주세요</span> }
                {helps.category === 2 && <span className={style.headType}>도와줄게요</span> }
                {helps.category === 3 && <span className={style.headType}>도와줬어요</span> }
                <span className={style.headTitle}>{helps.title}{`(${helps.comment})`}</span> 
                <span className={style.headPoint}>{helps.point}P</span>
                <span className={style.headDate}>{helps.date}</span>
                <span className={style.headUserName}>{helps.userName}</span>
                <span className={style.headLocation}>{helps.region}</span>
                <span className={style.headView}>{helps.view}</span>
              </div>
            </Link>
          </ListGroup.Item>
        ))}
        </ListGroup>
      </ul>
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
  );
}

export default HelpList;
