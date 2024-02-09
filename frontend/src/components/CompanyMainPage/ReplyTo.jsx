import PropTypes from 'prop-types';
import ReplyModal from './ReplyModal';
import { useState } from 'react';


function ReplyTo({ role, status, id, price }) {
  // PropTypes를 사용하여 props 유형 검증
  ReplyTo.propTypes = {
    status: PropTypes.string, // 'codeSmall' prop이 문자열이어야 함을 선언
  };
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const code = status;

  return (
    <div>
      {/* 견적제안과 거절 버튼 */}
      {code === 101 && (
        <>
        <button onClick={handleOpenModal}>견적제안</button>
        <button>거절</button>
        {showModal && (
          <ReplyModal
            onClose={handleCloseModal}
            mappingId={id}
            price={price}
            role={role}
          />
        )}
      </>
      )}

      {/* 취소 버튼 */}
      {code === 102 && <button>취소</button>}

      {/* 1대1 채팅 버튼 */}
      {code === 103 && <button>1대1 채팅</button>}

      {/* 제안 거절시 */}
      {code === 104 && <h5>거절한 제안</h5>}

      {/* 제안 취소시 */}
      {code === 105 && <h5>취소된 제안</h5>}
    </div>
  );
}
  
  export default ReplyTo;