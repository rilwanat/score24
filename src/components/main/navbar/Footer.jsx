import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';


function Footer({  }) {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className='px-4 lg:px-16 xl:px-24 2xl:px-80 flex flex-col'>
      <div className='flex flex-col'>
        <p className="text-xs text-white my-2">Live football scores</p>
        <p className="text-xs  text-white  my-2">Stay updated with the latest football scores, 
          fixtures, and results on Score24. Our live football score service offers comprehensive match 
          details including live scores, commentary, goal scorers, yellow and red cards, team formations, 
          lineups, substitutions, and match statistics. Enjoy live action from top leagues around the world, 
          such as the UEFA Champions League, English Premier League, Spanish La Liga, German Bundesliga, 
          Italian Serie A, and more..</p>

      </div>

      <hr className='my-2'/>
    
      <div className="mt-auto flex ">
      
        <div className="bottom-0 w-full flex md:flex-row flex-col justify-between  pt-2 pb-4 mb-48">
          <div className='flex md:flex-row flex-col'>
            <div className='flex'><a className="text-xs text-white mr-2 cursor-pointer hover:text-scGreen">Terms and Conditions of Use</a><a className="text-xs text-white mr-2">|</a></div>
            <div className='flex'><a className="text-xs text-white mr-2 cursor-pointer hover:text-scGreen">Privacy and Cookie Notice</a><a className="text-xs text-white mr-2">|</a></div>
            <div className='flex'><a className="text-xs text-white mr-2 cursor-pointer hover:text-scGreen">Contact</a><a className="text-xs text-white mr-2">|</a></div>            
            <a className="text-xs text-white mr-2">Update consent</a>
          </div>
        <p className="text-xs text-white md:mt-0 mt-4">Copyright &copy; 2024 Score24</p>
      </div>
    </div>
  </div>
  );
}

export default Footer;
