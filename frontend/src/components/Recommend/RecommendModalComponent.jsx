import { useEffect, useState } from "react";
import Recommend from "../../pages/Service/Recommend";
import RecommendReview from "./RecommendReview";
import StarRating from "./StarRating";
import axios from "axios";
import { api } from "../../services/api";



export default function RecommendModalComponent({ companyId }) {
    const [serviceInfo, setServiceInfo] = useState(null)
    useEffect(() => {
        axios_detail()
    }, [])
    const axios_detail = async () => {


        try {
            const response = await api.get(`/company/${companyId}`, {
                headers: {
                }
            });
            console.log(response.data.result)
            setServiceInfo(response.data.result)
            return response
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
        { serviceInfo && <div className="modal-dialog modal-dialog-scrollable">
            <div className="p-3 mt-4 gap-2 d-flex flex-column align-items-center" style={{ width: "100%", borderBottom: "1px solid #888888" }} >
                <img style={{ width: "7rem", height: "7rem" }} src="/randomimg.png" alt="Random Image" />
                <h5 className="m-0">{serviceInfo.name}</h5>
                <div className="d-flex gap-2">
                    <StarRating rating={serviceInfo.averageScore} />
                    {serviceInfo.averageScore}
                </div>
                <div className="d-flex gap-3">
                    {serviceInfo.mostTag.map(tag => <div className="border border-primary rounded-5 bg-white text-center shadow" style={{ width: "9rem" }}>
                        {tag}
                    </div>)}

                </div>
            </div>
            <div style={{ width: "100%", borderBottom: "1px solid #888888", overflowY: "auto" }} className="p-4">
                <h5>기사님 소개글</h5>
                <div className="rounded-3 p-4 shadow" style={{ backgroundColor: "#EAEBEE" }}>
                    <h5 style={{ fontSize: "1rem", fontWeight: "bold" }}>98년 무사고 빠른 속도와 꼼꼼함으로 완벽한 이사를 돕겠습니다.</h5>
                    <p>{serviceInfo.introduction}</p>
                </div>
            </div>
            <div className="p-4 bg-white d-flex flex-column gap-3" >
                <h5>후기</h5>
                {serviceInfo.reviewList.map(data => <RecommendReview tag={data.tagList} img={data.writerProfileImage} name={data.writerName} rating={data.score} date={data.createDt} text={data.content} />)}


            </div>
        </div> }
        </>
    );
}
