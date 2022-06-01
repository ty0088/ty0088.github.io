import createPlayer from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { createDOMBoard, showShips } from "./DOM.js";

const gameController = (() => {
    let player1Obj = {};
    let player2Obj  = {};
    let p1GameBoardObj = {};
    let p2GameBoardObj = {};

    const newGame = () => {
        createDOMBoard();
        player1Obj = createPlayer('Player1', 'human');
        player2Obj = createPlayer('Computer', 'computer');
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]; //create method to recieve start coords based on user input or if computer
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[8,1], 'X'], [[9,8], 'X']];
        p1GameBoardObj = createGameBoard(player1Obj.name, p1StartCoordArr);
        p2GameBoardObj = createGameBoard(player2Obj.name, p2StartCoordArr);
        
    };

    return  {
        newGame,
    };
})();

gameController.newGame();