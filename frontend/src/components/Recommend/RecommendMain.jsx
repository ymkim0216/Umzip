import React, { useState } from "react";
import RecommendPeople from "./RecommendPeople";
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom";
import  "./RecommendMain.css"
// const DUMMY_DATA = [
//     { name: "미친개", rating: 4.5 },
//     { name: "미친개가용달을", rating: 4.0 },
//     { name: "도지와 왈츠", rating: 3.5 },
//     { name: "비트코인", rating: 4.5 },
//     { name: "이더리움", rating: 4.5 },
//     { name: "미친개", rating: 4.5 },
//     { name: "미친개가용달을", rating: 4.0 },
//     { name: "도지와 왈츠", rating: 3.5 },
//     { name: "비트코인", rating: 4.5 },
//     { name: "이더리움", rating: 4.5 },
//     { name: "미친개", rating: 4.5 },
//     { name: "미친개가용달을", rating: 4.0 },
//     { name: "도지와 왈츠", rating: 3.5 },
//     { name: "비트코인", rating: 4.5 },
//     { name: "이더리움", rating: 4.5 },
//     { name: "미친개", rating: 4.5 },
// ];

export default function RecommendMain() {
    const navigate = useNavigate()
    const itemsPerPage = 5;
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);
    const location = useLocation();
  
    // location.state에서 데이터를 추출합니다.
    const data = location.state
    console.log(data)
    console.log(data)
    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage);
    };
    const handlesubmit =()=>{
        navigate("/dashboard")
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
            <div className="d-flex justify-content-center flex-column align-items-center col-md-8 gap-3" style={{marginTop:"5rem"}}>
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
                    {data && data.map((item, index) => (
                        <motion.div key={index} variants={{ visible: { opacity: 1, y: 0 } }} initial={{ opacity: 0, y: 20 }}>
                            <RecommendPeople companyId={item.companyId} tag={item.topTagList} name={item.ceo} rating={3.8}  img={item.imageUrl}/>
                        </motion.div>
                    ))}
                </motion.div>
                {visibleItems < data.length && (
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
