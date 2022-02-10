const gameBoard = (() => {
    let gameArr = ['', '', '', '', '', '', '', '', ''];
    let gameOn = false;

    function arrUpdate(index, type) {
        gameArr.splice(index, 1, type);
        console.log(gameArr);
    }

    function checkCell(cellIndex, playerType) {
        if (gameArr[cellIndex] === '') { 
            gameOn = true;
            arrUpdate(cellIndex, playerType);
            document.getElementById(cellIndex).innerHTML = playerType;
            winner(playerType);
            gameController.nextPlayer();
        }
    }

    function resetBoard() {
        gameArr = ['', '', '', '', '', '', '', '', ''];
        gameOn = false;
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
        document.getElementById('winner').innerHTML = '';
        gameController.pickPlayer();
        gameController.startGame();
    }

    function winner(currPlayer) {

        if (gameArr[0] === currPlayer && gameArr[1] === currPlayer && gameArr[2] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else  if (gameArr[0] === currPlayer && gameArr[3] === currPlayer && gameArr[6] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else  if (gameArr[0] === currPlayer && gameArr[4] === currPlayer && gameArr[8] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else  if (gameArr[3] === currPlayer && gameArr[4] === currPlayer && gameArr[5] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else  if (gameArr[1] === currPlayer && gameArr[4] === currPlayer && gameArr[7] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else  if (gameArr[2] === currPlayer && gameArr[4] === currPlayer && gameArr[6] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else  if (gameArr[6] === currPlayer && gameArr[7] === currPlayer && gameArr[8] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else  if (gameArr[2] === currPlayer && gameArr[5] === currPlayer && gameArr[8] === currPlayer) {
            gameController.annouceWinner();
            gameController.stopGame();
        } else if (gameOn && ) {
            console.log('draw');
        }

    }

    return {
        checkCell,
        winner,
        resetBoard,
    };
})();

const gameController = (() => {
    //add player names, chose type, randomly choose a player to start first

    let currPlayer = '';

    function pickPlayer() {
        if (Math.random() < 0.5) {
            currPlayer = 'X';
        } else {
            currPlayer = 'O';
        }
        document.getElementById('player').innerHTML = currPlayer + ' goes first'
        return currPlayer;
    }
    

    function nextPlayer() {
        return (currPlayer === 'X' ? currPlayer = 'O' : currPlayer = 'X');
    }

    function playerClick(event) {
        cellIndex = event.target.getAttribute('id');
        gameBoard.checkCell(cellIndex, currPlayer);
    }

    function annouceWinner() {
        document.getElementById('winner').innerHTML = currPlayer + ' WINS!';
    }

    function startGame() {
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', gameController.playerClick));
    }

    function stopGame() {
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', gameController.playerClick));
    }

    return {
        playerClick,
        nextPlayer,
        annouceWinner,
        startGame,
        stopGame,
        pickPlayer,
    };
})();

function player() {
    //player name, type: X/O?, 
    return {};
}

window.onload = gameController.pickPlayer();
window.onload = gameController.startGame();