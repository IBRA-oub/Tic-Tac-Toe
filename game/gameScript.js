
const firstPlayerName = document.querySelector('#firstPlayerName');
const secondPlayerName = document.querySelector('#secondPlayerName');
const firstPlayerScore = document.querySelector('#firstPlayerScore');
const secondPlayerScore = document.querySelector('#secondPlayerScore');
// get player
const players = JSON.parse(localStorage.getItem('players')) || [];
let lastPlayers;
// verify that there are players
if (players.length > 0) {
    lastPlayers = players[players.length - 1];  
} else {
    lastPlayers = { firstPlayer: { name: 'no name', score: 0 }, secondPlayer: { name: 'no name', score: 0 } };
}

// __________________________Afficher les noms et scores des joueurs____________________________

if (lastPlayers.firstPlayer) {
    firstPlayerName.innerHTML = lastPlayers.firstPlayer.name;
    firstPlayerScore.innerHTML = lastPlayers.firstPlayer.score;
} else {
    firstPlayerName.innerHTML = 'no name';
    firstPlayerScore.innerHTML = '0';
}

if (lastPlayers.secondPlayer) {
    secondPlayerName.innerHTML = lastPlayers.secondPlayer.name;
    secondPlayerScore.innerHTML = lastPlayers.secondPlayer.score;
} else {
    secondPlayerName.innerHTML = 'no name';
    secondPlayerScore.innerHTML = '0';
}

// ______________________________Dynamic generation of cells________________________________

const container = document.querySelector('#game-container');

for (let i = 0; i < 400; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `item${i}`;
    container.appendChild(cell);
}


let currentPlayer = 'X'; 


const cells = document.querySelectorAll('.cell');
const winModal = document.querySelector('#modal-container')
const modalText = document.querySelector('#modalText')
const modalContent = document.querySelector('#modalContent')
const firstPlayer = document.querySelector('#firstPlayer')
const secondPlayer = document.querySelector('#secondPlayer')

//____________________________________ logic for game_____________________________
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        
        if (cell.innerHTML === '') {
            
            cell.innerHTML = currentPlayer;

          
            // check for win
            if (checkWin(parseInt(cell.id.replace('item', '')), currentPlayer)) {

                // alert(currentPlayer + ' wins!');
                winModal.style.display = 'flex';
                if (currentPlayer === 'X') {
                    modalContent.style.backgroundColor = '#fdb8b8'
                    // update score after win
                    lastPlayers.firstPlayer.score += 1;
                    firstPlayerScore.innerHTML = lastPlayers.firstPlayer.score;
                } else {
                    // update score after win
                    lastPlayers.secondPlayer.score += 1;
                    secondPlayerScore.innerHTML = lastPlayers.secondPlayer.score;
                  modalContent.style.backgroundColor = '#a9bafd'
                }
                // update score in localStorage
                modalText.innerHTML = currentPlayer + ' wins!';
                players[players.length - 1] = lastPlayers;
                localStorage.setItem('players', JSON.stringify(players));

                return; 
            }
             // Check for a null match
             if (isDraw()) {
                winModal.style.display = 'flex';
                modalContent.style.backgroundColor = 'white'
                modalText.innerHTML = 'Null match! Play again';
                return;
            }
            
            if (currentPlayer === 'X') {
                // border color for turn
                firstPlayer.style.borderColor = 'white';
                secondPlayer.style.borderColor = 'green';
                secondPlayer.style.borderWidth = '4px';
                // change player after the current player play
                currentPlayer = 'O';
                // add style for case
                cell.classList.add('xStyle');
            } else {
                secondPlayer.style.borderColor = 'white';
                firstPlayer.style.borderColor = 'green';
                secondPlayer.style.borderWidth = '4px';
               
                currentPlayer = 'X';
                cell.classList.add('oStyle');
            }
        }
    });
});


// ______________________________close modal window_____________________________________________

document.querySelector('#closeModal').addEventListener('click', () => {
    
    
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('xStyle'); 
        cell.classList.remove('oStyle'); 
        winModal.style.display = 'none';
    });

    
    currentPlayer = 'X';

});


const gridSize = 20; 
const winCondition = 5;

// ________________________________________win function___________________________________________
function checkWin(index, player) {
    const row = Math.floor(index / gridSize);
    // cosole.log(row)
    const col = index % gridSize;
    // cosole.log(col)
    return (
        checkHorizontal(row, col, player) || 
        checkVertical(row, col, player) || 
        checkDiagonalDescending(row, col, player) || 
        checkDiagonalAscending(row, col, player)
    );
}

// _____________________________________Vérification horizontale_____________________________________________

function checkHorizontal(row, col, player) {
    let count = 0;

    for (let i = 0; i < gridSize; i++) {
        if (cells[row * gridSize + i].innerHTML === player) {
            count++;
            if (count === winCondition) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

//________________________________________________ Vertical check______________________________________________

function checkVertical(row, col, player) {
    let count = 0;

    for (let i = 0; i < gridSize; i++) {
        if (cells[i * gridSize + col].innerHTML === player) {
            count++;
            if (count === winCondition) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

//__________________________________ descending diagonal check (top-left to bottom-right)____________________________

function checkDiagonalDescending(row, col, player) {
    let count = 0;

    for (let i = -winCondition + 1; i < winCondition; i++) {
        let newRow = row + i;
        // console.log(newRow)
        let newCol = col + i;
        // console.log(newCol)

        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
            if (cells[newRow * gridSize + newCol].innerHTML === player) {
                count++;
                if (count === winCondition) return true;
            } else {
                count = 0;
            }
        }
    }
    return false;
}

//___________________________________ ascending diagonal check (bottom-left to top-right)________________________________

function checkDiagonalAscending(row, col, player) {
    let count = 0;

    for (let i = -winCondition + 1; i < winCondition; i++) {
        let newRow = row - i;
        let newCol = col + i;

        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
            if (cells[newRow * gridSize + newCol].innerHTML === player) {
                count++;
                if (count === winCondition) return true;
            } else {
                count = 0;
            }
        }
    }
    return false;
}

// ______________________________null match__________________________

function isDraw() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === '') {
            return false; 
        }
    }
    return true; 
}

// _________________________________________replay________________________

document.querySelector('#replay').addEventListener('click',()=>{

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('xStyle'); 
        cell.classList.remove('oStyle'); 
        winModal.style.display = 'none';
    });

    
    currentPlayer = 'X';
})

// ______________________________________start-Over_________________________

document.querySelector('#startOver').addEventListener('click',()=>{

    window.location.href = '../index.html'
})

