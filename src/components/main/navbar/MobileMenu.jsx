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


import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';


import parse from 'html-react-parser';
import Loading from '../Loading';

import popularLeagues from '../data/popularLeagues';
// import countriesAZ from '../data/countriesAZ';


function MobileMenu({ isMobile, isMenuOpen, toggleMenu, closeMenu, setPageName, currentPageName, setCategory, currentCategory,
  specificLeague, setSpecific,
  setCurrentPopularLeagueId, setCurrentPopularLeagueName,
  popularLeagueId, popularLeagueName
 }) {


  const [isAZOpen, setIsAZOpen] = useState(true);
  const toggleAzDropdown = () => {
    setIsAZOpen(!isAZOpen); // Toggle country dropdown
  };

  const [isPopularOpen, setIsPopularOpen] = useState(true);
  const togglePopular = () => {
    setIsPopularOpen(!isPopularOpen); // Toggle popular dropdown
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



  // const [popularLeagueId, setPopularLeagueId] = useState("");
  // const [popularLeagueName, setPopularLeagueName] = useState(""); 



  const [isDataloading, setIsDataLoading] = useState(true);
  const [matchData, setMatchData] = useState([]);
  const [matchLive, setMatchLive] = useState([]);
  // const [matchSortByAlphabet, setMatchSortByAlphabet] = useState([]);
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


  const [isCountryDataloading, setIsCountryDataLoading] = useState(true);
  // const [matchSortByCountry, setMatchSortByCountry] = useState([]);
  // Initialize state
  const [matchSortByCountry, setMatchSortByCountry] = useState(() => {
    const storedData = localStorage.getItem('matchSortByCountry');
    return storedData ? JSON.parse(storedData) : [];
  });



  useEffect(() => {
    handleLive(); // This is for the live count

    // Check if local storage has data for 'matchSortByCountry'
    const storedData = localStorage.getItem('matchSortByCountry');

    if (!storedData) {
        handleSortByCountryAlphabet(showingForDate);
    } else {
        // If the data is present in local storage, set the state from it
        setMatchSortByCountry(JSON.parse(storedData));
        setIsCountryDataLoading(false);
    }
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
    setIsCountryDataLoading(true);
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

        setIsCountryDataLoading(false);
      //  alert(JSON.stringify(response, null, 2));

      // if (response.data.status) {
        
      setMatchSortByCountry(response.data);
        //  console.log(response.data);
      
      // const compressedData = LZString.compressToUTF16(JSON.stringify(response.data));
      // Cookies.set('matchSortByCountry', compressedData, { expires: 1 / 24 });
      // // Cookies.set('matchSortByCountry', JSON.stringify(response.data), { expires: 1 / 24 }); // 1 hour expiration
      // console.log("Cookie set:", Cookies.get('matchSortByCountry')); // Verify if cookie is set


      // Store in local storage instead of a cookie
      localStorage.setItem('matchSortByCountry', JSON.stringify(response.data));
      // console.log("Data stored in local storage");

      // } else {
      //   const errorMessage = response.data.message;
      //   alert("Error: " + errorMessage);
      //   // openNotificationModal(false, currentPageName + " Error", errorMessage);
      // }

    } catch (error) {
      setIsCountryDataLoading(false);
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

  const groupFixturesByTitle = (fixtures) => {
    return fixtures.reduce((acc, fixtureData) => {
      const { title, logoUrl, fixture } = fixtureData;
  
      if (!acc[title]) {
        acc[title] = {
          title,
          logoUrl,
          fixtures: [],
        };
      }
      
      acc[title].fixtures.push(fixture); // Add the fixture to the appropriate group
      return acc;
    }, {});
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
              
              {navData.slice(1,3).map((item) => (
                <div className={styles.navLinks}>
                  <div
                    key={item.id}
                    className={styles.sideitem}                    
                    onClick={() => {                      
                      setPageName(item.text);
                      if (item.text === "All (A-Z)") {return;}
                      if (item.text === "Popular") {return;}
                       closeMenu();
                    }}
                  >

                    <div className='flex justify-between w-full cursor-pointer'>
                      <span className={styles.linkTextTwo}  
                      onClick={() => {
                        if (item.text === "All (A-Z)") {toggleAzDropdown();}
                        if (item.text === "Popular") {togglePopular();}
                      }}                      
                      >{item.text} {item.text === "Live" ?  ' (' + (matchLive?.liveMatchCount || '-') + ')' : ''}</span>

                      {item.text === "All (A-Z)" ? <div>
                        {!isAZOpen ? (
                        <KeyboardArrowUpIcon onClick={() => toggleAzDropdown()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        ) : (
                        <KeyboardArrowDownIcon onClick={() => toggleAzDropdown()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        )}
                      </div> : null}

                      {item.text === "Popular" ? <div>
                        {!isPopularOpen ? (
                        <KeyboardArrowUpIcon onClick={() => togglePopular()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        ) : (
                        <KeyboardArrowDownIcon onClick={() => togglePopular()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        )}
                      </div> : null}
                      
                    </div>
                   

                  </div>
                </div>
              ))}



{/* <hr className="border-1 border-scHr mt-2" /> */}
{/* popular */}
<div className={styles.navLinks}>
                  <div
                    className={styles.sideitem}                    
                    onClick={() => {                      
                      setPageName("Popular");
                    }}
                  >

                    <div className='flex justify-between w-full cursor-pointer'>
                      <span className={styles.linkTextTwo}  
                      onClick={() => {
                          {togglePopular();}
                      }}                      
                      >Popular</span>

                      <div>
                        {!isPopularOpen ? (
                        <KeyboardArrowUpIcon onClick={() => togglePopular()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        ) : (
                        <KeyboardArrowDownIcon onClick={() => togglePopular()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        )}
                      </div> 
                      
                    </div>
                   

                  </div>
                  <div className='mx-4 ' style={{ maxHeight: '40vh', overflowY: 'auto' }}>
  {!isPopularOpen && (
    <div className="mt-1 mx-4 my-2 text-scMenuText">
      {Object.entries(popularLeagues).map(([league, id]) => (
        <div key={id} className="w-full">
          <div className="flex items-center justify-between mt-2 cursor-pointer">
            <label
              className="text-sm text-white hover:text-scGreen cursor-pointer pb-1"
              onClick={() => {
                setCurrentPopularLeagueId(id);
                setCurrentPopularLeagueName(league);
                setPageName("Popular");
                closeMenu();
              }}
            >
              {league.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


                </div>



{/* <hr className="border-1 border-scHr mt-2" /> */}
{/* All (A-Z) */}
<div className={styles.navLinks}>
                  <div
                    className={styles.sideitem}                    
                    onClick={() => {                      
                      setPageName("All (A-Z)");
                    }}
                  >

                    <div className='flex justify-between items-center w-full cursor-pointer'>
                      <span className={styles.linkTextTwo}  
                      onClick={() => {
                        // {toggleAzDropdown();}
                      }}                      
                      >All (A-Z)</span>

                      <div>
                      <RefreshIcon className='mr-1 text-scMenuText hover:text-scGreen' style={{ width: '16px', height: '16px' }} onClick={() => handleSortByCountryAlphabet(showingForDate) } />
                        {/* {!isAZOpen ? (
                        <KeyboardArrowUpIcon onClick={() => toggleAzDropdown()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        ) : (
                        <KeyboardArrowDownIcon onClick={() => toggleAzDropdown()} className="text-white hover:text-scGreen"  style={{ width: '12px', height: '16px' }} /> 
                        )} */}
                      </div> 
                      
                    </div>
                   

                  </div>
                  
                    <div className='mx-4 ' style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                    <div className="mt-1 mx-4 my-2 text-scMenuText ">
                    {isCountryDataloading ? 
    <Loading /> 
    // <></>
    :
                <div className="mt-1 ">
{matchSortByCountry.map((countryData) => {
  const { country, fixtures } = countryData;
  const isCountryOpen = openCountry === country; // Check if country dropdown is open

  // Group fixtures by title
  const matchesGroupedByTitle = groupFixturesByTitle(fixtures);

  return (
    <div key={country} className="w-full ">
      {/* Dropdown for Country */}
      <div
        className="flex items-center justify-between mt-2 cursor-pointer "
        onClick={() => toggleCountryDropdown(country)} // Toggle on click
      >
        <label className="text-sm text-white hover:text-scGreen cursor-pointer py-1">{country}</label>
        {/* Uncomment arrow icons here if needed */}
      </div>

      {/* Show grouped fixtures if country is open */}
      {isCountryOpen && Object.keys(matchesGroupedByTitle).length > 0 ? (
        <div className='bg-scBackgroundHover'>
          <ul className="text-white ">
          {Object.values(matchesGroupedByTitle).map((group, index) => (
            <li key={index} className="py-2 text-sm text-white  cursor-pointer">
              <div className='flex justify-between '>
                <h3 className="text-sm hover:text-scGreen ml-1">{group.title}</h3>
                <div className='flex justify-end mr-1' style={{ }}>
                  <PushPinOutlinedIcon className="cursor-pointer text-scMenuText hover:text-scGreen"  style={{ width: '16px', height: '16px' }}/>
                </div>
              </div>
              {/* <ul>
                {group.fixtures.map((fixture, fixtureIndex) => (
                  <li key={fixtureIndex} className="flex items-center my-1 text-sm hover:text-scGreen cursor-pointer"
                    onClick={() => {
                      setPageName("Specific");
                      setSpecific(group.title); // or href if needed
                    }}
                  >
                    <img src={group.logoUrl} alt={group.title} className="w-4 h-4 mr-2" />
                    {fixture.homeTeam} vs {fixture.awayTeam} - {fixture.date} {fixture.time}
                    <span className="ml-2 text-gray-400">
                      {fixture.home_score}:{fixture.away_score} {fixture.status}
                    </span>
                  </li>
                ))}
              </ul> */}
            </li>
          ))}
        </ul>

        </div>

        
      ) : isCountryOpen ? (
        <p className="text-sm text-gray-400 ml-2">No fixtures available</p>
      ) : null}
    </div>
  );
})}


    </div>
   }
    </div>
    </div>

                </div>









<div className='mx-3  mb-4' style={{ maxHeight: '40vh', overflowY: 'auto' }}>





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
                <p className="text-sm text-white pt-2">Copyright &copy; Score24</p>
              </div>
            </div>
          </nav>
        </div>
  );
}

export default MobileMenu;
