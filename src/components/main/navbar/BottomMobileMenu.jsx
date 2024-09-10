import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import HomeIcon from '@mui/icons-material/Home';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';


import logo from '../../../assets/images/logo.png';
import MobileMenu from './MobileMenu';

import styles from './MobileNavbar.module.css';
import { NavLink } from 'react-router-dom';
import { navData } from './NavData';

function BottomMobileMenu({ setCategory, currentCategory, isMenuOpen, toggleMenu, closeMenu }) {
  const navigate = useNavigate();

  // const [isMenuOpen, setMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  // const closeMenu = () => {
  //   setMenuOpen(false);
  // };



  useEffect(() => {}, []);

  return (
    <>
    {/* <div>
      <HomeIcon className="text-scTimeText hover:text-scGreen"/>
    </div> */}
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
        <MobileMenu closeMenu={closeMenu} />
      )}
    </div>
    </>
  );
}

export default BottomMobileMenu;
