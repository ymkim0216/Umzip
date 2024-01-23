import React from "react";
import "./Login.css";

export default  function Login() {
  return (
    <div className="screen">
      <div className="div">
        <div className="overlap">
          <img className="line" alt="Line" src="line-3.svg" />
          <div className="text-wrapper">로고</div>
        </div>
        <div className="overlap-group">
          <div className="group">
            <div className="overlap-2">
              <div className="primary-BTN" />
              <div className="button-text">Log in</div>
            </div>
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <img className="img" alt="Group" src="Group 35563.png" />
                <div className="text-wrapper-2">Email</div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="text-wrapper-3">Sign in</div>
            </div>
            <div className="overlap-wrapper">
              <div className="overlap-group-2">
                <div className="text-wrapper-4">Password</div>
                <img className="group-2" alt="Group" src="Group 35615.png" />
              </div>
            </div>
          </div>
          <div className="remember-me">
            <div className="remember-me-text">Remember Me</div>
            <div className="tick-wrapper">
              <img className="tick" alt="Tick" src="tick.png" />
            </div>
            <div className="forgot-password-text">Forgot Password?</div>
          </div>
        </div>
        <div className="already-account">
          <p className="p">Don’t have an account ?</p>
          <div className="text-wrapper-5">Sign Up</div>
        </div>
      </div>
    </div>
  );
};
