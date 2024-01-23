// Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#fff' }}>
      <div className="container-fluid">
        <div className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand p-3 " to="/">
            Logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link mx-3 px-3" to="/dashboard">
                  대시보드
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3 px-3" to="/trade">
                  중고
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3 px-3" to="/help">
                  도움
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3 px-3" to="/Alarm">
                  알림
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3 px-3" to="/myprofile">
                  프로필
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-0" style={{ borderColor: '#000' }} /> {/* 검은색 선 추가 */}
    </header>
  );
};

export default Header;
