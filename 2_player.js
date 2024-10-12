let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const cells = document.querySelectorAll('.cell');
const messageDiv = document.getElementById('message');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '' && !checkWinner()) {
            cell.textContent = currentPlayer;
            board[index] = currentPlayer;

            if (checkWinner()) {
                messageDiv.textContent = `${currentPlayer} wins!`;
            } else if (board.every(cell => cell)) {
                messageDiv.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                messageDiv.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset game
document.getElementById('resetButton').addEventListener('click', () => { // Updated from 'reset' to 'resetButton'
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    messageDiv.textContent = `Player ${currentPlayer}'s turn`;
});
