import { useEffect, useState } from "react";
import UsedProfile from "./UsedProfile";
import { AnimatePresence, motion } from "framer-motion"
import { api } from "../../../../services/api";
// const DUMMY_DATA = [
//     { title: "p1", price: 1, status: "판매중" },
//     { title: "p2", price: 2, status: "판매중" },
//     { title: "p3", price: 3, status: "판매완료" },
//     { title: "p4", price: 4, status: "판매중" },
//     { title: "p5", price: 5, status: "판매중" },
//     { title: "p6", price: 6, status: "판매완료" },
//     { title: "p8", price: 7, status: "판매완료" },
//     { title: "p7", price: 8, status: "판매중" },
// ]
const ITEMS_PER_PAGE = 5;
const MAX_DISPLAY_PAGES=5
export default function UsedView({ setSellList, sellList, sellTotalPages }) {
    const axios_SellList = async ( pageNumber ) => {
        console.log(pageNumber)
        try {
            const response = await api.get(
                `/trade-items/profiles/sell?memberId=16&page=${pageNumber}&size=5`,
                {
                    "memberId": 16,
                    "page": pageNumber,
                    "size": 5
                }
            );
            console.log(response.data.result)
            setSellList(response.data.result.content)
            return
        }
        catch (e) {

        }
    }
  
    
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState(sellList)
    // console.log(sellList)
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    // const currentItems = sellList.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        axios_SellList(pageNumber)
    };
    const startPage = Math.max(1, currentPage - Math.floor(MAX_DISPLAY_PAGES / 2));
    const endPage = Math.min(
        startPage + MAX_DISPLAY_PAGES - 1,
        Math.ceil(sellTotalPages / ITEMS_PER_PAGE)
    );
    const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    return <>
        {sellList &&
            <div className="d-flex col-12 flex-column p-3 justify-content-between gap-3" style={{ height: "100%" }}>
                <div className="d-flex flex-column   " >
                    <div className="mb-3" style={{ borderBottom: "1px solid " }}><h3>판매 물품</h3></div>
                    <AnimatePresence mode="wait">
                        <motion.div className="d-flex flex-column gap-4" >
                            {sellList.map((item, index) => (
                                <UsedProfile key={index} id={item.boardId} img={item.thumbnailPath}  title={item.title} price={item.price} status={item.codeSmallName} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="pagination d-flex justify-content-center gap-3">
                    <div className="pagination d-flex justify-content-center gap-3">
                        {pageButtons.map((pageNumber) => (
                            <motion.button
                                whileHover={{ y: -5 }}
                                className={`btn btn-light${pageNumber === currentPage ? ' active' : ''}`}
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                            >
                                {pageNumber}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        }
    </>
}