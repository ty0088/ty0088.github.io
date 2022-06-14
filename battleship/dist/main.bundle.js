/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOM": () => (/* binding */ DOM)
/* harmony export */ });
const DOM = (() => {
    //render game boards
    const newBoard = (p1Obj, p2Obj) => {
        //create grid lines on p1Grid
        const p1Grid = document.getElementById('p1Board');
        p1Grid.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const whiteBox = document.createElement('span');
            whiteBox.classList.add('bgWhite');
            p1Grid.appendChild(whiteBox);
        }
        //create grid lines on p2Grid
        const p2Grid = document.getElementById('p2Board');
        p2Grid.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const whiteBox = document.createElement('span');
            whiteBox.classList.add('bgWhite');
            p2Grid.appendChild(whiteBox);
        }
        //add coordinate attribute to each span
        const p1BoxSpans = document.querySelectorAll('#p1Board > span');
        const p2BoxSpans = document.querySelectorAll('#p2Board > span');
        let spanCount = 0;
        for (let y = 10; y > 0; y--) {
            const yCoord  = y;
            for (let x = 1; x <= 10; x++) {
                const xCoord = x;
                p1BoxSpans[spanCount].setAttribute('data-coord', `${xCoord},${yCoord}`);
                p2BoxSpans[spanCount].setAttribute('data-coord', `${xCoord},${yCoord}`);
                spanCount ++;
            }
        }
        //render player names below each board
        document.querySelector('#p1Board + .playerName').innerText = `${p1Obj.name}'s Board`;
        document.querySelector('#p2Board + .playerName').innerText = `${p2Obj.name}'s Board`;
    };
    //render a start button
    const addGameBtn = (text) => {
        const gameBtn = document.createElement('span');
        const btnContainer = document.getElementById('buttonContainer');
        btnContainer.innerHTML = '';
        gameBtn.id = 'gameButton';
        gameBtn.classList.add('link');
        gameBtn.innerText = text;
        btnContainer.appendChild(gameBtn);
    };
    //remove start button
    const removeGameBtn = () => {
        document.getElementById('gameButton').remove();
    };
    //render text instructions
    const textInstruct = (text) => {
        const instElem = document.getElementById('instructions');
        instElem.innerText = '';
        instElem.innerText = text;
    };
    //create an event listener
    const newEventList = (elemID, event, func) => {
        const elem = document.getElementById(elemID);
        elem.addEventListener(event, func);
    };
    //remove an event listener
    const removeEventList =  (elemID, event, func) => {
        const elem = document.getElementById(elemID);
        elem.removeEventListener(event, func);
    };
    const addLinkClass = (actBoardID, ) => {
        const actElem = document.getElementById(actBoardID);
        actElem.classList.add('link');
    };
    const removeLinkClass = (deactBoardID) => {
        const deactElem = document.getElementById(deactBoardID);
        deactElem.classList.remove('link');
    };
    //render all ships on board
    const showShips = (board, gameBoardObj) => {
        //collect all ship coordinates and add bg class
        const shipsArr = ['carrier', 'battle', 'cruiser',  'submarine', 'destroyer'];
        shipsArr.forEach(ship => {
                gameBoardObj[ship].shipCoords.forEach(coord => {
                    // coordsArr.push(coord);
                    const coordString = `${coord[0]},${coord[1]}`;
                    document.querySelector(`#${board} > [data-coord="${coordString}"]`).classList.add('bgShip');
            });
        });
    };
    //render hit
    const boardHit = (board, hitCoord) => {
        const dataCoord = `${hitCoord[0]},${hitCoord[1]}`;
        const gridElem = document.querySelector(`#${board} > [data-coord="${dataCoord}"]`);
        const attckIcn = document.createElement('span');
        attckIcn.classList.add('material-symbols-outlined');
        attckIcn.innerText = 'cancel';
        gridElem.appendChild(attckIcn);
        window.getComputedStyle(attckIcn).opacity;
        attckIcn.style.opacity = 1;
    };
    //render miss
    const boardMiss = (board, missCoord) => {
        const dataCoord = `${missCoord[0]},${missCoord[1]}`;
        const gridElem = document.querySelector(`#${board} > [data-coord="${dataCoord}"]`);
        const missIcn = document.createElement('span');
        missIcn.classList.add('material-symbols-outlined');
        missIcn.innerText = 'radio_button_unchecked';
        gridElem.appendChild(missIcn);
        window.getComputedStyle(missIcn).opacity;
        missIcn.style.opacity = 1; 
    };
    //returns the coords in an array of grid clicked
    const clickCoord = (event) => {
        const coordStr = event.target.getAttribute("data-coord");
        const coordStrArr = coordStr.split(',');
        let coord = [];
        coord.push(parseInt(coordStrArr[0]));
        coord.push(parseInt(coordStrArr[1]));
        return coord;
    };
    //render input pop up
    const inputBox = (player) => {
        const container = document.getElementById('pageContainer');
        const inputBox = document.createElement('div');
        inputBox.id = 'inputBox';
        container.appendChild(inputBox);
        
        const inputinst = document.createElement('span');
        inputinst.innerText = `Enter ${player} Name and select Player Type`;
        const inputForm = document.createElement('form');
        inputForm.id = 'inputForm';
        const nameInput = document.createElement('input');
        nameInput.id = 'nameInput';
        nameInput.type = 'text';
        nameInput.setAttribute('required', '');
        const humanSpan = document.createElement('span');
        const humanInput = document.createElement('input');
        humanInput.id = 'humanInput';
        humanInput.name = 'typeInput';
        humanInput.type = 'radio';
        humanInput.value = 'human';
        humanInput.setAttribute('required', '');
        const humanLabel =  document.createElement('label');
        humanLabel.htmlFor = 'humanInput';
        humanLabel.innerText = 'Human';
        const compSpan = document.createElement('span');
        const compInput = document.createElement('input');
        compInput.id = 'humanInput';
        compInput.name = 'typeInput';
        compInput.type = 'radio';
        compInput.value = 'computer';
        compInput.setAttribute('required', '');
        const compLabel =  document.createElement('label');
        compLabel.htmlFor = 'compInput';
        compLabel.innerText = 'Computer';
        const submitInput = document.createElement('input');
        submitInput.id ='submitInput'
        submitInput.type = 'submit';
        submitInput.value = 'Enter';
        inputBox.appendChild(inputinst);
        inputBox.appendChild(inputForm);
        inputForm.appendChild(nameInput);
        humanSpan.appendChild(humanInput);
        humanSpan.appendChild(humanLabel);
        inputForm.appendChild(humanSpan);
        compSpan.appendChild(compInput);
        compSpan.appendChild(compLabel);
        inputForm.appendChild(compSpan);
        inputForm.appendChild(submitInput);
    };
    //get player input values and removes inputBox
    const getInputs = (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const type = document.querySelector('input[type="radio"]:checked').value;
        document.getElementById('inputBox').remove();
        return [name, type];
    };

    return {
        newBoard,
        addGameBtn,
        removeGameBtn,
        textInstruct,
        newEventList,
        removeEventList,
        addLinkClass,
        removeLinkClass,
        showShips,
        boardHit,
        boardMiss,
        clickCoord,
        inputBox,
        getInputs
    };
})();



/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGameBoard": () => (/* binding */ newGameBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


const newGameBoard = (gridSize) => {
    //create ship objs
    const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(5, 'carrier');
    const battle = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(4, 'battle');
    const cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'cruiser');
    const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'submarine');
    const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(2, 'destroyer');
    const ships = [carrier, battle, cruiser, submarine, destroyer];
    //check whether chosen coord is a hit or miss and is a new
    let misses = [];
    const receiveAttack = (coord) => {
        let hitIndi = false;
        ships.forEach(ship => {
            if (searchCoords(ship.shipCoords, coord)) {
                ship.hit(coord);
                hitIndi = true;
            }
        });
        if (hitIndi === false) {
            if (!searchCoords(misses, coord)) {
                misses.push(coord);
            }
        }
    };
    //method to search an array of coordinates for a specific coordinate
    const searchCoords = (coordArr, coord) => {
        return coordArr.some(arr => arr.toString() === coord.toString());
    };
    //check whether all ships have been sunk
    const checkAllSunk = () => {
        return ships.every(ship => ship.isSunk());
    };
    //place ship with start coordinate and direction, checks ship fits on grid
    //and does not overlap with other ships placed
    const placeShip = (startCoord, currShipType, length, direction) => {
        if (checkBoardFit(startCoord, length, direction, gridSize)) {
            const shipCoords = returnShipCoords(startCoord, length, direction, currShipType);
            const checkShips = ships.filter(ship => ship.type !== currShipType);
            if (checkOverlap(shipCoords, checkShips)) {
                let currShipObj = ships.filter(ship => ship.type == currShipType);
                currShipObj[0].addShipCoords(shipCoords);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    //check start coord of ship fits on grid
    const checkBoardFit = (startCoord, length, direction, gridSize) => {
        if (direction === 'X') {
            if ((startCoord[0] + length - 1) <= gridSize) {
                return true;
            } else {
                return false;
            }
        } else {
            if ((startCoord[1] + length - 1) <= gridSize) {
                return true;
            } else {
                return false;
            }
        }
    };
    //return coordinates of whole ship
    const returnShipCoords = (startCoord, length, direction) => {
        let shipCoords = [startCoord];
        for (let i = 1; i < length; i ++) {
            if (direction === 'X') {
                shipCoords.push([startCoord[0] + i, startCoord[1]]);
            } else {
                shipCoords.push([startCoord[0], startCoord[1] + i]);
            }
        }
        return shipCoords;
    };
    //check coords of current ship do not overlap with other ships
    const checkOverlap = (shipCoords, checkShips) =>  {
        //shipCoords.every(coord => !checkShips.every(ship => !searchCoords(ship.shipCoords, coord)));
        return !checkShips.some(ship => shipCoords.some(coord => searchCoords(ship.shipCoords, coord)));
    };
    //count total amount of hits on a board
    const countHits = () => {
        let count = 0;
        ships.forEach(ship => {
            for (let i = 1; i <= ship.length; i++) {
                if (ship.hitInfo[i] === 'hit') {
                    count ++;
                }
            }
        });
        return count;
    };
    return { gridSize, carrier, battle, cruiser, submarine, destroyer, misses, receiveAttack, checkAllSunk, placeShip, countHits };
};




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newPlayer": () => (/* binding */ newPlayer)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");


const newPlayer = (name, type) => {
    const ranCoord = (gridSize) => {
        const xCoord = Math.floor(Math.random() * gridSize) + 1;
        const yCoord = Math.floor(Math.random() * gridSize) + 1;
        return [xCoord, yCoord];
    };
    if (type === 'human') {
        return {name, type};
    } else if (type === 'computer') {
        //pick a random grid point within a grid and a random X/Y direction
        const shipStartPos = (gridSize) => {
            const xyDir = Math.random() < 0.5 ? 'X' : 'Y';
            const [xCoord, yCoord] = ranCoord(gridSize);
            return [[xCoord, yCoord], xyDir];
        }
        //pick a random grid point given a certain grid size
        const compAttack = (gridSize) => {
            return ranCoord(gridSize);
        }
        return {name, type, shipStartPos, compAttack};
    }
}



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newShip": () => (/* binding */ newShip)
/* harmony export */ });
const newShip = (length, type) => {
    let shipCoords = [];
    //add array of coords
    const addShipCoords = (coordArr) => {
        coordArr.forEach(coord => shipCoords.push(coord));
    };
    //initialise and populate an object which shows any hits on a ship
    const hitInfo = {};
    for (let i = 1; i <= length; i++) {
        let position = i;
        hitInfo[position] = 'ok';
    }
    //update hit on a ship
    const hit = (coord) => {
        hitInfo[calPosition(coord)] = 'hit';
    };
    //method to check whether a ship is sunk by checking the hitInfo object
    const isSunk = () => {
        let hitCount = 0;
        for (let i = 1; i <= length; i++) {
            if (hitInfo[i] === 'hit') {
                hitCount ++;
            }
        }
        if (hitCount === length) {
            return true;
        } else {
            return false;
        }
    };
    //calculate the position of hit on ship based on the hit coord
    const calPosition = (coord) => {
        const xDiff = Math.abs(shipCoords[0][0] - coord[0]);
        const yDiff = Math.abs(shipCoords[0][1] - coord[1]);
        if (xDiff === 0 && yDiff === 0) {
            return 1;
        } else if (xDiff === 0 && yDiff > 0) {
            return yDiff + 1;
        } else if (xDiff > 0 && yDiff === 0) {
            return xDiff + 1;
        }
    };
    return { length, type, shipCoords, hitInfo, addShipCoords, hit, isSunk };
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");




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

    const newGame = () => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct('');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.inputBox('Player 1');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('inputForm', 'submit', getPlayer1);
    };
    //get player 1's name and type values from DOM, then get player 2's details
    const getPlayer1 = (e) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('inputForm', 'submit', getPlayer1);
        [p1name, p1type] = _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.getInputs(e);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.inputBox('Player 2');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('inputForm', 'submit', getPlayer2);
    };
    //get player 2's name and type and load game board
    const getPlayer2 = (e) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('inputForm', 'submit', getPlayer2);
        [p2name, p2type] = _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.getInputs(e);
        loadGame(10);
    };
    //load game boards
    const loadGame = (gridSize) =>  {
         //players created in code, DOM input to be added
        //----------------------------------------------
        p1Obj = (0,_player__WEBPACK_IMPORTED_MODULE_0__.newPlayer)(p1name, p1type);
        p2Obj = (0,_player__WEBPACK_IMPORTED_MODULE_0__.newPlayer)(p2name, p2type);
        //----------------------------------------------
        p1Board = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.newGameBoard)(gridSize);
        p2Board = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.newGameBoard)(gridSize);
        //place ships in code, DOM input to be added
        //-------------------------------------------
        p1Board.placeShip([6,4], 'carrier', 5, 'Y');
        p1Board.placeShip([1,1], 'battle', 4, 'X');
        p1Board.placeShip([2,6], 'cruiser', 3, 'Y');
        p1Board.placeShip([4,6], 'submarine', 3, 'Y');
        p1Board.placeShip([9,6], 'destroyer', 2, 'X');
        p2Board.placeShip([5,10], 'carrier', 5, 'X');
        p2Board.placeShip([3,5], 'battle', 4, 'X');
        p2Board.placeShip([2,7], 'cruiser', 3, 'Y');
        p2Board.placeShip([8,1], 'submarine', 3, 'X');
        p2Board.placeShip([9,8], 'destroyer', 2, 'X');
        //-------------------------------------------
        //render game board and start button
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newBoard(p1Obj, p2Obj);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Start Game');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Start Game');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('gameButton', 'click', startGame);
    };
    //start game loop by removing start button and starting player 1s turn
    const startGame = () => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('gameButton', 'click', startGame);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeGameBtn();
        //randomly select first player
        if (Math.random() < 0.5) {
            p1Turn();
        } else {
            p2Turn();
        }
    };

    //remove any existing event listener for player 2, update game instructions and activate board 2 for attack
    const p1Turn = () => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p1Board');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p1Board', 'click', p2Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${p1Obj.name}'s turn. Pick a grid to attack on ${p2Obj.name}'s board!`);
        //if player is computer, computer to trigger click on random grid
        if (p1Obj.type === 'computer') {
            setTimeout(() => p1Attack(), 700);
        } else {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addLinkClass('p2Board');
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('p2Board', 'click', p1Attack);
        }
    }

    //on player 1 click (attack)
    const p1Attack = (event) => {
        let p2HitCount = p2Board.countHits();
        let p2MissCount = p2Board.misses.length;
        //recieve attack coordinates (DOM for human or method for comp) and confirm hit or miss
        attackCoord = (p1Obj.type === 'computer') ? p1Obj.compAttack(p1Board.gridSize) : _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p2Board.receiveAttack(attackCoord);
        //if new hit, render hit, call checkAllSunk() and check for winner. If not all ships sunk, next player turn
        if (p2HitCount !== p2Board.countHits()) {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHit('p2Board', attackCoord);
            if (p2Board.checkAllSunk()) {
                winner(p1Obj.name, p1Board.gridSize);
            } else {
                p2Turn();
            }
        } else if (p2MissCount !== p2Board.misses.length) {
            //if new miss, render miss and call next players turn
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardMiss('p2Board', attackCoord);
            p2Turn();
        } else {
            //if grid has already been picked, pick again
            p1Attack();
        }
    };

    //remove any existing event listener for player 1, update game instructions and activate board 2 for attack
    const p2Turn = () => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p2Board');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p2Board', 'click', p1Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${p2Obj.name}'s turn. Pick a grid to attack on ${p1Obj.name}'s board!`);
         //if player is computer, computer to pick a grid and attack
        if (p2Obj.type === 'computer') {
            setTimeout(() => p2Attack(), 700);
        } else {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addLinkClass('p1Board');
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('p1Board', 'click', p2Attack);
        }
    };

    //on player 2 click (attack)
    const p2Attack = (event) => {
        let p1HitCount = p1Board.countHits();
        let p1MissCount = p1Board.misses.length;
        attackCoord = (p2Obj.type === 'computer') ? p2Obj.compAttack(p2Board.gridSize) : _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p1Board.receiveAttack(attackCoord);
        if (p1HitCount !== p1Board.countHits()) {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHit('p1Board', attackCoord);
            if (p1Board.checkAllSunk()) {
                winner(p2Obj.name, p2Board.gridSize);
            } else {
                p1Turn();
            }
        } else if (p1MissCount !== p1Board.misses.length) {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardMiss('p1Board', attackCoord);
            p1Turn();
        } else {
            p2Attack();
        }
    };

    const winner = (player, gridSize) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${player} is the winner!! They have sunk all the enemy ships!`);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.showShips('p1Board', p1Board);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.showShips('p2Board', p2Board);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p1Board', 'click', p1Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p2Board', 'click', p2Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p1Board');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p2Board');
        //render restart button
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Restart');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('gameButton', 'click', () => newGame(gridSize));
    };

    return {
        newGame
    };
})();

gameModule.newGame(10);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VjtBQUNBLFlBQVksK0NBQWE7QUFDekI7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFEQUFtQjtBQUMzQixRQUFRLHFEQUFtQjtBQUMzQixRQUFRLGtEQUFnQixJQUFJLFdBQVcsb0NBQW9DLFdBQVc7QUFDdEY7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFlBQVksa0RBQWdCO0FBQzVCLFlBQVksa0RBQWdCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUZBQXlGLGdEQUFjO0FBQ3ZHO0FBQ0E7QUFDQSxZQUFZLDhDQUFZO0FBQ3hCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVixZQUFZLCtDQUFhO0FBQ3pCO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFnQixJQUFJLFFBQVE7QUFDcEMsUUFBUSwrQ0FBYTtBQUNyQixRQUFRLCtDQUFhO0FBQ3JCLFFBQVEscURBQW1CO0FBQzNCLFFBQVEscURBQW1CO0FBQzNCLFFBQVEscURBQW1CO0FBQzNCLFFBQVEscURBQW1CO0FBQzNCO0FBQ0EsUUFBUSxnREFBYztBQUN0QixRQUFRLGtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAoKCkgPT4ge1xyXG4gICAgLy9yZW5kZXIgZ2FtZSBib2FyZHNcclxuICAgIGNvbnN0IG5ld0JvYXJkID0gKHAxT2JqLCBwMk9iaikgPT4ge1xyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDFHcmlkXHJcbiAgICAgICAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcclxuICAgICAgICBwMUdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMUdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAyR3JpZFxyXG4gICAgICAgIGNvbnN0IHAyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgcDJHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgcDJHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hZGQgY29vcmRpbmF0ZSBhdHRyaWJ1dGUgdG8gZWFjaCBzcGFuXHJcbiAgICAgICAgY29uc3QgcDFCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMUJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IHAyQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDJCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBsZXQgc3BhbkNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDEwOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICBwMUJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHAyQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgc3BhbkNvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmVuZGVyIHBsYXllciBuYW1lcyBiZWxvdyBlYWNoIGJvYXJkXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AxQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3AxT2JqLm5hbWV9J3MgQm9hcmRgO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwMkJvYXJkICsgLnBsYXllck5hbWUnKS5pbm5lclRleHQgPSBgJHtwMk9iai5uYW1lfSdzIEJvYXJkYDtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBhIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgYWRkR2FtZUJ0biA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBidG5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uQ29udGFpbmVyJyk7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGdhbWVCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICAgICAgZ2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgZ2FtZUJ0bi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQnRuKTtcclxuICAgIH07XHJcbiAgICAvL3JlbW92ZSBzdGFydCBidXR0b25cclxuICAgIGNvbnN0IHJlbW92ZUdhbWVCdG4gPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCdXR0b24nKS5yZW1vdmUoKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciB0ZXh0IGluc3RydWN0aW9uc1xyXG4gICAgY29uc3QgdGV4dEluc3RydWN0ID0gKHRleHQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbnMnKTtcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSAnJztcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfTtcclxuICAgIC8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCBuZXdFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGNvbnN0IHJlbW92ZUV2ZW50TGlzdCA9ICAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgYWRkTGlua0NsYXNzID0gKGFjdEJvYXJkSUQsICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RCb2FyZElEKTtcclxuICAgICAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIH07XHJcbiAgICBjb25zdCByZW1vdmVMaW5rQ2xhc3MgPSAoZGVhY3RCb2FyZElEKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVhY3RCb2FyZElEKTtcclxuICAgICAgICBkZWFjdEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbGluaycpO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGFsbCBzaGlwcyBvbiBib2FyZFxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICAvL2NvbGxlY3QgYWxsIHNoaXAgY29vcmRpbmF0ZXMgYW5kIGFkZCBiZyBjbGFzc1xyXG4gICAgICAgIGNvbnN0IHNoaXBzQXJyID0gWydjYXJyaWVyJywgJ2JhdHRsZScsICdjcnVpc2VyJywgICdzdWJtYXJpbmUnLCAnZGVzdHJveWVyJ107XHJcbiAgICAgICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWVCb2FyZE9ialtzaGlwXS5zaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvb3Jkc0Fyci5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWzBdfSwke2Nvb3JkWzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBoaXRcclxuICAgIGNvbnN0IGJvYXJkSGl0ID0gKGJvYXJkLCBoaXRDb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb29yZCA9IGAke2hpdENvb3JkWzBdfSwke2hpdENvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IGF0dGNrSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGF0dGNrSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBhdHRja0ljbi5pbm5lclRleHQgPSAnY2FuY2VsJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChhdHRja0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoYXR0Y2tJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgYXR0Y2tJY24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgbWlzc1xyXG4gICAgY29uc3QgYm9hcmRNaXNzID0gKGJvYXJkLCBtaXNzQ29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHttaXNzQ29vcmRbMF19LCR7bWlzc0Nvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IG1pc3NJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbWlzc0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgbWlzc0ljbi5pbm5lclRleHQgPSAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQobWlzc0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUobWlzc0ljbikub3BhY2l0eTtcclxuICAgICAgICBtaXNzSWNuLnN0eWxlLm9wYWNpdHkgPSAxOyBcclxuICAgIH07XHJcbiAgICAvL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuICAgIGNvbnN0IGNsaWNrQ29vcmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgICAgIHJldHVybiBjb29yZDtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBpbnB1dCBwb3AgdXBcclxuICAgIGNvbnN0IGlucHV0Qm94ID0gKHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbnB1dEJveC5pZCA9ICdpbnB1dEJveCc7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0Qm94KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBpbnB1dGluc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgaW5wdXRpbnN0LmlubmVyVGV4dCA9IGBFbnRlciAke3BsYXllcn0gTmFtZSBhbmQgc2VsZWN0IFBsYXllciBUeXBlYDtcclxuICAgICAgICBjb25zdCBpbnB1dEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmlkID0gJ2lucHV0Rm9ybSc7XHJcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBuYW1lSW5wdXQuaWQgPSAnbmFtZUlucHV0JztcclxuICAgICAgICBuYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBodW1hblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgaHVtYW5JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaHVtYW5JbnB1dC5pZCA9ICdodW1hbklucHV0JztcclxuICAgICAgICBodW1hbklucHV0Lm5hbWUgPSAndHlwZUlucHV0JztcclxuICAgICAgICBodW1hbklucHV0LnR5cGUgPSAncmFkaW8nO1xyXG4gICAgICAgIGh1bWFuSW5wdXQudmFsdWUgPSAnaHVtYW4nO1xyXG4gICAgICAgIGh1bWFuSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBodW1hbkxhYmVsID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgaHVtYW5MYWJlbC5odG1sRm9yID0gJ2h1bWFuSW5wdXQnO1xyXG4gICAgICAgIGh1bWFuTGFiZWwuaW5uZXJUZXh0ID0gJ0h1bWFuJztcclxuICAgICAgICBjb25zdCBjb21wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBjb21wSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGNvbXBJbnB1dC5pZCA9ICdodW1hbklucHV0JztcclxuICAgICAgICBjb21wSW5wdXQubmFtZSA9ICd0eXBlSW5wdXQnO1xyXG4gICAgICAgIGNvbXBJbnB1dC50eXBlID0gJ3JhZGlvJztcclxuICAgICAgICBjb21wSW5wdXQudmFsdWUgPSAnY29tcHV0ZXInO1xyXG4gICAgICAgIGNvbXBJbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBMYWJlbCA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGNvbXBMYWJlbC5odG1sRm9yID0gJ2NvbXBJbnB1dCc7XHJcbiAgICAgICAgY29tcExhYmVsLmlubmVyVGV4dCA9ICdDb21wdXRlcic7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIHN1Ym1pdElucHV0LmlkID0nc3VibWl0SW5wdXQnXHJcbiAgICAgICAgc3VibWl0SW5wdXQudHlwZSA9ICdzdWJtaXQnO1xyXG4gICAgICAgIHN1Ym1pdElucHV0LnZhbHVlID0gJ0VudGVyJztcclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChpbnB1dGluc3QpO1xyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKGlucHV0Rm9ybSk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XHJcbiAgICAgICAgaHVtYW5TcGFuLmFwcGVuZENoaWxkKGh1bWFuSW5wdXQpO1xyXG4gICAgICAgIGh1bWFuU3Bhbi5hcHBlbmRDaGlsZChodW1hbkxhYmVsKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoaHVtYW5TcGFuKTtcclxuICAgICAgICBjb21wU3Bhbi5hcHBlbmRDaGlsZChjb21wSW5wdXQpO1xyXG4gICAgICAgIGNvbXBTcGFuLmFwcGVuZENoaWxkKGNvbXBMYWJlbCk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGNvbXBTcGFuKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0SW5wdXQpO1xyXG4gICAgfTtcclxuICAgIC8vZ2V0IHBsYXllciBpbnB1dCB2YWx1ZXMgYW5kIHJlbW92ZXMgaW5wdXRCb3hcclxuICAgIGNvbnN0IGdldElucHV0cyA9IChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZUlucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0Qm94JykucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIFtuYW1lLCB0eXBlXTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdCb2FyZCxcclxuICAgICAgICBhZGRHYW1lQnRuLFxyXG4gICAgICAgIHJlbW92ZUdhbWVCdG4sXHJcbiAgICAgICAgdGV4dEluc3RydWN0LFxyXG4gICAgICAgIG5ld0V2ZW50TGlzdCxcclxuICAgICAgICByZW1vdmVFdmVudExpc3QsXHJcbiAgICAgICAgYWRkTGlua0NsYXNzLFxyXG4gICAgICAgIHJlbW92ZUxpbmtDbGFzcyxcclxuICAgICAgICBzaG93U2hpcHMsXHJcbiAgICAgICAgYm9hcmRIaXQsXHJcbiAgICAgICAgYm9hcmRNaXNzLFxyXG4gICAgICAgIGNsaWNrQ29vcmQsXHJcbiAgICAgICAgaW5wdXRCb3gsXHJcbiAgICAgICAgZ2V0SW5wdXRzXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgRE9NIH07IiwiaW1wb3J0IHsgbmV3U2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IG5ld0dhbWVCb2FyZCA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgLy9jcmVhdGUgc2hpcCBvYmpzXHJcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3U2hpcCg1LCAnY2FycmllcicpO1xyXG4gICAgY29uc3QgYmF0dGxlID0gbmV3U2hpcCg0LCAnYmF0dGxlJyk7XHJcbiAgICBjb25zdCBjcnVpc2VyID0gbmV3U2hpcCgzLCAnY3J1aXNlcicpO1xyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3U2hpcCgzLCAnc3VibWFyaW5lJyk7XHJcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXdTaGlwKDIsICdkZXN0cm95ZXInKTtcclxuICAgIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdO1xyXG4gICAgLy9jaGVjayB3aGV0aGVyIGNob3NlbiBjb29yZCBpcyBhIGhpdCBvciBtaXNzIGFuZCBpcyBhIG5ld1xyXG4gICAgbGV0IG1pc3NlcyA9IFtdO1xyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRJbmRpID0gZmFsc2U7XHJcbiAgICAgICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkge1xyXG4gICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgaGl0SW5kaSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaGl0SW5kaSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWFyY2hDb29yZHMobWlzc2VzLCBjb29yZCkpIHtcclxuICAgICAgICAgICAgICAgIG1pc3Nlcy5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL21ldGhvZCB0byBzZWFyY2ggYW4gYXJyYXkgb2YgY29vcmRpbmF0ZXMgZm9yIGEgc3BlY2lmaWMgY29vcmRpbmF0ZVxyXG4gICAgY29uc3Qgc2VhcmNoQ29vcmRzID0gKGNvb3JkQXJyLCBjb29yZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjb29yZEFyci5zb21lKGFyciA9PiBhcnIudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSk7XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xyXG4gICAgY29uc3QgY2hlY2tBbGxTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpO1xyXG4gICAgfTtcclxuICAgIC8vcGxhY2Ugc2hpcCB3aXRoIHN0YXJ0IGNvb3JkaW5hdGUgYW5kIGRpcmVjdGlvbiwgY2hlY2tzIHNoaXAgZml0cyBvbiBncmlkXHJcbiAgICAvL2FuZCBkb2VzIG5vdCBvdmVybGFwIHdpdGggb3RoZXIgc2hpcHMgcGxhY2VkXHJcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc3RhcnRDb29yZCwgY3VyclNoaXBUeXBlLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChjaGVja0JvYXJkRml0KHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBncmlkU2l6ZSkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkcyA9IHJldHVyblNoaXBDb29yZHMoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24sIGN1cnJTaGlwVHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrU2hpcHMgPSBzaGlwcy5maWx0ZXIoc2hpcCA9PiBzaGlwLnR5cGUgIT09IGN1cnJTaGlwVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChjaGVja092ZXJsYXAoc2hpcENvb3JkcywgY2hlY2tTaGlwcykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyU2hpcE9iaiA9IHNoaXBzLmZpbHRlcihzaGlwID0+IHNoaXAudHlwZSA9PSBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgY3VyclNoaXBPYmpbMF0uYWRkU2hpcENvb3JkcyhzaGlwQ29vcmRzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NoZWNrIHN0YXJ0IGNvb3JkIG9mIHNoaXAgZml0cyBvbiBncmlkXHJcbiAgICBjb25zdCBjaGVja0JvYXJkRml0ID0gKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMF0gKyBsZW5ndGggLSAxKSA8PSBncmlkU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMV0gKyBsZW5ndGggLSAxKSA8PSBncmlkU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9yZXR1cm4gY29vcmRpbmF0ZXMgb2Ygd2hvbGUgc2hpcFxyXG4gICAgY29uc3QgcmV0dXJuU2hpcENvb3JkcyA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIGxldCBzaGlwQ29vcmRzID0gW3N0YXJ0Q29vcmRdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaGlwQ29vcmRzO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgY29vcmRzIG9mIGN1cnJlbnQgc2hpcCBkbyBub3Qgb3ZlcmxhcCB3aXRoIG90aGVyIHNoaXBzXHJcbiAgICBjb25zdCBjaGVja092ZXJsYXAgPSAoc2hpcENvb3JkcywgY2hlY2tTaGlwcykgPT4gIHtcclxuICAgICAgICAvL3NoaXBDb29yZHMuZXZlcnkoY29vcmQgPT4gIWNoZWNrU2hpcHMuZXZlcnkoc2hpcCA9PiAhc2VhcmNoQ29vcmRzKHNoaXAuc2hpcENvb3JkcywgY29vcmQpKSk7XHJcbiAgICAgICAgcmV0dXJuICFjaGVja1NoaXBzLnNvbWUoc2hpcCA9PiBzaGlwQ29vcmRzLnNvbWUoY29vcmQgPT4gc2VhcmNoQ29vcmRzKHNoaXAuc2hpcENvb3JkcywgY29vcmQpKSk7XHJcbiAgICB9O1xyXG4gICAgLy9jb3VudCB0b3RhbCBhbW91bnQgb2YgaGl0cyBvbiBhIGJvYXJkXHJcbiAgICBjb25zdCBjb3VudEhpdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hpcC5oaXRJbmZvW2ldID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGdyaWRTaXplLCBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyLCBtaXNzZXMsIHJlY2VpdmVBdHRhY2ssIGNoZWNrQWxsU3VuaywgcGxhY2VTaGlwLCBjb3VudEhpdHMgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IG5ld0dhbWVCb2FyZCB9O1xyXG4iLCJpbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01cIjtcclxuXHJcbmNvbnN0IG5ld1BsYXllciA9IChuYW1lLCB0eXBlKSA9PiB7XHJcbiAgICBjb25zdCByYW5Db29yZCA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWRTaXplKSArIDE7XHJcbiAgICAgICAgY29uc3QgeUNvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZFNpemUpICsgMTtcclxuICAgICAgICByZXR1cm4gW3hDb29yZCwgeUNvb3JkXTtcclxuICAgIH07XHJcbiAgICBpZiAodHlwZSA9PT0gJ2h1bWFuJykge1xyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZX07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAvL3BpY2sgYSByYW5kb20gZ3JpZCBwb2ludCB3aXRoaW4gYSBncmlkIGFuZCBhIHJhbmRvbSBYL1kgZGlyZWN0aW9uXHJcbiAgICAgICAgY29uc3Qgc2hpcFN0YXJ0UG9zID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHh5RGlyID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/ICdYJyA6ICdZJztcclxuICAgICAgICAgICAgY29uc3QgW3hDb29yZCwgeUNvb3JkXSA9IHJhbkNvb3JkKGdyaWRTaXplKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtbeENvb3JkLCB5Q29vcmRdLCB4eURpcl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcGljayBhIHJhbmRvbSBncmlkIHBvaW50IGdpdmVuIGEgY2VydGFpbiBncmlkIHNpemVcclxuICAgICAgICBjb25zdCBjb21wQXR0YWNrID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByYW5Db29yZChncmlkU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZSwgc2hpcFN0YXJ0UG9zLCBjb21wQXR0YWNrfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgbmV3UGxheWVyIH07IiwiY29uc3QgbmV3U2hpcCA9IChsZW5ndGgsIHR5cGUpID0+IHtcclxuICAgIGxldCBzaGlwQ29vcmRzID0gW107XHJcbiAgICAvL2FkZCBhcnJheSBvZiBjb29yZHNcclxuICAgIGNvbnN0IGFkZFNoaXBDb29yZHMgPSAoY29vcmRBcnIpID0+IHtcclxuICAgICAgICBjb29yZEFyci5mb3JFYWNoKGNvb3JkID0+IHNoaXBDb29yZHMucHVzaChjb29yZCkpO1xyXG4gICAgfTtcclxuICAgIC8vaW5pdGlhbGlzZSBhbmQgcG9wdWxhdGUgYW4gb2JqZWN0IHdoaWNoIHNob3dzIGFueSBoaXRzIG9uIGEgc2hpcFxyXG4gICAgY29uc3QgaGl0SW5mbyA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBpO1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ29rJztcclxuICAgIH1cclxuICAgIC8vdXBkYXRlIGhpdCBvbiBhIHNoaXBcclxuICAgIGNvbnN0IGhpdCA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGhpdEluZm9bY2FsUG9zaXRpb24oY29vcmQpXSA9ICdoaXQnO1xyXG4gICAgfTtcclxuICAgIC8vbWV0aG9kIHRvIGNoZWNrIHdoZXRoZXIgYSBzaGlwIGlzIHN1bmsgYnkgY2hlY2tpbmcgdGhlIGhpdEluZm8gb2JqZWN0XHJcbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhpdENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgIGhpdENvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIGhpdCBvbiBzaGlwIGJhc2VkIG9uIHRoZSBoaXQgY29vcmRcclxuICAgIGNvbnN0IGNhbFBvc2l0aW9uID0gKGNvb3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeERpZmYgPSBNYXRoLmFicyhzaGlwQ29vcmRzWzBdWzBdIC0gY29vcmRbMF0pO1xyXG4gICAgICAgIGNvbnN0IHlEaWZmID0gTWF0aC5hYnMoc2hpcENvb3Jkc1swXVsxXSAtIGNvb3JkWzFdKTtcclxuICAgICAgICBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlEaWZmICsgMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHhEaWZmID4gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4geERpZmYgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4geyBsZW5ndGgsIHR5cGUsIHNoaXBDb29yZHMsIGhpdEluZm8sIGFkZFNoaXBDb29yZHMsIGhpdCwgaXNTdW5rIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBuZXdTaGlwIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZXdQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuaW1wb3J0IHsgbmV3R2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XHJcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTVwiO1xyXG5cclxuY29uc3QgZ2FtZU1vZHVsZSA9KCgpID0+ICB7XHJcbiAgICBsZXQgcDFPYmogPSB7fTtcclxuICAgIGxldCBwMk9iaiA9IHt9O1xyXG4gICAgbGV0IHAxQm9hcmQgPSB7fTtcclxuICAgIGxldCBwMkJvYXJkID0ge307XHJcbiAgICBsZXQgcDFuYW1lID0gJyc7XHJcbiAgICBsZXQgcDJuYW1lID0gJyc7XHJcbiAgICBsZXQgcDF0eXBlID0gJyc7XHJcbiAgICBsZXQgcDJ0eXBlID0gJyc7XHJcbiAgICBsZXQgYXR0YWNrQ29vcmQgPSAnJztcclxuXHJcbiAgICBjb25zdCBuZXdHYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoJycpO1xyXG4gICAgICAgIERPTS5pbnB1dEJveCgnUGxheWVyIDEnKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMSk7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIDEncyBuYW1lIGFuZCB0eXBlIHZhbHVlcyBmcm9tIERPTSwgdGhlbiBnZXQgcGxheWVyIDIncyBkZXRhaWxzXHJcbiAgICBjb25zdCBnZXRQbGF5ZXIxID0gKGUpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMSk7XHJcbiAgICAgICAgW3AxbmFtZSwgcDF0eXBlXSA9IERPTS5nZXRJbnB1dHMoZSk7XHJcbiAgICAgICAgRE9NLmlucHV0Qm94KCdQbGF5ZXIgMicpO1xyXG4gICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2lucHV0Rm9ybScsICdzdWJtaXQnLCBnZXRQbGF5ZXIyKTtcclxuICAgIH07XHJcbiAgICAvL2dldCBwbGF5ZXIgMidzIG5hbWUgYW5kIHR5cGUgYW5kIGxvYWQgZ2FtZSBib2FyZFxyXG4gICAgY29uc3QgZ2V0UGxheWVyMiA9IChlKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnaW5wdXRGb3JtJywgJ3N1Ym1pdCcsIGdldFBsYXllcjIpO1xyXG4gICAgICAgIFtwMm5hbWUsIHAydHlwZV0gPSBET00uZ2V0SW5wdXRzKGUpO1xyXG4gICAgICAgIGxvYWRHYW1lKDEwKTtcclxuICAgIH07XHJcbiAgICAvL2xvYWQgZ2FtZSBib2FyZHNcclxuICAgIGNvbnN0IGxvYWRHYW1lID0gKGdyaWRTaXplKSA9PiAge1xyXG4gICAgICAgICAvL3BsYXllcnMgY3JlYXRlZCBpbiBjb2RlLCBET00gaW5wdXQgdG8gYmUgYWRkZWRcclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBwMU9iaiA9IG5ld1BsYXllcihwMW5hbWUsIHAxdHlwZSk7XHJcbiAgICAgICAgcDJPYmogPSBuZXdQbGF5ZXIocDJuYW1lLCBwMnR5cGUpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHAxQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIHAyQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIC8vcGxhY2Ugc2hpcHMgaW4gY29kZSwgRE9NIGlucHV0IHRvIGJlIGFkZGVkXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzYsNF0sICdjYXJyaWVyJywgNSwgJ1knKTtcclxuICAgICAgICBwMUJvYXJkLnBsYWNlU2hpcChbMSwxXSwgJ2JhdHRsZScsIDQsICdYJyk7XHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzIsNl0sICdjcnVpc2VyJywgMywgJ1knKTtcclxuICAgICAgICBwMUJvYXJkLnBsYWNlU2hpcChbNCw2XSwgJ3N1Ym1hcmluZScsIDMsICdZJyk7XHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzksNl0sICdkZXN0cm95ZXInLCAyLCAnWCcpO1xyXG4gICAgICAgIHAyQm9hcmQucGxhY2VTaGlwKFs1LDEwXSwgJ2NhcnJpZXInLCA1LCAnWCcpO1xyXG4gICAgICAgIHAyQm9hcmQucGxhY2VTaGlwKFszLDVdLCAnYmF0dGxlJywgNCwgJ1gnKTtcclxuICAgICAgICBwMkJvYXJkLnBsYWNlU2hpcChbMiw3XSwgJ2NydWlzZXInLCAzLCAnWScpO1xyXG4gICAgICAgIHAyQm9hcmQucGxhY2VTaGlwKFs4LDFdLCAnc3VibWFyaW5lJywgMywgJ1gnKTtcclxuICAgICAgICBwMkJvYXJkLnBsYWNlU2hpcChbOSw4XSwgJ2Rlc3Ryb3llcicsIDIsICdYJyk7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy9yZW5kZXIgZ2FtZSBib2FyZCBhbmQgc3RhcnQgYnV0dG9uXHJcbiAgICAgICAgRE9NLm5ld0JvYXJkKHAxT2JqLCBwMk9iaik7XHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1N0YXJ0IEdhbWUnKTtcclxuICAgICAgICBET00uYWRkR2FtZUJ0bignU3RhcnQgR2FtZScpO1xyXG4gICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2dhbWVCdXR0b24nLCAnY2xpY2snLCBzdGFydEdhbWUpO1xyXG4gICAgfTtcclxuICAgIC8vc3RhcnQgZ2FtZSBsb29wIGJ5IHJlbW92aW5nIHN0YXJ0IGJ1dHRvbiBhbmQgc3RhcnRpbmcgcGxheWVyIDFzIHR1cm5cclxuICAgIGNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdnYW1lQnV0dG9uJywgJ2NsaWNrJywgc3RhcnRHYW1lKTtcclxuICAgICAgICBET00ucmVtb3ZlR2FtZUJ0bigpO1xyXG4gICAgICAgIC8vcmFuZG9tbHkgc2VsZWN0IGZpcnN0IHBsYXllclxyXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XHJcbiAgICAgICAgICAgIHAxVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAyVHVybigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9yZW1vdmUgYW55IGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVyIGZvciBwbGF5ZXIgMiwgdXBkYXRlIGdhbWUgaW5zdHJ1Y3Rpb25zIGFuZCBhY3RpdmF0ZSBib2FyZCAyIGZvciBhdHRhY2tcclxuICAgIGNvbnN0IHAxVHVybiA9ICgpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlTGlua0NsYXNzKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDFCb2FyZCcsICdjbGljaycsIHAyQXR0YWNrKTtcclxuICAgICAgICBET00udGV4dEluc3RydWN0KGAke3AxT2JqLm5hbWV9J3MgdHVybi4gUGljayBhIGdyaWQgdG8gYXR0YWNrIG9uICR7cDJPYmoubmFtZX0ncyBib2FyZCFgKTtcclxuICAgICAgICAvL2lmIHBsYXllciBpcyBjb21wdXRlciwgY29tcHV0ZXIgdG8gdHJpZ2dlciBjbGljayBvbiByYW5kb20gZ3JpZFxyXG4gICAgICAgIGlmIChwMU9iai50eXBlID09PSAnY29tcHV0ZXInKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcDFBdHRhY2soKSwgNzAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET00uYWRkTGlua0NsYXNzKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgICAgIERPTS5uZXdFdmVudExpc3QoJ3AyQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vb24gcGxheWVyIDEgY2xpY2sgKGF0dGFjaylcclxuICAgIGNvbnN0IHAxQXR0YWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IHAySGl0Q291bnQgPSBwMkJvYXJkLmNvdW50SGl0cygpO1xyXG4gICAgICAgIGxldCBwMk1pc3NDb3VudCA9IHAyQm9hcmQubWlzc2VzLmxlbmd0aDtcclxuICAgICAgICAvL3JlY2lldmUgYXR0YWNrIGNvb3JkaW5hdGVzIChET00gZm9yIGh1bWFuIG9yIG1ldGhvZCBmb3IgY29tcCkgYW5kIGNvbmZpcm0gaGl0IG9yIG1pc3NcclxuICAgICAgICBhdHRhY2tDb29yZCA9IChwMU9iai50eXBlID09PSAnY29tcHV0ZXInKSA/IHAxT2JqLmNvbXBBdHRhY2socDFCb2FyZC5ncmlkU2l6ZSkgOiBET00uY2xpY2tDb29yZChldmVudCk7XHJcbiAgICAgICAgcDJCb2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkKTtcclxuICAgICAgICAvL2lmIG5ldyBoaXQsIHJlbmRlciBoaXQsIGNhbGwgY2hlY2tBbGxTdW5rKCkgYW5kIGNoZWNrIGZvciB3aW5uZXIuIElmIG5vdCBhbGwgc2hpcHMgc3VuaywgbmV4dCBwbGF5ZXIgdHVyblxyXG4gICAgICAgIGlmIChwMkhpdENvdW50ICE9PSBwMkJvYXJkLmNvdW50SGl0cygpKSB7XHJcbiAgICAgICAgICAgIERPTS5ib2FyZEhpdCgncDJCb2FyZCcsIGF0dGFja0Nvb3JkKTtcclxuICAgICAgICAgICAgaWYgKHAyQm9hcmQuY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lcihwMU9iai5uYW1lLCBwMUJvYXJkLmdyaWRTaXplKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAyVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChwMk1pc3NDb3VudCAhPT0gcDJCb2FyZC5taXNzZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vaWYgbmV3IG1pc3MsIHJlbmRlciBtaXNzIGFuZCBjYWxsIG5leHQgcGxheWVycyB0dXJuXHJcbiAgICAgICAgICAgIERPTS5ib2FyZE1pc3MoJ3AyQm9hcmQnLCBhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgICAgIHAyVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vaWYgZ3JpZCBoYXMgYWxyZWFkeSBiZWVuIHBpY2tlZCwgcGljayBhZ2FpblxyXG4gICAgICAgICAgICBwMUF0dGFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9yZW1vdmUgYW55IGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVyIGZvciBwbGF5ZXIgMSwgdXBkYXRlIGdhbWUgaW5zdHJ1Y3Rpb25zIGFuZCBhY3RpdmF0ZSBib2FyZCAyIGZvciBhdHRhY2tcclxuICAgIGNvbnN0IHAyVHVybiA9ICgpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlTGlua0NsYXNzKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDJCb2FyZCcsICdjbGljaycsIHAxQXR0YWNrKTtcclxuICAgICAgICBET00udGV4dEluc3RydWN0KGAke3AyT2JqLm5hbWV9J3MgdHVybi4gUGljayBhIGdyaWQgdG8gYXR0YWNrIG9uICR7cDFPYmoubmFtZX0ncyBib2FyZCFgKTtcclxuICAgICAgICAgLy9pZiBwbGF5ZXIgaXMgY29tcHV0ZXIsIGNvbXB1dGVyIHRvIHBpY2sgYSBncmlkIGFuZCBhdHRhY2tcclxuICAgICAgICBpZiAocDJPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHAyQXR0YWNrKCksIDcwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NLmFkZExpbmtDbGFzcygncDFCb2FyZCcpO1xyXG4gICAgICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdwMUJvYXJkJywgJ2NsaWNrJywgcDJBdHRhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9vbiBwbGF5ZXIgMiBjbGljayAoYXR0YWNrKVxyXG4gICAgY29uc3QgcDJBdHRhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgcDFIaXRDb3VudCA9IHAxQm9hcmQuY291bnRIaXRzKCk7XHJcbiAgICAgICAgbGV0IHAxTWlzc0NvdW50ID0gcDFCb2FyZC5taXNzZXMubGVuZ3RoO1xyXG4gICAgICAgIGF0dGFja0Nvb3JkID0gKHAyT2JqLnR5cGUgPT09ICdjb21wdXRlcicpID8gcDJPYmouY29tcEF0dGFjayhwMkJvYXJkLmdyaWRTaXplKSA6IERPTS5jbGlja0Nvb3JkKGV2ZW50KTtcclxuICAgICAgICBwMUJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgIGlmIChwMUhpdENvdW50ICE9PSBwMUJvYXJkLmNvdW50SGl0cygpKSB7XHJcbiAgICAgICAgICAgIERPTS5ib2FyZEhpdCgncDFCb2FyZCcsIGF0dGFja0Nvb3JkKTtcclxuICAgICAgICAgICAgaWYgKHAxQm9hcmQuY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lcihwMk9iai5uYW1lLCBwMkJvYXJkLmdyaWRTaXplKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAxVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChwMU1pc3NDb3VudCAhPT0gcDFCb2FyZC5taXNzZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIERPTS5ib2FyZE1pc3MoJ3AxQm9hcmQnLCBhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgICAgIHAxVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAyQXR0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB3aW5uZXIgPSAocGxheWVyLCBncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cGxheWVyfSBpcyB0aGUgd2lubmVyISEgVGhleSBoYXZlIHN1bmsgYWxsIHRoZSBlbmVteSBzaGlwcyFgKTtcclxuICAgICAgICBET00uc2hvd1NoaXBzKCdwMUJvYXJkJywgcDFCb2FyZCk7XHJcbiAgICAgICAgRE9NLnNob3dTaGlwcygncDJCb2FyZCcsIHAyQm9hcmQpO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDJCb2FyZCcsICdjbGljaycsIHAyQXR0YWNrKTtcclxuICAgICAgICBET00ucmVtb3ZlTGlua0NsYXNzKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDJCb2FyZCcpO1xyXG4gICAgICAgIC8vcmVuZGVyIHJlc3RhcnQgYnV0dG9uXHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1Jlc3RhcnQnKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdnYW1lQnV0dG9uJywgJ2NsaWNrJywgKCkgPT4gbmV3R2FtZShncmlkU2l6ZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5ld0dhbWVcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5nYW1lTW9kdWxlLm5ld0dhbWUoMTApOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==