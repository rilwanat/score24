import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import competitionImage from '../../assets/svg/1x1.svg';

export default function ComponentBasketball() {
  const navigate = useNavigate();

  const matchData = [
    {
      time: "FT",
      homeTeam: "Washington Mystics",
      awayTeam: "Los Angeles Sparks",
      competition: "USA : WNBA",
      status: "FT",
      scores: {
        home: {
          total: 80,
          firstQuarter: 22,
          secondQuarter: 16,
          thirdQuarter: 26,
          fourthQuarter: 16,
        },
        away: {
          total: 74,
          firstQuarter: 21,
          secondQuarter: 20,
          thirdQuarter: 14,
          fourthQuarter: 19,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Minnesota Lynx",
      awayTeam: "Las Vegas Aces",
      competition: "USA : WNBA",
      status: "FT",
      scores: {
        home: {
          total: 87,
          firstQuarter: 18,
          secondQuarter: 22,
          thirdQuarter: 25,
          fourthQuarter: 22,
        },
        away: {
          total: 74,
          firstQuarter: 18,
          secondQuarter: 21,
          thirdQuarter: 15,
          fourthQuarter: 20,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "El Calor de Cancun",
      awayTeam: "Halcones de Xalapa",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 82,
          firstQuarter: 18,
          secondQuarter: 17,
          thirdQuarter: 20,
          fourthQuarter: 27,
        },
        away: {
          total: 90,
          firstQuarter: 19,
          secondQuarter: 29,
          thirdQuarter: 26,
          fourthQuarter: 16,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Correcaminos",
      awayTeam: "Abejas de Leon",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 80,
          firstQuarter: 15,
          secondQuarter: 23,
          thirdQuarter: 26,
          fourthQuarter: 16,
        },
        away: {
          total: 87,
          firstQuarter: 31,
          secondQuarter: 19,
          thirdQuarter: 12,
          fourthQuarter: 25,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Lobos Plateados",
      awayTeam: "Halcones Rojos",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 89,
          firstQuarter: 22,
          secondQuarter: 18,
          thirdQuarter: 20,
          fourthQuarter: 29,
        },
        away: {
          total: 96,
          firstQuarter: 22,
          secondQuarter: 27,
          thirdQuarter: 25,
          fourthQuarter: 22,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Dorados de Chihuahua",
      awayTeam: "Diablos Rojos",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 99,
          firstQuarter: 28,
          secondQuarter: 25,
          thirdQuarter: 15,
          fourthQuarter: 31,
        },
        away: {
          total: 84,
          firstQuarter: 14,
          secondQuarter: 27,
          thirdQuarter: 23,
          fourthQuarter: 20,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Plateros de Fresnillo",
      awayTeam: "Santos de San Luis",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 91,
          firstQuarter: 21,
          secondQuarter: 15,
          thirdQuarter: 30,
          fourthQuarter: 25,
        },
        away: {
          total: 73,
          firstQuarter: 19,
          secondQuarter: 21,
          thirdQuarter: 20,
          fourthQuarter: 13,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Freseros",
      awayTeam: "Soles de Mexicali",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 94,
          firstQuarter: 24,
          secondQuarter: 32,
          thirdQuarter: 16,
          fourthQuarter: 22,
        },
        away: {
          total: 83,
          firstQuarter: 24,
          secondQuarter: 21,
          thirdQuarter: 17,
          fourthQuarter: 21,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Mineros de Zacatecas",
      awayTeam: "Fuerza Regia de Monterrey",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 88,
          firstQuarter: 24,
          secondQuarter: 18,
          thirdQuarter: 26,
          fourthQuarter: 20,
        },
        away: {
          total: 66,
          firstQuarter: 18,
          secondQuarter: 18,
          thirdQuarter: 10,
          fourthQuarter: 20,
        },
      },
    },
    {
      time: "FT",
      homeTeam: "Panteras de Aguascalientes",
      awayTeam: "Astros de Jalisco",
      competition: "Mexico : LNBP",
      status: "FT",
      scores: {
        home: {
          total: 86,
          firstQuarter: 14,
          secondQuarter: 22,
          thirdQuarter: 20,
          fourthQuarter: 30,
        },
        away: {
          total: 81,
          firstQuarter: 27,
          secondQuarter: 28,
          thirdQuarter: 13,
          fourthQuarter: 13,
        },
      },
    },
    {
      time: "11:00",
      homeTeam: "Rain or Shine Elasto Painters",
      awayTeam: "Barangay Ginebra San Miguel",
      competition: "Philippines : Governors Cup Grp. B",
      status: "Upcoming",
      scores: {
        home: {
          total: null,
          firstQuarter: null,
          secondQuarter: null,
          thirdQuarter: null,
          fourthQuarter: null,
        },
        away: {
          total: null,
          firstQuarter: null,
          secondQuarter: null,
          thirdQuarter: null,
          fourthQuarter: null,
        },
      },
    },
  ];

  const matchesGroupedByCompetition = matchData.reduce((acc, match) => {
    if (!acc[match.competition]) {
      acc[match.competition] = [];
    }
    acc[match.competition].push(match);
    return acc;
  }, {});

  // const [currentPageName, setCurrentPageName] = useState("Home");

  return (
    <>
      <div className="space-y-4">
        {Object.keys(matchesGroupedByCompetition).map((competition) => (
          <div key={competition} className="w-full py-2 my-4">
            <div className='flex justify-between'>
              <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>
                <img src={competitionImage} alt="Competition Image" className="mr-2 w-4" /> 
                <p className="text-xs text-white hover:text-scGreen">{competition.toUpperCase()}</p>
              </div>
              <div className='flex justify-end mx-3' style={{ width: '60px' }}>
                <PushPinOutlinedIcon className="cursor-pointer text-scMenuText hover:text-scGreen" />
              </div>
            </div>

            <div className="space-y-2 mt-2 bg-scBackground rounded-lg p-3">
              {matchesGroupedByCompetition[competition].map((match, index) => (
                <div key={index} className="text-scMenuText cursor-pointer">
                  <div className='flex'>
                    <p className="flex items-center justify-start text-scTimeText" style={{ width: '60px' }}>{match.time}</p>
                    <div className='flex flex-col w-full px-2 mx-2'>
                      <div className='flex w-full justify-between'>
                        <p className='text-white'>{match.homeTeam}</p>

                        {/* <p className='text-center text-scGreen'>{match.time === 'FT' ? match.homeScore : ''}</p> */}
                        <div className='flex text-center text-scGreen'>
                          {match.status === 'FT' && (
                            <>
                              <p className='mr-2'>{match.scores.home.total}</p>
                              <p>(</p>
                              <p className='mx-1'>{match.scores.home.firstQuarter}</p>
                              <p className='mx-1'>{match.scores.home.secondQuarter}</p>
                              <p className='mx-1'>{match.scores.home.thirdQuarter}</p>
                              <p className='mx-1'>{match.scores.home.fourthQuarter}</p>
                              <p>)</p>
                              
                            </>
                          )}
                        </div>
                      </div>
                      <div className='flex w-full justify-between'>
                        <p className='text-white'>{match.awayTeam}</p>

                        {/* <p className='text-center text-scGreen'>{match.time === 'FT' ? match.awayScore : ''}</p> */}
                        <div className='flex text-center text-scGreen'>
                          {match.status === 'FT' && (
                            <>
                              <p className='mr-2'>{match.scores.away.total}</p>
                              <p>(</p>
                              <p className='mx-1'>{match.scores.away.firstQuarter}</p>
                              <p className='mx-1'>{match.scores.away.secondQuarter}</p>
                              <p className='mx-1'>{match.scores.away.thirdQuarter}</p>
                              <p className='mx-1'>{match.scores.away.fourthQuarter}</p>
                              <p>)</p>
                              
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="cursor-pointer flex items-center justify-end" style={{ width: '60px' }}>
                      <StarBorderIcon className='hover:text-scGreen' />
                    </p>
                  </div>
                  {index !== matchesGroupedByCompetition[competition].length - 1 && (
                    <hr className="border-1 border-scHr mt-2" />
                  )}
                </div>
              ))}
            </div>

            
          </div>
        ))}
      </div>
    </>
  );
}
