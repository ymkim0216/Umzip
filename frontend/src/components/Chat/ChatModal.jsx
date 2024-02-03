import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatModalList from './ChatModalList';
import styles from './ChatModal.module.css'; // Import the CSS module
import axios from 'axios';



const ChatModal = () => {
  useEffect(() => {
    Chat_Call();
  }, []);
  const [openModal, setOpenModal] = useState()
  const [ChatList, setChatList] = useState()
  const Chat_Call = async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg';

    try {
      const response = await axios.get('http://172.30.1.54:8080/api/chat/rooms', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setChatList(response.data.result)
      console.log(response.data.result)
      console.lo
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.chatModalContainer} ${styles.shadow} ${styles.chatModalContent}  shadow-lg p-2 rounded-4`}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <div className={`${styles.chatModalHeader} d-flex`}>
          <h3>Chat</h3>
        </div>
        {ChatList && ChatList.map((data) => (
          <motion.div
            key={data.chatRoomId}
            className={`${styles.chatListItem}`}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            exit={{ opacity: 1, y: 30 }}
            transition={{ type: 'tween' }}
            onClick={() => setOpenModal(true)}
          >
            <ChatModalList
              unReadCount={data.unReadCount}
              img={data.receiverProfileImage}
              name={data.receiverName}
              chat={data.lastContent}
              date={data.updateDt}
              chatroomId={data.chatRoomId}
              receiverId={data.receiverId}
            />

          </motion.div>
        ))}

      </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal;
