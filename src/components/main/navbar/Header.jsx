import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderHead from './HeaderHead';
import MobileNavbar from './MobileNavbar';

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
      <div>
        {isMobile ? <MobileNavbar setCategory={setCategory} currentCategory={currentCategory}/> : <div></div>}
      </div>
      <div className='flex w-full'>
        <div className='w-full'>
          {isMobile ? <div></div> : <HeaderHead  setCategory={setCategory} currentCategory={currentCategory}/>}
        </div>
      </div>
    </div>
  );
}
