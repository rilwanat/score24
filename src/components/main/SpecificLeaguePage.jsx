import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../../assets/images/logo.png';
import { format, parse } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

const customModalStyles = {
  content: {
    padding: '0px',
    maxHeight: '500px',
    maxWidth: '480px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '0px',
    backgroundColor: '#000F16',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
};

const SpecificLeaguePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const isOpen = queryParams.get('isOpen') === 'true'; // Assuming isOpen is a boolean
  const onRequestClose = () => {}; // Define how to close the modal if needed
  const notificationType = queryParams.get('notificationType') || 'success'; // Example default value
  const notificationTitle = queryParams.get('notificationTitle');
  const notificationMessage = queryParams.get('notificationMessage');
  
  // Parse matchArray as a JSON array
  const matchArray = JSON.parse(queryParams.get('matchArray') || '[]');
  const matchHeadingImage = queryParams.get('matchHeadingImage');

  // State hooks
  const [countdownTime, setCountdownTime] = useState("");
  const [activeTab, setActiveTab] = useState('info');
  
  // Handle empty matchArray case
  if (matchArray.length === 0) {
    return <div>No matches found.</div>; 
  }

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  // useEffect(() => {
  //   let interval; // Declare interval variable to manage it
  
  //   // Start the countdown based on target date
  //   const startCountdown = (targetDate) => {
  //     const target = new Date(targetDate).getTime();
  
  //     // Start the interval to update countdown
  //     interval = setInterval(() => {
  //       const now = new Date().getTime();
  //       const distance = target - now;
  
  //       if (distance < 0) {
  //         clearInterval(interval);
  //         setCountdownTime("00:00:00:00");
  //         return;
  //       }
  
  //       const days = formatTime(Math.floor(distance / (1000 * 60 * 60 * 24)));
  //       const hours = formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  //       const minutes = formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  //       const seconds = formatTime(Math.floor((distance % (1000 * 60)) / 1000));
  
  //       setCountdownTime(`${days}:${hours}:${minutes}:${seconds}`);
  //     }, 1000);
  //   };
  
  //   // Check the condition and call the countdown function
  //   if (matchArray && matchArray.fixture_date) {
  //     startCountdown(matchArray.fixture_date);
  //   } else {
  //     setCountdownTime("00:00:00:00"); // Reset if no valid date
  //   }
  
  //   // Cleanup interval on unmount or when matchArray changes
  //   return () => clearInterval(interval);
  // }, [matchArray]); // Include `matchArray` in the dependency array
  
  

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='bg-scDarkerBackground h-screen'>
      <div className='flex flex-col w-full h-full justify-between bg-scBackgroundDark'>
      <div className="flex flex-col w-full">
        <div className='flex justify-between items-center bg-scBackground p-4'>
          <div className="flex items-center">
            <img
              className="block h-8 w-auto max-w-none"
              src={logo}
              alt="Logo"
              style={{ cursor: 'pointer' }}
            />
          </div>
          <CloseIcon className='cursor-pointer' style={{ color: '#ffffff' }} onClick={onRequestClose} />
        </div>
        
        <div className='flex items-center mx-4 my-4 text-white text-lg'>
          <img 
            src={matchHeadingImage} 
            style={{ cursor: 'pointer', height: '32px', width: '32px' }}
            className="mr-2"
          />
          <div className='h-full flex items-center'>{matchArray.league_country} - {matchArray.league}</div>
        </div>

        <div className="flex justify-between items-center bg-scBackground rounded-lg px-10 py-2 mx-4 ">
          <div className='flex flex-col text-sm text-scMenuText w-1/5 md:w-1/3 items-center justify-center'>
            <img
              className="block h-6 w-auto max-w-none bg-scGreen rounded-lg mb-1"
              style={{ cursor: 'pointer', height: '50px', width: '50px' }}
            />
            {matchArray.home_team}
          </div>
          <div className='flex flex-col items-center text-sm text-scMenuText w-2/5 md:w-1/3'>
            <div>
              {matchArray.status !== "NS" && matchArray.status !== "FT" ? 
                <p className='text-sm text-scBackground font-bold bg-scGreen px-2' style={{ borderRadius: '4px' }}>Live</p> 
                : ''
              }
            </div>

            <div>
              {matchArray.status === "NS" ? 
                <p className='text-lg font-bold text-white'>{countdownTime}</p> 
                : 
                <p className='text-4xl font-bold text-white'>{matchArray.home_score !== "Not available" ? matchArray.home_score : ''} : {matchArray.away_score !== "Not available" ? matchArray.away_score : ''}</p>
              }
            </div>
            
            <p className='text-sm text-scMenuText mt-1'>{matchArray.status !== "NS" ? matchArray.status : 'Not started'}</p>
            {matchArray.status !== "NS" && matchArray.status !== "FT" ? '' : 
              <p className='text-sm text-scMenuText'>
                {matchArray && matchArray.fixture_date ?
                  format(parse(matchArray.fixture_date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'EEE dd MMM, HH:mm') 
                  : "Date not available"
                }
              </p>
            }
          </div>
          <div className='flex flex-col text-sm text-scMenuText w-1/5 md:w-1/3 items-center justify-center'>
            <img
              className="block h-6 w-auto max-w-none bg-scGreen rounded-lg mb-1"
              style={{ cursor: 'pointer', height: '50px', width: '50px' }}
            />
            {matchArray.away_team}
          </div>
        </div>

        {/* Tab */}
        <div className='flex justify-center w-full my-4 text-white'>
          <div>
            <div className="text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2 cursor-pointer">
                  <a
                    className={`inline-block pl-2 pr-1 border-b-2 border-transparent ${activeTab === 'info' ? 'text-scGreen border-scGreen' : ''}`}
                    onClick={() => handleTabClick('info')}
                  >
                    {'info'.toUpperCase()}
                  </a>
                </li>
                <li className="mr-2 cursor-pointer">
                  <a
                    className={`inline-block pl-2 pr-1 border-b-2 border-transparent ${activeTab === 'lineups' ? 'text-scGreen border-scGreen' : ''}`}
                    onClick={() => handleTabClick('lineups')}
                  >
                    {'lineups'.toUpperCase()}
                  </a>
                </li>
                <li className="mr-2 cursor-pointer">
                  <a
                    className={`inline-block pl-2 pr-1 border-b-2 border-transparent ${activeTab === 'table' ? 'text-scGreen border-scGreen' : ''}`}
                    onClick={() => handleTabClick('table')}
                  >
                    {'table'.toUpperCase()}
                  </a>
                </li>
                <li className="mr-2 cursor-pointer">
                  <a
                    className={`inline-block pl-2 pr-1 border-b-2 border-transparent ${activeTab === 'h2h' ? 'text-scGreen border-scGreen' : ''}`}
                    onClick={() => handleTabClick('h2h')}
                  >
                    {'h2h'.toUpperCase()}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='flex w-full px-4'>
        <div className="w-full bg-scBackground rounded-lg px-4 py-4 text-white ">
          <div className="flex flex-col">
            {activeTab === 'info' && 
              <div>
                {/* Add your info content here */}
              </div>
            }
            {activeTab === 'lineups' && 
              <div>
                {/* Add your lineups content here */}
              </div>
            }
            {activeTab === 'table' && 
              <div>
                {/* Add your table content here */}
              </div>
            }
            {activeTab === 'h2h' && 
              <div>
                {/* Add your head-to-head content here */}
              </div>
            }
          </div>
        </div>
        </div>
      </div>
      
      <div className="bottom-0 mb-4">
          <hr className="border-1 border-scHr my-2" />
          <p className=" text-xs text-white mt-4 text-center">Copyright &copy; 2024 Score24</p>
        </div>
      </div>
      
    </div>
  );
};

export default SpecificLeaguePage;
