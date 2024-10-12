document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerTurn = urlParams.get('turn') === 'first' ? 'X' : 'O';
    let currentPlayer = playerTurn;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const cells = document.querySelectorAll('.cell');
    const messageDisplay = document.getElementById('message');

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    function handleCellClick(event) {
        if (!gameActive) return;

        const clickedCell = event.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        // Prevent clicks if cell is filled or it's AI's turn
        if (gameBoard[clickedCellIndex] !== '' || currentPlayer === 'O') return;

        // Player's move
        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            gameActive = false;
            displayMessage("You have won! Congratulations!");
            return;
        }

        if (isDraw()) {
            gameActive = false;
            displayMessage("It's a draw! You can never defeat this mode.");
            return;
        }

        currentPlayer = 'O'; // AI's turn
        displayMessage("AI is making its move...");
        setTimeout(AIMove, 1000);
    }

    function AIMove() {
        const bestMove = findBestMove();
        if (bestMove !== -1) {
            gameBoard[bestMove] = 'O'; // AI's move
            cells[bestMove].textContent = 'O';

            if (checkWin()) {
                gameActive = false;
                displayMessage("AI won! You can never defeat this mode.");
            } else if (isDraw()) {
                gameActive = false;
                displayMessage("It's a draw! You can never defeat this mode.");
            } else {
                currentPlayer = 'X'; // Switch turn back to the player
                displayMessage("Your turn");
            }
        }
    }

    function findBestMove() {
        let bestMove = -1;
        let bestValue = -Infinity;

        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === '') {
                gameBoard[i] = 'O'; // AI's move
                let moveValue = minimax(gameBoard, 0, false);
                gameBoard[i] = ''; // Undo move

                if (moveValue > bestValue) {
                    bestMove = i;
                    bestValue = moveValue;
                }
            }
        }
        return bestMove;
    }

    function minimax(board, depth, isMaximizing) {
        const winner = checkWinner(board);
        if (winner === 'O') return 1; // AI won
        if (winner === 'X') return -1; // Player won
        if (isDraw()) return 0; // Draw

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O'; // AI's move
                    let score = minimax(board, depth + 1, false);
                    board[i] = ''; // Undo move
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X'; // User's move
                    let score = minimax(board, depth + 1, true);
                    board[i] = ''; // Undo move
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return 'X' or 'O'
            }
        }
        return null; // No winner yet
    }

    function checkWin() {
        return checkWinner(gameBoard) !== null;
    }

    function isDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    // Initialize turn
    if (currentPlayer === 'O') {
        displayMessage("AI is making its move...");
        setTimeout(AIMove, 1000);
    } else {
        displayMessage("Your turn");
    }

    // Reset button functionality
    document.getElementById('resetButton').addEventListener('click', () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = playerTurn; // Keep the same starting player

        if (currentPlayer === 'O') {
            displayMessage("AI is making its move...");
            setTimeout(AIMove, 1000);
        } else {
            displayMessage("Your turn");
        }
    });
});
