import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarRating from "./StarRating";
import RecommendModal from "./RecommendModal";

export default function RecommendPeople({userChoice,setUserChoice,companyId, name, rating, tag ,img}) {
    const [imageSrc, setImageSrc] = useState("/truck.png");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = () => {
        setIsModalOpen((prev) => !prev)
    }
    const handleClick = () => {
        // 클릭 시 이미지 소스 변경
        setImageSrc((prevSrc) =>
            prevSrc === "/truck.png" ? "/checked_truck.png" : "/truck.png"
        );
    
        // /userChoice 배열 안에 companyId가 있는지 확인
        const isCompanySelected = userChoice.some((choice) => choice.companyId === companyId);
    
        // 만약 있다면 제거하고, 없다면 추가
        setUserChoice((prevChoices) => {
            if (isCompanySelected) {
                // 이미 선택된 기업이면 제거
                return prevChoices.filter((choice) => choice.companyId !== companyId);
            } else {
                // 선택되지 않은 기업이면 추가
                return [...prevChoices, { companyId }];
            }
        });
    };
    return (
        <>
            <RecommendModal img={img} companyId={companyId} isOpen={isModalOpen} closeModal={handleModal} />
            <motion.div
                style={{ backgroundColor: "#F4F9FF", width: "100%" }}
                className="rounded-4 d-flex  p-3 shadow postion-relative"
                initial={{ opacity: 0 }} // 초기 상태
                animate={{ opacity: 1 }} // 애니메이션 상태
                transition={{ duration: 0.5 }} // 트랜지션 지속 시간
            >
                <div className="d-flex flex-column justify-content-center  align-items-center gap-2 col-md-2">
                    <motion.img
                        className="rounded-pill shadow"
                        src={img}
                        style={{ height: "6rem", width: "6rem" }}
                        alt="Random Image"
                        whileHover={{ scale: 1.1, cursor: "pointer" }}
                        initial={{ opacity: 0 }} // 초기 상태
                        animate={{ opacity: 1 }} // 애니메이션 상태
                        transition={{ duration: 0.5 }} // 트랜지션 지속 시간
                        onClick={handleModal}
                    />
                    <button type="button" className="btn btn-outline-primary">
                        1대1채팅
                    </button>
                </div>
                <div className="d-flex col-md-8 flex-column justify-content-center gap-3">
                    <div className="gap-3 d-flex justify-content-center">
                        <h5 className="m-0  col-md-3 fw-bold">{name}</h5>
                        <div className=" col-md-3 d-flex flex-column justify-content-center align-items-center">
                            <StarRating rating={rating} />
                            <p className="fw-bold">{rating}점</p>
                        </div>
                        <h1 className=" col-md-3"></h1>
                    </div>
                    <div className="gap-3 d-flex justify-content-center">
                        {tag && tag.map((item, index) => (<div key={index} className="border border-primary rounded-5 bg-white col-md-3 text-center">
                            {item} 
                        </div>))}
                    </div>
                </div>
                <AnimatePresence>
                    <motion.div
                        key={imageSrc}
                        className="d-flex col-md-2 p-2"
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.img
                            src={imageSrc}
                            style={{ height: "100%", width: "100%" }}
                            alt="Truck Image"
                            initial={{ opacity: 0 }} // 초기 상태
                            animate={{ opacity: 1 }} // 애니메이션 상태
                            transition={{ duration: 0.5 }} // 트랜지션 지속 시간
                        />
                    </motion.div>

                </AnimatePresence>
            </motion.div>

        </>
    );
}
