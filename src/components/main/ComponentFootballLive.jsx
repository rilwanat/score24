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

import LeagueModal from './modals/LeagueModal';

export default function ComponentFootballLive({ currentPageName, setPageName, showingForDate,
  setSpecific }) {
  const navigate = useNavigate();  

  // alert(showingForDate);
  //notification modal
  const [notificationType, setNotificationType] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [matchArray, setMatchArray] = useState([]);
  const [matchHeadingImage, setMatchHeadingImage] = useState('');
  const openNotificationModal = (type, title, message, match, headingImage) => {
    alert(JSON.stringify(match), null, 2);
    setNotificationType(type);
    setNotificationTitle(title);
    setNotificationMessage(message);

    setMatchArray(match);
    setMatchHeadingImage(headingImage);
  
    setIsNotificationModalOpen(true);
  };
  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);  
  };
  //notification modal

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
  



  const extractHref = (htmlString) => {
    const match = htmlString.match(/href="([^"]*)"/);
    return match ? match[1] : '#'; // Return a default '#' if no href is found
  };




  return (
    <>
    {
    isDataloading ? <Loading /> :
      <div className="space-y-4">
        {Object.keys(matchesGroupedByLeague).map((heading) => {
          const { "logo": leagueImage, fixtures } = matchesGroupedByLeague[heading];

          const href = extractHref(heading);
          
          return (
            <div key={heading} className="w-full py-2 mb-4">              
              <div className='flex justify-between'>
                <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer' 
                  onClick={() =>
                    {                
                      setPageName("Specific");  
                      setSpecific(href);
                    }
                  }
                >
                  <img src={leagueImage} alt="Competition Image" className="mr-2 h-3"  style={{ width: '20px', height: '20px' }}/>
                  <p className="text-xs text-white hover:text-scGreen">
                    {/* {parse(heading)} */}
                    {/* {heading} */}
                    {heading.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                </div>
                <div className='flex justify-end mx-3' style={{ width: '60px' }}>
                  <PushPinOutlinedIcon className="cursor-pointer text-scMenuText hover:text-scGreen" />
                </div>
              </div>              
              <div className="space-y-2 mt-2 bg-scBackground rounded-lg p-3">
                {fixtures.map((match, index) => (
                  <div key={index} className="text-scMenuText cursor-pointer"
                  onClick={() => openNotificationModal(false, currentPageName, "response.data.message", match, leagueImage)}
                  >
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
      <LeagueModal
              isOpen={isNotificationModalOpen}
              onRequestClose={closeNotificationModal}
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
              matchArray={matchArray}
              matchHeadingImage={matchHeadingImage}
            />
    </>
  );
  
}
