import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './navbar/Header';
import Footer from './navbar/Footer';


import MainContent from './MainContent';


export default function LandingPage({  }) {
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
    <div className='bg-scBackground'>
      <Header />
        <div className='flex'>
          <div className='w-full rounded-lg'>

            <MainContent /> 

          </div>
        </div>      
      <Footer />
    </div>
  );
}
