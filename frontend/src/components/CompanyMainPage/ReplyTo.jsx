import PropTypes from 'prop-types';
import ReplyModal from './ReplyModal';
import companyDeliveryReservation from '../../store/companyDeliveryReservation'
import companyCleanReservation from '../../store/companyCleanReservation'
import useReplyStore from '../../store/replyStore'
import chatToCompanyStore from '../../store/chatToCompanyStore'
import { useState } from 'react';



function ReplyTo({ role, status, mappingId, reissuing, memberId }) {

  const [showModal, setShowModal] = useState(false);
  const { fetchDataDelivery } = companyDeliveryReservation();
  const { fetchDataClean } = companyCleanReservation();
  const { makeChatRoom, roomNumber } = chatToCompanyStore()


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const rejectionReservation = useReplyStore((state) => state.rejectionReservation);

  const code = status % 100;
  // roomNumber 저장 변수
  const roomId = roomNumber?.result;


  const rejectionHandle = async () => {
    await rejectionReservation(role, mappingId); // Zustand store의 함수 호출
    // 화면 즉각 반영을 위한 코드
    fetchDataDelivery()
    fetchDataClean()
  };

  const chatStart = async () => {
    await makeChatRoom(role, memberId);
    // roomNumber 안에 방번호 생성
  }

  return (
    <div>
      {/* 견적제안과 거절 버튼 */}
      {code === 1 && (
        <>
          <button onClick={handleOpenModal}>견적제안</button>
          <button onClick={() => rejectionHandle(role, mappingId)}>거절</button>
          {showModal && (
            <ReplyModal
              role={role}
              onClose={handleCloseModal}
              mappingId={mappingId}
              reissuing={reissuing}
            />
          )}
        </>
      )}

      {/* 취소 버튼 */}
      {code === 2 && (
        <button onClick={() => rejectionHandle(role, mappingId)}>취소</button>
      )}

      {/* 1대1 채팅 버튼 */}
      {code === 3 && (
        <button onClick={() => chatStart(role, memberId)}>1대1 채팅</button>
      )}

      {/* 제안 거절시 */}
      {code === 4 && <h5>거절한 제안</h5>}

      {/* 제안 취소시 */}
      {code === 5 && <h5>취소된 제안</h5>}
    </div>
  );
}
  // PropTypes를 사용하여 props 유형 검증
  ReplyTo.propTypes = {
    role: PropTypes.string,
    status: PropTypes.number, // 'codeSmall' prop이 문자열이어야 함을 선언
    mappingId: PropTypes.number,
    reissuing: PropTypes.number,
  };
  
  export default ReplyTo;