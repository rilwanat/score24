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


export default function PopularStandingsComponent({ showingForDate, popularLeagueId, popularLeagueName }) {
  
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


  const [isFixturesDataloading, setIsFixturesDataLoading] = useState(true);
  const [matchPopularFixtures, setMatchPopularFixtures] = useState([]);
  useEffect(() => {
    // handlePopularFixtures();
  }, [popularLeagueId]);
  const handlePopularFixtures = async () => {
    setIsFixturesDataLoading(true);
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
      alert("Popular: An unexpected error occurred. " + error);
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
    


  //tabs
  const [activeTab, setActiveTab] = useState('info');
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  //tabs

  

  return (
    <>

    <div className='flex justify-center w-full my-4 text-white'>
                       
                       <div className="w-full" style={{  }}> 
                         
             Standings
                            
                       </div> 
                     </div>

         
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