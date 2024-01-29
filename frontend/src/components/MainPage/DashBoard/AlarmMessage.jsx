import "./AlarmMessage.css"
import React from 'react';
import { motion } from 'framer-motion';

const AlarmMessage = ({message,status,date}) => {
  const containerVariants = {
    hidden: { opacity: 0, y:20 },
    visible: { opacity: 1, y:0 },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{y:-10}}
        variants={containerVariants}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#EAEBEE" }}
        className="shadow rounded-5 p-3 d-flex align-items-center gap-5 position-relative"
      >
        <img className="col-2" style={{ height: "3rem", width: "3rem" }} src="/randomimg.png" alt="Random Image" />
        <p className="m-0 col-7">{message}</p>
        <p className="m-0 col-2 text-end">{date}</p>
        {/* 빨간색 원 */}
        {status&& <motion.div
          className="red-circle"
        ></motion.div>}
      </motion.div>
    </>
  );
};

export default AlarmMessage;
