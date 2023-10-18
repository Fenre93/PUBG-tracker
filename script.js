document.addEventListener('DOMContentLoaded', function () {

    const app = document.querySelector('#app .teams');
    const totalTeams = 16;
    const playersPerTeam = 4;
    let teams = [];
  
    // Initialize teams with an additional property for player names
    for (let i = 1; i <= totalTeams; i++) {
      teams.push({
        teamNumber: i,
        teamName: 'Team ' + i,
        playersAlive: playersPerTeam,
        playerNames: Array(playersPerTeam).fill('') // Initialize with empty strings
      });
    }
  
    // Function to render teams
    function renderTeams() {
      app.innerHTML = ''; // Clear the existing HTML 
      let teamsAlive = 0; // Counter for teams that are still alive

      teams.forEach(team => {
        if (team.playersAlive > 0) teamsAlive++; // If team has players alive, increment counter
        
        const teamDiv = document.createElement('div');
        teamDiv.className = `team ${team.playersAlive === 0 ? 'eliminated' : ''}`; // Add 'eliminated' class if no players are alive
        teamDiv.innerHTML = `
          <input type="text" value="${team.teamName}" onchange="renameTeam(${team.teamNumber}, event)" placeholder="Team name" />
          <h2>${team.teamName}</h2>
          <p>Players Alive: <span>${team.playersAlive}</span></p>
          <button onclick="playerDown(${team.teamNumber})">Player Down</button>
          <button onclick="playerUp(${team.teamNumber})">Add Player</button>
          <div>
            ${team.playerNames.map((name, index) => `
              <input type="text" value="${name}" onchange="renamePlayer(${team.teamNumber}, ${index}, event)" placeholder="Player name" />
            `).join('')}
          </div>
        `;
        app.appendChild(teamDiv);
      });

      // Add teamsAlive to the UI
      const aliveCountDiv = document.querySelector('#teamsAlive');
      if (!aliveCountDiv) {
        const newDiv = document.createElement('div');
        newDiv.id = 'teamsAlive';
        document.body.insertBefore(newDiv, app);
      }
      document.querySelector('#teamsAlive').textContent = `Teams Alive: ${teamsAlive}`;
    }
  
    // Call renderTeams to display the initial UI
    renderTeams();
  
    // Function to decrease player count
    window.playerDown = function (teamNumber) {
      const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
      if (teams[teamIndex].playersAlive > 0) {
        teams[teamIndex].playersAlive--;
        renderTeams(); // Update the UI
      }
    }
  
    // Function to increase player count
    window.playerUp = function (teamNumber) {
      const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
      if (teams[teamIndex].playersAlive < playersPerTeam) { // Assuming there's a max limit per team
        teams[teamIndex].playersAlive++;
        renderTeams(); // Update the UI
      }
    }
  
    // Function to rename a team
    window.renameTeam = function (teamNumber, event) {
      const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
      teams[teamIndex].teamName = event.target.value; // Update the team's name with the new input value
      renderTeams(); // Update the UI
    }

    // Function to rename a player
    window.renamePlayer = function (teamNumber, playerIndex, event) {
      const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
      teams[teamIndex].playerNames[playerIndex] = event.target.value; // Update the player's name with the new input value
      // No need to call renderTeams here to avoid full re-render when typing
    }
  
});
