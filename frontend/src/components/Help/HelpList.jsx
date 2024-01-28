import { Link } from 'react-router-dom';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import style from './HelpList.module.css';
import { useSelector, useDispatch } from "react-redux"


function HelpList() {
  let helpsDetail = useSelector((state) => state.helps)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  let [search, setSearch] = useState('')

  // 현재 페이지에 맞는 게시물을 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = helpsDetail.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호를 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(helpsDetail.length / itemsPerPage); i++) {
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
      <h1>도움을 나눠요</h1>
      {/* 검색조건식 넣기 */}
      <input onChange={(e) => { setSearch(e.target.value)}}></input>
      <div className={style.head}><span>글 종류</span><span>제목</span><span>포인트</span><span>날짜</span><span>작성자</span><span>지역</span></div>
      <ul className={style.list}>
      <ListGroup>
        {currentItems.map((helps, index) => (
          <ListGroup.Item key={helps.id}>
            <Link to={`/helpdetail/${helps.id}`}>
              <div className={style.content}>
                {helps.category === 1 && <span>도와주세요</span> }
                {helps.category === 2 && <span>도와줄게요</span> }
                {helps.category === 3 && <span>도와줬어요</span> }
                <span>{helps.title}{`(${helps.comment})`}</span> 
                <span>{helps.point}P</span>
                <span>{helps.date}</span>
                <span>{helps.userName}</span>
                <span>{helps.region}</span>
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
