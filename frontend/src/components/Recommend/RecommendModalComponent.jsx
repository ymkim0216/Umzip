import { useEffect, useState } from "react";
import Recommend from "../../pages/Service/Recommend";
import RecommendReview from "./RecommendReview";
import StarRating from "./StarRating";
import axios from "axios";
const DUMMY_DATA = [
    {
        name: "미친놈",
        date: "2024.01.01",
        rating: 5.0,
        text: "아오 이새끼 운전 개같이함"
    }, {
        name: "어허",
        date: "2024.01.02",
        rating: 4.5,
        text: "음해 ㄴ"
    }, {
        name: "진짜 또라인가",
        date: "2024.01.03",
        rating: 3.5,
        text: "아오 이새끼 운전 개같이함"
    }]

export default function RecommendModalComponent({ img,companyId }) {
    const [data, setData] = useState(null)
    useEffect(() => {

        axios_detail()
    }, [])
    const axios_detail = async () => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg';

        try {
            const response = await axios.get(`http://172.30.1.54:8080/api/company/${companyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.result)
            setData(response.data.result)
            return response
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            {data && <div className="modal-dialog modal-dialog-scrollable">
                <div className="p-3 mt-4 gap-2 d-flex flex-column align-items-center" style={{ width: "100%", borderBottom: "1px solid #888888" }} >
                    <img style={{ width: "7rem", height: "7rem" }} src={img} alt="Random Image" />
                    <h5 className="m-0">{data.name}</h5>
                    <div className="d-flex gap-2">
                        <StarRating rating={data.averageScore} />
                        {data.averageScore}
                    </div>
                    <div className="d-flex gap-3">
                        {data.mostTag.map((item, index) => <div key={index} className="border border-primary rounded-5 bg-white text-center shadow" style={{ width: "9rem" }}>
                            {item}
                        </div>)}

                    </div>
                </div>
                <div style={{ width: "100%", borderBottom: "1px solid #888888", overflowY: "auto" }} className="p-4">
                    <h5>기사님 소개글</h5>
                    <div className="rounded-3 p-4 shadow" style={{ backgroundColor: "#EAEBEE" }}>
                        {/* <h5 style={{ fontSize: "1rem", fontWeight: "bold" }}>98년 무사고 빠른 속도와 꼼꼼함으로 완벽한 이사를 돕겠습니다.</h5> */}
                        <p style={{ fontSize: "1rem"}}>{data.introduction}</p>
                    </div>
                </div>
                <div className="p-4 bg-white d-flex flex-column gap-3" >
                    <h5>후기</h5>
                    {data.reviewList.map(data=> <RecommendReview  key={data.reviewId} writerProfileImage={data.writerProfileImage} name={data.writerName} rating={data.score} date={data.createDt} text={data.content} tag={data.tagList}/>)}


                </div>
            </div>}
        </>
    );
}
