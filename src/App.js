import {useState, useEffect } from 'react';

function App() {

// State

const [teams, setTeams] = useState([]);
const [games, setGames] = useState([]);
const [criteria, setCriteria] = useState({
  startDate: "2022-11-19",
  endDate: "2022-11-29",
  teamId: 1
});

// fetch all teams & set dropdown state

useEffect( () => {
  const fetchData = async () => {
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams`);
  const data = await res.json();
  setTeams(data.data);
  }
  fetchData();
}, []);

// Handle change in startDateSelector & set StartDate

const handleStartDateChange = (event) => {
  setCriteria({
    ...criteria,
    startDate: event.target.value,
})};

// Handle change in endDateSelector & set endDate

const handleEndDateChange = (event) => {
  setCriteria({
    ...criteria,
    endDate: event.target.value
  })};

// Handle change in TeamSelector & setTeam

const handleSelectedTeamChange = (event) => {
  setCriteria({
    ...criteria,
    teamId: event.target.value
  })};

// fetch games, sort by date ascending and set games state

const fetchGames = async () => {
  const url = `https://www.balldontlie.io/api/v1/games?start_date=${criteria.startDate}&end_date=${criteria.endDate}&team_ids[]=${criteria.teamId}`;
  const res = await fetch (url);
  const data = await res.json();
  setGames(data.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  return (
  <div className='flex justify-center'>
  
    <div className='w-1/2'> 

      <div className=' border-2 rounded-md m-4 p-4'>

        <div className='m-4 border-2 flex justify-center'>
          <label className='mr-4' htmlFor="teamSelector">Team:</label>
          <select className='border-2 rounded-md' name="teamSelector" id="teamSelector" onChange={handleSelectedTeamChange}>
            {teams.map(team => <option value={team.id} key={team.id}>{team.full_name}</option>)}
          </select>
          <label htmlFor="teamSelector"></label>
        </div>

        <div className='m-4 border-2 flex justify-center'>
          <input className='border-2 rounded-md' type="date" id="startDateSelector" name="startDateSelector" onChange={handleStartDateChange}></input>
        <span className='m-4'>To</span>
          <input className='border-2 rounded-md' type="date" id="endDateSelector" name="endDateSelector" onChange={handleEndDateChange}></input>
        </div>

        <div className='m-4 flex justify-center'>
          <button className='border-2 rounded-md p-1' onClick={fetchGames} disabled={!criteria.endDate || !criteria.startDate || !criteria.teamId}>Fetch games</button>
        </div>
    

      </div>

      <div className=''>{games.map(game =>
        <div className='bg-white border-2 rounded-md m-4' key={game.id}>
          <div className='flex justify-center'>{game.date.slice(0, 10)} @ {game.status}</div>
          <div className='flex justify-center'>{game.home_team.abbreviation} - {game.visitor_team.abbreviation}</div>
          <div className='flex justify-center'>{game.time === "" ? "" : game.home_team_score + " - " + game.visitor_team_score}</div>
        </div>)}

      </div>

    </div>

  </div>
  );
}

export default App;