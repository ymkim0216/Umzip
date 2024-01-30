import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import BuyProfile from "./BuyProfile";
const DUMMY_DATA = [
    { title: "p1", price: 1, status: "판매중" },
    { title: "p2", price: 2, status: "판매중" },
    { title: "p3", price: 3, status: "판매완료" },
    { title: "p4", price: 4, status: "판매중" },
    { title: "p5", price: 5, status: "판매중" },
    { title: "p6", price: 6, status: "판매완료" },
    { title: "p8", price: 7, status: "판매완료" },
    { title: "p7", price: 8, status: "판매중" },
]
const ITEMS_PER_PAGE = 5;

export default function BuyView() {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = DUMMY_DATA.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return <>
        <div className="d-flex col-12 flex-column p-3 justify-content-between gap-3" style={{ height: "100%" }}>
            <div className="d-flex flex-column   " >
                <div className="mb-3" style={{ borderBottom: "1px solid " }}><h3>구매 물품</h3></div>
                <AnimatePresence mode="wait">
                    <motion.div  className="d-flex flex-column gap-4" >
                        {currentItems.map((item) => (
                            <BuyProfile key={item.title} title={item.title} price={item.price} status={item.status} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="pagination d-flex justify-content-center gap-3">
                {[...Array(Math.ceil(DUMMY_DATA.length / ITEMS_PER_PAGE))].map((_, index) => (
                    <motion.button whileHover={{ y: -5 }} className="btn btn-light" key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </motion.button>
                ))}
            </div>
        </div>
    </>
}