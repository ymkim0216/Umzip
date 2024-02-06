import axios from "axios";
import { useScroll } from "framer-motion";
import { useState } from "react";
import { api } from "../../../services/api";

export default function StatusButton({ isAll, setRequestList, mappingId, setChatRoom, companyId, toggleModal, status, requestList }) {
    let returnButton = null
    const [statuschange, setStatusChange] = useState(false)
    const handleClick = async () => {
        const res = await MakeRoom()
        toggleModal(res)

    }

    const renewer = async () => {
        if (isAll === true) {
            try {
                const response = await api.get('/dashboard', {});
                setRequestList(response.data.result);
            } catch (error) {
                console.error(error);
            }
        }
        else {
            if (requestList === "용달") {
                try {
                    const response = await api.get('/delivery/user/reservation', {});
                    setRequestList(response.data.result);
                } catch (error) {
                    console.error(error);
                }
            }
            else {
                try {
                    const response = await api.get('/clean/user/reservation', {});
                    setRequestList(response.data.result);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }


    const handlecancle = async () => {
        let service = ""
        if (requestList === "용달") { service = "delivery" }
        else if (requestList === "청소") { service = "clean" }
        try {
            const response = await api.put(
                `/${service}/user/cancel`,
                // 요청 바디를 올바른 위치에 추가
                { "mappingId": mappingId },  // 만약 바디가 있다면 여기에 추가하세요.

            );
            renewer()
            return
        } catch (error) {
            console.error(error);
        }
    }
    const MakeRoom = async () => {

        let service = "";
        if (requestList === "용달") {
            service = "deliver";
        } else {
            service = "clean";
        }

        try {
            const response = await api.post(
                `/chat/${service}/${companyId}`,
                // 요청 바디를 올바른 위치에 추가
                {},  // 만약 바디가 있다면 여기에 추가하세요.
                {
                    headers: {

                    }
                }
            );
            setChatRoom(response.data.result)
            // console.log(response.data.result);
            return response.data.result
        } catch (error) {
            console.error(error);
        }
    };
    const newStatus = status % 100
    if (newStatus === 1) {
        returnButton = <>
            <button type="button" style={{ width: "80%" }} className="btn btn-primary btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" onClick={handleClick}  ><p className="m-0">1대1채팅 </p> <img style={{ width: 20, height: 20 }} src="/chat-dots.png" ></img></button>
            <button type="button" style={{ width: "80%" }} className="btn btn-danger btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" onClick={handlecancle}><p className="m-0">취소하기  </p> <img style={{ width: 20, height: 20 }} src="/Close_MD.png" ></img></button>  </>
    }
    else if (newStatus === 2) {
        returnButton = <>
            <button type="button" style={{ width: "80%" }} className="btn btn-success btn-sm d-flex px-3 gap-2 justify-content-center align-items-center"><p className="m-0">예약하기  </p> <img style={{ width: 20, height: 20 }} src="/Done_fill.png" ></img></button>
            <button type="button" style={{ width: "80%" }} className="btn btn-primary btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" onClick={handleClick}  ><p className="m-0">1대1채팅 </p> <img style={{ width: 20, height: 20 }} src="/chat-dots.png" ></img></button>
            <button type="button" style={{ width: "80%" }} className="btn btn-danger btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" onClick={handlecancle}><p className="m-0">취소하기  </p> <img style={{ width: 20, height: 20 }} src="/Close_MD.png" ></img></button>  </>

    }
    else if (newStatus === 3) {
        returnButton = <>
            <button style={{ width: "80%" }} type="button" className="btn btn-success btn-sm d-flex px-3 gap-2 justify-content-center align-items-center"><p className="m-0">영수중보기  </p> <img style={{ width: 20, height: 20 }} src="/File_Document.png" ></img></button>
            <button style={{ width: "80%" }} type="button" className="btn btn-primary btn-sm d-flex px-3 gap-2 justify-content-center align-items-center" onClick={handleClick}  ><p className="m-0">1대1채팅 </p> <img style={{ width: 20, height: 20 }} src="/chat-dots.png" ></img></button> </>
    }
    else if (newStatus === 4) {
        returnButton =
            <button style={{ visibility: 'hidden', width: "85%" }} type="button" className="btn btn-success btn-sm d-flex px-3 gap-2  d-flex justify-content-center align-items-center"><p className="m-0">영수중보기</p> <img style={{ width: 20, height: 20 }} src="/File_Document.png" ></img></button>
    }
    else if (newStatus === 5) {
        returnButton = <>
            <button type="button" style={{ width: "80%" }} className="btn btn-success btn-sm d-flex px-3 justify-content-center gap-2 align-items-center"><p className="m-0">재작성  </p> <img style={{ width: 20, height: 20 }} src="/File_Edit.svg" ></img></button></>

    }
    else if (newStatus === 6) {
        returnButton = <>
            <button type="button" style={{ width: "80%" }} className="btn btn-light btn-sm d-flex px-3 justify-content-center gap-2 align-items-center"><p className="m-0">후기작성  </p> <img style={{ width: 20, height: 20 }} src="/File_Edit_black.png" ></img></button></>

    }

    return (<>
        {returnButton}

    </>)
}