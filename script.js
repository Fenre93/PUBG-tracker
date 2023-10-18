document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.querySelector('#app');
    const teamsAliveElement = document.createElement('div');
    teamsAliveElement.id = 'teamsAlive';
    appContainer.appendChild(teamsAliveElement); // Moving teamsAliveElement inside the app container for better structuring

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.onclick = resetGame;
    resetButton.style.marginBottom = '20px'; // Adding some margin for visual spacing
    appContainer.appendChild(resetButton);

    const app = document.createElement('div');
    app.className = 'teams';
    appContainer.appendChild(app);

    const totalTeams = 16;
    const playersPerTeam = 4;

    // Specify the custom team names
    const teamNames = [
        'FUT', 'Formulation', 'BFG', 'Slava', 'WACE', 'STFU',
        'Ukjent Mix', 'RR', 'Mad Marines', 'DSG', 'Slowstorm',
        'Sami B', 'Klanen', 'Modern Vikings', 'VV', 'AAU'
    ];

    let teams = [];

    function initializeTeams() {
        teams = []; // Reset the teams array
        // Initialize teams with custom names
        for (let i = 0; i < totalTeams; i++) {
            teams.push({
                teamNumber: i + 1,
                teamName: teamNames[i], // Assigning from predefined names
                playersAlive: playersPerTeam,
                playerNames: Array(playersPerTeam).fill('').map((_, index) => 'Player ' + (index + 1)),
                eliminated: false
            });
        }
    }

    initializeTeams(); // Initialize teams when the app loads

    // Function to update the number of teams still alive
    function updateTeamsAlive() {
        const teamsAlive = teams.filter(team => !team.eliminated).length;
        teamsAliveElement.textContent = teamsAlive + ' Teams Alive';
    }

    // Function to render teams
    function renderTeams() {
        app.innerHTML = '';
        updateTeamsAlive();

        teams.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team';
            if (team.eliminated) {
                teamDiv.classList.add('eliminated');
            }

            teamDiv.innerHTML = `
                <input type="text" value="${team.teamName}" onchange="renameTeam(${team.teamNumber}, event)" placeholder="Team name" />
                <h2>Team ${team.teamNumber}: ${team.teamName}</h2> <!-- Displaying team number along with the team name -->
                <p>Players Alive: <span>${team.playersAlive}</span></p>
                <button onclick="playerDown(${team.teamNumber})">Player Down</button>
                <button onclick="playerUp(${team.teamNumber})">Add Player</button>
                <div>
                ${team.playerNames.map((name, index) => `
                    <input type="text" value="${name}" onchange="renamePlayer(${team.teamNumber}, ${index}, event)" placeholder="Player name" style="display: block; margin-top: 5px;" />
                `).join('')}
                </div>
            `;
            app.appendChild(teamDiv);
        });
    }

    renderTeams();

    // Function to reset the game state
    function resetGame() {
        initializeTeams(); // Re-initialize the teams
        renderTeams(); // Re-render the teams
    }

    // Function to decrease player count
    window.playerDown = function (teamNumber) {
        const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
        if (teams[teamIndex].playersAlive > 0) {
            teams[teamIndex].playersAlive--;
            if (teams[teamIndex].playersAlive === 0) {
                teams[teamIndex].eliminated = true;
            }
            renderTeams();
        }
    }

    // Function to increase player count
    window.playerUp = function (teamNumber) {
        const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
        if (teams[teamIndex].playersAlive < playersPerTeam) {
            teams[teamIndex].playersAlive++;
            if (teams[teamIndex].playersAlive > 0) {
                teams[teamIndex].eliminated = false; // Mark the team as not eliminated if a player is added
            }
            renderTeams();
        }
    }

    // Function to rename a team
    window.renameTeam = function (teamNumber, event) {
        const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
        teams[teamIndex].teamName = event.target.value;
        renderTeams();
    }

    // Function to rename a player
    window.renamePlayer = function (teamNumber, playerIndex, event) {
        const teamIndex = teams.findIndex(team => team.teamNumber === teamNumber);
        teams[teamIndex].playerNames[playerIndex] = event.target.value;
        // No need to call renderTeams() here as the player's name is being updated live in the input field
    }
});
