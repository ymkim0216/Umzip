// Header.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div style={{
      backgroundColor: '#fff',
      position: 'fixed',
      width: '100%',
      zIndex: '1000',
      top: '0',
      boxShadow: scrollY > 0 ? '0px 8px 12px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'box-shadow 0.5s ease',
    }}>
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
                <Link className="nav-link mx-3 px-3 d-flex align-items-center" to="/trade">
                  <img style={{ width: 17, height: 17 }} className='mb-1' src='/iconoir.png' alt='' />
                  <p className='m-0'>중고</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3 px-3 d-flex align-items-center" to="/help">
                  <img style={{ width: 17, height: 17 }} className='mb-1' src='/iconoir.png' alt='' />
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
    </div>
  );
};

export default Header;
