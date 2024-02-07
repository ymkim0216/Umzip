import React, { useEffect, useRef, useState } from 'react';
import DropDown from './dropdown';
import { AnimatePresence, motion } from "framer-motion";
import StatusChange from './Status_Change';
import { Client } from "@stomp/stompjs";
import useAuthStore from '../../../store/store';

export default function Requests({ setOpenRecommendModal, setChoiceCompanyId, isAll, setRequestList, requestList, date, orderName, orderNumber, status, list }) {
    const [chatRoom, setChatRoom] = useState("")
    const scrollToBottom = () => {
        // 스크롤 위치를 항상 맨 아래로 조절
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    const [userId, setUserId] = useState("")
    const [talkHistory, setTalkHistory] = useState([])
    const chatContainerRef = useRef();
    const [userinput, setuserinput] = useState("");
    const [openModal, setOpenModal] = useState(false)
    const stompClientRef = useRef(null);
    const handleinput = (event) => {
        setuserinput(event.target.value);
    };
    useEffect(() => {
        scrollToBottom();
    }, [openModal, talkHistory]);

    const toggleModal = async (res) => {
        setOpenModal(true)
        setChatRoom(res)
        console.log(res)
        const stompClient = socket(res);
        stompClientRef.current = stompClient;
        stompClient.onConnect(
            stompClient.activate()
        )
    }
    const containerVariants = {
        visible: {
            opacity: 1, y: 0,
            transition: {
                staggerChildren: 0.1, // 자식 요소들에 대한 stagger 효과
            },
        },
        hidden: { opacity: 0, y: -20 },
        exit: { opacity: 0, y: 20 },
    };
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const socket = (res) => {
        const { token } = useAuthStore.getState();
        console.log(res)
        const client = new Client({
            brokerURL: `ws://i10e108.p.ssafy.io/ws?accessToken=${token}`,

            // 여기에 다른 설정도 추가할 수 있습니다.
            onConnect: (frame) => {
                console.log('Connected: ' + frame);

                client.subscribe(`/topic/user/${token}`, (message) => {
                    console.log(message.body)

                    setUserId((prev) => {
                        const updatedHistory = message.body
                        // console.log(updatedHistory);
                        return updatedHistory;
                    })
                });

                client.subscribe(`/topic/chatroom/${res}`, (message) => {
                    console.log('Received message: ' + message.body);
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
    const showReceivedMessage = (message) => {
        try {
            // console.log(message)

            const jsonData = JSON.parse(message);
            console.log(jsonData);

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
        const { token } = useAuthStore.getState();
        if (userinput && stompClientRef.current.active) {
            // console.log('메시지 보낸다');
            stompClientRef.current.publish({
                destination: `/app/chat/${chatRoom}`,
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
                                {userId && talkHistory && talkHistory.map((items, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            alignSelf: userId !== items.senderId ? "flex-start" : "flex-end",
                                            maxWidth: "70%",
                                            margin: "5px",
                                            padding: "10px",
                                            background: userId !== items.senderId ? "#e6e6e6" : "#4caf50",
                                            borderRadius: "10px",
                                            color: userId !== items.senderId ? "#000" : "#fff",
                                        }}
                                    >
                                        {items.content}
                                    </div>
                                ))}

                                <form className='d-flex justify-content-around' onSubmit={(e) => { e.preventDefault(); sendMessage(); setuserinput(''); }}>
                                    <input value={userinput} className='col-10 border bg-white shadow-lg rounded-3' type='text' onChange={handleinput} />
                                    <button type="submit" className='btn btn-primary rounded-4'><img src='./Paper_Plane.png' /></button>
                                </form>

                                <div>

                                </div>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='rounded-3 mx-5 p-2 d-flex justify-content-around text-center align-items-center position-relative' style={{ border: '1px solid #006EEE', minHeight: '6rem' }}>
                <h5 className="m-0 col-md-2">{date}</h5>
                <h5 className="m-0 col-md-2">{orderName}</h5>
                <h5 className="m-0 col-md-2">{orderNumber}</h5>
                <div className="m-0 col-md-2">
                    <StatusChange status={status} />
                </div>
                <div className="col-md-2 ">
                    <motion.button
                        type="button"
                        onClick={toggleDropdown}
                        whileHover={{ scale: 1.2 }}
                        style={{ border: 'none', background: 'none', padding: 0 }}
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }} // 이미지가 180도 회전하도록 설정
                        transition={{ duration: 0.3 }}
                    >
                        <img src='/Polygon 3.png' alt='dropdown-icon' />
                    </motion.button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                className="position-absolute top-100 start-0 bg-white rounded-3 shadow p-2 d-flex flex-column gap-3"
                                style={{ zIndex: 1, width: '100%' }}
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                            >
                                {list.map((data, index) => (
                                    <motion.div

                                        className='shadow'
                                        style={{ backgroundColor: "white" }}
                                        key={data.companyName}
                                        variants={{ visible: { opacity: 1, y: 0 } }} initial={{ opacity: 0, y: -20 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <DropDown
                                            setOpenRecommendModal={setOpenRecommendModal}
                                            setChoiceCompanyId={setChoiceCompanyId}
                                            isAll={isAll}
                                            setRequestList={setRequestList}
                                            mappingId={data.mappingId}
                                            setChatRoom={setChatRoom}
                                            companyId={data.companyId}
                                            toggleModal={toggleModal}
                                            requestList={requestList}
                                            companyName={data.companyName}
                                            price={data.price}
                                            text={data.detail}
                                            status={data.codeSmallId}
                                            img={data.imageUrl}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>  </>
    );

}
