import { Button } from "react-bootstrap";
import StarRating from "../../Recommend/StarRating";


export default function UserProfile() {
    return <>
        <div className="d-flex col-8 gap-5 ">
            <div className="d-flex col-4 justify-content-center flex-column align-items-center rounded-5 gap-3 shadow">
                <img style={{ width: "13rem", height: "13rem" }} src="./randomimg.png" />
                <div className="text-center">
                    <p className="m-0 fw-bold">OOO님</p>
                    <p className="m-0">반가워요 !</p>
                </div>
                <div className="d-flex gap-2">
                    <p className="text-muted m-0" style={{ fontSize: "0.75rem" }}>회원탈퇴</p>
                    <p className="text-muted m-0" style={{ fontSize: "0.75rem" }}>정보수정</p>
                </div>
                <div className="d-flex flex-column" style={{width:"80%"}}>
                    <div className="d-flex justify-content-between">
                        <p>이메일 : </p>
                        <p >we0620@naver.com</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="m-0">보유포인트 : </p>
                        <p className="m-0">3950P</p>
                    </div>
                    <p className="mb-0 text-muted" style={{ fontSize: "0.75rem", marginLeft: "auto" }}>내역조회</p>
                </div>

                <div className="d-flex justify-content-center gap-3" style={{ width: "100%" }}>
                    <div className="d-flex align-items-center justify-content-center border border-primary rounded-5 bg-white col-2 text-center shadow-lg" style={{ height: "2rem" }}>
                        <p className="m-0">asdf</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center border border-primary rounded-5 bg-white col-2 text-center shadow-lg" style={{ height: "2rem" }}>
                        <p className="m-0">asdf</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center border border-primary rounded-5 bg-white col-2 text-center shadow-lg" style={{ height: "2rem" }}>
                        <p className="m-0">asdf</p>
                    </div>
                </div>
                <h4 className="m-0">나의 평점 : 3.8점</h4>
                <StarRating rating={3.8} />

            </div>
            <div className="d-flex col-8 flex-column  p-3">

                <div className="d-flex col-12 flex-column p-3 gap-3">
                    <h4 className="fw-bold">My Page</h4>
                    <div className="d-flex flex-column gap-3 shadow rounded-3 p-3">
                        <div style={{ borderBottom: "solid #006EEE 1px" }}>
                            <h5>중고</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>판매 물품</h5>
                            <button>asdf</button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>판매 물품</h5>
                            <button>asdf</button>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-1 shadow rounded-3 p-3">
                        <div style={{ borderBottom: "solid #006EEE 1px" }}>
                            <h5>도움</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>도움 구인</h5>
                            <button>asdf</button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>도움 내역</h5>
                            <button>asdf</button>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-1 shadow rounded-3 p-3">
                        <div style={{ borderBottom: "solid #006EEE 1px" }}>
                            <h5>활동 이력</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>알림 내역</h5>
                            <button>asdf</button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>포인트 사용 이력</h5>
                            <button>asdf</button>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-1 shadow rounded-3 p-3">
                        <div style={{ borderBottom: "solid #006EEE 1px" }}>
                            <h5>후기</h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>받은 후기</h5>
                            <button>asdf</button>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>보낸 후기</h5>
                            <button>asdf</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </>
}