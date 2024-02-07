
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
export default function HelpPeopleToMeProfile({ codeSmallName,id, writerName, title, point }) {
    const navigate =useNavigate()
    const handleClick = () => {
        navigate(`/helpdetail/${id}`)
    }
    return <>
        <motion.div
        onClick={handleClick}
            whileHover={{ y: -5 ,cursor:"pointer"}}
            className="d-flex p-2 rounded-4 shadow align-items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ width: "100%" }} className="p-2" >
                <div className="d-flex gap-2 justify-content-between" >

                    <div className="d-flex gap-1 m-0">
                        <h5 className="m-0">{title}</h5>
                        <h5 className="m-0"  style={{color:"blue"}}>[{codeSmallName}]</h5>
                    </div>
                    <h5  >{writerName}</h5>
                </div>
                <h5  className="m-0" style={{ fontSize: "1rem" }}>{point}P</h5>
            </div>
        </motion.div >
    </>
}