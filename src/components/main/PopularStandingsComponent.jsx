import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Loading from './Loading';

export default function PopularStandingsComponent({
  isStandingsDataloading,
  popularLeagueName,
  groupStandingsByGroup,
  openNotificationModal
}) {
  return (
    <>
      {isStandingsDataloading ? <Loading /> :
        <div className="space-y-4">

          {/* League Name */}
          <div className='flex items-center w-full ml-4 md:ml-0 cursor-pointer'>
            <p className="text-xl text-white hover:text-scGreen">
              {popularLeagueName} 
              {/* {Object.keys(groupStandingsByGroup()).length} */}
            </p>
          </div>

          {/* Loop through each group */}
          {Object.keys(groupStandingsByGroup()).map((group) => {
            const standings = groupStandingsByGroup()[group];

            return (
              <div key={group} className="w-full py-2 mb-4">
                <h2 className="text-lg text-white">{group}</h2>

                {/* Table Header */}
                <div className="flex justify-between text-white py-2 p-3">
                  <div className="mr-3">#</div>
                  <div className="w-4/12">Team</div>
                  <div className="w-1/12 text-center">MP</div>
                  <div className="w-1/12 text-center">W</div>
                  <div className="w-1/12 text-center">D</div>
                  <div className="w-1/12 text-center">L</div>
                  <div className="w-1/12 text-center">G</div>
                  <div className="w-1/12 text-center">PTS</div>
                  <div className="w-2/12 text-center  md:flex hidden">Form</div>
                  {/* <div className="w-1/12"></div> */}
                </div>

                {/* Teams Data */}
                {standings.teams.map((team, index) => (
                  <div key={index} className="flex justify-between items-center py-2 bg-scBackground rounded-lg p-3 ">
                    
                    {/* Team rank and logo */}
                    <div className="mr-3 flex items-center">
                      <p>{String(team.rank).padStart(2, '0')}</p>
                    </div>
                    <div className="w-4/12 flex items-center">
                      <img src={team.teamLogo} 
                      // alt={`${team.teamName}logo`} 
                      className=" mr-2" style={{ width: '16px', height: 'auto', objectFit: 'contain' }}/>
                      <p >{team.teamName}</p>
                    </div>

                    {/* Matches Played (MP) */}
                    <div className="w-1/12 text-center">
                      <p>{team.allStats.played}</p>
                    </div>

                    {/* Wins (W) */}
                    <div className="w-1/12 text-center">
                      <p>{team.allStats.win}</p>
                    </div>

                    {/* Draws (D) */}
                    <div className="w-1/12 text-center">
                      <p>{team.allStats.draw}</p>
                    </div>

                    {/* Losses (L) */}
                    <div className="w-1/12 text-center">
                      <p>{team.allStats.lose}</p>
                    </div>

                    {/* Goal Difference (G) */}
                    <div className="w-1/12 text-center">
                      <p>{team.goalsDiff}</p>
                    </div>

                    {/* Points (PTS) */}
                    <div className="w-1/12 text-center">
                      <p>{team.points}</p>
                    </div>

                    {/* Form */}
                    <div className="w-2/12 text-center md:flex hidden">
                      {/* Display the form with each character in a separate div with specific colors */}
<div className="flex space-x-1 justify-center">
  {team.form.split('').map((char, index) => {
    let bgColor;
    switch (char) {
      case 'W':
        bgColor = 'bg-green-500'; // Green for Win
        break;
      case 'D':
        bgColor = 'bg-yellow-500'; // Yellow for Draw
        break;
      case 'L':
        bgColor = 'bg-red-500'; // Red for Loss
        break;
      default:
        bgColor = 'bg-gray-500'; // Default color if needed
        break;
    }
    return (
      <div key={index} className={`text-xs ${bgColor}`} style={{ padding: '2px', color: 'white', width: '20px', borderRadius: '2px' }}>
        {char}
      </div>
    );
  })}
</div>


                    </div>

                  </div>
                ))}
              </div>
            );
          })}
        </div>
      }
    </>
  );
}
