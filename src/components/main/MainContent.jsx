import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import competitionImage from '../../assets/svg/1x1.svg';

import ComponentFootball from "./ComponentFootball";
import ComponentBasketball from "./ComponentBasketball";



export default function MainContent({ setCategory, currentCategory }) {
  const navigate = useNavigate();  


  const matchData = [
    {
      time: "10:30",
      homeTeam: "O'Connor Knights",
      awayTeam: "Tigers FC",
      matchType: "Result Only",
      competition: "Bolivia : Primera Division - Clausura",
      status: "FT",
      homeScore: "3",
      awayScore: "0",
    },
    {
      time: "FT",
      homeTeam: "Independiente Petrolero",
      awayTeam: "Real Santa Cruz",
      competition: "Bolivia : Primera Division - Clausura",
      status: "FT",
      homeScore: "3",
      awayScore: "0",
    },
    {
      time: "FT",
      homeTeam: "Amazonas FC",
      awayTeam: "Ponte Preta",
      competition: "Brazil : Serie B",
      status: "FT",
      homeScore: "2",
      awayScore: "1",
    },
    {
      time: "FT",
      homeTeam: "Operario Ferroviario",
      awayTeam: "Vila Nova",
      competition: "Brazil : Serie B",
      status: "FT",
      homeScore: "2",
      awayScore: "3",
    },
    {
      time: "23:00",
      homeTeam: "Mirassol",
      awayTeam: "Botafogo SP",
      competition: "Brazil : Serie B",
      status: "Upcoming",
      homeScore: null,
      awayScore: null,
    },
    {
      time: "23:00",
      homeTeam: "America MG",
      awayTeam: "Chapecoense AF",
      competition: "Brazil : Serie B",
      status: "Upcoming",
      homeScore: null,
      awayScore: null,
    },
    {
      time: "23:00",
      homeTeam: "Guarani",
      awayTeam: "Santos FC",
      competition: "Brazil : Serie B",
      status: "Upcoming",
      homeScore: null,
      awayScore: null,
    },
    {
      time: "FT",
      homeTeam: "Beijing Guoan",
      awayTeam: "Shandong Taishan",
      competition: "China : Cup",
      status: "FT",
      homeScore: "1",
      awayScore: "1",
    },
    {
      time: "15:00",
      homeTeam: "FC Porto",
      awayTeam: "Sporting CP",
      competition: "Portugal : Primeira Liga",
      status: "FT",
      homeScore: "1",
      awayScore: "1",
    },
    {
      time: "20:00",
      homeTeam: "Napoli",
      awayTeam: "AC Milan",
      competition: "Italy : Serie A",
      status: "Upcoming",
      homeScore: null,
      awayScore: null,
    },
    {
      time: "18:30",
      homeTeam: "Paris Saint-Germain",
      awayTeam: "Marseille",
      competition: "France : Ligue 1",
      status: "FT",
      homeScore: "2",
      awayScore: "0",
    },
    {
      time: "21:00",
      homeTeam: "Real Madrid",
      awayTeam: "Atletico Madrid",
      competition: "Spain : LaLiga",
      status: "Upcoming",
      homeScore: null,
      awayScore: null,
    },
    {
      time: "16:00",
      homeTeam: "Ajax",
      awayTeam: "Feyenoord",
      competition: "Netherlands : Eredivisie",
      status: "FT",
      homeScore: "2",
      awayScore: "2",
    },
  ];
  

  const matchesGroupedByCompetition = matchData.reduce((acc, match) => {
    if (!acc[match.competition]) {
      acc[match.competition] = [];
    }
    acc[match.competition].push(match);
    return acc;
  }, {});
  

  const [currentPageName, setCurrentPageName] = useState("Home");



  return (
    <div className='bg-gray-900 
    px-4 md:px-4 lg:px-16 xl:px-24 2xl:px-80 py-4 
    flex flex-col md:flex-row '>

        <div className='flex flex-col justify-start md:mr-4    w-full md:w-1/6'>
            <div className='bg-scBackground rounded-lg w-full '>
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setCurrentPageName("Home")}>
                  {currentPageName == "Home" ? <div className='bg-scGreen mr-2' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-2'></div>}
                  <p className={`text-xs ${currentPageName === 'Home' ? 'text-scGreen ' : 'text-white'}`}>Home</p>
                </div>
                <hr className="border-1.5 border-gray-900  mt-2" />
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setCurrentPageName("Live")}>
                  {currentPageName == "Live" ? <div className='bg-scGreen mr-2' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-2'></div>}
                  <p className={`text-xs ${currentPageName === 'Live' ? 'text-scGreen ' : 'text-white'}`}>Live</p>
                </div>
                <hr className="border-1.5 border-gray-900  mt-2" />
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setCurrentPageName("Favourites")}>
                  {currentPageName == "Favourites" ? <div className='bg-scGreen mr-2' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-2'></div>}
                  <p className={`text-xs ${currentPageName === 'Favourites' ? 'text-scGreen ' : 'text-white'}`}>Favourites</p>
                </div>
            </div>
            <div className='bg-scBackground rounded-lg w-full p-4 my-4 '>
                <div className='cursor-pointer'><p className='text-xs text-white mb-2 py-1'>Popular</p></div>
                <hr className="border-1.5 border-gray-900  mt-2" />
            </div>
            <div className='bg-scBackground rounded-lg w-full p-4 my-4 '>
                <p className='text-xs text-white'>All (A-Z)</p>
            </div>
        </div>

        <div className='flex flex-col     w-full'>
            <div className='bg-scBackground rounded-lg w-full p-4 mb-4'>
                <div className='flex items-center justify-center'><p className='text-xs text-white mr-2'>{'Wednesday, Aug 21'.toUpperCase()}</p><CalendarMonthIcon style={{ width: '18px', height: '18px', color: '#FFFFFF' }}/></div>
            </div>

            
            {
              currentCategory == 'Football' ?  <ComponentFootball />
              : currentCategory == 'Basketball' ?  <ComponentBasketball />
              : <></>
            }

        </div>
    </div>
  );
}
