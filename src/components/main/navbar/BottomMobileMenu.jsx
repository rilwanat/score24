import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import HomeIcon from '@mui/icons-material/Home';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';


import logo from '../../../assets/images/logo.png';

import styles from './MobileNavbarBottom.module.css';
import { NavLink } from 'react-router-dom';
import { navData } from './NavData';

function BottomMobileMenu({  }) {
  const navigate = useNavigate();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };



  useEffect(() => {}, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-scBackground z-50 flex justify-around py-2 md:hidden ">
      <div className="flex flex-col items-center cursor-pointer">
        <HomeIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Home</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <LiveTvIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Live</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <FavoriteBorderIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Favourites</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer" onClick={toggleMenu}>
        <MenuIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Menu</p>
      </div>


      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="navbar-menu relative z-50 ">
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

export default BottomMobileMenu;
