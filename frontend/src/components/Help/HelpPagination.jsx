import style from './HelpPagination.module.css'
import useStore from '../../store/helpData';
import {motion} from "framer-motion"
function HelpPagination() {
    const { data, page, setPage } = useStore(); // 현재 페이지와 페이지 변경 함수, 총 페이지 수를 가져옴
    const totalElements = data?.result?.totalElements || 1;
    console.log(totalElements)
    const pages = Array.from({ length: totalElements }, (_, i) => i + 1);

    return (
        <>
            <motion.div  initial={{opacity:0 ,y:10}} animate={{opacity:1, y:0}} exit={{opacity:0,y:10 }}  className='d-flex' style={{ width: "100%" }}>
                <div className="d-flex  gap-3">
                    {[...Array(Math.ceil(totalElements / 10))].map((_, index) => (
                        <motion.button whileHover={{ y: -5 }} className="btn btn-light" key={index} onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </>
    );
}

export default HelpPagination;
