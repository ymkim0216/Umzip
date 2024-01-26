import AlarmMessage from "./AlarmMessage";
const DUMMY_DATA =[
    { date: "24-01-19" , status:true , message:"김씨 용달 님께서 용달 제안서를 수락하셨습니다"},
    { date: "24-01-12" , status:true , message:"미친개 님께서 용달 제안서를 수락하셨습니다"},
    { date: "24-01-13" , status:false , message:"잡놈 님께서 용달 제안서를 수락하셨습니다"},
    { date: "3시간전" , status:true , message:"니짐 내꺼 님께서 용달 제안서를 수락하셨습니다"},
]
export default function AlarmComponent() {
    return (
      <>
        <div className="col-12 d-flex justify-content-center " style={{ marginTop: "10rem" }}>
          <div className="col-6 justify-content-center align-items-center">
            <p className="fw-bold">OOO 님이 받은 알람</p>
            <div className="d-flex flex-column gap-3">
              {DUMMY_DATA.map(data=> <AlarmMessage date={data.date} message={data.message} status={data.status} />)}
            </div>
          </div>
        </div>
      </>
    );
  }
  