import Recommend from "../../pages/Service/Recommend";
import RecommendReview from "./RecommendReview";
import StarRating from "./StarRating";
import axios from "axios";


export default function RecommendModalComponent() {

        axios_detail()
    }, [])
    const axios_detail = async () => {
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3QxMjM0Iiwicm9sZSI6IlVTRVIiLCJpZCI6NCwic2lndW5ndSI6MTAwLCJpYXQiOjE3MDY3NDc2NzYsImV4cCI6MTcwNzE3OTY3Nn0.0UtQe8QKEO6KriOAAGD5iJTkmyWIqM0WCCpslvOJWLg';

        try {
            const response = await axios.get(`http://192.168.30.145:8080/api/company/${companyId}`, {
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
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="p-3 mt-4 gap-2 d-flex flex-column align-items-center" style={{ width: "100%", borderBottom: "1px solid #888888" }} >
                <img style={{ width: "7rem", height: "7rem" }} src="/randomimg.png" alt="Random Image" />
                <h5 className="m-0">김씨 용달</h5>
                <div className="d-flex gap-2">
                    <StarRating rating={3.0} />
                    3.0
                </div>
                <div className="d-flex gap-3">
                    <div className="border border-primary rounded-5 bg-white text-center shadow" style={{ width: "9rem" }}>
                        꼼꼼데스
                    </div>
                    <div className="border border-primary rounded-5 bg-white text-center shadow" style={{ width: "9rem" }}>
                        빠른데스
                    </div>
                    <div className="border border-primary rounded-5 bg-white text-center shadow" style={{ width: "9rem" }}>
                        난폭데스
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", borderBottom: "1px solid #888888", overflowY: "auto" }} className="p-4">
                <h5>기사님 소개글</h5>
                <div className="rounded-3 p-4 shadow" style={{ backgroundColor: "#EAEBEE" }}>
                    <h5 style={{ fontSize: "1rem", fontWeight: "bold" }}>98년 무사고 빠른 속도와 꼼꼼함으로 완벽한 이사를 돕겠습니다.</h5>
                    <p>Can you feel my heartbeat
                        Heartbeat, beat, beat, beat, beatHeartbeat니가 짓밟고 떠난 심장이 (beat, beat, beat, beat)아직도 뛰고 있어 (뛰고 있어)그것도 (그것도) 너를 향해 (너를 향해)
                        잊으려고 아무리 노력해봐도새로운 사람들을 아무리 만나봐도계속 다시 또 다시 돌아서면 왜 니 생각만 나는지안 할래 그만할래아무리 내 자신을 달래고 또 달래 봐도아무 소용이 없어 내 심장이 고장나 버렸어 왜
                        왜 아직도 나는 이런 바보 같은 짓을 하는지머리론 알겠는데 가슴은 왜 지 맘대론지너를 잡고 놓지를 못해 지금도 니가 나의 곁에있는 것 같애 이별을 믿지 못해
                        누굴 만나도 마음 속 한곳은 열지 못하고 계속 니 자릴 비워놔올 리가 없는데 올지도 모른다고 왜 믿는지 가슴이 왜 말을 안 듣니
                        Listen to my heartbeat (it's beating for you)Listen to my heartbeat (it's waiting for you)</p>
                </div>
            </div>
            <div className="p-4 bg-white d-flex flex-column gap-3" >
                <h5>후기</h5>
                {DUMMY_DATA.map(data=> <RecommendReview name={data.name} rating={data.rating} date={data.date} text={data.text}/>)}
                

            </div>
        </div>
    );
}
