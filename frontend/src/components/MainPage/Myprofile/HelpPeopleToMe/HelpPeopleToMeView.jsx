
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import HelpPeopleToMeProfile from "./HelpPeopleToMeProfile";
import { api } from "../../../../services/api";

const ITEMS_PER_PAGE = 5;
const MAX_DISPLAY_PAGES=5
export default function ({id, setHelpMeList, helpMeList, helpMeTotalPages }) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    // const currentItems = DUMMY_DATA.slice(indexOfFirstItem, indexOfLastItem);
    const axios_HelpMe = async (pageNumber) => {

        try {
            const response = await api.get(
                `/helps/profiles/help-me?memberId=${id}&page=${pageNumber}&size=5`,

            );
            console.log(response.data.result)
            setHelpMeList(response.data.result.content)

            return response
        }
        catch (e) {

        }
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        axios_HelpMe(pageNumber)
    }

    const startPage = Math.max(1, currentPage - Math.floor(MAX_DISPLAY_PAGES / 2));
    const endPage = Math.min(
        startPage + MAX_DISPLAY_PAGES - 1,
        Math.ceil(helpMeTotalPages / ITEMS_PER_PAGE)
    );
    const pageButtons = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    return <>
        <div className="d-flex col-12 flex-column p-3 justify-content-between gap-3" style={{ height: "100%" }}>
            <div className="d-flex flex-column   " >
                <div className="mb-3" style={{ borderBottom: "1px solid " }}><h3>도움 구인</h3></div>
                <AnimatePresence mode="wait">
                    <motion.div className="d-flex flex-column gap-4" >
                        {helpMeList.map((item, index) => (
                            <HelpPeopleToMeProfile key={index} id={item.boardId} writerName={item.writerName} codeSmallName={item.codeSmallName} title={item.title} point={item.point} />
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
    </>
}