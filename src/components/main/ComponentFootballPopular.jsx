import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// import headingImage from '../../assets/svg/1x1.svg';

import axios from 'axios';
// import axiosInstance from '../../axiosConfig';

import parse from 'html-react-parser';
import Loading from './Loading';

export default function ComponentFootballPopular({ showingForDate, popularLeagueId, popularLeagueName }) {
  
  const [isDataloading, setIsDataLoading] = useState(true);
  const [matchPopular, setMatchPopular] = useState([]);
  useEffect(() => {
    handlePopular();
  }, [popularLeagueId]);
  const handlePopular = async () => {
    setIsDataLoading(true);
    try {
       const requestBody = {
        "leagueId": popularLeagueId,
        "leagueTitle": popularLeagueName
       };
  
      const endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_POPULAR_LEAGUES;
      // alert(endpoint);
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setIsDataLoading(false);
      // alert("ok");
      alert(JSON.stringify(response.data, null, 2));
      // alert(response.data[0].length);
      // if (response.data) {
      //   // Ensure response.data has the structure you expect
        setMatchPopular(response.data);
      // } else {
      //   alert("Unexpected response structure.");
      // }
  
    } catch (error) {
      // setMatchDataData([]); set live to globally
      setIsDataLoading(false);
      alert("Popular: An unexpected error occurred. " + error);
    }
  };
  


  const groupFixturesByDate = () => {
    if (!matchPopular || matchPopular.length === 0) return {};

    return matchPopular.reduce((acc, league) => {
      if (!league.fixtures || league.fixtures.length === 0) return acc;

      league.fixtures.forEach(fixture => {
        const date = fixture.fixture_date;

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push({
          heading: league.heading,
          logo: league["heading image"],
          fixture_time: fixture.fixture_time,
          home_team: fixture.home_team,
          away_team: fixture.away_team,
          home_score: fixture.home_score,
          away_score: fixture.away_score,
          status: fixture.status,
          league_name: fixture.league_name,
        });
      });

      return acc;
    }, {});
  };
    


  return (
    <>
    {
    isDataloading ? <Loading /> :
      <div className="space-y-4">
        {Object.keys(groupFixturesByDate()).map((date) => {
            const fixtures = groupFixturesByDate()[date];
          
          return (
            <div key={date} className="w-full py-2 mb-4"> 
              <h2 className="text-lg text-white">{date}</h2>


              {
              fixtures.map((fixture, index) => (
                
                <>
                {/* <div key={index} className='flex justify-between mt-4'>
                  <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>
                    <img src={fixture.logo} alt="Competition Image" className="mr-2 h-3" /> 
                    <p className="text-xs text-white hover:text-scGreen">
                      {fixture.heading}
                    </p>
                  </div>
                  <div className='flex justify-end mx-3' style={{ width: '60px' }}>
                    <PushPinOutlinedIcon className="cursor-pointer text-scMenuText hover:text-scGreen" />
                  </div>
                </div> */}
                <div className="space-y-2 mt-2 bg-scBackground rounded-lg p-3">
                {/* {league.fixtures.map((match, index) => ( */}
                  <div  className="text-scMenuText cursor-pointer">
                    <div className='flex'>
                      <p className="flex items-center justify-start text-scTimeText" style={{ width: '60px' }}>{fixture.fixture_time}</p>
                      <div className='md:flex w-full justify-center mx-4 hidden '>
                        <div className='flex w-4/12 md:w-5/12 justify-end'>
                          <p className='text-white text-right'>{fixture.home_team}</p>
                        </div>
                        <div className='flex w-5/12 md:w-2/12 justify-center items-center '>
                          <p className='mx-8 text-center text-scGreen'>
                            {/* {fixture.status}                       */}
                            {fixture.status === 'FT' ? fixture.home_score : ''} {fixture.status !== 'FT' ? 'vs.' : '-'} {fixture.status === 'FT' ? fixture.away_score : ''}        
                          </p>
                        </div>
                        <div className='flex w-4/12 md:w-5/12 justify-start'>
                          <p className='text-white text-left'>{fixture.away_team}</p>
                        </div>
                      </div>
                      <div className='md:hidden flex flex-col w-full px-2 mx-2'>
                        <div className='flex w-full justify-between'>
                          <p className='text-white'>{fixture.home_team}</p>
                        </div>
                        <div className='flex w-full justify-between'>
                          <p className='text-white'>{fixture.away_team}</p>
                        </div>
                      </div>
                      <p className="cursor-pointer flex items-center justify-end" style={{ width: '60px' }}>
                        <StarBorderIcon className='hover:text-scGreen' />
                      </p>
                    </div>
                    {/* {index !== fixtures.length - 1 && (
                      <hr className="border-1 border-scHr mt-2" />
                    )} */}
                  </div>
                {/* ))} */}
                </div>
              </>
                
              ))
              }


                          
              {/*  */}
            </div>
          );
        })}
      </div>
      }
    </>
  );
  
}