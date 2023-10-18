document.addEventListener('DOMContentLoaded', function () {

    const app = document.querySelector('#app .teams');
    const totalTeams = 16;
    const playersPerTeam = 4;
    let teams = [];
  
    // Initialize teams
    for (let i = 1; i <= totalTeams; i++) {
      teams.push({
        teamNumber: i,
        teamName: 'Team ' + i, // Default name is "Team [number]"
        playersAlive: playersPerTeam
      });
    }
  
    // Function to render teams
    function renderTeams() {
      app.innerHTML = ''; // Clear the existing HTML 
  
      teams.forEach(team => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';
        teamDiv.innerHTML = `
          <input type="text" value="${team.teamName}" onchange="renameTeam(${team.teamNumber}, event)" placeholder="Team name" />
          <h2>${team.teamName}</h2>
          <p>Players Alive: <span>${team.playersAlive}</span></p>
          <button onclick="playerDown(${team.teamNumber})">Player Down</button>
          <button onclick="playerUp(${team.teamNumber})">Add Player</button>
        `;
        app.appendChild(teamDiv);
      });
    }
  
    // Call renderTeams to display the initial UI
    renderTeams();
  
    // Function to decrease player count
    window.playerDown = function (teamNumber) {
      const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
      if (teams[teamIndex].playersAlive > 0) {
        teams[teamIndex].playersAlive--;
      }
      renderTeams(); // Update the UI
    }
  
    // Function to increase player count
    window.playerUp = function (teamNumber) {
      const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
      if (teams[teamIndex].playersAlive < playersPerTeam) { // Assuming there's a max limit per team
        teams[teamIndex].playersAlive++;
      }
      renderTeams(); // Update the UI
    }
  
    // Function to rename a team
    window.renameTeam = function (teamNumber, event) {
      const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
      teams[teamIndex].teamName = event.target.value; // Update the team's name with the new input value
      renderTeams(); // Update the UI
    }
  
  });
  