import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import logo from '../../../assets/images/logo.png';
import appStore from '../../../assets/svg/app-store-badge.svg';
import playStore from '../../../assets/svg/play-store-badge.svg';


import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

import SearchIcon from '@mui/icons-material/Search';

export default function HeaderHead({  }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
  }, []);


  return (
    <>
      <div className='px-8 md:px-4 lg:px-16 xl:px-24 2xl:px-80 py-4 flex flex-col md:flex-row justify-between items-center'> 
        <div className="flex items-center">
          <img
            className="block h-10 w-auto max-w-none"
            src={logo}
            alt="Logo"
            // onClick={() => { navigate('/'); }}
            // style={{ cursor: 'pointer' }}
          />
        </div>


        <div className='flex items-center'>
          {            
            <div className='flex items-center ' style={{ height: "40px" }}>
              <img src={appStore} alt="AppStore Icon" className="mr-2 w-28" /> 
              <img src={playStore} alt="PlayStore Icon" className="w-28" />
            </div>
          }
        </div>
      </div>

      <div className='px-8 md:px-4 lg:px-16 xl:px-24 2xl:px-80 py-4 flex flex-col md:flex-row items-center justify-between'>
        <div className='flex'>          
          <div className='flex mr-4 cursor-pointer'><SportsSoccerIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-xs text-scMenuText'>Football</p></div>
          <div className='flex mr-4 cursor-pointer'><SportsTennisIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-xs text-scMenuText'>Tennis</p></div>
          <div className='flex mr-4 cursor-pointer'><SportsBasketballIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-xs text-scMenuText'>Basketball</p></div>
          <div className='flex mr-4 cursor-pointer'><SportsHockeyIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-xs text-scMenuText'>Hockey</p></div>
          <div className='flex mr-4 cursor-pointer'><SportsRugbyIcon className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-xs text-scMenuText'>Rugby</p></div>
          <div className='flex mr-4 cursor-pointer'><SportsCricketIcon  className='mr-2' style={{ width: '20px', height: '20px', color: '#ACBFD5' }}/> <p className='text-xs text-scMenuText'>Cricket</p></div>
        </div>
        <div
            className=" flex items-center justify-center"
            style={{ height: '40px', width: '40px', borderRadius: '4px' }}
            // onClick={() => { logout(); }}
          >
            <SearchIcon className="text-white cursor-pointer" />
          </div>

      </div>
    </>
  );
}
