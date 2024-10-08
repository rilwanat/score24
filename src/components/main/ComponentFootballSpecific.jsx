import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// // import headingImage from '../../assets/svg/1x1.svg';

import axios from 'axios';
// import axiosInstance from '../../axiosConfig';

import parse from 'html-react-parser';
import Loading from './Loading';

// import LeagueModal from './modals/LeagueModal';


export default function ComponentFootballSpecific({ currentPageName, setPageName, showingForDate,
  specificLeague
 }) {
  const navigate = useNavigate();  

  // alert(showingForDate);
  // alert(showingForDate);

  //notification modal
  const [notificationType, setNotificationType] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [matchArray, setMatchArray] = useState([]);
  const [matchHeadingImage, setMatchHeadingImage] = useState('');
  const openNotificationModal = (type, title, message, match, headingImage) => {
    
    // match.heading = heading;
    // alert(JSON.stringify(match), null, 2);

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
  // const [matchData, setMatchDataData] = useState([]);
  const [matchSpecificLeague, setMatchSpecificLeague] = useState([]);
  useEffect(() => {
    handleSpecificLeague(specificLeague);
  }, []);



  // // const matchesGroupedByHeading = matchData.reduce((acc, match) => {
  // //   if (!acc[match.heading]) {
  // //     acc[match.heading] = [];
  // //   }
  // //   acc[match.heading].push(match);
  // //   return acc;
  // // }, {});

  // const matchesGroupedByHeading = matchData.reduce((acc, match) => {
  //   if (!acc[match.heading]) {
  //     acc[match.heading] = {
  //       "heading image": match['heading image'],  // Add the heading image
  //       fixtures: []  // Initialize an empty array for fixtures
  //     };
  //   }
  //   // Add the fixtures array directly
  //   acc[match.heading].fixtures.push(...match.fixtures);
  //   // alert(JSON.stringify(acc), null, 2);
  //   return acc;
  // }, {});
  



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
  

  // // Format the dates as 'Day, Month Date' (e.g., 'Wednesday, Aug 21')
  // const formatDate = (date) => {
  //   return date.toLocaleDateString('en-US', {
  //     weekday: 'long',
  //     month: 'short',
  //     day: 'numeric',
  //   }).toUpperCase();
  // };

  // const dates = getDates();
  // //

  // Format the dates as 'FRI' (weekday only)
  const formatDate1 = (date) => {
    const options = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  // Format the dates as 'Aug 16' (month and day only)
  const formatDate2 = (date) => {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const dates = getDates();



  const handleSpecificLeague = async (leagueEndpoint) => {    
    
    // setCurrentPage(1);
    setIsDataLoading(true);
    try {
      // // Prepare the request body
      // const requestBody = {
      //   date: showingForDate
      // };


      // var endpoint = process.env.REACT_APP_API_URL + leagueEndpoint;
      var endpoint = leagueEndpoint;
      // alert("!! -> " + endpoint);
      // return;
      // alert(endpoint + "  " + JSON.stringify(requestBody, null, 2));
      // const response = await axiosInstance.get(endpoint, { //requestBody, {
        const response = await axios.get(endpoint, { //requestBody, {
          //params: { uid: uid },
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`,
          },
        });

      setIsDataLoading(false);
      // alert(JSON.stringify(response.data, null, 2));

      // if (response.data.status) {
        
      setMatchSpecificLeague(response.data);
        //  console.log(response.data);
        // alert(JSON.stringify(response.data, null, 2));


      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsDataLoading(false);
      alert("Specific: An unexpected error occurred. " + error);
    }
  };


  const extractHref = (htmlString) => {
    const match = htmlString.match(/href="([^"]*)"/);
    return match ? match[1] : '#'; // Return a default '#' if no href is found
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
  isDataloading ? <Loading /> : 
    <div className="space-y-4">
      {matchSpecificLeague.data.map((league, index) => {
        const { heading, fixtures } = league;

        return (
          <div key={heading} className="w-full py-2 my-4">              
            <div className='flex justify-between'>
              <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>

                {/* <img src={headingImage} alt="Competition Image" className="mr-2 h-3" /> */}

                <p className="text-sm text-white hover:text-scGreen" style={{ fontSize: '16px' }}>
                  {heading}
                </p>
              </div>
              <div className='flex justify-end mx-3' style={{ width: '60px' }}>
                <PushPinOutlinedIcon className="cursor-pointer text-scMenuText hover:text-scGreen" />
              </div>
            </div>              
            <div className="space-y-2 mt-2 bg-scBackground rounded-lg p-3">
              {fixtures.map((match, matchIndex) => (
                <div key={match.home_team + match.away_team} className="text-scMenuText cursor-pointer"
                // onClick={() => openNotificationModal(false, currentPageName, "response.data.message", matchSpecific, leagueImage)}
                onClick={() => 
                  handleClick(currentPageName, match, "") 
                    // openNotificationModal(false, currentPageName, "response.data.message", match, "")
                }
                >
                  <div className='flex' style={{ fontSize: '16px' }}>
                    <p className="flex items-center justify-start text-scTimeText" style={{ width: '60px' }}>{match.time}</p>
                    <div className='md:flex w-full justify-center mx-4 hidden '>
                      <div className='flex w-4/12 md:w-5/12 justify-end'>
                        <p className='text-white text-right'>{match.home_team}</p>
                      </div>
                      <div className='flex w-5/12 md:w-2/12 justify-center items-center '>
                        <p className='mx-8 text-center text-scGreen'>
                          {match.status === 'FT' ? match.home_score : ''} {match.status !== 'FT' ? 'vs.' : '-'} {match.status === 'FT' ? match.away_score : ''}
                        </p>
                      </div>
                      <div className='flex w-4/12 md:w-5/12 justify-start'>
                        <p className='text-white text-left'>{match.away_team}</p>
                      </div>
                    </div>
                    <div className='md:hidden flex flex-col w-full px-2 mx-2'>
                      <div className='flex w-full justify-between'>
                        <p className='text-white'>{match.home_team}</p>
                        <p className='text-center text-scGreen'>{match.status === 'FT' ? match.home_score : ''}</p>
                      </div>
                      <div className='flex w-full justify-between'>
                        <p className='text-white'>{match.away_team}</p>
                        <p className='text-center text-scGreen'>{match.status === 'FT' ? match.away_score : ''}</p>
                      </div>
                    </div>
                    <p className="cursor-pointer flex items-center justify-end" style={{ width: '60px' }}>
                      <StarBorderIcon className='hover:text-scGreen' />
                    </p>
                  </div>
                  {matchIndex !== fixtures.length - 1 && (
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
{/* <LeagueModal
              isOpen={isNotificationModalOpen}
              onRequestClose={closeNotificationModal}
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
              matchArray={matchArray}
              matchHeadingImage={matchHeadingImage}
            /> */}
    </>
  );
  
}
