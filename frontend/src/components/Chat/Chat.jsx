import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Dropdown from './ChatModal'; // Dropdown 컴포넌트를 import

const Chat = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.1,
          backgroundColor: "#1E5EFF",
        }}
        transition={{ duration: 0.3 }}
        onClick={toggleDropdown}
        className="d-flex align-items-center justify-content-center p-2"
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          backgroundColor: "#4F81FF",
          borderRadius: "1.5rem",
          border: "none",
        }}
      >
        <motion.img
          initial={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: [0, -20, 20, 0], scale: 1.2 }}
          className=""
          style={{
            marginTop: "5px",
            marginLeft: "5px",
            height: "2.0rem",
            width: "2.0rem",
          }}
          src="/chatbot.png"
          alt="채팅 아이콘" 
        />
      </motion.button>

      {/* Dropdown을 렌더링합니다. */}
      {isDropdownOpen && (
        <div style={{ position: 'fixed', bottom: '4.5rem', right: '1rem', zIndex: 1 }}>
          <Dropdown onClose={closeDropdown} />
        </div>
      )}
    </>
  );
};

export default Chat;
