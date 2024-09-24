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

// import LeagueModal from './modals/LeagueModal';



export default function PopularResultsComponent({ 
  isResultsDataloading, popularLeagueName, groupResults, openNotificationModal
 }) {


  const getFixtureDate = (fixtureDateString) => {
    const date = fixtureDateString.split(' ')[0]; // Splitting the date and time by space and taking the date part
    return date;
  };

  // const getFixtureTime = (fixtureDateString) => {
  //   const time = fixtureDateString.split(' ')[1]; // Splitting the date and time by space and taking the time part
  //   return time;
  // };

  const getFixtureTime = (fixtureDateString) => {
    // Extracting the time part (HH:mm:ss)
    const time = fixtureDateString.split(' ')[1]; 
  
    // Splitting the time into hours and minutes only
    const [hours, minutes] = time.split(':');
  
    // Returning the time in HH:mm format
    return `${hours}:${minutes}`;
  };

  const handleClick = (currentPageName, matchArray, headingImage) => {
    const route = '/specific-league';
    
    const params = new URLSearchParams({
      matchArray: JSON.stringify(matchArray), // Convert array to JSON string
      matchHeadingImage: headingImage,
    }).toString(); // Convert data object to query string
  
    const newWindow = window.open(currentPageName, '_blank', 'width=800,height=600'); // Open a new window
  
    if (newWindow) {
      newWindow.location.href = `${window.location.origin}${route}?${params}`; // Set the URL of the new window with query parameters
    }
  };
  

  return (
    <>
    {
    isResultsDataloading ? <Loading /> :
      <div className="space-y-4">

        <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>
          {/* <img src={fixture.logo} alt="Competition Image" className="mr-2 h-3" />  */}
          <p className="text-xl text-white hover:text-scGreen">
            {popularLeagueName}
          </p>
        </div>


        {Object.keys(groupResults()).map((date) => {
            const fixtures = groupResults()[date];
          
          return (
            <div key={date} className="w-full py-2 mb-4"> 
              <h2 className="text-lg text-white">{date}</h2>


              {
              fixtures.map((fixture, index) => (
                
                <>
                {/* <div key={index} className='flex justify-between mt-4'>
                  <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>
                    <img src={fixture.logo} alt="Competition Image" className="mr-2 h-3" /> 
                    <p className="text-sm text-white hover:text-scGreen">
                      {fixture.heading}
                    </p>
                  </div>
                  <div className='flex justify-end mx-3' style={{ width: '60px' }}>
                    <PushPinOutlinedIcon className="cursor-pointer text-scMenuText hover:text-scGreen" />
                  </div>
                </div> */}
                <div className="space-y-2 mt-2 bg-scBackground rounded-lg p-3">
                {/* {league.fixtures.map((match, index) => ( */}
                  <div  className="text-scMenuText cursor-pointer"
                  onClick={() => 
                    handleClick(popularLeagueName, fixture, "") 
                    // openNotificationModal(false, "currentPageName", "response.data.message", fixture, "leagueImage")
                  }
                  >
                    <div className='flex' style={{ fontSize: '16px' }}>
                      <p className="flex items-center justify-start text-scTimeText" style={{ width: '60px' }}>
                        {/* {getFixtureDate(fixture.fixture_date)}  */}
                        {getFixtureTime(fixture.fixture_date)}
                        </p>
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
                          <p className='text-center text-scGreen'>{fixture.status === 'FT' ? fixture.home_score : ''}</p>
                        </div>
                        <div className='flex w-full justify-between'>
                          <p className='text-white'>{fixture.away_team}</p>
                          <p className='text-center text-scGreen'>{fixture.status === 'FT' ? fixture.away_score : ''}</p>
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