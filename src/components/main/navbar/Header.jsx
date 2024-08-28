import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderHead from './HeaderHead';
import MobileNavbar from './MobileNavbar';

import MarqueeTextContainer from "./MarqueeTextContainer";

import stars from '../../../assets/images/stars.png';

export default function Header({ setCategory, currentCategory }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 500);
  };

  return (
    <div>
      <MarqueeTextContainer />
      
      <div>
        {isMobile ? <MobileNavbar setCategory={setCategory} currentCategory={currentCategory}/> : <div></div>}
      </div>
      <div className='flex w-full md:mt-0 mt-16'>
        <div className='w-full'>
          {isMobile ? <div></div> : <HeaderHead  setCategory={setCategory} currentCategory={currentCategory}/>}
        </div>
      </div>
    </div>
  );
}
