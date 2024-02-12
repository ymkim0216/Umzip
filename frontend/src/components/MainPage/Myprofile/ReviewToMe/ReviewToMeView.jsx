import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion"
import ReviewToMeProfile from "./ReviewToMeProfile";
// const DUMMY_DATA = [
//     { name: "p1", rating: 3.5,review:"이" },
//     { name: "p2", rating: 4.8,review:"놈" },
//     { name: "p3", rating: 5,review:"의" },
//     { name: "p4", rating: 4.5,review:"미" },
//     { name: "p5", rating: 1,review:"친" },
//     { name: "p6", rating: 1.3,review:"개" },
//     { name: "p8", rating: 2.5,review:"최대글 길이 확인용 확인용 확인용" },
//     { name: "p7", rating: 3,review:"최대글 길이 확인용 확인용 확인용" },
// ]
const ITEMS_PER_PAGE = 5;

export default function ReviewToMeView({id,setReviewToMeList,reviewToMeList,reviewToMeTotalPages}) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    // const currentItems = reviewToMeList.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return <>{ reviewToMeList&&
        <div className="d-flex col-12 flex-column p-3 justify-content-between gap-3" style={{ height: "100%" }}>
            <div className="d-flex flex-column   " >
                <div className="mb-3" style={{ borderBottom: "1px solid " }}><h3>받은 후기</h3></div>
                <AnimatePresence mode="wait">
                    <motion.div  className="d-flex flex-column gap-4" >
                        {reviewToMeList.map((item) => (
                            <ReviewToMeProfile createDt={item.createDt} img={item.memberImageUrl} id={item.id} tag={item.tag}  key={item.id} name={item.memberName} rating={item.score} review={item.content} />
                        ))}
                        {reviewToMeList.length===0 && <div className="d-flex gap-3 justify-content-center align-items-center mt-5"><p className="m-0">아직 리뷰글이 없습니다!</p><img style={{width:"3rem",height:"3rem"}} src="/free-animated-icon-note-6172546.gif"/></div>}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="pagination d-flex justify-content-center gap-3">
                {[...Array(Math.ceil(reviewToMeList.length / ITEMS_PER_PAGE))].map((_, index) => (
                    <motion.button whileHover={{ y: -5 }} className="btn btn-light" key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </motion.button>
                ))}
            </div>
        </div>
    }</>
}