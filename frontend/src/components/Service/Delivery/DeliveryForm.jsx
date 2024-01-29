import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDatePicker from "react-datepicker";
import Calendar from "./Calendar";
import "react-datepicker/dist/react-datepicker.css";
import Clock from "./Clock";
import Car from "./Car";
import { Link, useNavigate } from "react-router-dom";
import CheckButton from "./Check_Button";
import PhotoView from "./PhotoView";
import ProgressBar from "./ProgressBar";
const DUMMY_DATA = [
  { name: "다마스", car_description: "어쩌구 저쩌구" },
  { name: "핸들이 고장난 8톤트럭", car_description: " 어쩌구 저쩌구어쩌구 저쩌구" },
  { name: "1톤트럭", car_description: " 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구" },
  { name: "1톤 리프트트럭", car_description: " 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구" },
  { name: "1톤 냉장/냉동 탑차", car_description: " 어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구어쩌구 저쩌구" },
]



export default function DeliveryForm() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isDropdownClockOpen, setDropdownClockOpen] = useState(false);
  const [isDropdownCarOpen, setDropdownCarOpen] = useState(false)
  const [isWhatTime, setisWhatTime] = useState()
  const [isWhatCar, setisWhatCar] = useState()
  const [whatPacking, setwhatPacking] = useState(null)
  const [whatRiding, setwhatRiding] = useState(null)
  const [isElavator, setisElavator] = useState(null)
  const [isCarStation, setisCarStation] = useState(null)
  const [userinput, setuserinput] = useState("")
  const [isActive, setIsActive] = useState("first")
  const [isTime, setIsTime] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 3; // 전체 단계 수에 맞게 수정



  const hadleElavator = (event) => {
    setisElavator(event.target.innerText)
  }
  const hadleCarStation = (event) => {
    setisCarStation(event.target.innerText)
  }

  const checkRiding = (event) => {
    setwhatRiding(event.target.innerText)
  }
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const checkPacking = (event) => {
    setwhatPacking(event.target.innerText)
  }
  const toggleClockDropdown = () => {
    setDropdownClockOpen((prev) => !prev);
  };
  const toggleCarDropdown = () => {
    setDropdownCarOpen((prev) => !prev);
  };
  const goToNextForm = () => {

    if (isActive === "first") { setIsActive("second") }
    else if (isActive === "second") { setIsActive("third") }
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    }
  }
  const hadlesubmit = () => {
    navigate('/recommend')
  }
  const goTobeforeForm = () => {
    if (isActive === "second") { setIsActive("first") }
    else if (isActive === "third") { setIsActive("second") }
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  }
  const handleUserInput = (event) => {
    setuserinput(event.target.value);
  };
  return (<>
    <div style={{
      position: 'absolute', width: '20%', top: '15%',
      left: '70%',
    }}>
      <ProgressBar steps={totalSteps} activeStep={activeStep} />
    </div>
    <AnimatePresence mode="wait">

      {isActive === "first" && <motion.div key="firstForm">

        <motion.div initial={{ opacity: 0.1 }} animate={{ opacity: 1 }} exit={{ opacity: 0.1 }} transition={{ duration: 0.3 }}  >
          <Link to="/dashboard" className="d-flex align-items-center gap-2" style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            // 이미지의 높이를 설정해주세요
            cursor: 'pointer',
          }}><img style={{
            width: '2rem', // 이미지의 너비를 설정해주세요
            height: '2rem',
          }}
            src="/box-arrow-left.png"  // 나가기 버튼 이미지의 경로를 설정해주세요
            alt="Exit Button"

            />
            <motion.p className="m-0">뒤로가기</motion.p>
          </Link>
        </motion.div>

        <motion.h5 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={goToNextForm} className="d-flex align-items-center gap-2" style={{
          position: 'absolute',
          top: '85%',
          left: '85%',
          // 이미지의 높이를 설정해주세요
          cursor: 'pointer',
        }}>
          <motion.p className="m-0" style={{ color: "#006EEE" }}>다음으로&rarr;</motion.p>

        </motion.h5>
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.3 }} >
          <motion.div style={{ position: 'relative' }} whileHover={{ fontWeight: "bold" }} >
            {/* 나가기 버튼 이미지 */}



          </motion.div>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <div className="col-6 gap-5 d-flex flex-column" style={{ marginTop: "15rem", }}>

              <div className="mb-3 d-flex align-items-center ">
                <div className="col-3">
                  <Calendar setStartDate={setStartDate} startDate={startDate} isTime={isTime} setIsTime={setIsTime} />
                </div>
                <h3 className="m-0 col-6">일</h3>
              </div>

              <div>
                <div className="d-flex gap-5 align-items-center">
                  {/* 첫 번째 라디오 버튼 */}
                  <div className="d-flex gap-3  ">
                    <motion.div
                      whileHover={{ cursor: "pointer", scale: 1.1 }}
                      className={`d-flex gap-3 justify-content-center align-items-center ${selectedOption === 'AM' ? 'checked' : ''}`}
                      value="AM"
                      onClick={() => handleOptionChange('AM')}
                    >
                      <motion.img
                        style={{ width: "1.5rem" }}
                        src={selectedOption === 'AM' ? '/Checkbox_Check.png' : '/Checkbox_Unchecked.png'}
                      />
                      <p className="m-0 fw-bold">AM</p>
                    </motion.div>

                    {/* 두 번째 라디오 버튼 */}
                    <motion.div
                      whileHover={{ cursor: "pointer", scale: 1.1 }}
                      className={`d-flex gap-3 justify-content-center align-items-center ${selectedOption === 'PM' ? 'checked' : ''}`}
                      value="PM"
                      onClick={() => handleOptionChange('PM')}
                    >
                      <motion.img
                        style={{ width: "1.5rem" }}
                        src={selectedOption === 'PM' ? '/Checkbox_Check.png' : '/Checkbox_Unchecked.png'}
                      />
                      <p className="m-0 fw-bold">PM</p>
                    </motion.div>
                  </div>
                  {/* 드롭다운 버튼 */}
                  <div style={{ position: "relative" }} className="d-flex align-items-center gap-4">
                    <button className="btn btn-primary rounded-5 d-flex  align-items-center gap-2 p-2 " style={{ width: "10rem", height: "4rem" }} onClick={toggleClockDropdown}>
                      <p className="m-0 col-10">{isWhatTime || "시간선택"}</p><img className="col-2" src='/clock.png' style={{ width: "1rem", height: "1rem" }} />
                    </button>
                    <AnimatePresence>
                      {isDropdownClockOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="mt-2" style={{ position: "absolute", top: "100%", left: 0, zIndex: 1 }}>
                          <Clock setisWhatTime={setisWhatTime} toggleClockDropdown={toggleClockDropdown} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <h3 className="m-0">시에</h3>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ position: "relative" }} className="d-flex align-items-center gap-4">
                  <motion.button
                    className="btn btn-primary rounded-5 d-flex justify-content-center align-items-center  p-2"
                    style={{ width: "10rem", height: "4rem" }}
                    onClick={toggleCarDropdown}
                  >
                    <p className="m-0 col-10">{isWhatCar || "차량선택"}</p>
                    <motion.img
                      className="col-2"
                      src='/caret-down-fill.png'
                      style={{ width: "1rem", height: "1rem" }}
                      animate={{ rotate: isDropdownCarOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }} // Adjust the duration as needed
                    />

                  </motion.button>

                  <h3 className="m-0"> 가 필요해요</h3>
                  <AnimatePresence>
                    {isDropdownCarOpen && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="mt-2" style={{ position: "absolute", top: "100%", left: 0, zIndex: 1 }}>
                        <Car data={DUMMY_DATA} setisWhatCar={setisWhatCar} toggleCarDropdown={toggleCarDropdown} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>}
      {isActive === "second" && <motion.div key="secondForm">
        <motion.h5 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={goToNextForm} className="d-flex align-items-center gap-2" style={{
          position: 'absolute',
          top: '85%',
          left: '85%',
          // 이미지의 높이를 설정해주세요
          cursor: 'pointer',
        }}>
          <motion.p className="m-0" style={{ color: "#006EEE" }}>다음으로&rarr;</motion.p>

        </motion.h5>

        <motion.h5 initial={{ opacity: 0.1 }} animate={{ opacity: 1 }} exit={{ opacity: 0.1 }} transition={{ duration: 0.3 }} onClick={goTobeforeForm} to="/dashboard" className="d-flex align-items-center gap-2" style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          // 이미지의 높이를 설정해주세요
          cursor: 'pointer',
        }}><img style={{
          width: '2rem', // 이미지의 너비를 설정해주세요
          height: '2rem',
        }}
          src="/box-arrow-left.png"  // 나가기 버튼 이미지의 경로를 설정해주세요
          alt="Exit Button"

          />
          <motion.p className="m-0" style={{ color: "#006EEE" }}>이전으로</motion.p>
        </motion.h5>
        <motion.div className="col-12 d-flex justify-content-center " style={{ marginTop: "14rem" }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.3 }}  >
          <div className="col-8 d-flex gap-3 ">
            <div className="col-6 d-flex flex-column gap-4 p-3">
              <div className="d-flex justify-content-center gap-1 align-items-center text-center" style={{ width: "100%", height: "2rem" }}>
                <div className="col-1 fw-bold">출발 : </div>
                <div className="col-9 shadow rounded-4 fw-bold d-flex justify-content-center align-items-center" style={{ height: "100%" }} ><p className="m-0">ㅁㄴㄹㄹ</p></div>
                <button className="btn-primary btn col-2 d-flex justify-content-center align-items-center" style={{ height: "100%" }}><p className="m-0">찾기</p></button>
              </div>
              <div className="d-flex justify-content-center gap-1 align-items-center text-center" style={{ width: "100%", height: "2rem" }}>
                <div className="col-1 fw-bold">도착 : </div>
                <div className="col-9 shadow rounded-4 fw-bold d-flex justify-content-center align-items-center" style={{ height: "100%" }} ><p className="m-0">ㅁㄴㄹㄹ</p></div>
                <button className="btn-primary btn col-2 d-flex justify-content-center align-items-center" style={{ height: "100%" }}><p className="m-0">찾기</p></button>
              </div>
              <div style={{ height: "16rem", width: "100%", border: "solid 1px #006EEE" }} className="mt-3 p-3 shadow rounded-5">지도</div>
            </div>

            <div className="col-6 p-3 gap-4 d-flex flex-column" >
              <div className="d-flex justify-content-center gap-2 align-items-center text-center">
                <p className="m-0 col-3 fw-bold">포장여부</p>
                <div className="col-3">
                  <CheckButton checkPacking={checkPacking} isActive={whatPacking === "포장"} name="포장" />
                </div>
                <div className="col-3">
                  <CheckButton className="col-3" checkPacking={checkPacking} isActive={whatPacking === "미포장"} name="미포장" />
                </div>
                <div className="col-3">
                  <CheckButton className="col-3" checkPacking={checkPacking} isActive={whatPacking === "반포장"} name="반포장" />
                </div>
              </div>

              <div className="d-flex justify-content-center gap-2 align-items-center text-center">
                <p className="m-0 col-3 fw-bold">탑승여부</p>
                <div className="col-3">
                  <CheckButton checkPacking={checkRiding} isActive={whatRiding === "탑승"} name="탑승" />
                </div>
                <div className="col-3">
                  <CheckButton checkPacking={checkRiding} isActive={whatRiding === "미탑승"} name="미탑승" />
                </div>
                <div className="col-3"></div>
              </div>

              <div className="d-flex justify-content-center gap-2 align-items-center text-center">
                <p className="m-0 col-3 fw-bold">엘레베이터</p>
                <div className="col-3">
                  <CheckButton checkPacking={hadleElavator} isActive={isElavator === "있음"} name="있음" />
                </div>
                <div className="col-3">
                  <CheckButton checkPacking={hadleElavator} isActive={isElavator === "없음"} name="없음" />
                </div>
                <div className="col-3"></div>
              </div>

              <div className="d-flex justify-content-center gap-2 align-items-center text-center">
                <p className="m-0 col-3 fw-bold">주차장</p>
                <div className="col-3">
                  <CheckButton checkPacking={hadleCarStation} isActive={isCarStation === "있음"} name="있음" />
                </div>
                <div className="col-3">
                  <CheckButton checkPacking={hadleCarStation} isActive={isCarStation === "없음"} name="없음" />
                </div>
                <div className="col-3"></div>
              </div>
              <div className="d-flex justify-content-center gap-2  text-center">
                <p className="m-0 col-3 fw-bold">가구 사진</p>
                <div className="col-9 d-flex">
                  <PhotoView selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                </div>
              </div>
              <div className="d-flex justify-content-center gap-2  text-center">
                <p className="m-0 col-3 fw-bold">추가사항</p>
                <div className="col-9 d-flex">
                  <textarea
                    className="shadow border rounded-3 p-3"
                    value={userinput}
                    onChange={handleUserInput}
                    placeholder="여기에 추가사항을 입력하세요..."
                    rows={4}  // 원하는 행 수로 조절
                    style={{ width: "100%", resize: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </motion.div>}
      {isActive === "third" && <div>
        <motion.h5 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={goToNextForm} className="d-flex align-items-center gap-2" style={{
          position: 'absolute',
          top: '85%',
          left: '85%',
          // 이미지의 높이를 설정해주세요
          cursor: 'pointer',
        }}>
          <motion.p className="m-0" style={{ color: "#006EEE" }}>다음으로&rarr;</motion.p>

        </motion.h5>

        <motion.h5 initial={{ opacity: 0.1 }} animate={{ opacity: 1 }} exit={{ opacity: 0.1 }} transition={{ duration: 0.3 }} onClick={goTobeforeForm} to="/dashboard" className="d-flex align-items-center gap-2" style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          // 이미지의 높이를 설정해주세요
          cursor: 'pointer',
        }}><img style={{
          width: '2rem', // 이미지의 너비를 설정해주세요
          height: '2rem',
        }}
          src="/box-arrow-left.png"  // 나가기 버튼 이미지의 경로를 설정해주세요
          alt="Exit Button"

          />
          <motion.p className="m-0" style={{ color: "#006EEE" }}>이전으로</motion.p>
        </motion.h5>

        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ duration: 0.3 }}
          className="col-12 d-flex justify-content-center align-items-center" style={{ marginTop: "11rem" }}>
          <div className="col-5 p-3 d-flex flex-column ">
            <div style={{ borderBottom: "solid 1px #006EEE" }} className="d-flex flex-column gap-2 p-3">
              <div className="d-flex text-center">
                <p className="m-0 col-4">일시</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{isTime}</p>
                  <p className="m-0">{isWhatTime}</p>
                  <p className="m-0">{selectedOption}</p>
                </div>
              </div>

              <div className="d-flex text-center">
                <p className="m-0 col-4">출발</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{isTime}</p>
                </div>
              </div>

              <div className="d-flex text-center">
                <p className="m-0 col-4">도착</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{isTime}</p>
                </div>
              </div>

              <div className="d-flex text-center">
                <p className="m-0 col-4">차량</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{isWhatCar}</p>
                </div>
              </div>
            </div>

            <div style={{ borderBottom: "solid 1px #006EEE" }} className="d-flex flex-column gap-2 p-3">
              <div className="d-flex text-center">
                <p className="m-0 col-4">포장</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{whatPacking}</p>
                </div>
              </div>

              <div className="d-flex text-center">
                <p className="m-0 col-4">탑승</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{whatRiding}</p>
                </div>
              </div>

              <div className="d-flex text-center">
                <p className="m-0 col-4">엘레베이터</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{isElavator}</p>
                </div>
              </div>

              <div className="d-flex text-center">
                <p className="m-0 col-4">주차장</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  <p className="m-0">{isCarStation}</p>
                </div>
              </div>

              <div className="d-flex text-center">
                <p className="m-0 col-4">가구사진</p>
                <div className="col-8 d-flex  gap-3  justify-content-center shadow " style={{ overflowX: "auto" }}>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={file.previewURL}
                        alt={`선택된 파일 ${index + 1} 미리보기`}
                        style={{ width: "7rem", height: "7rem" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex text-center ">
                <p className="m-0 col-4">추가사항</p>
                <div className="col-8 d-flex  gap-3  justify-content-center">
                  {userinput}
                </div>
              </div>
            </div>
            <button onClick={hadlesubmit} className="mt-3 btn btn-primary">제출</button>
          </div>





        </motion.div>
      </div>
      }

    </AnimatePresence>



  </>
  );

}
