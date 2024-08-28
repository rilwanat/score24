import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';


import logo from '../../../assets/images/logo.png';


function BottomMobileMenu({  }) {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-scBackground z-50 flex justify-around py-2 md:hidden ">
      <div className="flex flex-col items-center cursor-pointer">
        <HomeIcon className="text-white" />
        <p className="text-xs text-white">Home</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <LiveTvIcon className="text-white" />
        <p className="text-xs text-white">Live</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <FavoriteBorderIcon className="text-white" />
        <p className="text-xs text-white">Favourites</p>
      </div>
      <div className="flex flex-col items-center cursor-pointer">
        <MenuIcon className="text-white" />
        <p className="text-xs text-white">Menu</p>
      </div>
    </div>
  );
}

export default BottomMobileMenu;
