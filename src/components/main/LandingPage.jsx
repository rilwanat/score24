import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './navbar/Header';
import Footer from './navbar/Footer';
import BottomMobileMenu from './navbar/BottomMobileMenu';

import CookieConsent from './navbar/CookieConsent';

import MainContent from './MainContent';


import stars from '../../assets/images/stars.png';


export default function LandingPage({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory }) {
  // isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
   
  return (
    <div className='bg-scBackground  text-sm'>
      {/* <div className="absolute inset-0 ">
        <img
          src={stars}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div> */}

      <Header 
      setPageName={setPageName} currentPageName={currentPageName} 
      setCategory={setCategory} currentCategory={currentCategory} 
      isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
      />
        <div className='flex'>
          <div className='w-full rounded-lg'>

            <MainContent 
            setPageName={setPageName} currentPageName={currentPageName} 
            setCategory={setCategory} currentCategory={currentCategory} 
            isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
            /> 

          </div>
        </div>      
      <Footer />

      {/* <CookieConsent /> */}

      {isMobile && <BottomMobileMenu setCategory={setCategory} currentCategory={currentCategory} isMobile={isMobile}
      isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
      />} 

    </div>
  );
}
