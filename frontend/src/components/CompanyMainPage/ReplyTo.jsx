import PropTypes from 'prop-types';
import ReplyModal from './ReplyModal';
import { useState } from 'react';


function ReplyTo({ role, status, id, price }) {

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const code = status % 100;

  return (
    <div>
      {/* 견적제안과 거절 버튼 */}
      {code === 1 && (
        <>
        <button onClick={handleOpenModal}>견적제안</button>
        <button>거절</button>
        {showModal && (
          <ReplyModal
            role={role}
            onClose={handleCloseModal}
            mappingId={id}
            price={price}
          />
        )}
      </>
      )}

      {/* 취소 버튼 */}
      {code === 2 && <button>취소</button>}

      {/* 1대1 채팅 버튼 */}
      {code === 3 && <button>1대1 채팅</button>}

      {/* 제안 거절시 */}
      {code === 4 && <h5>거절한 제안</h5>}

      {/* 제안 취소시 */}
      {code === 5 && <h5>취소된 제안</h5>}
    </div>
  );
}
  // PropTypes를 사용하여 props 유형 검증
  ReplyTo.propTypes = {
    status: PropTypes.number, // 'codeSmall' prop이 문자열이어야 함을 선언
    mappingId: PropTypes.number,
  };
  
  export default ReplyTo;