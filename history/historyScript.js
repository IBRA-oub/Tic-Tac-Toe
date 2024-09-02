// plyaers from local storage
const playersHistory = JSON.parse(localStorage.getItem('players')) || [];

// Selecte tbody of table
const historyTableBody = document.querySelector('#historyTable tbody');


playersHistory.forEach((game, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${game.firstPlayer.name}</td>
        <td>${game.firstPlayer.score}:${game.secondPlayer.score}</td>
        <td>${game.secondPlayer.name}</td>
    `;
    historyTableBody.appendChild(row);
});


function backToGame() {
    window.location.href = '../game/game.html'
}