import { useDispatch } from 'react-redux';
import { helpFilter } from '../../store/helpRedux';

function HelpSearchBar() {
  // 변화감지 변수
    const dispatch = useDispatch();
  // handleFilterChange는 helpFilter라는 함수안에 입력내용을 넣으면 실시간으로 변화를 감지하고 실시간 변환
  const handleFilterChange = (e) => {
    dispatch(helpFilter(e.target.value));
  }
  return (
    <>
      <input onChange={handleFilterChange} placeholder="검색어를 입력하세요"></input>
    </>
  );
}

export default HelpSearchBar;
