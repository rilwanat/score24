import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import stars from '../../../assets/images/stars.png';
import appStore from '../../../assets/svg/app-store-badge.svg';
import playStore from '../../../assets/svg/play-store-badge.svg';


import styles from './MobileNavbar.module.css';
import { NavLink } from 'react-router-dom';
import { navData } from './NavData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function MobileMenu({ setCategory, currentCategory, closeMenu }) {
  const navigate = useNavigate();
  // const [currentPageName, setCurrentPageName] = useState("Home");


  useEffect(() => {}, []);

  return (
    

<div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0" onClick={closeMenu}></div>

          <nav
            className="fixed top-0 left-0 bottom-0 flex flex-col w-full  py-4  border-r overflow-y-auto bg-scBackground"
            style={{}}
          >
            <div className="flex items-center">
              <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <img className="ml-4 w-36 h-10 object-scale-down" src={logo} alt="" />
              </a>

              <button className="navbar-close" onClick={closeMenu}>
                <FontAwesomeIcon
                  icon={faTimes}
                  //color="white"
                  className="ml-4 mr-4 "
                  style={{
                    // backgroundColor: '#E5F1FD',
                    // color: '#0E6F8F',
                    color: '#ffffff',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '25%',
                    padding: '16px',
                  }}
                />
              </button>
            </div>

            <div className="mt-8">
              
              <p className='font-bold ml-4 mb-2 text-scMenuText '>Sports</p>
              {/* <ul> */}
              {navData.slice(0,1).map((item) => (
                <div className={styles.navLinks}>
                  <NavLink
                    key={item.id}
                    className={styles.sideitem}
                    onClick={() => {                    
                      setCategory(`${item.link}`);
                      // setCurrentPageName(`${item.link}`);
                      closeMenu();
                    }}
                    // to={`/${item.link}`}
                  >
                    {item.icon}
                    <span className={styles.linkText}>{item.text}</span>
                  </NavLink>
                </div>
              ))}
              {/* </ul> */}
              <hr className="border-1 border-scHr mt-2" />
              <p className='font-bold ml-4 my-2 text-scMenuText'>Navigation</p>
              
              {navData.slice(1,5).map((item) => (
                <div className={styles.navLinks}>
                  <NavLink
                    key={item.id}
                    className={styles.sideitem}
                    onClick={() => {            
                      setCategory(`${item.link}`);          
                      // setCurrentPageName(`${item.link}`);
                      closeMenu();
                    }}
                    // to={`/${item.link}`}
                  >
                    {/* {item.icon} */}
                    <span className={styles.linkTextTwo}>{item.text}</span>
                  </NavLink>
                </div>
              ))}
            </div>
            
            <div 
              className='relative'  // Use relative for positioning
              style={{ 
                backgroundImage: `url(${stars})`, 
                backgroundPosition: 'right center', 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'  // Ensure the image fits within the container
              }}
            >
              <div className='my-4 ml-4'>
                <p className='mb-2 text-white'>Download Our App:</p>
                <div className="flex items-center" style={{ height: "40px" }}>
                  <img src={appStore} alt="AppStore Icon" className="mr-2" style={{ width: "7.5rem" }} /> 
                  <img src={playStore} alt="PlayStore Icon" style={{ width: "7.5rem" }} />
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="bottom-0 w-full bg-opacity-0 pt-20 text-center">
                <p className="text-xs text-white pt-2">Copyright &copy; Score24</p>
              </div>
            </div>
          </nav>
        </div>
  );
}

export default MobileMenu;
