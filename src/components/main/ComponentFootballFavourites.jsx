import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import headingImage from '../../assets/svg/1x1.svg';

import axios from 'axios';
// import axiosInstance from '../../axiosConfig';

import parse from 'html-react-parser';
import Loading from './Loading';

export default function ComponentFootballFavourites({ showingForDate }) {
  const navigate = useNavigate();  

  // alert(showingForDate);

  const [isDataloading, setIsDataLoading] = useState(true);
  const [matchLive, setMatchLive] = useState([]);
  useEffect(() => {
    handleLive();
  }, []);
  const handleLive = async () => {
    setIsDataLoading(true);
    try {
      const requestBody = {
        date: showingForDate,
      };
  
      const endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_FOOTBALL_LIVE;
      const response = await axios.post(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setIsDataLoading(false);
      // alert(JSON.stringify(response, null, 2));
      if (response.data) {
        // Ensure response.data has the structure you expect
        setMatchLive(response.data);
      } else {
        alert("Unexpected response structure.");
      }
  
    } catch (error) {
      // setMatchDataData([]); set live to globally
      setIsDataLoading(false);
      alert("An unexpected error occurred.");
    }
  };
  



  // const matchesGroupedByHeading = matchData.reduce((acc, match) => {
  //   if (!acc[match.heading]) {
  //     acc[match.heading] = [];
  //   }
  //   acc[match.heading].push(match);
  //   return acc;
  // }, {});



  // Group matches by league
  const matchesGroupedByLeague = matchLive?.data?.reduce((acc, match) => {
    if (!match) return acc;
    const leagueName = match.league;
    if (!acc[leagueName]) {
      acc[leagueName] = {
        logo: match.logo,
        fixtures: []
      };
    }
    acc[leagueName].fixtures.push(...match.fixtures);
    return acc;
  }, {}) || {}; // Fallback to an empty object if matchLive.data is undefined
  
  



  // const [currentPageName, setCurrentPageName] = useState("Live");


   //
  // Function to get an array of dates with today in the middle
  const getDates = () => {
    const dates = [];
    const today = new Date();
    const isMobile = window.innerWidth <= 768; // You can adjust this value according to your design breakpoints
    const daysRange = isMobile ? 3 : 7;
  
    // Get dates for the past `daysRange` days
    for (let i = daysRange; i > 0; i--) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      dates.push(pastDate);
    }
  
    // Add today
    dates.push(today);
  
    // Get dates for the next `daysRange` days
    for (let i = 1; i <= daysRange; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      dates.push(futureDate);
    }
  
    return dates;
  };
  




  return (
    <>
    {
    isDataloading ? <Loading /> :
      <div className="space-y-4">
        {Object.keys(matchesGroupedByLeague).map((heading) => {
          const { "logo": leagueImage, fixtures } = matchesGroupedByLeague[heading];
          
          return (
            <div key={heading} className="w-full py-2 mb-4">              
              <div className='flex justify-between'>
                <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>
                  <img src={leagueImage} alt="Competition Image" className="mr-2 h-3" />
                  <p className="text-xs text-white hover:text-scGreen">
                    {parse(heading)}
                  </p>
                </div>
                <div className='flex justify-end mx-3' style={{ width: '60px' }}>
                  <PushPinOutlinedIcon className="cursor-pointer text-scMenuText hover:text-scGreen" />
                </div>
              </div>              
              <div className="space-y-2 mt-2 bg-scBackground rounded-lg p-3">
                {fixtures.map((match, index) => (
                  <div key={index} className="text-scMenuText cursor-pointer">
                    <div className='flex'>
                      <p className="flex items-center justify-start text-scTimeText" style={{ width: '60px' }}>{match.time}</p>
                      <div className='md:flex w-full justify-center mx-4 hidden '>
                        <div className='flex w-4/12 md:w-5/12 justify-end'>
                          <p className='text-white text-right'>{match.homeTeam}</p>
                        </div>
                        <div className='flex w-5/12 md:w-2/12 justify-center items-center '>
                          <p className='mx-8 text-center text-scGreen'>
                            {/* {match.time === 'FT' ? match.home_score : ''} {match.time !== 'FT' ? 'vs.' : '-'} {match.time === 'FT' ? match.away_score : ''} */}
                            {match.status}                            
                          </p>
                        </div>
                        <div className='flex w-4/12 md:w-5/12 justify-start'>
                          <p className='text-white text-left'>{match.awayTeam}</p>
                        </div>
                      </div>
                      <div className='md:hidden flex flex-col w-full px-2 mx-2'>
                        <div className='flex w-full justify-between'>
                          <p className='text-white'>{match.homeTeam}</p>
                          {/* <p className='text-center text-scGreen'>{match.status === 'FT' ? match.home_score : ''}</p> */}
                        </div>
                        <div className='flex w-full justify-between'>
                          <p className='text-white'>{match.awayTeam}</p>
                          {/* <p className='text-center text-scGreen'>{match.status === 'FT' ? match.away_score : ''}</p> */}
                        </div>
                      </div>
                      <p className="cursor-pointer flex items-center justify-end" style={{ width: '60px' }}>
                        <StarBorderIcon className='hover:text-scGreen' />
                      </p>
                    </div>
                    {index !== fixtures.length - 1 && (
                      <hr className="border-1 border-scHr mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      }
    </>
  );
  
}
