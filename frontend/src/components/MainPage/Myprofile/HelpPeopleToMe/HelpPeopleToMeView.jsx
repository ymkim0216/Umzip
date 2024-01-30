
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import HelpPeopleToMeProfile from "./HelpPeopleToMeProfile";
const DUMMY_DATA = [
    { title: "p1", point: 1,},
    { title: "p2", point: 2,},
    { title: "p3", point: 3,},
    { title: "p4", point: 4,},
    { title: "p5", point: 5,},
    { title: "p6", point: 6,},
    { title: "p8", point: 7,},
    { title: "p7", point: 8,},
    { title: "p9", point: 1,},
    { title: "p10", point: 2,},
    { title: "p11", point: 3,},
    { title: "p12", point: 4,},
    { title: "p13", point: 5,},
    { title: "p14", point: 6,},
    { title: "p15", point: 7,},
    { title: "p16", point: 8,},
]
const ITEMS_PER_PAGE = 5;

export default function     () {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = DUMMY_DATA.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return <>
        <div className="d-flex col-12 flex-column p-3 justify-content-between gap-3" style={{ height: "100%" }}>
            <div className="d-flex flex-column   " >
                <div className="mb-3" style={{ borderBottom: "1px solid " }}><h3>도움 구인</h3></div>
                <AnimatePresence mode="wait">
                    <motion.div  className="d-flex flex-column gap-4" >
                        {currentItems.map((item) => (
                            <HelpPeopleToMeProfile key={item.title} title={item.title} point={item.point} />
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