import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './MobileNavbar.module.css';
import { NavLink } from 'react-router-dom';
import { navData } from './NavData';

import logo from '../../../assets/images/logo.png';
import appStore from '../../../assets/svg/app-store-badge.svg';
import playStore from '../../../assets/svg/play-store-badge.svg';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';


export default function MobileNavbar({  }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="px-4 text-sm" style={{ height: '80px' }}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="block h-10 w-auto max-w-none"
            src={logo}
            alt="Logo"
            onClick={toggleMenu}
            // onClick={() => {navigate('/');}}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="flex items-center mr-4" style={{ height: '80px' }}>
          <div className="mr-4 md:flex justify-end" style={{}}>
            <div className="text-right">
              {/* <p className="text-sm font-bold md:text-white">{storedAdminDetails && storedAdminDetails.Email}</p> */}
              {/* <p className="text-sm md:text-white">{'#'}</p> */}
            </div>
          </div>

          <div className='flex'>
            <div
              className=" flex items-center justify-center   hover:text-scGreen text-white"
              style={{ height: '40px', width: '40px', borderRadius: '4px' }}
              // onClick={() => { logout(); }}
              >
              <SearchIcon className=" cursor-pointer " />
            </div>
            <div
              className=" flex items-center justify-center   hover:text-scGreen text-white"
              style={{ height: '40px', width: '40px', borderRadius: '4px' }}
              // onClick={() => { logout(); }}
            >
              <TuneIcon className=" cursor-pointer" />
            </div>
          </div>

        </div>


      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0" onClick={closeMenu}></div>

          <nav
            className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-4 pr-4 border-r overflow-y-auto bg-scBackground"
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
              
              <p className='font-bold ml-4 my-2 text-scMenuText'>Sports</p>
              {/* <ul> */}
              {navData.slice(0,6).map((item) => (
                <div className={styles.navLinks}>
                  <NavLink
                    key={item.id}
                    className={styles.sideitem}
                    to={`/${item.link}`}
                  >
                    {item.icon}
                    <span className={styles.linkText}>{item.text}</span>
                  </NavLink>
                </div>
              ))}
              {/* </ul> */}
              <hr className="border-1 border-scHr mt-2" />
              <p className='font-bold ml-4 my-2 text-scMenuText'>Navigation</p>
              
              {navData.slice(6,10).map((item) => (
                <div className={styles.navLinks}>
                  <NavLink
                    key={item.id}
                    className={styles.sideitem}
                    to={`/${item.link}`}
                  >
                    {/* {item.icon} */}
                    <span className={styles.linkTextTwo}>{item.text}</span>
                  </NavLink>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bottom-0 w-full bg-opacity-0 pt-20 text-center">
                <p className="text-xs text-white pt-2">Copyright &copy; Score24</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
