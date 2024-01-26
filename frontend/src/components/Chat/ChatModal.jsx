import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatModalList from './ChatModalList';
import styles from './ChatModal.module.css'; // Import the CSS module

const DUMMY_DATA=[{
  name:"아무개",
  chat:"그래서 어쩌라고",
  date:"2024.01.01",
  message_status :false
},
{
  name:"미친개",
  chat:"그니까 ㅡㅡ",
  date:"2024.01.02",
  message_status :true
},
{
  name:"미친개",
  chat:"그니까 ㅡㅡ",
  date:"2024.01.02",
  message_status :true
},
{
  name:"미친개",
  chat:"그니까 ㅡㅡ",
  date:"2024.01.02",
  message_status :true
},
{
  name:"미친개",
  chat:"그래서 어쩌라고",
  date:"2024.01.02",
  message_status :true
},
{
  name:"미친개",
  chat:"그니까 ㅡㅡ",
  date:"2024.01.02",
  message_status :true
},
{
  name:"미친개",
  chat:"그니까 ㅡㅡ",
  date:"2024.01.02",
  message_status :true
},
{
  name:"미친개",
  chat:"그니까 ㅡㅡ",
  date:"2024.01.02",
  message_status :true
},
{
  name:"미친개",
  chat:"그니까 ㅡㅡ",
  date:"2024.01.02",
  message_status :true
},
]

const ChatModal = () => {
  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.chatModalContainer} ${styles.shadow} ${styles.chatModalContent}  shadow-lg p-2 rounded-4`}
        variants={{
          visible:{transition:{staggerChildren :0.1 }}
        }}
      >
        <div className={`${styles.chatModalHeader} d-flex`}>
          <h3>Chat</h3>
        </div>
          {DUMMY_DATA.map((data) => (
            <motion.div
              key={data.name}
              className={`${styles.chatListItem}`}
              variants={{
                hidden:{opacity:0 ,y:30},
                visible:{opacity:1,y:0}
              }}
              exit={{opacity:1,y:30}}
              transition={{type:'tween'}}
            >
              <ChatModalList
                name={data.name}
                chat={data.chat}
                date={data.date}
                chatStatus={data.message_status}
              />
            </motion.div>
          ))}
          
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal;
