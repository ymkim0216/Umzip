
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
export default function HelpPeopleToMeProfile({ createDt, codeSmallName, id, writerName, title, point }) {
    const [timeDifference, setTimeDifference] = useState('');
    useEffect(() => {
        const createDtObject = new Date(createDt);
        const currentDtObject = new Date();

        // 두 날짜 간의 차이를 밀리초로 계산
        const timeDiffInMs = currentDtObject - createDtObject;

        // 밀리초를 시간으로 변환
        const timeDiffInHours = timeDiffInMs / (1000 * 60 * 60);

        // 시간 차이에 따라 메시지 설정
        if (timeDiffInHours < 24) {
            setTimeDifference(`${Math.round(timeDiffInHours)}시간 전`);
        } else {
            // 두 자리 수로 만들기 위한 함수
            const twoDigits = (num) => (num < 10 ? `0${num}` : num);

            // 날짜 및 시간 포맷팅
            const formattedDate = `${createDtObject.getFullYear()}-${twoDigits(createDtObject.getMonth() + 1)}-${twoDigits(createDtObject.getDate())}`;
            setTimeDifference(formattedDate);
        }
    }, [createDt]);s


    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/helpdetail/${id}`)
    }
    let statuscolor = ""
    if (codeSmallName === "도와주세요") { statuscolor = "green" }
    else { statuscolor = "red" }

    return <>
        <motion.div
            onClick={handleClick}
            whileHover={{ y: -5, cursor: "pointer" }}
            className="d-flex p-2 rounded-4 shadow align-items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ width: "100%" }} className="p-2" >
                <div className="d-flex gap-2 justify-content-between" >

                    <div className="d-flex gap-1 m-0">
                        <h5 className="m-0">{title}</h5>
                        <h5 className="m-0" style={{ color: statuscolor }} >[{codeSmallName}]</h5>

                    </div>
                    <h5  >{writerName}</h5>
                </div>
                <div className="d-flex justify-content-between">
                    <h5 className="m-0" style={{ fontSize: "1rem" }}>{point}P</h5>
                    <h5 className="m-0" style={{ fontSize: "1rem" }}>{timeDifference}</h5>
                </div>
            </div>
        </motion.div >
    </>
}