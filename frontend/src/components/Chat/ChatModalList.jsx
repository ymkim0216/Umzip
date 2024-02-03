import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatModalList.module.css';
import { AnimatePresence, motion } from "framer-motion"
import axios from 'axios';
import { Client } from "@stomp/stompjs";



export default function ChatModalList({ unReadCount, name, chat, date, img, chatroomId, receiverId }) {
  const [openModal, setOpenModal] = useState(false);
  const [talkHistory, setTalkHistory] = useState([]);
  const chatContainerRef = useRef();
  const [userinput, setuserinput] = useState(null);
  const stompClientRef = useRef(null);
  const [unReadMessage , setUnReadMessage] =useState(unReadCount)
  useEffect(() => {
    // 스크롤 위치를 항상 맨 아래로 조절
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [talkHistory, openModal]);

  const handleinput = (event) => {
    setuserinput(event.target.value);
  };

  const toggleModal = async () => {
    setOpenModal(true);
    setUnReadMessage(0)
    // 모달이 열릴 때만 대화 내용을 불러옴
    if (!talkHistory.length) {
      const stompClient = socket();
      const talk = await axios_detailChat();
      // console.log(talk)
      setTalkHistory(talk)
      stompClientRef.current = stompClient;
      // console.log(stompClient)

      stompClient.onConnect(
        stompClient.activate()
      )

      // stompClient.activate() 호출 후에 구독을 시도
      // stompClient.activate().then(() => {

      // });
    }
  };

  const socket = () => {
    const accessToken = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg`;
    const client = new Client({
      brokerURL: `ws://172.30.1.54:8080/ws?accessToken=${accessToken}`,

      // 여기에 다른 설정도 추가할 수 있습니다.
      onConnect: (frame) => {
        console.log('Connected: ' + frame);  
        client.subscribe(`/topic/chatroom/${chatroomId}`, (message) => {
          // console.log('Received message: ' + message.body);
          // console.log(talkHistory)
          showReceivedMessage(message.body);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });

    return client;
  };




  const axios_detailChat = async () => {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg`;

    try {
      const response = await axios.get(`http://172.30.1.54:8080/api/chat/rooms/${chatroomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.result)
      return response.data.result
        // console.log(response.data.result)
        // console.dir(stompClient.subscribe)
        ;
    } catch (error) {
      console.error(error);
    }
  };

  const showReceivedMessage = (message) => {
    try {
      // console.log(message)
      
      const jsonData = JSON.parse(message);
      // console.log(jsonData);

      setTalkHistory((prevTalkHistory) => {
        const updatedHistory = [...prevTalkHistory, jsonData];
        // console.log(updatedHistory);
        return updatedHistory;
        
      })
    
    } catch (error) {
      console.error('Error parsing received message:', error);
    }
  };

  const sendMessage = () => {
    // userinput을 사용하도록 수정
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg`;
    if (userinput && stompClientRef.current.active) {
      // console.log('메시지 보낸다');
      stompClientRef.current.publish({
        destination: `/app/chat/${chatroomId}`,
        body: JSON.stringify({
          content: userinput,
          type: 'TALK'
        }),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } else {
      console.error('Message is empty or stomp client is not connected.');
    }
  };
  return (
    <>
      <AnimatePresence>
        {openModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenModal(false)}
            style={{
              zIndex: "99",
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div style={{
              position: 'relative',
              width: '40%',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}>
              <div
                onClick={(e) => e.stopPropagation()}
                ref={chatContainerRef}
                style={{ width: "100%", display: "flex", flexDirection: "column", maxHeight: "40rem", overflowY: "auto" }}
              >
                {talkHistory  && talkHistory.map((items, index) => (
                  <div
                    key={index}
                    style={{
                      alignSelf: items.requesterId.toString() !== items.senderId ? "flex-start" : "flex-end",
                      maxWidth: "70%",
                      margin: "5px",
                      padding: "10px",
                      background: items.requesterId.toString() !== items.senderId ? "#e6e6e6" : "#4caf50",
                      borderRadius: "10px",
                      color: items.requesterId.toString() !== items.senderId ? "#000" : "#fff",
                    }}
                  >
                    {items.content}
                  </div>
                ))}
                
                  <form className='d-flex justify-content-around' onSubmit={(e) => { e.preventDefault(); sendMessage(); setuserinput(''); }}>
                    <input  value={userinput} className='col-10 border bg-white shadow-lg rounded-3' type='text' onChange={handleinput} />
                    <button type="submit" className='btn btn-primary rounded-4'><img src='./Paper_Plane.png' /></button>
                  </form>
                    
                <div> 

                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={toggleModal} className={styles['chat-button']}>
        <div className='d-flex flex-row p-2 justify-content-between m-1'>
          <div className='d-flex gap-2'>
            <img
              style={{ width: "3rem", height: "3rem" }}
              src={img}
              alt='랜덤 이미지'
            ></img>
            <div className='text-start'>
              <p className='m-0'>{name}</p>
              <p className='m-0'>{chat}</p>
            </div>
          </div>
          <div className='d-flex flex-column '>
            <small className="form-text text-muted">{date}</small>
            <div className='col-12 d-flex justify-content-end'>
              {unReadMessage !== 0 ? <span className="col-4   badge rounded-pill bg-danger">
                {unReadMessage}
              </span> : null}
            </div>

          </div>


        </div>
      </motion.button>
    </>
  );
}