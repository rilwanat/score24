import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import SummarizeIcon from '@mui/icons-material/Summarize';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

// import headingImage from '../../assets/svg/1x1.svg';

import axios from 'axios';
// import axiosInstance from '../../axiosConfig';

import parse from 'html-react-parser';
import Loading from './Loading';

// import LeagueModal from './modals/LeagueModal';

import PopularResultsComponent from './PopularResultsComponent';
import PopularFixturesComponent from './PopularFixturesComponent';
import PopularStandingsComponent from './PopularStandingsComponent';
import PopularTopscorerComponent from './PopularTopscorerComponent';



export default function ComponentFootballPopular({ showingForDate, popularLeagueId, popularLeagueName }) {
  
  //notification modal
  const [notificationType, setNotificationType] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [matchArray, setMatchArray] = useState([]);
  const [matchHeadingImage, setMatchHeadingImage] = useState('');
  const openNotificationModal = (type, title, message, match, headingImage ) => {
    
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


  const [isResultsDataLoading, setIsResultsDataLoading] = useState(true);
  const [matchPopularResults, setMatchPopularResults] = useState([]);

  const [isFixturesDataLoading, setIsFixturesDataLoading] = useState(true);
  const [matchPopularFixtures, setMatchPopularFixtures] = useState([]);

  const [isStandingsDataLoading, setIsStandingsDataLoading] = useState(true);
  const [matchPopularStandings, setMatchPopularStandings] = useState([]);

  const [isTopscorerDataLoading, setIsTopscorerDataLoading] = useState(true);
  const [matchPopularTopscorer, setMatchPopularTopscorer] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        handlePopularResults(),
        handlePopularFixtures(), 
        handlePopularStandings(),       
        // handlePopularTopscorer()       
      ]);
    };
    
    fetchData();

    setActiveTab("results");
    setMatchPopularResults([]);
    setMatchPopularFixtures([]);
    setMatchPopularStandings([]);
    // setMatchPopularTopscorer([]);

  }, [popularLeagueId]);
  const handlePopularResults = async () => {

    if (!popularLeagueId) return;


    setIsResultsDataLoading(true);
    try {
       const requestBody = {
        "league_id": popularLeagueId
       };
  
      const endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_POPULAR_RESULTS;
      // alert(endpoint + " " + popularLeagueId);
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setIsResultsDataLoading(false);
      // alert("ok");
      // alert(JSON.stringify(response.data, null, 2));
      // alert(response.data[0].length);
      // if (response.data) {
      //   // Ensure response.data has the structure you expect
      // return;
        setMatchPopularResults(response.data);
      // } else {
      //   alert("Unexpected response structure.");
      // }
  
    } catch (error) {
      // setMatchDataData([]); set live to globally
      setIsResultsDataLoading(false);
      alert("Popular Results: An unexpected error occurred. " + error);
    }
  };
  const handlePopularFixtures = async () => {

    if (!popularLeagueId) return;

    setIsFixturesDataLoading(true);
    try {
       const requestBody = {
        "leagueId": popularLeagueId,
        "leagueTitle": popularLeagueName
       };
  
      const endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_POPULAR_FIXTURES;
      // alert(endpoint);
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setIsFixturesDataLoading(false);
      // alert("ok");
      // alert(JSON.stringify(response.data, null, 2));
      // alert(response.data[0].length);
      // if (response.data) {
      //   // Ensure response.data has the structure you expect
        setMatchPopularFixtures(response.data);
      // } else {
      //   alert("Unexpected response structure.");
      // }
  
    } catch (error) {
      // setMatchDataData([]); set live to globally
      setIsFixturesDataLoading(false);
      alert("Popular Fixtures: An unexpected error occurred. " + error);
    }
  };
  const handlePopularStandings = async () => {

    if (!popularLeagueId) return;

    setIsStandingsDataLoading(true);
    try {
       const requestBody = {
        "league": popularLeagueId
       };
  
      const endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_POPULAR_STANDINGS;
      // alert(endpoint + " " + popularLeagueId);
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setIsStandingsDataLoading(false);
      // alert("ok");
      // alert(JSON.stringify(response.data, null, 2));
      // alert(response.data[0].length);
      // if (response.data) {
      //   // Ensure response.data has the structure you expect
      // return;
        setMatchPopularStandings(response.data.response);
      // } else {
      //   alert("Unexpected response structure.");
      // }
  
    } catch (error) {
      // setMatchDataData([]); set live to globally
      setIsStandingsDataLoading(false);
      alert("Popular Standings: An unexpected error occurred. " + error);
    }
  };
  const handlePopularTopscorer = async () => {

    if (!popularLeagueId) return;

    setIsTopscorerDataLoading(true);
    try {
       const requestBody = {
        "league": popularLeagueId
       };
  
      const endpoint = process.env.REACT_APP_API_URL + process.env.REACT_APP_POPULAR_STANDINGS;
      // alert(endpoint + " " + popularLeagueId);
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setIsTopscorerDataLoading(false);
      // alert("ok");
      // alert(JSON.stringify(response.data, null, 2));
      // alert(response.data[0].length);
      // if (response.data) {
      //   // Ensure response.data has the structure you expect
      // return;
        setMatchPopularTopscorer(response.data.response);
      // } else {
      //   alert("Unexpected response structure.");
      // }
  
    } catch (error) {
      // setMatchDataData([]); set live to globally
      setIsTopscorerDataLoading(false);
      alert("Popular Topscorer: An unexpected error occurred. " + error);
    }
  };

  


  const groupFixturesByDate = () => {
    if (!matchPopularFixtures || matchPopularFixtures.length === 0) return {};

    return matchPopularFixtures.reduce((acc, league) => {
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


  const groupStandingsByGroup = () => {
    if (!matchPopularStandings || matchPopularStandings.length === 0) return {};
  
    return matchPopularStandings.reduce((acc, leagueData) => {
      const leagueInfo = {
        leagueName: leagueData.league.name,
        country: leagueData.league.country,
        logo: leagueData.league.logo,
        flag: leagueData.league.flag,
        season: leagueData.league.season,
      };

      
  
      leagueData.league.standings.forEach((groupStandings) => {
        groupStandings.forEach((teamData) => {
          const group = teamData.group || "Unknown Group"; // Handle missing group
  
          if (!acc[group]) {
            acc[group] = {
              league: leagueInfo,
              teams: [],
            };
          }
  
          acc[group].teams.push({
            rank: teamData.rank,
            teamName: teamData.team.name,
            teamLogo: teamData.team.logo,
            points: teamData.points,
            goalsDiff: teamData.goalsDiff,
            form: teamData.form,
            status: teamData.status,
            description: teamData.description,
            allStats: teamData.all,
            homeStats: teamData.home,
            awayStats: teamData.away,
            lastUpdate: teamData.update,
          });
        });
      });
  
      return acc;
    }, {});
  };

  const groupResults = () => {
    return matchPopularResults;
  }
  
  const groupTopscorer = () => {
    return matchPopularTopscorer;
  }
  


  //tabs
  const [activeTab, setActiveTab] = useState('info');
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  //tabs


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

    {/* Tab */}
    <div className='flex justify-center w-full md:-mt-2 my-4 text-white '>
                       
                       <div className="w-full" style={{  }}> 

                         


                         {/* Icon Navigation for Mobile */}
                          <div className=' mb-2'>
                            <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer mb-4 '>
                              {/* <img src={fixture.logo} alt="Competition Image" className="mr-2 h-3" />  */}
                              <p className="text-xl text-white hover:text-scGreen">
                                {popularLeagueName}
                              </p>
                            </div>
                          </div>

        <div> 

{/* dektop */}
        <div className=" text-sm text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 md:flex hidden">
                           <ul className="flex flex-wrap  ">
                             <li className="mr-2 cursor-pointer">
                               <a
                                 // href="#"
                                 className={`inline-block pl-2 pr-1 border-b-2 border-transparent  ${activeTab === 'results' ? 'text-scGreen border-scGreen' : ''}`}
                                 onClick={() => handleTabClick('results')}
                               >
                                 {'results'.toUpperCase()}
                               </a>
                             </li>
                             <li className="mr-2 cursor-pointer">
                               <a
                                 // href="#" formerly fixtures
                                 className={`inline-block pl-2 pr-1 border-b-2 border-transparent  ${activeTab === 'matches' ? 'text-scGreen border-scGreen' : ''}`}
                                 onClick={() => handleTabClick('matches')}
                               >
                                 {'matches'.toUpperCase()}
                               </a>
                             </li> 
                             <li className="mr-2 cursor-pointer">
                               <a
                                 // href="#"
                                 className={`inline-block pl-2 pr-1 border-b-2 border-transparent  ${activeTab === 'standings' ? 'text-scGreen border-scGreen' : ''}`}
                                 onClick={() => handleTabClick('standings')}
                               >
                                 {'standings'.toUpperCase()}
                               </a>
                             </li>
                             <li className="mr-2 cursor-pointer">
                               <a
                                 // href="#"
                                 className={`inline-block pl-2 pr-1 border-b-2 border-transparent  ${activeTab === 'top-scorer' ? 'text-scGreen border-scGreen' : ''}`}
                                 onClick={() => handleTabClick('top-scorer')}
                               >
                                 {'top-scorer'.toUpperCase()}
                               </a>
                             </li>
                             
                           </ul>
                         </div>

{/* mobile */}
      <div className="flex justify-around  text-center md:hidden">
        <div className="cursor-pointer" onClick={() => handleTabClick('results')}>
          <SummarizeIcon className={`text-2xl ${activeTab === 'results' ? 'text-scGreen' : 'text-gray-500'}`} />
          <p className={`text-xs mt-1 ${activeTab === 'results' ? 'text-scGreen' : 'text-gray-500'}`}>Results</p>
        </div>
        <div className="cursor-pointer" onClick={() => handleTabClick('matches')}>
          <FormatListBulletedIcon className={`text-2xl ${activeTab === 'matches' ? 'text-scGreen' : 'text-gray-500'}`} />
          <p className={`text-xs mt-1 ${activeTab === 'matches' ? 'text-scGreen' : 'text-gray-500'}`} >Matches</p>
        </div>
        <div className="cursor-pointer" onClick={() => handleTabClick('standings')}>
          <AccessibilityNewIcon className={`text-2xl ${activeTab === 'standings' ? 'text-scGreen' : 'text-gray-500'}`} />
          <p className={`text-xs mt-1 ${activeTab === 'standings' ? 'text-scGreen' : 'text-gray-500'}`} >Standings</p>
        </div>
        <div className="cursor-pointer" onClick={() => handleTabClick('top-scorer')}>
          <SportsSoccerIcon className={`text-2xl ${activeTab === 'top-scorer' ? 'text-scGreen' : 'text-gray-500'}`} />
          <p className={`text-xs mt-1 ${activeTab === 'top-scorer' ? 'text-scGreen' : 'text-gray-500'}`} >Top Scorer</p>
        </div>
      </div>
      </div>
      <hr className="md:hidden border-1 border-scHr mt-2" />


                         
             
                         {/* Tab content */}
                         <div className="px-4 py-4">
                          {activeTab === 'results' && 
                           <div>
                            {isResultsDataLoading ? <Loading/> :
                             <PopularResultsComponent 
                                isResultsDataLoading={isResultsDataLoading} 
                                popularLeagueName={popularLeagueName} 
                                groupResults={groupResults} 
                                openNotificationModal={openNotificationModal} 
                             />  }                            
                           </div>}
                           {activeTab === 'matches' && //'fixtures' && 
                           <div>
                            {isFixturesDataLoading ? <Loading/> :
                             <PopularFixturesComponent 
                                isFixturesDataLoading={isFixturesDataLoading} 
                                popularLeagueName={popularLeagueName} 
                                groupFixturesByDate={groupFixturesByDate} 
                                openNotificationModal={openNotificationModal} 
                             />  }                              
                           </div>}
                           {activeTab === 'standings' && 
                           <div>
                            {isStandingsDataLoading ? <Loading/> :
                             <PopularStandingsComponent 
                                isStandingsDataLoading={isStandingsDataLoading} 
                                popularLeagueName={popularLeagueName} 
                                groupStandingsByGroup={groupStandingsByGroup} 
                                openNotificationModal={openNotificationModal} 
                                // matchPopularStandings
                             />  }  
                            
                           </div>}
                           {activeTab === 'top-scorer' && 
                           <div>
                            {/* {isTopscorerDataLoading ? <Loading/> :
                             <PopularTopscorerComponent 
                                isTopscorerDataLoading={isTopscorerDataLoading} 
                                popularLeagueName={popularLeagueName} 
                                groupTopscorer={groupTopscorer} 
                                openNotificationModal={openNotificationModal} 
                                // matchPopularTopscorer
                             />  }   */}
                            
                           </div>}
                         </div>     
                       </div> 
                     </div>
                     {/* Tab */}

                     


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