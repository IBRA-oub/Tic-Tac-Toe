

// Génération dynamique des cases
const container = document.querySelector('#game-container');

for (let i = 0; i < 400; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `item${i}`;
    container.appendChild(cell);
}




