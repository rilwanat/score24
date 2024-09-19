import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';
import stars from '../../../assets/images/stars.png';
import appStore from '../../../assets/svg/app-store-badge.svg';
import playStore from '../../../assets/svg/play-store-badge.svg';


import styles from './MobileNavbar.module.css';
import { NavLink } from 'react-router-dom';
import { navData } from './NavData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios';
// import axiosInstance from '../../axiosConfig';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // Import arrow icons


import parse from 'html-react-parser';
import Loading from '../Loading';

function MobileMenu({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory,
  specificLeague, setSpecific
 }) {


  const [isAZOpen, setIsAZOpen] = useState(true);
  const toggleAzDropdown = () => {
    setIsAZOpen(!isAZOpen); // Toggle country dropdown
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


 

  
  // State to track which league dropdown and country dropdown is open
  const [openLeague, setOpenLeague] = useState(null);
  const [openCountry, setOpenCountry] = useState(null);

  const toggleLeagueDropdown = (leagueTitle) => {
    setOpenLeague(openLeague === leagueTitle ? null : leagueTitle); // Toggle league dropdown
  };

  const toggleCountryDropdown = (country) => {
    setOpenCountry(openCountry === country ? null : country); // Toggle country dropdown
  };





  const [isDataloading, setIsDataLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [matchLive, setMatchLive] = useState([]);
  // const [matchSortByAlphabet, setMatchSortByAlphabet] = useState([]);
  const [matchSortByCountry, setMatchSortByCountry] = useState([]);
  const [matchSpecificLeague, setSpecificLeague] = useState([]);
  
  
  // // const matchesGroupedByHeading = matchSortByAlphabet.reduce((acc, match) => {
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


  useEffect(() => {
    // handleData(showingForDate);
    handleLive();
    // handleSortByAlphabet();
    handleSortByCountryAlphabet(showingForDate);
  }, [showingForDate]);

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
        
      setSpecificLeague(response.data);
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

<div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0" onClick={closeMenu}></div>

          <nav
            className="fixed top-0 left-0 bottom-0 flex flex-col w-full  py-4  border-r overflow-y-auto bg-scBackground"
            style={{}}
          >
            <div className="flex items-center">
              <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <img className="ml-4 w-36 h-10 object-scale-down" src={logo} alt="" />
              </a>

              <button className="navbar-close" onClick={closeMenu}>
                <FontAwesomeIcon
                  icon={faTimes}
                  //color="white"
                  className="ml-4 mr-4 "
                  style={{
                    // backgroundColor: '#E5F1FD',
                    // color: '#0E6F8F',
                    color: '#ffffff',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '25%',
                    padding: '16px',
                  }}
                />
              </button>
            </div>

            <div className="mt-8">
              
              <p className='font-bold ml-4 mb-2 text-scMenuText '>Sports</p>
              {/* <ul> */}
              {navData.slice(0,1).map((item) => (
                <div className={styles.navLinks}>
                  <NavLink
                    key={item.id}
                    className={styles.sideitem}
                    onClick={() => {                               
                      setCategory(`${item.link}`);
                      return;

                      closeMenu();
                    }}
                    // to={`/${item.link}`}
                  >
                    {item.icon}
                    <span className={styles.linkText}>{item.text}</span>
                  </NavLink>
                </div>
              ))}
              {/* </ul> */}
              <hr className="border-1 border-scHr mt-2" />
              <p className='font-bold ml-4 my-2 text-scMenuText'>Navigation</p>
              
              {navData.slice(1,5).map((item) => (
                <div className={styles.navLinks}>
                  <div
                    key={item.id}
                    className={styles.sideitem}                    
                    onClick={() => {                      
                      setPageName(item.text);
                      if (item.text !== "All (A-Z)") closeMenu();
                    }}
                    // to={`/${item.link}`}
                  >
                    {/* {item.icon} */}
                    <div className='flex justify-between w-full cursor-pointer'>
                      <span className={styles.linkTextTwo}  onClick={() => item.text === "All (A-Z)" ? toggleAzDropdown() : null}
                      
                      >{item.text} {item.text === "Live" ?  ' (' + (matchLive?.liveMatchCount || '-') + ')' : ''}</span>

                      <div>
                        {item.text === "All (A-Z)" ? !isAZOpen ? (
                        <KeyboardArrowUpIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        ) : (
                        <KeyboardArrowDownIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        ) : null}
                      </div>
                    </div>

                  </div>
                </div>
              ))}


<div className='mx-3  mb-4' style={{ maxHeight: '40vh', overflowY: 'auto' }}>
  {isDataloading ? (
    <Loading />
  ) : (
    !isAZOpen && <div className="mt-1 mx-4 my-2 text-scMenuText ">
      {matchSortByCountry.map((countryData) => {
        const { country, leagues } = countryData;
        const isCountryOpen = openCountry === country; // Check if country dropdown is open

        return (
          <div key={country} className=" ">
            {/* Dropdown for Country */}
            <div
              className="flex items-center justify-between mt-2 cursor-pointer "
              // onClick={() => toggleCountryDropdown(country)} // Toggle on click
            >
              {/* <label className=" text-white hover:text-scGreen cursor-pointer py-1">{country}</label> */}
              <span className=" text-white hover:text-scGreen cursor-pointer py-1">{country}</span>
              {/* {isCountryOpen ? (
                <KeyboardArrowUpIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
              ) : (
                <KeyboardArrowDownIcon className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
              )} */}
            </div>

            {/* Show leagues if country is open */}
            {isCountryOpen && leagues.map((league) => {
              const { title, fixtures } = league;
              const href = extractHref(title);
              const isLeagueOpen = openLeague === title; // Check if league dropdown is open

              return (
                <div key={title} className="">
                  {/* Dropdown for Leagues */}
                  <div
                    className="flex items-center justify-between w-full mx-4 pr-8 cursor-pointer  pt-1"
                    // onClick={() => toggleLeagueDropdown(title)} // Toggle on click
                  >
                    <p className=" text-white hover:text-scGreen">
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
                    <ul className=" mx-8  text-white ">
                      {fixtures.map((fixture, index) => (
                        <li key={index} className="hover:text-scGreen cursor-pointer my-1"
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
                    <p className=" text-gray-400 ml-2">No fixtures available</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  )}
</div>







            </div>
            
            <div 
              className='relative'  // Use relative for positioning
              style={{ 
                backgroundImage: `url(${stars})`, 
                backgroundPosition: 'right center', 
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'  // Ensure the image fits within the container
              }}
            >
              <div className='my-4 ml-4'>
                <p className='mb-2 text-white'>Download Our App:</p>
                <div className="flex items-center" style={{ height: "40px" }}>
                  <img src={appStore} alt="AppStore Icon" className="mr-2" style={{ width: "7.5rem" }} /> 
                  <img src={playStore} alt="PlayStore Icon" style={{ width: "7.5rem" }} />
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="bottom-0 w-full bg-opacity-0 pt-20 text-center">
                <p className="text-xs text-white pt-2">Copyright &copy; Score24</p>
              </div>
            </div>
          </nav>
        </div>
  );
}

export default MobileMenu;
