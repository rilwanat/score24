import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import competitionImage from '../../assets/svg/1x1.svg';

import ComponentFootball from "./ComponentFootball";
import ComponentBasketball from "./ComponentBasketball";

import ComponentFootballLive from "./ComponentFootballLive";
// import ComponentFootballFavourites from "./ComponentFootballFavourites";


import axios from 'axios';
// import axiosInstance from '../../axiosConfig';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import parse from 'html-react-parser';
import Loading from './Loading';



export default function MainContent({ setCategory, currentCategory, isMobile }) {
  const navigate = useNavigate();
  const [currentPageName, setCurrentPageName] = useState("Home");


  
  // Format the dates as 'YYYY-MM-DD'
  const formatDateAsISO = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [showingForDate, setShowingForDate] = useState(formatDateAsISO(new Date()));

  

  // Debounced date setter to improve performance
  const debouncedSetShowingForDate = useCallback(
    (date) => {
      const formattedDate = formatDateAsISO(date);
      setShowingForDate(formattedDate);
    },
    [formatDateAsISO]
  );

  const setTheDateToShow = (date) => {
    debouncedSetShowingForDate(date);
  };






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
  // Wednesday, Aug 21
  const formatDate0 = (date) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

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


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 15, // Adjust based on how many dates to show at once
    slidesToScroll: 1,
    arrows: false, // Disable the arrows
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5, // Adjust for mobile view
          slidesToScroll: 1,
        }
      }
    ]
  };




  

  const [isDataloading, setIsDataLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [matchLive, setMatchLive] = useState([]);



  // order in ascending
  const matchesGroupedByHeading = matchData.reduce((acc, match) => {
    if (!acc[match.heading]) {
      acc[match.heading] = {
        "heading image": match['heading image'], // Add the heading image
        fixtures: [] // Initialize an empty array for fixtures
      };
    }
    // Add the fixtures array directly
    acc[match.heading].fixtures.push(...match.fixtures);
    return acc;
  }, {});
  
  // Sort the grouped data by heading in ascending order
  const sortedMatchesGroupedByHeading = Object.keys(matchesGroupedByHeading)
    .sort((a, b) => a.localeCompare(b))  // Sort the headings in ascending order
    .reduce((sortedAcc, heading) => {
      sortedAcc[heading] = matchesGroupedByHeading[heading]; // Rebuild the sorted object
      return sortedAcc;
    }, {});
  
  
  useEffect(() => {
    handleData(showingForDate);
    handleLive();
  }, [showingForDate]);
  const handleData = async (showingForDate) => {    
    
    // setCurrentPage(1);
    setIsDataLoading(true);
    try {
      // Prepare the request body
      const requestBody = {
        date: showingForDate
      };


      var endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_FOOTBALL_MATCH_DATA;
      // alert(endpoint + "  " + JSON.stringify(requestBody, null, 2));
      // const response = await axiosInstance.get(endpoint, { //requestBody, {
        const response = await axios.post(endpoint, requestBody, {
          //params: { uid: uid },
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`,
          },
        });

      setIsDataLoading(false);
      // alert(JSON.stringify(response, null, 2));

      // if (response.data.status) {
        
      setMatchData(response.data);
        //  console.log(response.data);
      //   // alert(response.data.doctors.length);


      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsDataLoading(false);

      // alert(error);
    
      // // Check if the error has a response and if the response has a data object
      // if (error.response && error.response.data) {
      //   const errorMessage = error.response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // } else {
      //   // Handle other types of errors (e.g., network errors)
      //   alert("An unexpected error occurred.");
      //   // openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
      // }
    }
  };

  const handleLive = async () => {    
    
    // setCurrentPage(1);
    setIsDataLoading(true);
    try {
      // Prepare the request body
      const requestBody = {
        date: showingForDate
      };


      var endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_FOOTBALL_LIVE;
      // alert(endpoint + "  " + JSON.stringify(requestBody, null, 2));
      // const response = await axiosInstance.get(endpoint, { //requestBody, {
        const response = await axios.post(endpoint, { //requestBody, {
          //params: { uid: uid },
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`,
          },
        });

      setIsDataLoading(false);
      // alert(JSON.stringify(response, null, 2));

      // if (response.data.status) {
        
      setMatchLive(response.data);
        //  console.log(response.data);
      //   // alert(response.data.doctors.length);


      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsDataLoading(false);

      // alert(error);
    
      // // Check if the error has a response and if the response has a data object
      // if (error.response && error.response.data) {
      //   const errorMessage = error.response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // } else {
      //   // Handle other types of errors (e.g., network errors)
      //   alert("An unexpected error occurred.");
      //   // openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
      // }
    }
  };




  return (
    <div className='bg-scDarkerBackground
     md:px-4 lg:px-16 xl:px-24 2xl:px-80  md:py-4  pb-4 
    flex flex-col md:flex-row '>

        <div className='hidden md:flex flex-col justify-start md:mr-4    w-full md:w-1/6'>
            <div className='bg-scBackground rounded-lg w-full '>
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setCurrentPageName("Home")}>
                  {currentPageName == "Home" ? <div className='bg-scGreen mr-3.5' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-4'></div>}
                  <p className={`text-xs hover:text-scGreen ${currentPageName === 'Home' ? 'text-scGreen' : 'text-white'}`}>Home</p>
                </div>
                <hr className="border-1.5 border-gray-900  mt-2 mb-1" />
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setCurrentPageName("Live")}>
                  {currentPageName == "Live" ? <div className='bg-scGreen mr-3.5' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-4'></div>}
                  <p className={`text-xs hover:text-scGreen ${currentPageName === 'Live' ? 'text-scGreen ' : 'text-white'}`}>Live {' (' + (matchLive?.liveMatchCount || '-') + ')'}
                  </p>
                </div>
                <hr className="border-1.5 border-gray-900  mt-2 mb-1" />
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setCurrentPageName("Favourites")}>
                  {currentPageName == "Favourites" ? <div className='bg-scGreen mr-3.5' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-4'></div>}
                  <p className={`text-xs hover:text-scGreen ${currentPageName === 'Favourites' ? 'text-scGreen ' : 'text-white'}`}>Favourites</p>
                </div>
            </div>
            <div className='bg-scBackground rounded-lg w-full p-4 my-4 '>
                <div className='cursor-pointer'><p className='text-xs text-white mb-2 py-1'>Popular</p></div>
                <hr className="border-1.5 border-gray-900  mt-2" />
            </div>
            <div className='bg-scBackground rounded-lg w-full p-4 my-4 '>
                <p className='text-xs text-white'>All (A-Z)</p>
                {
    isDataloading ? 
    <Loading /> 
    // <></>
    :
      <div className="space-y-4">
        {Object.keys(matchesGroupedByHeading).map((heading) => {
          const { "heading image": headingImage, fixtures } = matchesGroupedByHeading[heading];
          
          return (
            <div key={heading} className="w-full py-2 my-4">              
              <div className='flex '>
                <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>
                  <img src={headingImage} alt="Competition Image" className="mr-2 h-3" />
                  <p className="text-xs text-white hover:text-scGreen">
                    {parse(heading)}
                  </p>
                </div>
              </div> 
            </div>
          );
        })}
      </div>
      // <></>
      }
            </div>
        </div>

        <div className='flex flex-col w-full'>
            <div className='hidden md:flex justify-center bg-scBackground rounded-lg w-full p-4 mb-4  hover:bg-scBackgroundHover cursor-pointer'>
                <div className='flex items-center justify-center'>
                  {/* <p className='text-xs text-white mr-2'>{formatDate0(new Date()).toUpperCase()}</p> */}
                  <p className='text-xs text-white mr-2'>{formatDate0(new Date()).toUpperCase()}</p>
                  <CalendarMonthIcon style={{ width: '18px', height: '18px', color: '#FFFFFF' }}/>
                </div>
            </div>
            
            {/* <div className='flex w-full bg-scBackground'>
              {dates.map((date, index) => {
                const isToday = date.toDateString() === new Date().toDateString();
                
                return(
                <div 
                  key={index}
                  className='  w-full px-1 py-2  hover:bg-scBackgroundHover cursor-pointer'
                >
                  <div className='flex items-center justify-center w-full bg-red-100'>
                    <p className={`text-xs ${isToday ? 'text-scGreen' : 'text-scMenuText'} text-center`}>{formatDate1(date)}</p>
                    <p className={`text-xs ${isToday ? 'text-scGreen' : 'text-scMenuText'} text-center`}>{formatDate2(date)}</p>
                  </div> 
                </div>
              )
              })}
            </div>*/}
            
            {
              // !false ? 
              currentPageName === "Home" ?
            <div className=' w-full bg-scBackground '>
              <Slider {...settings} className="">
                {dates.map((date, index) => {
                  // const isToday = date.toDateString() === new Date().toDateString(); 
                  const isToday = showingForDate === formatDateAsISO(date); 

                  // "2024-09-08"
                  return(
                  <div 
                    key={index} 
                    className="  w-full px-1 py-2  hover:bg-scBackgroundHover cursor-pointer "
                    onClick={() => setTheDateToShow(date)}
                  >
                    <div className="flex flex-col items-center  p-1 bg-scBackgroundHover ">
                      <span className={`text-xs ${isToday ? 'text-scGreen' : 'text-scMenuText'} text-center`}>{formatDate1(date)}</span>
                      <span className={`text-xs ${isToday ? 'text-scGreen' : 'text-scMenuText'} text-center`}>{formatDate2(date)}</span>
                    </div>
                  </div>
                  )
                  })}
              </Slider>
            </div>
            :
            <></>
            }
            

            
            {
              (currentCategory == 'Football') ?  
              (currentPageName === 'Home' ? <ComponentFootball showingForDate={showingForDate} /> :
               currentPageName === 'Live' ? <ComponentFootballLive showingForDate={showingForDate} /> :
                // <ComponentFootballFavourites showingForDate={showingForDate} />
                <></>
              )
              : currentCategory == 'Basketball' ?  <ComponentBasketball />
              : <></>
            }

        </div>
    </div>
  );
}
