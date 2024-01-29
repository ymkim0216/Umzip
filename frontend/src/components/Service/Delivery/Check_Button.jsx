import { AnimatePresence, motion } from "framer-motion"
export default function CheckButton({ name, checkPacking ,isActive}) {
    return <>
    <AnimatePresence>
    {isActive ? <motion.button
            onClick={checkPacking}
            animate={{ opacity: 1 }} initial={{ opacity: 0.5 }} exit={{ opacity: 0.5 }}
            whileHover={{ y:-5 }}
            className="shadow bg-primary rounded-4 text-white"
            style={{ width: "100%", borderColor: "#1042C0", borderWidth: "2px", borderStyle: "solid" }}
        >
            {name}
        </motion.button> : <motion.button
            onClick={checkPacking}
            animate={{ opacity: 1 }} initial={{ opacity: 0.5 }} exit={{ opacity: 0.5 }}
            whileHover={{ y:-5}}
            className="shadow bg-white rounded-4 "
            style={{ width: "100%", borderColor: "#1042C0", color: "#1042C0", borderWidth: "2px", borderStyle: "solid" }}
        >
            {name}
        </motion.button>}
        </AnimatePresence>
    </>

}