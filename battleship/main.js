import createPlayer from "./modules/player.js";
import { createGameBoard } from "./modules/gameBoard.js";
import { popSquares } from "./modules/DOM.js";

const gameController = (() => {
    const newGame = () => {
        const player1 = createPlayer('Player1', 'human');
        const player2 = createPlayer('Computer', 'computer');
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]; //create method to recieve start coords based on user input or if computer
        const p1GameBoard = createGameBoard(player1.name, p1StartCoordArr);
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[4,6], 'Y'], [[9,8], 'X']];
        const p2GameBoard = createGameBoard(player2.name, p2StartCoordArr);
    };

    return  {
        newGame,
    };
})();

popSquares();