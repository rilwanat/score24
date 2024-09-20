import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderHead from './HeaderHead';
import MobileNavbar from './MobileNavbar';

import MarqueeTextContainer from "./MarqueeTextContainer";

export default function Header({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory,
  setCurrentPopularLeagueId, setCurrentPopularLeagueName,
  popularLeagueId, popularLeagueName
 }) {

  return (
    <div>
      <MarqueeTextContainer />
      
      <div>
        {isMobile ? <MobileNavbar 
          setPageName={setPageName} currentPageName={currentPageName} 
          setCategory={setCategory} currentCategory={currentCategory} 
          isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
          setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName}
          popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
        /> : <div></div>}
      </div>
      <div className='flex w-full md:mt-0 mt-16'>
        <div className='w-full'>
          {isMobile ? <div></div> : <HeaderHead 
            setPageName={setPageName} currentPageName={currentPageName} 
            setCategory={setCategory} currentCategory={currentCategory} 
            isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} 
            setCurrentPopularLeagueId={setCurrentPopularLeagueId} setCurrentPopularLeagueName={setCurrentPopularLeagueName}
            popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName}
          />}
        </div>
      </div>
    </div>
  );
}
