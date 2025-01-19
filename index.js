const board = document.getElementById('board');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restart');
const currentPlayerText = document.getElementById('current-player');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameOver = false;

function createBoard() {
    gameBoard.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] || gameOver) {
        return;
    }

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');

    // Add player-specific class for color
    if (currentPlayer === 'X') {
        event.target.classList.add('player-x');
    } else {
        event.target.classList.add('player-o');
    }

    if (checkWinner()) {
        winnerText.textContent = `${currentPlayer} Wins!`;
        gameOver = true;
    } else if (gameBoard.every(cell => cell)) {
        winnerText.textContent = 'It\'s a Draw!';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerText.textContent = currentPlayer;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function restartGame() {
    gameBoard.fill(null);
    currentPlayer = 'X';
    currentPlayerText.textContent = currentPlayer;
    winnerText.textContent = '';
    board.innerHTML = '';
    gameOver = false;
    createBoard();
}

createBoard();
restartButton.addEventListener('click', restartGame);
