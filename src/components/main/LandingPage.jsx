import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './navbar/Header';
import Footer from './navbar/Footer';
import BottomMobileMenu from './navbar/BottomMobileMenu';

import CookieConsent from './navbar/CookieConsent';

import MainContent from './MainContent';



export default function LandingPage({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory,
  specificLeague, setSpecific,
  setCurrentPopularLeagueId, setCurrentPopularLeagueName,
  popularLeagueId, popularLeagueName
 }) {

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
        specificLeague={specificLeague} setSpecific={setSpecific}
        setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName}
        popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
      />
        <div className='flex'>
          <div className='w-full rounded-lg'>

            <MainContent 
              setPageName={setPageName} currentPageName={currentPageName} 
              setCategory={setCategory} currentCategory={currentCategory} 
              isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
              specificLeague={specificLeague} setSpecific={setSpecific}
              setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName} 
              popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
            /> 

          </div>
        </div>      
      <Footer />

      {/* <CookieConsent /> */}

      {isMobile && <BottomMobileMenu 
        setPageName={setPageName} currentPageName={currentPageName} 
        setCategory={setCategory} currentCategory={currentCategory} 
        isMobile={isMobile} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
        specificLeague={specificLeague} setSpecific={setSpecific}
        setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName}
        popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
      />} 

    </div>
  );
}
