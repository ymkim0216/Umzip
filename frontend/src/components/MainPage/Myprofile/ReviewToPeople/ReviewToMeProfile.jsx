import { motion } from "framer-motion"
import StarRating from "../../../Recommend/StarRating"
export default function ReviewToPeopleProfile({ name, rating, review }) {
    return <>
        <motion.div className="d-flex p-2 rounded-4 shadow align-items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{width:"100%"}}>
            <div className="p-2 d-flex flex-column gap-3 " style={{ width: "100%" }}>
            <div className="d-flex" style={{ width: "100%" }}>
                <img style={{ width: "4rem", height: "4rem",marginRight:"1rem" }} src="./randomimg.png" />
                <div style={{ width: "100%" }} className="d-flex flex-column gap-3">
                    <div className="d-flex  " style={{ width: "100%" }}>
                        <StarRating rating={rating} />
                        {rating}점
                    </div>
                    <div style={{ width: "100%" }} className="d-flex gap-3">
                        <div className="d-flex border border-primary rounded-5 col-3 bg-white align-items-center justify-content-center " style={{ fontSize: "0.8rem" }}>
                            asdf
                        </div>
                        <div className="d-flex border border-primary rounded-5 col-3 bg-white align-items-center justify-content-center " style={{ fontSize: "0.8rem"}}>
                            asdf
                        </div>
                        <div className="d-flex border border-primary rounded-5 col-3 bg-white align-items-center justify-content-center " style={{ fontSize: "0.8rem"}}>
                            asdf
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-12  p-2 rounded-3" style={{backgroundColor:"#ECECEC"}}>
                {review}
            </div>
            </div>
        </motion.div >
    </>
}