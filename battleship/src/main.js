import { newPlayer } from "./player";
import { newGameBoard } from "./gameBoard";
import { DOM } from "./DOM";

const gameModule =(() =>  {
    let p1Obj = {};
    let p2Obj = {};
    let p1Board = {};
    let p2Board = {};
    let p1name = '';
    let p2name = '';
    let p1type = '';
    let p2type = '';
    let attackCoord = '';
    let shipDirect = 'X';
    let currShipType = 'Carrier';
    let currShipLength = 5;
    let currCoord = [];
    let currPlayObj = {};
    let currBoardObj = {};

    //event handlers
    const changeShipClick = () => {
        shipDirect === 'X' ? shipDirect = 'Y' : shipDirect = 'X';
        DOM.changeShipDir(shipDirect, currShipLength);
    };
    const shipOverlayClick = (event) => {
        DOM.shipOverlay(event, shipDirect, currShipLength)
    };
    const shipInputClick = (event) => {
        //check ship placement is acceptable
        currCoord = DOM.clickCoord(event);
        if (currBoardObj.checkCoord(currCoord, currShipType, currShipLength, shipDirect)) {
            //render ship on inputBoard 
            //if ok, remove shipOverlay listener and inputclick listener
            DOM.removeEventList('shipIcon', 'click', changeShipClick);
            DOM.removeEventList('inputBoard', 'mouseover', shipOverlayClick);
            DOM.removeEventList('inputBoard', 'click', shipInputClick);
            //ask for confirmation to place ship, if yes, placeship and load next ship
            DOM.confirmShip();
            DOM.newEventList('confShip', 'click', nextShip)
            DOM.newEventList('cancShip', 'click', showCurrShip)
        }
    };

    const newGame = (gridSize) => {
        p1Board = newGameBoard(gridSize);
        p2Board = newGameBoard(gridSize);
        DOM.textInstruct('');
        DOM.playerInputBox('Player 1');
        DOM.newEventList('inputForm', 'submit', getPlayer1);
    };
    //get player 1's name and type values from DOM, then get player 2's details
    const getPlayer1 = (e) => {
        DOM.removeEventList('inputForm', 'submit', getPlayer1);
        [p1name, p1type] = DOM.getPlayerInputs(e);
        DOM.playerInputBox('Player 2');
        DOM.newEventList('inputForm', 'submit', getPlayer2);
    };
    //get player 2's name and type, create player objects and get ship locations
    const getPlayer2 = (e) => {
        DOM.removeEventList('inputForm', 'submit', getPlayer2);
        [p2name, p2type] = DOM.getPlayerInputs(e);
        p1Obj = newPlayer(p1name, p1type);
        p2Obj = newPlayer(p2name, p2type);
        getP1Ships();
    };
    //get player 1's ship locations
    const getP1Ships = () => {
        currPlayObj = p1Obj;
        currBoardObj = p1Board;
        if (p1Obj.type === 'human') {
            //if p1 is human, render shipInputBox
            DOM.shipInputBox();
            showCurrShip();
        } else {
            //get computer to place ships
        }
        //getShipInputs
        //getP2Ships
    };
    //get player 2's ship locations
    const getP2Ships = () => {
        currPlayObj = p2Obj;
        currBoardObj = p2Board;
        if (p2Obj.type === 'human') {
            currShipType = 'Carrier';
            currShipLength = 5;
            showCurrShip();
        } else {
            //get computer to place ships
        }

    };
    //load current input ship
    const showCurrShip = () => {
        //show curr ship
        DOM.showInputShip(currShipType, currShipLength, currPlayObj.name);
        //add event listener for direction change
        DOM.newEventList('shipIcon', 'click', changeShipClick);
        //add event listener for inputBoard, on hover should show ship
        DOM.newEventList('inputBoard', 'mouseover', shipOverlayClick);
        //add event listener for inputBoard, on click should check ship placement, place ship and ask for confirm
        DOM.newEventList('inputBoard', 'click', shipInputClick);
    };
    //confirm ship placement and load next ship
    const nextShip = () => {
        //place ship
        currBoardObj.placeShip(currCoord, currShipType, currShipLength, shipDirect, 10);
        //remove event listeners
        DOM.removeEventList('confShip', 'click', nextShip)
        DOM.removeEventList('cancShip', 'click', showCurrShip)
        //update current ship variables and render next ship
        //if all ships placed, move to next player or start game
        if (!currBoardObj.ships.every(ship => {
            if (ship.shipCoords.length === 0) {
                currShipType = ship.type;
                currShipLength = ship.length;
                return false;
            }
            return true;
        })) {
            showCurrShip();
        } else {
            if (currPlayObj === p1Obj) {
                getP2Ships();
            } else {
                loadGame();
            }
        }
    };
    //load game boards
    const loadGame = () =>  {
        document.getElementById('shipInputBox').remove();
        //render game board and start button
        DOM.newBoard(p1Obj, p2Obj);
        DOM.addGameBtn('Start Game');
        DOM.addGameBtn('Start Game');
        DOM.newEventList('gameButton', 'click', startGame);
    };
    //start game loop by removing start button and starting player 1s turn
    const startGame = () => {
        DOM.removeEventList('gameButton', 'click', startGame);
        DOM.removeGameBtn();
        //randomly select first player
        if (Math.random() < 0.5) {
            p1Turn();
        } else {
            p2Turn();
        }
    };

    //remove any existing event listener for player 2, update game instructions and activate board 2 for attack
    const p1Turn = () => {
        DOM.removeLinkClass('p1Board');
        DOM.removeEventList('p1Board', 'click', p2Attack);
        DOM.textInstruct(`${p1Obj.name}'s turn. Pick a grid to attack on ${p2Obj.name}'s board!`);
        //if player is computer, computer to trigger click on random grid
        if (p1Obj.type === 'computer') {
            setTimeout(() => p1Attack(), 700);
        } else {
            DOM.addLinkClass('p2Board');
            DOM.newEventList('p2Board', 'click', p1Attack);
        }
    }

    //on player 1 click (attack)
    const p1Attack = (event) => {
        let p2HitCount = p2Board.countHits();
        let p2MissCount = p2Board.misses.length;
        //recieve attack coordinates (DOM for human or method for comp) and confirm hit or miss
        attackCoord = (p1Obj.type === 'computer') ? p1Obj.compAttack(p1Board.gridSize) : DOM.clickCoord(event);
        p2Board.receiveAttack(attackCoord);
        //if new hit, render hit, call checkAllSunk() and check for winner. If not all ships sunk, next player turn
        if (p2HitCount !== p2Board.countHits()) {
            DOM.boardHit('p2Board', attackCoord);
            if (p2Board.checkAllSunk()) {
                winner(p1Obj.name, p1Board.gridSize);
            } else {
                p2Turn();
            }
        } else if (p2MissCount !== p2Board.misses.length) {
            //if new miss, render miss and call next players turn
            DOM.boardMiss('p2Board', attackCoord);
            p2Turn();
        } else {
            //if grid has already been picked, pick again
            p1Attack();
        }
    };

    //remove any existing event listener for player 1, update game instructions and activate board 2 for attack
    const p2Turn = () => {
        DOM.removeLinkClass('p2Board');
        DOM.removeEventList('p2Board', 'click', p1Attack);
        DOM.textInstruct(`${p2Obj.name}'s turn. Pick a grid to attack on ${p1Obj.name}'s board!`);
         //if player is computer, computer to pick a grid and attack
        if (p2Obj.type === 'computer') {
            setTimeout(() => p2Attack(), 700);
        } else {
            DOM.addLinkClass('p1Board');
            DOM.newEventList('p1Board', 'click', p2Attack);
        }
    };

    //on player 2 click (attack)
    const p2Attack = (event) => {
        let p1HitCount = p1Board.countHits();
        let p1MissCount = p1Board.misses.length;
        attackCoord = (p2Obj.type === 'computer') ? p2Obj.compAttack(p2Board.gridSize) : DOM.clickCoord(event);
        p1Board.receiveAttack(attackCoord);
        if (p1HitCount !== p1Board.countHits()) {
            DOM.boardHit('p1Board', attackCoord);
            if (p1Board.checkAllSunk()) {
                winner(p2Obj.name, p2Board.gridSize);
            } else {
                p1Turn();
            }
        } else if (p1MissCount !== p1Board.misses.length) {
            DOM.boardMiss('p1Board', attackCoord);
            p1Turn();
        } else {
            p2Attack();
        }
    };

    const winner = (player, gridSize) => {
        DOM.textInstruct(`${player} is the winner!! They have sunk all the enemy ships!`);
        DOM.showShips('p1Board', p1Board);
        DOM.showShips('p2Board', p2Board);
        DOM.removeEventList('p1Board', 'click', p1Attack);
        DOM.removeEventList('p2Board', 'click', p2Attack);
        DOM.removeLinkClass('p1Board');
        DOM.removeLinkClass('p2Board');
        //render restart button
        DOM.addGameBtn('Restart');
        DOM.newEventList('gameButton', 'click', () => newGame(gridSize));
    };

    return {
        newGame
    };
})();

gameModule.newGame(10);