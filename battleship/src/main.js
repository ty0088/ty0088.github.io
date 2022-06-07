import createPlayer from "./player.js";
import { createGameBoard } from "./gameBoard.js";
import { DOM } from "./DOM.js";

const gameController = (() => {
    let player1Obj = {};
    let player2Obj  = {};
    let p1GameBoardObj = {};
    let p2GameBoardObj = {};
    let attackCoord = '';

    //initialise new game
    const newGame = () => {
        DOM.textInstruct('');
        player1Obj = createPlayer('Player 1', 'human');
        player2Obj = createPlayer('Player 2', 'human');
        DOM.createBoard(player1Obj, player2Obj);
        //input player ship coordinates, manually inputted for now.
        // const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[8,1], 'X'], [[9,8], 'X']];
        p1GameBoardObj = createGameBoard(player1Obj.name, p1StartCoordArr);
        p2GameBoardObj = createGameBoard(player2Obj.name, p2StartCoordArr);
        //render start game button
        DOM.addGameBtn('Start Game');
        //call game loop if start button pressed
        DOM.createEventList('gameButton', 'click', startGame);
    };

    //start game loop by removing start button and starting player 1s turn
    const startGame = () => {
        DOM.removeEventList('gameButton', 'click', startGame);
        DOM.removeGameBtn();
        p1Turn();
    };

    //remove any existing event listener for player 2, update game instructions and activate board 1
    const p1Turn = () => {
        DOM.removeEventList('p1Board', 'click', p2Attack);
        DOM.textInstruct(`${player1Obj.name}'s turn. Pick a grid to attack!`);
        DOM.activeBoard('p1Board');
        DOM.deactBoard('p2Board');
        DOM.createEventList('p1Board', 'click', p1Attack);
    }

    //on player 1 click (attack)
    const p1Attack = (event) => {
        let p2HitCount = p2GameBoardObj.hits.length;
        let p2MissCount = p2GameBoardObj.misses.length;
        //recieve attack coordinates and confirm hit or miss
        attackCoord = DOM.clickCoord(event);
        p2GameBoardObj.receiveAttack(attackCoord);
        if (p2HitCount !== p2GameBoardObj.hits.length) {
            //if hit, render hit, call checkAllSunk() and check for winner. If not all ships sunk, next player turn
            DOM.boardHit('p1Board', p2GameBoardObj);
            if (p2GameBoardObj.checkAllSunk()) {
                winner(player1Obj.name);
            } else {
                p2Turn();
            }
        } else if (p2MissCount !== p2GameBoardObj.misses.length) {
            //if miss, render miss and call next players turn
            DOM.boardMiss('p1Board', p2GameBoardObj);
            p2Turn();
        }
    };

    //remove any existing event listener for player 1, update game instructions and activate board 2
    const p2Turn = () => {
        DOM.removeEventList('p1Board', 'click', p1Attack);
        DOM.textInstruct(`${player2Obj.name}'s turn. Pick a grid to attack!`);
        DOM.activeBoard('p2Board');
        DOM.deactBoard('p1Board');
        DOM.createEventList('p2Board', 'click', p2Attack);
    };

    //on player 2 click (attack)
    const p2Attack = (event) => {
        let p1HitCount = p1GameBoardObj.hits.length;
        let p1MissCount = p1GameBoardObj.misses.length;
        attackCoord = DOM.clickCoord(event);
        p1GameBoardObj.receiveAttack(attackCoord);
        if (p1HitCount !== p1GameBoardObj.hits.length) {
            DOM.boardHit('p2Board', p1GameBoardObj);
            if (p1GameBoardObj.checkAllSunk()) {
                winner(player2Obj.name);
            } else {
                p1Turn();
            }
        } else if (p1MissCount !== p1GameBoardObj.misses.length) {
            DOM.boardMiss('p2Board', p1GameBoardObj);
            p1Turn();
        }
    };

    const winner = (player) => {
        DOM.textInstruct(`${player} is the winner!! They have sunk all the enemy ships!`);
        DOM.showShips('p2Board', p1GameBoardObj);
        DOM.showShips('p1Board', p2GameBoardObj);
        DOM.removeEventList('p1Board', 'click', p1Attack);
        DOM.removeEventList('p2Board', 'click', p2Attack);
        DOM.deactBoard('p1Board');
        DOM.deactBoard('p2Board');
        //render restart button
        DOM.addGameBtn('Restart');
        DOM.createEventList('gameButton', 'click', newGame);
    };

    return  {
        newGame,
    };
})();

gameController.newGame();