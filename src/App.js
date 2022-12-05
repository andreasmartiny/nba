import { useState, useEffect } from 'react';

function App() {

  // State

  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [criteria, setCriteria] = useState({
    startDate: "2022-11-19",
    endDate: "2022-11-29",
    teamId: null
  });

  // fetch all teams & set dropdown state

  useEffect(() => {
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
    })
  };

  // Handle change in endDateSelector & set endDate

  const handleEndDateChange = (event) => {
    setCriteria({
      ...criteria,
      endDate: event.target.value
    })
  };

  // Handle change in TeamSelector & setTeam

  const handleSelectedTeamChange = (event) => {
    setCriteria({
      ...criteria,
      teamId: event.target.value
    })
  };

  // fetch games, sort by date ascending and set games state

  const fetchGames = async () => {
    const url = `https://www.balldontlie.io/api/v1/games?start_date=${criteria.startDate}&end_date=${criteria.endDate}&team_ids[]=${criteria.teamId}`;
    const res = await fetch(url);
    const data = await res.json();
    setGames(data.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const handleResetButtonClick = () => {
    setGames([]);
  }

  const handleSaveButton = (gameId) => {
    const game = games.find(element => element.id = gameId);
    const a = document.createElement('a');
    a.href = `data:text/plain,${game.id}`;
    a.download = `${game.id} on ${game.date}.txt`;
    document.body.appendChild(a);
    a.click();
    
  }

  return (
    <div className=' justify-center m-0'>

      <div className=''>

      <div className='border-2 rounded-md m-4 p-4'>

        <div className='m-4 border-2 flex justify-center'>
          <select className=' border-2 rounded-md' name="teamSelector" id="teamSelector" onChange={handleSelectedTeamChange}>
          <option value="" disabled selected hidden>Pick a team!</option>
            {teams.map(team => <option value={team.id} key={team.id}>{team.full_name}</option>)}
          </select>
          <label htmlFor="teamSelector"></label>
        </div>


        <div className='m-4 border-2 flex justify-center'>
          <input className=' border-2 rounded-md ::-webkit-calendar-picker-indicator' type="date" id="startDateSelector" name="startDateSelector" onChange={handleStartDateChange}></input>
          <span className='m-4'>To</span>
          <input className=' border-2 rounded-md' type="date" id="endDateSelector" name="endDateSelector" onChange={handleEndDateChange}></input>
        </div>

        <div className='m-4 flex justify-center'>
          <button class='hover:bg-secondary rounded-md p-2 mx-2 border-secondary bg-gray-300 disabled:bg-gray-300 transition ease-in-out' onClick={fetchGames} disabled={!criteria.endDate || !criteria.startDate || !criteria.teamId}>{!criteria.endDate || !criteria.startDate || !criteria.teamId ? "Fill in search criteria!" : "Search"}</button>
          { games.length !== 0 ? <button class='bg-gray-300 rounded-md p-2 mx-2 hover:bg-secondary hover:shadow-sm transition ease-in-out' onClick={handleResetButtonClick}>Reset</button> : null }
        </div>


      </div>

      <div className=''>{games.map(game =>
        <div className=' border-2 rounded-md m-4 flex flex-col align-middle' key={game.id}>
          <div className='flex justify-center'>{game.date.slice(0, 10)} @ {game.status}</div>
          <div className='flex justify-center'>{game.home_team.abbreviation} - {game.visitor_team.abbreviation}</div>
          <div className='flex justify-center'>{game.time === "" ? "" : game.home_team_score + " - " + game.visitor_team_score}</div>
          <div class='flex justify-center'>
            <button class='bg-gray-300 rounded-md p-2 m-2 hover:bg-secondary hover:shadow-sm transition ease-in-out' onClick={() => handleSaveButton(game.id)}>Add to calendar</button>
          </div>
        </div>)}

      </div>

      </div>

    </div>
  );
}

export default App;