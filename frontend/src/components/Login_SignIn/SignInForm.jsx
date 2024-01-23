import React, { useState } from "react";
import { PRIMARY_COLOR } from "../../App";
const SignInForm = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [serviceButton, setserviceButton] = useState(null);

  const handleButtonClick = (buttonType) => {
    if (selectedButton === "normal") {
      setserviceButton(null);
    }
    setSelectedButton(buttonType);
  };

  const handleServiceClick = (buttonType) => {
    setserviceButton(buttonType);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 로그인 처리 로직을 추가하세요.
  };

  return (
    <div className="container" style={{ marginTop: "100px" ,marginBottom:"100px"}}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <form
            onSubmit={handleSubmit}
            className="rounded p-4 border shadow-sm mx-auto"
            style={{ width: "100%", maxWidth: "70%" }}
          >
          <h2 className="mb-4">Sign In</h2>
          <button
            type="button"
            className={`btn ${selectedButton === "normal" ? "btn-primary text-white" : "btn-outline-primary text-dark"} rounded-pill py-3 mx-2`}
            onClick={() => handleButtonClick("normal")}
          >
            일반 가입
          </button>
          <button
            type="button"
            className={`btn ${selectedButton === "company" ? "btn-primary text-white" : "btn-outline-primary text-dark"} rounded-pill py-3 mx-2`}
            onClick={() => handleButtonClick("company")}
          >
            업체 가입
          </button>

          <div className="form-group mb-4">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control rounded-pill py-4" id="username" placeholder="Enter username" required />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control rounded-pill py-4" id="email" placeholder="Enter email" required />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="input-group">
              <input type="tel" className="form-control rounded-pill py-4" id="phoneNumber" placeholder="Enter phone number" required />
              <button type="button" className="btn btn-secondary rounded-pill py-3" style={{ marginLeft: "-1px", backgroundColor: PRIMARY_COLOR }}>Send Code</button>
            </div>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="enterCode">Enter Code</label>
            <div className="input-group">
              <input type="text" className="form-control rounded-pill py-4" id="enterCode" placeholder="Enter code" required />
              <button type="button" className="btn btn-secondary rounded-pill py-3" style={{ marginLeft: "-1px", backgroundColor: PRIMARY_COLOR }}>Verify Code</button>
            </div>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control rounded-pill py-4" id="password" placeholder="Password" required />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control rounded-pill py-4" id="confirmPassword" placeholder="Confirm password" required />
          </div>
          {selectedButton === "company" && (
            <div className="mt-3">
              <button
                type="button"
                className={`btn ${serviceButton === "clean" ? "btn-primary text-white" : "btn-outline-primary text-dark"} rounded-pill py-3 mx-2`}
                style={{ minWidth: "120px" }}
                onClick={() => handleServiceClick("clean")}
              >
                청소
              </button>
              <button
                type="button"
                className={`btn ${serviceButton === "delivery" ? "btn-primary text-white" : "btn-outline-primary text-dark"} rounded-pill py-3 mx-2`}
                style={{ minWidth: "120px" }}
                onClick={() => handleServiceClick("delivery")}
              >
                용달
              </button>
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary rounded-pill py-3"
            style={{ width: "100%", marginTop: "5px", marginBottom: "5px", backgroundColor: "#4A3AFF" }}
          >
            Sign In
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
