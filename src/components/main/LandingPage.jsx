import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './navbar/Header';
import Footer from './navbar/Footer';
import BottomMobileMenu from './navbar/BottomMobileMenu';

import CookieConsent from './navbar/CookieConsent';

import MainContent from './MainContent';


import stars from '../../assets/images/stars.png';


export default function LandingPage({ setCategory, currentCategory }) {
  const navigate = useNavigate();  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (
    <div className='bg-scBackground  text-sm'>
      {/* <div className="absolute inset-0 ">
        <img
          src={stars}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div> */}

      <Header setCategory={setCategory} currentCategory={currentCategory}/>
        <div className='flex'>
          <div className='w-full rounded-lg'>

            <MainContent setCategory={setCategory} currentCategory={currentCategory}/> 

          </div>
        </div>      
      <Footer />

      {/* <CookieConsent /> */}

      {isMobile && <BottomMobileMenu />} 

    </div>
  );
}
