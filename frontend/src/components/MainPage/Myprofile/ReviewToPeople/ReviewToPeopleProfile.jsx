import { motion, useScroll } from "framer-motion"
import StarRating from "../../../Recommend/StarRating"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ReviewToPeopleProfile({ createDt, img, id, tag, name, rating, review }) {
    // console.log(createDt)
    const navigate=useNavigate()
    const [time, setTime] = useState(null)
    useEffect(() => {
        const newcreateDt = new Date(createDt);
        const currentDate = new Date();

        // 현재 시간과 createDt 간의 차이 계산 (밀리초로 반환됨)
        const timeDifference = currentDate - newcreateDt;

        // 24시간 이내의 경우, 시간 차이를 계산하여 "X시간 전"으로 표시
        if (timeDifference < 24 * 60 * 60 * 1000) {
            const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
            setTime(`${hoursAgo}시간전`)
        } else {
            // 24시간 이후의 경우, 날짜 형식으로 표시
            const formattedDate = newcreateDt.toISOString().split("T")[0];
            setTime(formattedDate)
        }
    }, [id])
    // const handleClick =()=>{
    //     navigate(`/myprofile/${id}`)
    // }
    return <>
        <motion.div whileHover={{y:-5}}  className="d-flex p-2 rounded-4 shadow align-items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: "100%" }}>
            <div className="p-2 d-flex flex-column gap-3 " style={{ width: "100%" }}>
                <div className="d-flex" style={{ width: "100%" }}>
                    <div className="d-flex flex-column align-items-center" style={{marginRight:"1rem"}} >
                        <img className="rounded-pill" style={{ width: "4rem", height: "4rem" }} src={img} />
                        <p className="m-0 fw-bold" style={{fontSize:"0.75rem"}}>{name}</p>
                    </div>
                    <div style={{ width: "100%" }} className="d-flex flex-column  justify-content-around">
                        <div className="d-flex  justify-content-between" style={{ width: "100%" }}>

                            <div className="d-flex gap-3 col-6 ">

                                <StarRating rating={rating} />
                                {rating}점
                            </div>
                            <div className="col-6 d-flex" ><p  style={{marginLeft:"auto",marginBottom:"0"}}>{time}</p></div>

                        </div>
                        <div style={{ width: "100%", height: "2rem" }} className="d-flex gap-3  ">
                            {tag.map((item, index) => <div key={index} className="d-flex border border-primary rounded-5 col-3 bg-white align-items-center justify-content-center " style={{ fontSize: "0.75rem" }}>
                                {item}
                            </div>)}
                        </div>
                    </div>

                </div>
                <div className="col-12  p-2 rounded-3" style={{ backgroundColor: "#ECECEC" }}>
                    {review}
                </div>
            </div>
        </motion.div >
    </>
}