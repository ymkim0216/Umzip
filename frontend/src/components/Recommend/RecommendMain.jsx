import React, { useState } from "react";
import RecommendPeople from "./RecommendPeople";
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom";
import "./RecommendMain.css"
import axios from "axios";


export default function RecommendMain() {
    const navigate = useNavigate()
    const itemsPerPage = 5;
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);
    const location = useLocation();
    const status = location.state.type
    // location.state에서 데이터를 추출합니다.

    const data = location.state.axios_data.result
    // console.log(location.state)
    // console.log(location.state.userInput)
    const userInput = location.state.userInput
    const [userChoice,setUserChoice] =useState([])
    const [isLoading, setIsLoading] = useState(false)
    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage);
    };
    const handlesubmit = () => {
        console.log(userChoice)
        if(status==="용달"){userChoice.map((item)=>axios_DEL_reservation(item.companyId) )}
        else{userChoice.map((item)=>axios_CLE_reservation(item.companyId) )}
        
        navigate("/dashboard")
    }
    const axios_DEL_reservation = async (memberId) => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg';
        setIsLoading(true)
        const delivery = {
            "carId": userInput.delivery.carId, // 실제 carId 값으로 교체 (긴 정수)
            "startTime": userInput.delivery.startTime, // 실제 시작 시간을 올바른 날짜 및 시간 형식으로 교체
            "endTime": userInput.delivery.endTime, // 실제 종료 시간을 올바른 날짜 및 시간 형식으로 교체
            "departure": userInput.delivery.departure, // 실제 출발지 값으로 교체 (문자열)
            "departureDetail": userInput.delivery.departureDetail, // 실제 출발지 상세정보 값으로 교체 (문자열)
            "destination": userInput.delivery.destination, // 실제 도착지 값으로 교체 (문자열)
            "destinationDetail": userInput.delivery.destinationDetail, // 실제 도착지 상세정보 값으로 교체 (문자열)
            "packaging": userInput.delivery.packaging, // 실제 값으로 교체 (부울)
            "move": userInput.delivery.move, // 실제 값으로 교체 (부울)
            "elevator": userInput.delivery.elevator, // 실제 값으로 교체 (부울)
            "parking": userInput.delivery.parking, // 실제 값으로 교체 (부울)
            "moveList": userInput.delivery.moveList, // 실제 이사 목록 값으로 교체 (문자열)
            "sigungu": userInput.delivery.sigungu // 실제 sigungu 값으로 교체 (긴 정수)
        }
        
        const price = userInput.price
        const companys = [{ "memberId": memberId }]
        const selectedFiles = userInput.imageFileList[0]
        const formData = new FormData()
        formData.append("delivery", new Blob([JSON.stringify(delivery)], { type: "application/json" }));
        formData.append("price", new Blob([JSON.stringify(price)], { type: "application/json" }));
        formData.append("companys", new Blob([JSON.stringify(companys)], { type: "application/json" }));

        // 이미지 파일들은 별도로 추가
        selectedFiles.forEach((fileObj, index) => {
            formData.append(`imageFileList[${index}]`, fileObj.file);
        });
        try {
            const response = await axios.post(
                'http://192.168.30.125:8080/api/delivery/user/reservation',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
    
            setIsLoading(false)
            console.log(response)
            return response
        } catch (error) {
            console.error(error);
            return error
        }
    }
    const axios_CLE_reservation = async (memberId) => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg';
        setIsLoading(true)
        const clean = {
            "carId": userInput.delivery.carId,
            "reservationTime": userInput.clean.reservationTime, // 실제 carId 값으로 교체 (긴 정수)
            "address": userInput.clean.reservationTime, // 실제 시작 시간을 올바른 날짜 및 시간 형식으로 교체
            "addressDetail": userInput.clean.reservationTime, // 실제 종료 시간을 올바른 날짜 및 시간 형식으로 교체
            "sigungu": userInput.clean.reservationTime, // 실제 출발지 값으로 교체 (문자열)
            "roomSize": userInput.clean.reservationTime,
            "roomCount": userInput.clean.reservationTime,
            "windowCount": userInput.clean.reservationTime,
            "balconyExistence": userInput.clean.balconyExistence,
            "duplex": userInput.clean.duplex,
            "mold": userInput.clean.mold,
            "externalWindow":userInput.clean.externalWindow,
            "houseSyndrome":userInput.clean.houseSyndrome,
            "removeSticker":userInput.clean.removeSticker
        }
        
        const price = userInput.price
        const companys = [{ "memberId": memberId }]
        const selectedFiles = userInput.imageFileList[0]
        const formData = new FormData()
        formData.append("clean", new Blob([JSON.stringify(clean)], { type: "application/json" }));
        formData.append("price", new Blob([JSON.stringify(price)], { type: "application/json" }));
        formData.append("companys", new Blob([JSON.stringify(companys)], { type: "application/json" }));

        // 이미지 파일들은 별도로 추가
        selectedFiles.forEach((fileObj, index) => {
            formData.append(`imageFileList[${index}]`, fileObj.file);
        });
        try {
            const response = await axios.post(
                'http://192.168.30.125:8080/api/clean/user/reservation',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );
    
            setIsLoading(false)
            console.log(response)
            return response
        } catch (error) {
            console.error(error);
            return error
        }
    }


    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.1, // 자식 요소들에 대한 stagger 효과
            },
        },
    };
    return (
        <div className="d-flex justify-content-center p-5 flex-column align-items-center gap-5 removescroll" >
            <div className="d-flex justify-content-center flex-column align-items-center col-md-8 gap-3" style={{ marginTop: "5rem" }}>
                <h3>이런 기사님은 어떠세요?</h3>
                <small className="form-text text-muted">
                    견적을 전달할 기사님들을 선택후 "견적 전달"을 눌러주세요.
                </small>
                <small className="form-text text-muted">
                    기사님의 프로필을 클릭하면 상세정보로 이동합니다
                </small>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    style={{ width: "100%" }}
                    className="d-flex flex-column gap-3"
                >
                    {DUMMY_DATA.slice(0, visibleItems).map((item, index) => (
                        <motion.div key={index} variants={{ visible: { opacity: 1, y: 0 } }} initial={{ opacity: 0, y: 20 }}>
                            <RecommendPeople userChoice={userChoice} setUserChoice={setUserChoice} companyId={item.companyId} tag={item.topTagList} name={item.ceo} rating={3.8} img={item.imageUrl} />
                        </motion.div>
                    ))}
                </motion.div>
                {visibleItems < DUMMY_DATA.length && (
                    <motion.button
                        type="button"
                        className="btn btn-light d-flex justify-content-center align-items-center gap-2 shadow"
                        onClick={handleLoadMore}
                        whileHover={{ y: -5 }} // Adjust the value based on your preference
                    >
                        <div className="d-flex align-items-center  justify-content-center rounded-circle bg-black text-white" style={{ width: "1rem", height: "1rem" }}>
                            +
                        </div>
                        <p className="m-0">더보기</p>
                    </motion.button>
                )}
                <button onClick={handlesubmit} className="btn btn-primary">견적 전달</button>
            </div>
        </div>
    );
}
