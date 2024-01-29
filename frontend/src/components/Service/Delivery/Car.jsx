// Car.jsx
import "./Car.css";
import { motion } from "framer-motion";

export default function Car({ data, setisWhatCar, toggleCarDropdown }) {
  const handleCar = (name) => {
    setisWhatCar(name);
    toggleCarDropdown();
  };

  return (
    <>
      <div className="car-container shadow">
        <div className="car-options">
          {data.map((info) => (
            <motion.div
              key={info.name}
              onClick={() => handleCar(info.name)}
              className="car-option"
              whileHover={{ cursor: "pointer"  }}
            >
              {info.name}
              <motion.div className="car-description-container" >
                {info.car_description}
              </motion.div>
            </motion.div>
            
          ))}
        </div>
      </div>
    </>
  );
}
