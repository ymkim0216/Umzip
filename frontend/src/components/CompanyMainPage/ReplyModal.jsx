import PropTypes from 'prop-types';
import useReplyStore from '../../store/replyStore'

function ReplyModal({ onClose, mappingId }) {
    const submitReplyStore = useReplyStore((state) => state.useReplyStore);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const price = event.target.estimate.value;
      const detail = event.target.message.value;
  
      await submitReplyStore(mappingId, price, detail); // Zustand store의 함수 호출
      onClose(); // 모달 닫기
    };

  return (
    <div style={{
        position: 'fixed', // 고정 위치
        top: '50%', // 상단에서부터 50% 위치
        left: '50%', // 왼쪽에서부터 50% 위치
        transform: 'translate(-50%, -50%)', // 정중앙에 배치
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 1000, // 다른 요소들 위에 나타나도록 z-index 설정
        border: '1px solid #ccc', // 모달 테두리
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
        width: '80%', // 모달 너비
        maxWidth: '500px', // 최대 너비
    }}>
    <div style={{ /* 모달 스타일 */ }}>
      <h2>견적 제안</h2>
      <form onSubmit={handleSubmit}>
        {/* 견적 가격과 메시지 입력 필드 */}
        <div>
          <label>견적 가격:</label>
          <input name="estimate" type="number" required />
        </div>
        <div>
          <label>메시지:</label>
          <textarea name="message" required></textarea>
        </div>
        <button type="submit">제출</button>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
    </div>
  );
}
  
  // PropTypes를 사용하여 props 유형 검증
  ReplyModal.propTypes = {
    status: PropTypes.string, // 'codeSmall' prop이 문자열이어야 함을 선언
  };
  
  export default ReplyModal;