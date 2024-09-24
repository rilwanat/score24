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

import PopularResultsComponent from './PopularResultsComponent';
import PopularFixturesComponent from './PopularFixturesComponent';
import PopularStandingsComponent from './PopularStandingsComponent';

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



  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        handlePopularResults(),
        handlePopularFixtures(), 
        handlePopularStandings()        
      ]);
    };
    
    fetchData();
  }, [popularLeagueId]);
  const handlePopularResults = async () => {
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
      alert(JSON.stringify(response.data, null, 2));
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
  
  


  //tabs
  const [activeTab, setActiveTab] = useState('info');
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  //tabs

  

  return (
    <>

    {/* Tab */}
    <div className='flex justify-center w-full my-4 text-white '>
                       
                       <div className="w-full" style={{  }}> 
                         <div className="mb-4 text-sm text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                           <ul className="flex flex-wrap -mb-px ">
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
                                 // href="#"
                                 className={`inline-block pl-2 pr-1 border-b-2 border-transparent  ${activeTab === 'fixtures' ? 'text-scGreen border-scGreen' : ''}`}
                                 onClick={() => handleTabClick('fixtures')}
                               >
                                 {'fixtures'.toUpperCase()}
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
                             
                           </ul>
                         </div>

                         
             
                         {/* Tab content */}
                         <div className="px-4 py-4">
                          {activeTab === 'results' && 
                           <div>
                             <PopularResultsComponent 
                                isResultsDataLoading={isResultsDataLoading} 
                                popularLeagueName={popularLeagueName} 
                                groupResults={groupResults} 
                                openNotificationModal={openNotificationModal} 
                             />                              
                           </div>}
                           {activeTab === 'fixtures' && 
                           <div>
                             <PopularFixturesComponent 
                                isFixturesDataLoading={isFixturesDataLoading} 
                                popularLeagueName={popularLeagueName} 
                                groupFixturesByDate={groupFixturesByDate} 
                                openNotificationModal={openNotificationModal} 
                             />                              
                           </div>}
                           {activeTab === 'standings' && 
                           <div>
                             <PopularStandingsComponent 
                                isStandingsDataLoading={isStandingsDataLoading} 
                                popularLeagueName={popularLeagueName} 
                                groupStandingsByGroup={groupStandingsByGroup} 
                                openNotificationModal={openNotificationModal} 
                                // matchPopularStandings
                             />  
                            
                           </div>}
                         </div>     
                       </div> 
                     </div>
                     {/* Tab */}

                     


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