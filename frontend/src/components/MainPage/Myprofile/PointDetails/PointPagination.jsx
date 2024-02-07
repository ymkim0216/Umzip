import style from './PointPagination.module.css'
import useStorePoint from '../../../../store/pointData';

function PointPagination() {
    const { data, page, setPage } = useStorePoint(); // 현재 페이지와 페이지 변경 함수, 총 페이지 수를 가져옴
    const totalPages = data?.result?.totalPage || 1;
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

  export default PointPagination;