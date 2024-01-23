import React from "react";
import { motion } from "framer-motion";
import "./LoginForm.css";

export default function LoginForm() {
  return (
    <div className="box">
      <div className="group">
        <div className="overlap">
          <div className="primary-BTN" />
          <div className="button-text">Log in</div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <motion.img
              className="img"
              alt="Group"
              src="/Group 35615.png"
              whileHover={{ scale: 1.1 }} // hover 효과
            />
            <div className="text-wrapper">Email</div>
          </div>
        </div>
        <div className="div-wrapper">
          <div className="div">Sign in</div>
        </div>
        <div className="overlap-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper-2">Password</div>
            <motion.img
              className="group-2"
              alt="Group"
              src="/Group 35563.png"
              whileHover={{ scale: 1.1 }} // hover 효과
            />
          </div>
        </div>
      </div>
    </div>
  );
}