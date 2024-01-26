import React, { useState } from "react";
import RecommendPeople from "./RecommendPeople";
import { motion } from "framer-motion"
const DUMMY_DATA = [
    { name: "미친개", rating: 4.5 },
    { name: "미친개가용달을", rating: 4.0 },
    { name: "도지와 왈츠", rating: 3.5 },
    { name: "비트코인", rating: 4.5 },
    { name: "이더리움", rating: 4.5 },
    { name: "미친개", rating: 4.5 },
    { name: "미친개가용달을", rating: 4.0 },
    { name: "도지와 왈츠", rating: 3.5 },
    { name: "비트코인", rating: 4.5 },
    { name: "이더리움", rating: 4.5 },
    { name: "미친개", rating: 4.5 },
    { name: "미친개가용달을", rating: 4.0 },
    { name: "도지와 왈츠", rating: 3.5 },
    { name: "비트코인", rating: 4.5 },
    { name: "이더리움", rating: 4.5 },
    { name: "미친개", rating: 4.5 },
];

export default function RecommendMain() {
    const itemsPerPage = 5;
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage);
    };

    const containerVariants = {
        visible: {
          transition: {
            staggerChildren: 0.1, // 자식 요소들에 대한 stagger 효과
          },
        },
      };
    return (
        <div className="d-flex justify-content-center p-5 flex-column align-items-center gap-5 " >
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
                    {DUMMY_DATA.slice(0, visibleItems).map((item, index) => (
                        <motion.div key={index} variants={{ visible: { opacity: 1, y: 0 } }} initial={{ opacity: 0, y: 20 }}>
                            <RecommendPeople name={item.name} rating={item.rating} />
                        </motion.div>
                    ))}
                </motion.div>
                {visibleItems < DUMMY_DATA.length && (
                    <motion.button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLoadMore}
                    whileHover={{ y: -5 }} // Adjust the value based on your preference
                  >
                    더 보기
                  </motion.button>
                )}
            </div>
        </div>
    );
}
