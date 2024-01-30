
import {motion} from "framer-motion"
export default function HelpMeTopeopleProfile({title,point}) {
    return <>
        <motion.div className="d-flex p-2 rounded-4 shadow align-items-center gap-3"  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}> 
            <div>
                <div className="d-flex gap-2">
                    <h5>{title}</h5>
                    <h5 style={{color:"green"}} >[도와줄게요]</h5>
                </div>
                <h5 style={{fontSize:"1rem"}}>{point}P</h5>
            </div>
        </motion.div >
    </>
}