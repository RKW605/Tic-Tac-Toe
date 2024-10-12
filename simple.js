document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerTurn = urlParams.get('turn') === 'first' ? 'X' : 'O';
    let currentPlayer = playerTurn;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let isAITurn = false;

    const cells = document.querySelectorAll('.cell');
    const messageDisplay = document.getElementById('message');

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    function handleCellClick(event) {
        if (isAITurn || !gameActive) return;

        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (gameBoard[clickedCellIndex] !== '') return;

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            gameActive = false;
            displayMessage("You have won! Congratulations! Try tactic mode");
            return;
        }

        if (isDraw()) {
            gameActive = false;
            displayMessage("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (currentPlayer === 'O') {
            isAITurn = true;
            displayMessage("AI is making its move...");
            setTimeout(AIMove, 1000);
        } else {
            displayMessage("Your turn");
        }
    }

    function AIMove() {
        let availableMoves = [];
        gameBoard.forEach((cell, index) => {
            if (cell === '') availableMoves.push(index);
        });
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

        gameBoard[randomMove] = 'O';
        cells[randomMove].textContent = 'O';

        if (checkWin()) {
            gameActive = false;
            displayMessage("AI won! Later Kid");
        } else if (isDraw()) {
            gameActive = false;
            displayMessage("It's a draw!");
        } else {
            currentPlayer = 'X';
            isAITurn = false;
            displayMessage("Your turn");
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => gameBoard[index] === currentPlayer);
        });
    }

    function isDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    // Initialize turn
    if (currentPlayer === 'O') {
        isAITurn = true;
        displayMessage("AI is making its move...");
        setTimeout(AIMove, 1000);
    } else {
        displayMessage("Your turn");
    }

    // Reset button functionality
    document.getElementById('resetButton').addEventListener('click', () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        isAITurn = false;
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = playerTurn;

        if (currentPlayer === 'O') {
            isAITurn = true;
            displayMessage("AI is making its move...");
            setTimeout(AIMove, 1000);
        } else {
            displayMessage("Your turn");
        }
    });
});
