import useStore from '../../store/helpData';
import style from './HelpSearchBar.module.css'


function HelpSearchBar() {
  // 변화감지 변수
  const { setKeyword, fetchData } = useStore();
  // handleFilterChange는 helpFilter라는 함수안에 입력내용을 넣으면 실시간으로 변화를 감지하고 실시간 변환

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  }

      // Enter 키를 눌렀을 때 검색을 실행하는 함수
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          fetchData();
        }
      };

  return (
    <div className={style.inputbox}>
      <input 
      required="required" 
      type="text"
      onChange={handleKeywordChange}
      onKeyDown={handleKeyDown}
      />
      <span>검색</span>
      <i></i>
    </div>
  );
}

export default HelpSearchBar;
