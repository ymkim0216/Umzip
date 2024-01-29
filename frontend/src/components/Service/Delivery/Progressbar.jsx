// ProgressBar.js

import React from 'react';
import './ProgressBar.css'; // CSS 파일을 import 젠킨스 수정
import { AnimatePresence, motion } from "framer-motion"
const ProgressBar = ({ steps, activeStep }) => {
    const progressBarWidth = (activeStep / steps) * 100 + '%';

    return (<>
        <div  className="progress-bar-container">
            <div className="progress-bar" style={{ width: progressBarWidth }} />
        </div>

        <motion.div >
            <AnimatePresence mode='wait'>
                {activeStep  === 1 && <motion.div key="1" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>1 .약속할 날짜를 정해주세요!</motion.div>}
                {activeStep === 2 && <motion.div key="2" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>2 .각종 세부사항을 정해주세요!</motion.div>}
                {activeStep === 3 && <motion.div key="3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>3 .저희가 계산한 결과입니다!</motion.div>}
            </AnimatePresence>
        </motion.div>
 
    </>
    );
};

export default ProgressBar;
