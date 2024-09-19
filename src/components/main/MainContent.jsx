import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import competitionImage from '../../assets/svg/1x1.svg';

import ComponentFootball from "./ComponentFootball";
import ComponentBasketball from "./ComponentBasketball";

import ComponentFootballLive from "./ComponentFootballLive";
import ComponentFootballFavourites from "./ComponentFootballFavourites";
import ComponentFootballPopular from "./ComponentFootballPopular";
import ComponentFootballSpecific from "./ComponentFootballSpecific";


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // Import arrow icons


import axios from 'axios';
// import axiosInstance from '../../axiosConfig';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import parse from 'html-react-parser';
import Loading from './Loading';


import popularLeagues from './data/popularLeagues';

export default function MainContent({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory,
  specificLeague, setSpecific
 }) {

  const [isAZOpen, setIsAZOpen] = useState(true);
  const toggleAzDropdown = () => {
    alert("");
    // setIsAZOpen(!isAZOpen); // Toggle country dropdown
  };

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



  const [popularLeagueId, setPopularLeagueId] = useState("");
  const [popularLeagueName, setPopularLeagueName] = useState(""); 


  // State to track which league dropdown and country dropdown is open
  const [openLeague, setOpenLeague] = useState(null);
  const [openCountry, setOpenCountry] = useState(null);

  const toggleLeagueDropdown = (leagueTitle) => {
    setOpenLeague(openLeague === leagueTitle ? null : leagueTitle); // Toggle league dropdown
  };

  const toggleCountryDropdown = (country) => {
    setOpenCountry(openCountry === country ? null : country); // Toggle country dropdown
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
  // const [matchSortByAlphabet, setMatchSortByAlphabet] = useState([]);
  const [matchSortByCountry, setMatchSortByCountry] = useState([]);
  const [matchSpecificLeague, setMatchSpecificLeague] = useState([]);


  //
  // const matchesGroupedByHeading = matchSortByAlphabet.reduce((acc, match) => {
  //   const matchesGroupedByHeading = matchSortByCountry.reduce((acc, match) => {
  //   if (!acc[match.heading]) {
  //     acc[match.heading] = {
  //       "heading image": match['heading image'], // Add the heading image
  //       fixtures: [] // Initialize an empty array for fixtures
  //     };
  //   }
  //   // Add the fixtures array directly
  //   acc[match.heading].fixtures.push(...match.fixtures);
  //   return acc;
  // }, {});
  
  // // Sort the grouped data by heading in ascending order
  // const sortedMatchesGroupedByHeading = Object.keys(matchesGroupedByHeadingSortByAlphabet)
  //   .sort((a, b) => a.localeCompare(b))  // Sort the headings in ascending order
  //   .reduce((sortedAcc, heading) => {
  //     sortedAcc[heading] = matchesGroupedByHeadingSortByAlphabet[heading]; // Rebuild the sorted object
  //     return sortedAcc;
  //   }, {});

  //   // // Return data by heading as is
  // const unsortedMatchesGroupedByHeading = Object.keys(matchesGroupedByHeadingSortByAlphabet)
  // .reduce((sortedAcc, heading) => {
  //   sortedAcc[heading] = matchesGroupedByHeadingSortByAlphabet[heading]; // Rebuild the object without sorting
  //   return sortedAcc;
  // }, {});

  
  
  useEffect(() => {
    handleData(showingForDate);
    handleLive();
    // handleSortByAlphabet();
    handleSortByCountryAlphabet(showingForDate);
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



      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsDataLoading(false);
      alert("An unexpected error occurred. " + error);
    }
  };

  const handleLive = async () => {    
    
    // setCurrentPage(1);
    setIsDataLoading(true);
    try {
      // // Prepare the request body
      // const requestBody = {
      //   date: showingForDate
      // };


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



      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsDataLoading(false);
      alert("Live: An unexpected error occurred. " + error);
    }
  };


  const handleSortByCountryAlphabet = async (showingForDate) => {    
    

    // setCurrentPage(1);
    setIsDataLoading(true);
    try {
      // Prepare the request body
      const requestBody = {
        date: showingForDate
      };


      var endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_SORT_BY_COUNTRY_ALPHABET;
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
      //  alert(JSON.stringify(response, null, 2));

      // if (response.data.status) {
        
      setMatchSortByCountry(response.data);
        //  console.log(response.data);



      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsDataLoading(false);
      alert("Country: An unexpected error occurred. " + error);
    }
  };

  const handleSpecificLeague = async (leagueEndpoint) => {    
    
    // setCurrentPage(1);
    setIsDataLoading(true);
    try {
      // // Prepare the request body
      // const requestBody = {
      //   date: showingForDate
      // };


      var endpoint = process.env.REACT_APP_API_URL + leagueEndpoint;
      // alert(endpoint);
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
      alert(JSON.stringify(response, null, 2));

      // if (response.data.status) {
        
      setMatchSpecificLeague(response.data);
        //  console.log(response.data);



      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsDataLoading(false);
      alert("League: An unexpected error occurred. " + error);
    }
  };


  const extractHref = (htmlString) => {
    const match = htmlString.match(/href="([^"]*)"/);
    return match ? match[1] : '#'; // Return a default '#' if no href is found
  };


  return (
    <div className='bg-scDarkerBackground
     md:px-4 lg:px-16 xl:px-24 2xl:px-80  md:py-4  pb-4 
    flex flex-col md:flex-row '>

        <div className='hidden md:flex flex-col justify-start md:mr-4    w-full md:w-1/6'>
            <div className='bg-scBackground rounded-lg w-full '>
                <div className='cursor-pointer flex items-center mb-2  pt-3 pb-1' onClick={() => setPageName("Home")}>
                  {currentPageName == "Home" ? <div className='bg-scGreen mr-3.5' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-4'></div>}
                  <p className={`text-xs hover:text-scGreen ${currentPageName === 'Home' ? 'text-scGreen' : 'text-white'}`}>Home</p>
                </div>
                <hr className="border-1.5 border-gray-900  mt-2 mb-1" />
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setPageName("Live")}>
                  {currentPageName == "Live" ? <div className='bg-scGreen mr-3.5' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-4'></div>}
                  <p className={`text-xs hover:text-scGreen ${currentPageName === 'Live' ? 'text-scGreen ' : 'text-white'}`}>Live {' (' + (matchLive?.liveMatchCount || '-') + ')'}
                  </p>
                </div>
                <hr className="border-1.5 border-gray-900  mt-2 mb-1" />
                <div className='cursor-pointer flex items-center mb-2 py-1' onClick={() => setPageName("Favourites")}>
                  {currentPageName == "Favourites" ? <div className='bg-scGreen mr-3.5' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-4'></div>}
                  <p className={`text-xs hover:text-scGreen ${currentPageName === 'Favourites' ? 'text-scGreen ' : 'text-white'}`}>Favourites</p>
                </div>
            </div>
            <div className='bg-scBackground rounded-lg w-full pt-2 my-4 '>
                <div className='cursor-arrow flex items-center mb-2 py-1' 
                // onClick={() => setPageName("Popular")}
                >
                  {currentPageName == "Popular" ? <div className='bg-scGreen mr-3.5' style={{ width: '2px', height: '16px'}}></div> : <div className='ml-4'></div>}
                  <p className={`text-xs hover:text-scGreen ${currentPageName === 'Popular' ? 'text-scGreen ' : 'text-white'}`}>Popular</p>
                </div>
                <hr className="border-1.5 border-gray-900  mt-2" />
                <div className='ml-4 mb-4'>
                  <ul >
                  {Object.entries(popularLeagues).map(([league, id]) => (
                    <div className="flex items-center justify-between mt-2 cursor-pointer ">
                      <li key={id} className="text-xs text-white hover:text-scGreen cursor-pointer py-1"
                        onClick={() => 
                        {
                          setPopularLeagueId(id);
                          setPopularLeagueName(league);
                          // alert(league + " " + id);
                          setPageName("Popular");
                        }
                          }
                      >
                        {league.replace(/([A-Z])/g, ' $1').trim()}
                      </li>
                    </div>                    
                  ))}
                  </ul>
                </div>
                
            </div>
            <div className='bg-scBackground rounded-lg w-full py-4 pl-4 pr-2 my-4 '>
                <div className='flex justify-between  cursor-pointer'>
                  <p className='text-xs text-white' onClick={() => toggleAzDropdown()}>All (A-Z)</p>
                  {!isAZOpen ? (
                    <KeyboardArrowUpIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                    ) : (
                    <KeyboardArrowDownIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                    )}
                </div>
                {
    isDataloading ? 
    <Loading /> 
    // <></>
    :
    <div className="mt-1 ">
      {matchSortByCountry.map((countryData) => {
        const { country, leagues } = countryData;
        const isCountryOpen = openCountry === country; // Check if country dropdown is open

        return (
          <div key={country} className="w-full ">
            {/* Dropdown for Country */}
            <div
              className="flex items-center justify-between mt-2 cursor-pointer "
              // onClick={() => toggleCountryDropdown(country)} // Toggle on click
            >
              <label className="text-xs text-white hover:text-scGreen cursor-pointer py-1">{country}</label>
              {/* {isCountryOpen ? (
                <KeyboardArrowUpIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> // Up arrow when open
              ) : (
                <KeyboardArrowDownIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> // Down arrow when closed
              )} */}
            </div>

            {/* Show leagues if country is open */}
            {isCountryOpen && leagues.map((league) => {
              const { title, fixtures } = league;
              const href = extractHref(title);
              const isLeagueOpen = openLeague === title; // Check if league dropdown is open

              return (
                <div key={title} className="ml-2">
                  {/* Dropdown for Leagues */}
                  <div
                    className="flex items-center justify-between w-full ml-4 md:ml-0 cursor-pointer  py-1"
                    // onClick={() => toggleLeagueDropdown(title)} // Toggle on click
                  >
                    <p className="text-xs text-white hover:text-scGreen">
                      {title.replace(/<\/?[^>]+(>|$)/g, "")}
                    </p>
                    {/* {isLeagueOpen ? (
                      <KeyboardArrowUpIcon className="text-white hover:text-scGreen" style={{ width: '12px', height: '16px' }} /> // Up arrow when open
                    ) : (
                      <KeyboardArrowDownIcon className="text-white hover:text-scGreen" style={{ width: '12px', height: '16px' }}/> // Down arrow when closed
                    )} */}
                  </div>

                  {/* Dropdown content - Fixtures within the League */}
                  {isLeagueOpen && fixtures && fixtures.length > 0 ? (
                    <ul className=" ml-2  text-white ">
                      {fixtures.map((fixture, index) => (
                        <li key={index} className="text-xs hover:text-scGreen cursor-pointer my-1"
                          onClick={() =>
                            {                
                              setPageName("Specific");  
                              setSpecific(href);
                              // alert(JSON.stringify(fixtures), null, 2);
                              // alert(JSON.stringify(league), null, 2);
                            }
                          }
                        >
                          {fixture.homeTeam} vs {fixture.awayTeam} - {fixture.date} {fixture.time}
                        </li>
                      ))}
                    </ul>
                  ) : isLeagueOpen ? (
                    <p className="text-xs text-gray-400 ml-2">No fixtures available</p>
                  ) : null}
                </div>
              );
            })}
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
            
{/* {<h2 className='text-white'>{currentPageName}</h2>} */}
            
            {
              (currentCategory === 'Football') ?  
              (currentPageName === 'Home' ? <ComponentFootball setPageName={setPageName} showingForDate={showingForDate} specificLeague={specificLeague} setSpecific={setSpecific}/> :
               currentPageName === 'Live' ? <ComponentFootballLive setPageName={setPageName} showingForDate={showingForDate} specificLeague={specificLeague} setSpecific={setSpecific}/> :
               currentPageName === 'Favourites' ? <></> : //<ComponentFootballFavourites showingForDate={showingForDate} /> :
               currentPageName === 'Popular' ? <ComponentFootballPopular setPageName={setPageName} showingForDate={showingForDate} specificLeague={specificLeague} setSpecific={setSpecific} 
               popularLeagueId={popularLeagueId} popularLeagueName={popularLeagueName} 
               /> :
               currentPageName === 'Specific' ? <ComponentFootballSpecific setPageName={setPageName} showingForDate={showingForDate} specificLeague={specificLeague} setSpecific={setSpecific}/> :
                // <ComponentFootballFavourites showingForDate={showingForDate} />
                <></>
              )
              : currentCategory === 'Basketball' ?  <ComponentBasketball />
              : <></>
            }

        </div>
    </div>
  );
}
