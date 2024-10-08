import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery } from '@mui/material';

import styles from './MobileNavbar.module.css';
import { NavLink } from 'react-router-dom';
import { navData } from './NavData';

import logo from '../../../assets/images/logo.png';
import appStore from '../../../assets/svg/app-store-badge.svg';
import playStore from '../../../assets/svg/play-store-badge.svg';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



import ComponentAnimatedSearch from "../ComponentAnimatedSearch";

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

import stars from '../../../assets/images/stars.png';

import MobileMenu from './MobileMenu';

export default function MobileNavbar({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory,
  setCurrentPopularLeagueId, setCurrentPopularLeagueName,
  popularLeagueId, popularLeagueName
 }) {

  return (
    <div className="w-full fixed top-0 bg-scBackground        pl-4 text-sm" style={{  }}>
      <div className="flex justify-between py-2">
        
      <div className="flex ">
        <IconButton
          edge="start"
          aria-label="menu"
          sx={{ color: 'white', marginRight: 2 }} 
          onClick={toggleMenu}
        >
          <div style={{ width: '20px', height: '24px' }}>
            <div style={{ width: '20px', height: '2px', backgroundColor: 'white', marginTop: '4px', marginBottom: '6px' }}></div>
            <div style={{ width: '20px', height: '2px', backgroundColor: 'white', marginBottom: '6px' }}></div>
            <div style={{ width: '20px', height: '2px', backgroundColor: 'white' }}></div>
          </div>
        </IconButton>

        <div className="flex items-center">
          <img
            className="block h-10 w-auto max-w-none"
            src={logo} 
            alt="Logo"
            // onClick={toggleMenu}
            // onClick={() => {navigate('/');}}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

        <div className="flex items-center mr-4 " style={{  }}>
          <div className="mr-4 md:flex justify-end" style={{}}>
            <div className="text-right">
              {/* <p className="text-sm font-bold md:text-white">{storedAdminDetails && storedAdminDetails.Email}</p> */}
              {/* <p className="text-sm md:text-white">{'#'}</p> */}
            </div>
          </div>

          <div className='flex '>
            <div
              className=" flex items-center justify-center   hover:text-scGreen text-white mr-2"
              style={{ height: '40px', width: '40px', borderRadius: '4px' }}
              // onClick={() => { logout(); }}
              >
              <CalendarMonthIcon className=" cursor-pointer " />
            </div>
            <div
              className=" flex items-center justify-center   hover:text-scGreen text-white"
              style={{ height: '40px', width: '40px', borderRadius: '4px' }}
              // onClick={() => { logout(); }}
              >
              <SearchIcon className=" cursor-pointer " />
            </div>
            {/* <div
              className=" flex items-center justify-center   hover:text-scGreen text-white"
              style={{ height: '40px', width: '40px', borderRadius: '4px' }}
              // onClick={() => { logout(); }}
            >
              <TuneIcon className=" cursor-pointer" />
            </div> */}
          </div>

        </div>


      </div>

      <div className='flex items-center mb-2'>
        <div className='flex'>          
          <div className={`flex  mr-4 cursor-pointer items-center px-2 py-1 ${currentCategory === 'Football' ? 'rounded-lg bg-scDarkerBackground ' : ''}`} onClick={() => setCategory("Football")}><SportsSoccerIcon className='mr-2' style={{ width: '20px', height: '20px', color: currentCategory === 'Football' ? '#B3E94E' : '#ACBFD5' }}/> <p className={`text-sm ${currentCategory === 'Football' ? 'text-white' : 'text-scMenuText'}`}>Football</p></div>
          {/* <div className='flex mr-4 cursor-pointer items-center' onClick={setCategory("Tennis")}><SportsTennisIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-sm text-scMenuText'>Tennis</p></div> */}
          {/* <div className={`flex mr-4 cursor-pointer items-center  px-2 py-1 ${currentCategory === 'Basketball' ? 'rounded-lg bg-scDarkerBackground ' : ''}`} onClick={() => setCategory("Basketball")}><SportsBasketballIcon className='mr-2' style={{ width: '20px', height: '20px', color: currentCategory === 'Basketball' ? '#B3E94E' : '#ACBFD5' }}/> <p className={`text-sm ${currentCategory === 'Basketball' ? 'text-white' : 'text-scMenuText'}`}>Basketball</p></div> */}
          {/* <div className='flex mr-4 cursor-pointer items-center' onClick={setCategory("Hockey")}><SportsHockeyIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-sm text-scMenuText'>Hockey</p></div> */}
          {/* <div className='flex mr-4 cursor-pointer items-center' onClick={setCategory("Rugby")}><SportsRugbyIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-sm text-scMenuText'>Rugby</p></div> */}
          {/* <div className='flex mr-4 cursor-pointer items-center' onClick={setCategory("Cricket")}><SportsCricketIcon  className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-sm text-scMenuText'>Cricket</p></div> */}
        </div>
      </div>

      {/* Mobile menu */}
      {/* {isMenuOpen && (
        <MobileMenu 
          setPageName={setPageName} currentPageName={currentPageName} 
          setCategory={setCategory} currentCategory={currentCategory} 
          isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
        />
      )} */}
    </div>
  );
}
