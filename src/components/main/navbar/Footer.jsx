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
        <p className="text-xs font-bold text-white  my-2">Latest football scores, fixtures, results and more</p>
        <p className="text-xs text-white  my-2">Live football score service on SoccerDesk provides 
          latest football results and fixtures offering live scores information, match commentary, 
          goal scorers, yellow and red cards, team formations, lineups and substitutions, match 
          statistics and other details. Watch live action in matches from all over the world, 
          including UEFA Champions League, England Premier League, Spanish LaLiga, German Bundesliga, 
          Italian Serie A and much more.</p>

      </div>
    
      <div className="mt-auto flex ">
      
        <div className="bottom-0 w-full flex justify-between  py-4">
          <div className='flex md:flex-row flex-col'>
            <a className="text-xs text-white mr-2">Terms and Conditions of Use</a>
            <a className="text-xs text-white mr-2">Privacy and Cookie Notice</a>
            <a className="text-xs text-white mr-2">Contact</a>
            <a className="text-xs text-white mr-2">Update consent</a>
          </div>
        <p className="text-xs text-white">Copyright &copy; Score24</p>
      </div>
    </div>
  </div>
  );
}

export default Footer;
