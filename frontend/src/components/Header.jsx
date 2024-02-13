import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/store';
import './Header.css'
const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [id, setId] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [checkWho, setWho] = useState(null)
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo') ||'{}');


  const location = useLocation();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    const storedUserInfo =
      localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    console.log(storedUserInfo);
    if (storedUserInfo) {
      const { profileImage, who, id } = JSON.parse(storedUserInfo);
      setProfileImage(profileImage || '');
      setWho(who || '');
      setId(id || '');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItemVariants = {
    hover: {
      translateY: -3,
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  };

  return (
    <motion.div
      style={{
        backgroundColor: '#fff',
        position: 'fixed',
        width: '100%',
        zIndex: '1000',
        top: '0',
        boxShadow: scrollY > 0 ? '0px 8px 12px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      <div className="">
        <div
          className="navbar navbar-expand-lg navbar-light"
          style={{ height: '8vh' }}
        >
          <NavLink className="navbar-brand" to={checkWho === 1 ? "/dashboard" : '/dashbordcompany'}>
            <img
              src="/umzipLogo.png"
              alt=""
              style={{ width: '60px', height: 'auto' }}
            />
          </NavLink>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex justify-content-center align-items-center">
              <motion.li
                whileHover={navItemVariants.hover}
                className="nav-item"
              >
                <NavLink
                  className="nav-link mx-3 px-3"
                  to={checkWho === 1 ? '/dashboard' : '/dashbordcompany'}
                  activeClassName="active" // 이 부분이 추가되었습니다
                >
                  <div className='d-flex align-items-center gap-1'>
                    <img style={{ width: "2rem", height: "2rem" }} src='/free-animated-icon-upcoming-12146104.gif' />
                  <p className="m-0">대시보드</p>
                  </div>
                  
                </NavLink>
              </motion.li>
              { checkWho === 1 && (
              <>
              <motion.li
                whileHover={navItemVariants.hover}
                className="nav-item"
              >
                <NavLink
                  className="nav-link mx-3 px-3 d-flex align-items-center"
                  to="/trade"
                  activeClassName="active" // 이 부분이 추가되었습니다
                >
                  <div className='d-flex align-items-center gap-1'>
                    <img
                      style={{ width: '2rem', height: '2rem' }}
                      className=""
                      src="/free-animated-icon-handshake-6416336.gif"
                      alt=""
                    />
                    <p className="m-0">중고</p></div>
                </NavLink>
              </motion.li>
              <motion.li
                whileHover={navItemVariants.hover}
                className="nav-item"
              >
                <NavLink
                  className="nav-link mx-3 px-3 d-flex align-items-center"
                  to="/help"
                  activeClassName="active" // 이 부분이 추가되었습니다
                >
                  <div className='d-flex align-items-center gap-1'>
                    <img
                      style={{ width: "2rem", height: "2rem" }}
                      className=""
                      src="/free-animated-icon-care-11688376.gif"
                      alt=""
                    />
                    <p className="m-0">도움</p>
                  </div>
                </NavLink>
              </motion.li>
              </>
              )}
              <motion.li
                whileHover={navItemVariants.hover}
                className="nav-item"
              >
                <NavLink
                  className="nav-link mx-3 px-3"
                  to="/Alarm"
                  activeClassName="active" // 이 부분이 추가되었습니다
                >
                  <div className='d-flex align-items-center gap-1'>
                    <img src='/free-animated-icon-notifications-11919490.gif' style={{ width: "2rem", height: "2rem" }} />
                    <p className="m-0">알림</p>
                  </div>
                </NavLink>
              </motion.li>
              <motion.li
                whileHover={navItemVariants.hover}
                className="nav-item"
              >
                <NavLink
                  className="nav-link mx-3 px-3"
                  to={`/myprofile/${id}`}
                  activeClassName="active" // 이 부분이 추가되었습니다
                >
                  <img
                  className='shadow'
                    src={profileImage}
                    alt="Profile"
                    style={{
                      maxWidth: '30px',
                      height: 'auto',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  프로필
                </NavLink>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
