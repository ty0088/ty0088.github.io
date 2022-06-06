import createPlayer from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { DOM } from "./DOM.js";

const gameController = (() => {
    let player1Obj = {};
    let player2Obj  = {};
    let p1GameBoardObj = {};
    let p2GameBoardObj = {};

    const newGame = () => {
        DOM.createBoard();
        player1Obj = createPlayer('Player1', 'human');
        player2Obj = createPlayer('Computer', 'computer');
        //input player ship coordinates, manually inputted for now.
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[8,1], 'X'], [[9,8], 'X']];
        p1GameBoardObj = createGameBoard(player1Obj.name, p1StartCoordArr);
        p2GameBoardObj = createGameBoard(player2Obj.name, p2StartCoordArr);
        //render start game button
        DOM.addStartBtn();
        //call mainGameLoop if start button pressed
        DOM.createEventList('gameButton', 'click', gameLoop)
        //remove start button
    };

    const gameLoop = () => {
        DOM.removeStartBtn();
        //event listener for next player, remove any event listener for other player
            //receiveAttack
            //if hit, update DOM, call isSunk()
                //if ships sunk then call winner, else call next player event listener
            //if miss, update DOM, call next player event listener
    };

    return  {
        newGame,
    };
})();

gameController.newGame();