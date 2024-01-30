import {motion} from "framer-motion"
export default function BuyProfile({title,status,price}) {
    const getStatusColor = () => {
        return status === '판매완료' ? 'gray' : 'green';
      };
    return <>
        <motion.div className="d-flex p-2 rounded-4 shadow align-items-center gap-3"  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}> 
        <div className="d-flex gap-3">
                <img style={{width:"4rem" ,height:"4rem"}} src="./randomimg.png"/>
                <div>
                <div className="d-flex gap-2">
                    <h5>{title}</h5>
                    <h5 style={{color:getStatusColor()}} >[{status}]</h5>
                </div>
                <h5 style={{fontSize:"1rem"}}>{price}원</h5>
                </div>
            </div>
        </motion.div >
    </>
}