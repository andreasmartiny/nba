import {useState, useEffect } from 'react';

function App() {

// State

const [teams, setTeams] = useState([]);
const [SelectedTeam, setSelectedTeam] = useState(1);
const [startDate, setStartDate] = useState("2022-11-01");
const [endDate, setEndDate] = useState("2022-11-10");
const [games, setGames] = useState([]);

// fetch all teams & set dropdown state

useEffect( () => {
  async function fetchData() {
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams`);
  const data = await res.json();
  setTeams(data.data);
  console.log(data.data);
  }
  fetchData();
}, []);

// Handle change in startDateSelector & setStartDate

const handleStartDateChange = (event) => {
  setStartDate(event.target.value);
};

// Handle change in startDateSelector & setStartDate

const handleEndDateChange = (event) => {
  setEndDate(event.target.value);
};

// Handle change in TeamSelector & setTeam

const handleSelectedTeamChange = (event) => {
  setSelectedTeam(event.target.value);
};

// fetch games and set games state ( TO RE ADD: )

const fetchGames = async () => {
  const url = `https://www.balldontlie.io/api/v1/games?start_date=${startDate}&end_date=${endDate}&team_ids[]=${SelectedTeam}`;
  const res = await fetch (url);
  const data = await res.json();
  setGames(data.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
  console.log(url);
  console.log(data.data);
  };

  return (
    <div className='flex justify-center'> 
      <div className='justify-center'>

{/* Select Team dropdown */}

        <div>
          <select name="teamSelector" id="teamSelector" onChange={handleSelectedTeamChange}>
            {teams.map(team => <option value={team.id} key={team.id}>{team.city}</option>)}
          </select>
          <label htmlFor="teamSelector"></label>
        </div>

{/* Select start Date picker */}

        <div>
          <input type="date" id="startDateSelector" name="startDateSelector" onChange={handleStartDateChange}></input>
          <label htmlFor="startDateSelector"></label>
        <span className='p-6 m-6'>To</span>

{/* Select end Date picker */}
       
          <input type="date" id="endDateSelector" name="endDateSelector" onChange={handleEndDateChange}></input>
          <label htmlFor="endDateSelector"></label>
        </div>

{/* Refetch data using State as parameters */}

        <div>
          <button onClick={fetchGames}>Fetch games</button>
        </div>

{/* Display fetched games  */}

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