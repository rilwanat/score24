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

function BottomMobileMenu({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory,
  specificLeague, setSpecific,
  setCurrentPopularLeagueId, setCurrentPopularLeagueName,
  popularLeagueId, popularLeagueName
 }) {

  useEffect(() => {}, []);

  return (
    <>
    {/* <div>
      <HomeIcon className="text-scTimeText hover:text-scGreen"/>
    </div> */}
    <div className="fixed bottom-0 left-0 right-0 bg-scBackground z-50 flex justify-around py-2 md:hidden ">
      <div className="flex flex-col items-center cursor-pointer"  onClick={() => setPageName("Home")}>
        <HomeIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Home</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer"  onClick={() => setPageName("Live")}>
        <LiveTvIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Live</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer"  onClick={() => setPageName("Favourites")}>
        <FavoriteBorderIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Favourites</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer" onClick={toggleMenu}>
        <MenuIcon className="text-scTimeText hover:text-scGreen"/>
        <p className="text-xs text-scTimeText  hover:text-scGreen">Menu</p>
      </div>


      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileMenu 
          setPageName={setPageName} currentPageName={currentPageName} 
          setCategory={setCategory} currentCategory={currentCategory} 
          isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
          specificLeague={specificLeague} setSpecific={setSpecific}
          setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName}
        popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
        />
      )}
    </div>
    </>
  );
}

export default BottomMobileMenu;
