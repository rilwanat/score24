import React, { useState } from 'react';
import Modal from 'react-modal';


import logo from '../../../assets/images/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faCalendarAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';

// import axios from 'axios';
// import LoadingScreen from '../../../LoadingScreen';


// import DatePicker from 'react-datepicker';
// import '../../../Datepicker.css';
import { format, parse } from 'date-fns';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';

import AddIcon from '@mui/icons-material/Add';

const customModalStyles = {
  content: {
    padding: '0px',   // Remove padding
    // width: '80%', 
    // height: '90%',
    maxHeight: '500px',
    maxWidth: '480px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    borderRadius: '0px',//'30px',
    backgroundColor: '#000F16'
  },
};


const LeagueModal = ({ isOpen, onRequestClose, notificationType, notificationTitle, notificationMessage, matchArray }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification"
      style={customModalStyles}
    >
      <div className='flex flex-col w-full h-full justify-between' >
      <div className="flex flex-col  w-full ">
        <div className='flex justify-between items-center bg-scBackground p-4'>
          <div className="flex items-center">
            <img
              className="block h-8 w-auto max-w-none "
              src={logo}
              alt="Logo"
              // onClick={() => { onRequestClose(); }}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <CloseIcon className='cursor-pointer' style={{ color: '#ffffff' }} onClick={() => { onRequestClose(); }}/>
        </div>
        
        <div className='flex items-center mx-4 my-4 text-white text-lg'>
          <img 
          // src={matchArray.league_country} 
          // alt="Competition Image" 
          style={{ cursor: 'pointer', height: '40px', width: '40px' }}
          className="mr-2 h-3" />
          {matchArray.league_country} - {matchArray.league}
        </div>

        <div className="flex justify-between items-center bg-scBackground rounded-lg px-10 py-2 mx-4 ">
          <div className='flex flex-col text-sm text-scMenuText w-1/5 md:w-1/3 items-center justify-center'>
          <img
              className="block h-6 w-auto max-w-none bg-scGreen rounded-lg mb-1"
              // src={logo}
              style={{ cursor: 'pointer', height: '50px', width: '50px' }}
            />
            {matchArray.home_team}
          </div>
          <div className='flex flex-col items-center text-sm text-scMenuText w-2/5 md:w-1/3'>
            <p className='text-4xl font-bold text-white'>{matchArray.home_score !== "Not available" ? matchArray.home_score : ''} : {matchArray.away_score !== "Not available" ? matchArray.away_score : ''}</p>
            <p className='text-xs text-scMenuText'>{matchArray.status}</p>
            <p className='text-xs text-scMenuText'>
            {matchArray  && matchArray.fixture_date ?
              format(parse(matchArray.fixture_date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'EEE dd MMM, HH:mm') 
              : "Date not available"}
            </p>
            
          </div>
          <div className='flex flex-col text-sm text-scMenuText  w-1/5 md:w-1/3 items-center justify-center'>
          <img
              className="block h-6 w-auto max-w-none bg-scGreen rounded-lg mb-1"
              // src={logo}
              style={{ cursor: 'pointer', height: '50px', width: '50px' }}
            />
            {matchArray.away_team}
          </div>
        </div>
        
        <div className='flex justify-center w-full my-4 text-white'>
          Tab                  
        </div> 
        
      </div>



      <p className="bottom-0 text-xs text-white mt-4 text-center mb-2">Copyright &copy; 2024 Score24</p>
      </div>

    </Modal>
  );
};

export default LeagueModal;
