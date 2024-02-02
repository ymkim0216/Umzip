import style from './HelpPagination.module.css'
import useStore from '../../store/helpData';

function HelpPagination() {
    const { data, page, setPage } = useStore(); // 현재 페이지와 페이지 변경 함수, 총 페이지 수를 가져옴
    const totalPages = data?.result?.totalPages || 1;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
    <>
        <div className={style.pagination}>
            {pages.map((pageNumber) => (
        <button
            key={pageNumber}
            className={page === pageNumber ? style.active : ""}
            onClick={() => setPage(pageNumber)}
            >
            {pageNumber}
        </button>
        ))}
        </div>
    </>
    );
  }
  
  export default HelpPagination;
  