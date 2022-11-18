import {useState, useEffect } from 'react';

function App() {

// State

const [teams, setTeams] = useState([]);
const [games, setGames] = useState([]);
const [criteria, setCriteria] = useState({
  startDate: null,
  endDate: null,
  teamId: null
});

// fetch all teams & set dropdown state

useEffect( () => {
  const fetchData = async () => {
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams`);
  const data = await res.json();
  setTeams(data.data);
  console.log(data.data);
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
  console.log(url);
  console.log(data.data);
  };

  return (
    <div className='flex justify-center'> 
      <div className='border-2 rounded-md m-4 p-4'>

{/* Select Team dropdown */}

        <div className='justify-center flex m-4'>
          <label className='mr-4' htmlFor="teamSelector">Team:</label>
          <select className='border-2 rounded-md' name="teamSelector" id="teamSelector" onChange={handleSelectedTeamChange}>
            {teams.map(team => <option value={team.id} key={team.id}>{team.full_name}</option>)}
          </select>
          <label htmlFor="teamSelector"></label>
        </div>

{/* Select start Date picker */}

        <div>
          <input className='border-2 rounded-md' type="date" id="startDateSelector" name="startDateSelector" onChange={handleStartDateChange}></input>
          <label htmlFor="startDateSelector"></label>
        <span className='m-4'>To</span>

{/* Select end Date picker */}
       
          <input className='border-2 rounded-md' type="date" id="endDateSelector" name="endDateSelector" onChange={handleEndDateChange}></input>
          <label htmlFor="endDateSelector"></label>
        </div>

{/* (Re)fetch data using State as parameters */}

        <div className='flex justify-center m-4'>
          <button className='border-2 rounded-md p-1' onClick={fetchGames} disabled={!criteria.endDate || !criteria.startDate || !criteria.teamId}>Fetch games</button>
        </div>

{/* Display fetched games (Slice() to extract date from ugly date format) */}

        <div>
          {games.map(game =>
            <div className='border-2 rounded-md m-6 align-middle justify-center flex flex-col' key={game.id}>
              <div className='justify-center flex'>{game.date.slice(0, 10)} @ {game.status}</div>
              <div className='flex justify-center'>{game.home_team.abbreviation} - {game.visitor_team.abbreviation}</div>
              <div className='flex justify-center'>{game.home_team_score} - {game.visitor_team_score}</div>
            </div>)}
        </div>

{/* END */}

      </div>
    </div>
  );
}

export default App;