import React from 'react';
import './Login.css';
import LoginForm from '../../components/Login_SignUp/LoginForm';

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <LoginForm />
          </div>
          <div className="col-md-6">
            <div>
              <img
                src="/umzipLogo.png"
                alt=""
                style={{ width: '500px', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
