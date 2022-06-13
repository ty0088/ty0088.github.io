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
        // gridElem.innerHTML = '';
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
        // gridElem.innerHTML = '';
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
        clickCoord
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
    let attackCoord = '';

    const newGame = (gridSize) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct('');
        //players created in code, DOM input to be added
        //----------------------------------------------
        p1Obj = (0,_player__WEBPACK_IMPORTED_MODULE_0__.newPlayer)('Player 1', 'human');
        p2Obj = (0,_player__WEBPACK_IMPORTED_MODULE_0__.newPlayer)('Computer', 'computer');
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
        console.log(attackCoord);
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
        console.log(attackCoord);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVEscURBQW1CO0FBQzNCO0FBQ0EsUUFBUSxnREFBYztBQUN0QixRQUFRLGtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAoKCkgPT4ge1xyXG4gICAgLy9yZW5kZXIgZ2FtZSBib2FyZHNcclxuICAgIGNvbnN0IG5ld0JvYXJkID0gKHAxT2JqLCBwMk9iaikgPT4ge1xyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDFHcmlkXHJcbiAgICAgICAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcclxuICAgICAgICBwMUdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMUdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAyR3JpZFxyXG4gICAgICAgIGNvbnN0IHAyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgcDJHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgcDJHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hZGQgY29vcmRpbmF0ZSBhdHRyaWJ1dGUgdG8gZWFjaCBzcGFuXHJcbiAgICAgICAgY29uc3QgcDFCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMUJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IHAyQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDJCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBsZXQgc3BhbkNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDEwOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICBwMUJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHAyQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgc3BhbkNvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmVuZGVyIHBsYXllciBuYW1lcyBiZWxvdyBlYWNoIGJvYXJkXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AxQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3AxT2JqLm5hbWV9J3MgQm9hcmRgO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwMkJvYXJkICsgLnBsYXllck5hbWUnKS5pbm5lclRleHQgPSBgJHtwMk9iai5uYW1lfSdzIEJvYXJkYDtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBhIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgYWRkR2FtZUJ0biA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBidG5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uQ29udGFpbmVyJyk7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGdhbWVCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICAgICAgZ2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgZ2FtZUJ0bi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQnRuKTtcclxuICAgIH07XHJcbiAgICAvL3JlbW92ZSBzdGFydCBidXR0b25cclxuICAgIGNvbnN0IHJlbW92ZUdhbWVCdG4gPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCdXR0b24nKS5yZW1vdmUoKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciB0ZXh0IGluc3RydWN0aW9uc1xyXG4gICAgY29uc3QgdGV4dEluc3RydWN0ID0gKHRleHQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbnMnKTtcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSAnJztcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfTtcclxuICAgIC8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCBuZXdFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGNvbnN0IHJlbW92ZUV2ZW50TGlzdCA9ICAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgYWRkTGlua0NsYXNzID0gKGFjdEJvYXJkSUQsICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RCb2FyZElEKTtcclxuICAgICAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIH07XHJcbiAgICBjb25zdCByZW1vdmVMaW5rQ2xhc3MgPSAoZGVhY3RCb2FyZElEKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVhY3RCb2FyZElEKTtcclxuICAgICAgICBkZWFjdEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbGluaycpO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGFsbCBzaGlwcyBvbiBib2FyZFxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICAvL2NvbGxlY3QgYWxsIHNoaXAgY29vcmRpbmF0ZXMgYW5kIGFkZCBiZyBjbGFzc1xyXG4gICAgICAgIGNvbnN0IHNoaXBzQXJyID0gWydjYXJyaWVyJywgJ2JhdHRsZScsICdjcnVpc2VyJywgICdzdWJtYXJpbmUnLCAnZGVzdHJveWVyJ107XHJcbiAgICAgICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWVCb2FyZE9ialtzaGlwXS5zaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvb3Jkc0Fyci5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWzBdfSwke2Nvb3JkWzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBoaXRcclxuICAgIGNvbnN0IGJvYXJkSGl0ID0gKGJvYXJkLCBoaXRDb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb29yZCA9IGAke2hpdENvb3JkWzBdfSwke2hpdENvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIC8vIGdyaWRFbGVtLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGF0dGNrSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGF0dGNrSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBhdHRja0ljbi5pbm5lclRleHQgPSAnY2FuY2VsJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChhdHRja0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoYXR0Y2tJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgYXR0Y2tJY24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgbWlzc1xyXG4gICAgY29uc3QgYm9hcmRNaXNzID0gKGJvYXJkLCBtaXNzQ29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHttaXNzQ29vcmRbMF19LCR7bWlzc0Nvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIC8vIGdyaWRFbGVtLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IG1pc3NJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbWlzc0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgbWlzc0ljbi5pbm5lclRleHQgPSAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQobWlzc0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUobWlzc0ljbikub3BhY2l0eTtcclxuICAgICAgICBtaXNzSWNuLnN0eWxlLm9wYWNpdHkgPSAxOyBcclxuICAgIH07XHJcbiAgICAvL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuICAgIGNvbnN0IGNsaWNrQ29vcmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgICAgIHJldHVybiBjb29yZDtcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5ld0JvYXJkLFxyXG4gICAgICAgIGFkZEdhbWVCdG4sXHJcbiAgICAgICAgcmVtb3ZlR2FtZUJ0bixcclxuICAgICAgICB0ZXh0SW5zdHJ1Y3QsXHJcbiAgICAgICAgbmV3RXZlbnRMaXN0LFxyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdCxcclxuICAgICAgICBhZGRMaW5rQ2xhc3MsXHJcbiAgICAgICAgcmVtb3ZlTGlua0NsYXNzLFxyXG4gICAgICAgIHNob3dTaGlwcyxcclxuICAgICAgICBib2FyZEhpdCxcclxuICAgICAgICBib2FyZE1pc3MsXHJcbiAgICAgICAgY2xpY2tDb29yZFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IERPTSB9OyIsImltcG9ydCB7IG5ld1NoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBuZXdHYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgIC8vY3JlYXRlIHNoaXAgb2Jqc1xyXG4gICAgY29uc3QgY2FycmllciA9IG5ld1NoaXAoNSwgJ2NhcnJpZXInKTtcclxuICAgIGNvbnN0IGJhdHRsZSA9IG5ld1NoaXAoNCwgJ2JhdHRsZScpO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IG5ld1NoaXAoMywgJ2NydWlzZXInKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ld1NoaXAoMywgJ3N1Ym1hcmluZScpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3U2hpcCgyLCAnZGVzdHJveWVyJyk7XHJcbiAgICBjb25zdCBzaGlwcyA9IFtjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBjaG9zZW4gY29vcmQgaXMgYSBoaXQgb3IgbWlzcyBhbmQgaXMgYSBuZXdcclxuICAgIGxldCBtaXNzZXMgPSBbXTtcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBsZXQgaGl0SW5kaSA9IGZhbHNlO1xyXG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpIHtcclxuICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGhpdEluZGkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhpdEluZGkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VhcmNoQ29vcmRzKG1pc3NlcywgY29vcmQpKSB7XHJcbiAgICAgICAgICAgICAgICBtaXNzZXMucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9tZXRob2QgdG8gc2VhcmNoIGFuIGFycmF5IG9mIGNvb3JkaW5hdGVzIGZvciBhIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIGNvbnN0IHNlYXJjaENvb3JkcyA9IChjb29yZEFyciwgY29vcmQpID0+IHtcclxuICAgICAgICByZXR1cm4gY29vcmRBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3JkLnRvU3RyaW5nKCkpO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcclxuICAgIGNvbnN0IGNoZWNrQWxsU3VuayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICAgIH07XHJcbiAgICAvL3BsYWNlIHNoaXAgd2l0aCBzdGFydCBjb29yZGluYXRlIGFuZCBkaXJlY3Rpb24sIGNoZWNrcyBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgLy9hbmQgZG9lcyBub3Qgb3ZlcmxhcCB3aXRoIG90aGVyIHNoaXBzIHBsYWNlZFxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHN0YXJ0Q29vcmQsIGN1cnJTaGlwVHlwZSwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoY2hlY2tCb2FyZEZpdChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZXR1cm5TaGlwQ29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja1NoaXBzID0gc2hpcHMuZmlsdGVyKHNoaXAgPT4gc2hpcC50eXBlICE9PSBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tPdmVybGFwKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyclNoaXBPYmogPSBzaGlwcy5maWx0ZXIoc2hpcCA9PiBzaGlwLnR5cGUgPT0gY3VyclNoaXBUeXBlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJTaGlwT2JqWzBdLmFkZFNoaXBDb29yZHMoc2hpcENvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayBzdGFydCBjb29yZCBvZiBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgY29uc3QgY2hlY2tCb2FyZEZpdCA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzBdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzFdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vcmV0dXJuIGNvb3JkaW5hdGVzIG9mIHdob2xlIHNoaXBcclxuICAgIGNvbnN0IHJldHVyblNoaXBDb29yZHMgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBsZXQgc2hpcENvb3JkcyA9IFtzdGFydENvb3JkXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hpcENvb3JkcztcclxuICAgIH07XHJcbiAgICAvL2NoZWNrIGNvb3JkcyBvZiBjdXJyZW50IHNoaXAgZG8gbm90IG92ZXJsYXAgd2l0aCBvdGhlciBzaGlwc1xyXG4gICAgY29uc3QgY2hlY2tPdmVybGFwID0gKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpID0+ICB7XHJcbiAgICAgICAgLy9zaGlwQ29vcmRzLmV2ZXJ5KGNvb3JkID0+ICFjaGVja1NoaXBzLmV2ZXJ5KHNoaXAgPT4gIXNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkpO1xyXG4gICAgICAgIHJldHVybiAhY2hlY2tTaGlwcy5zb21lKHNoaXAgPT4gc2hpcENvb3Jkcy5zb21lKGNvb3JkID0+IHNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkpO1xyXG4gICAgfTtcclxuICAgIC8vY291bnQgdG90YWwgYW1vdW50IG9mIGhpdHMgb24gYSBib2FyZFxyXG4gICAgY29uc3QgY291bnRIaXRzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH07XHJcbiAgICByZXR1cm4geyBncmlkU2l6ZSwgY2FycmllciwgYmF0dGxlLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgbWlzc2VzLCByZWNlaXZlQXR0YWNrLCBjaGVja0FsbFN1bmssIHBsYWNlU2hpcCwgY291bnRIaXRzIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBuZXdHYW1lQm9hcmQgfTtcclxuIiwiaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NXCI7XHJcblxyXG5jb25zdCBuZXdQbGF5ZXIgPSAobmFtZSwgdHlwZSkgPT4ge1xyXG4gICAgY29uc3QgcmFuQ29vcmQgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBjb25zdCB4Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncmlkU2l6ZSkgKyAxO1xyXG4gICAgICAgIGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWRTaXplKSArIDE7XHJcbiAgICAgICAgcmV0dXJuIFt4Q29vcmQsIHlDb29yZF07XHJcbiAgICB9O1xyXG4gICAgaWYgKHR5cGUgPT09ICdodW1hbicpIHtcclxuICAgICAgICByZXR1cm4ge25hbWUsIHR5cGV9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29tcHV0ZXInKSB7XHJcbiAgICAgICAgLy9waWNrIGEgcmFuZG9tIGdyaWQgcG9pbnQgd2l0aGluIGEgZ3JpZCBhbmQgYSByYW5kb20gWC9ZIGRpcmVjdGlvblxyXG4gICAgICAgIGNvbnN0IHNoaXBTdGFydFBvcyA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB4eURpciA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAnWCcgOiAnWSc7XHJcbiAgICAgICAgICAgIGNvbnN0IFt4Q29vcmQsIHlDb29yZF0gPSByYW5Db29yZChncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbW3hDb29yZCwgeUNvb3JkXSwgeHlEaXJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3BpY2sgYSByYW5kb20gZ3JpZCBwb2ludCBnaXZlbiBhIGNlcnRhaW4gZ3JpZCBzaXplXHJcbiAgICAgICAgY29uc3QgY29tcEF0dGFjayA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuQ29vcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge25hbWUsIHR5cGUsIHNoaXBTdGFydFBvcywgY29tcEF0dGFja307XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IG5ld1BsYXllciB9OyIsImNvbnN0IG5ld1NoaXAgPSAobGVuZ3RoLCB0eXBlKSA9PiB7XHJcbiAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xyXG4gICAgLy9hZGQgYXJyYXkgb2YgY29vcmRzXHJcbiAgICBjb25zdCBhZGRTaGlwQ29vcmRzID0gKGNvb3JkQXJyKSA9PiB7XHJcbiAgICAgICAgY29vcmRBcnIuZm9yRWFjaChjb29yZCA9PiBzaGlwQ29vcmRzLnB1c2goY29vcmQpKTtcclxuICAgIH07XHJcbiAgICAvL2luaXRpYWxpc2UgYW5kIHBvcHVsYXRlIGFuIG9iamVjdCB3aGljaCBzaG93cyBhbnkgaGl0cyBvbiBhIHNoaXBcclxuICAgIGNvbnN0IGhpdEluZm8gPSB7fTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gaTtcclxuICAgICAgICBoaXRJbmZvW3Bvc2l0aW9uXSA9ICdvayc7XHJcbiAgICB9XHJcbiAgICAvL3VwZGF0ZSBoaXQgb24gYSBzaGlwXHJcbiAgICBjb25zdCBoaXQgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBoaXRJbmZvW2NhbFBvc2l0aW9uKGNvb3JkKV0gPSAnaGl0JztcclxuICAgIH07XHJcbiAgICAvL21ldGhvZCB0byBjaGVjayB3aGV0aGVyIGEgc2hpcCBpcyBzdW5rIGJ5IGNoZWNraW5nIHRoZSBoaXRJbmZvIG9iamVjdFxyXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGhpdEluZm9baV0gPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRDb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiBoaXQgb24gc2hpcCBiYXNlZCBvbiB0aGUgaGl0IGNvb3JkXHJcbiAgICBjb25zdCBjYWxQb3NpdGlvbiA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhEaWZmID0gTWF0aC5hYnMoc2hpcENvb3Jkc1swXVswXSAtIGNvb3JkWzBdKTtcclxuICAgICAgICBjb25zdCB5RGlmZiA9IE1hdGguYWJzKHNoaXBDb29yZHNbMF1bMV0gLSBjb29yZFsxXSk7XHJcbiAgICAgICAgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5RGlmZiArIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh4RGlmZiA+IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHhEaWZmICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCB0eXBlLCBzaGlwQ29vcmRzLCBoaXRJbmZvLCBhZGRTaGlwQ29vcmRzLCBoaXQsIGlzU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgbmV3U2hpcCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbmV3UGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcbmltcG9ydCB7IG5ld0dhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZFwiO1xyXG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01cIjtcclxuXHJcbmNvbnN0IGdhbWVNb2R1bGUgPSgoKSA9PiAge1xyXG4gICAgbGV0IHAxT2JqID0ge307XHJcbiAgICBsZXQgcDJPYmogPSB7fTtcclxuICAgIGxldCBwMUJvYXJkID0ge307XHJcbiAgICBsZXQgcDJCb2FyZCA9IHt9O1xyXG4gICAgbGV0IGF0dGFja0Nvb3JkID0gJyc7XHJcblxyXG4gICAgY29uc3QgbmV3R2FtZSA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoJycpO1xyXG4gICAgICAgIC8vcGxheWVycyBjcmVhdGVkIGluIGNvZGUsIERPTSBpbnB1dCB0byBiZSBhZGRlZFxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHAxT2JqID0gbmV3UGxheWVyKCdQbGF5ZXIgMScsICdodW1hbicpO1xyXG4gICAgICAgIHAyT2JqID0gbmV3UGxheWVyKCdDb21wdXRlcicsICdjb21wdXRlcicpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHAxQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIHAyQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIC8vcGxhY2Ugc2hpcHMgaW4gY29kZSwgRE9NIGlucHV0IHRvIGJlIGFkZGVkXHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzYsNF0sICdjYXJyaWVyJywgNSwgJ1knKTtcclxuICAgICAgICBwMUJvYXJkLnBsYWNlU2hpcChbMSwxXSwgJ2JhdHRsZScsIDQsICdYJyk7XHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzIsNl0sICdjcnVpc2VyJywgMywgJ1knKTtcclxuICAgICAgICBwMUJvYXJkLnBsYWNlU2hpcChbNCw2XSwgJ3N1Ym1hcmluZScsIDMsICdZJyk7XHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzksNl0sICdkZXN0cm95ZXInLCAyLCAnWCcpO1xyXG4gICAgICAgIHAyQm9hcmQucGxhY2VTaGlwKFs1LDEwXSwgJ2NhcnJpZXInLCA1LCAnWCcpO1xyXG4gICAgICAgIHAyQm9hcmQucGxhY2VTaGlwKFszLDVdLCAnYmF0dGxlJywgNCwgJ1gnKTtcclxuICAgICAgICBwMkJvYXJkLnBsYWNlU2hpcChbMiw3XSwgJ2NydWlzZXInLCAzLCAnWScpO1xyXG4gICAgICAgIHAyQm9hcmQucGxhY2VTaGlwKFs4LDFdLCAnc3VibWFyaW5lJywgMywgJ1gnKTtcclxuICAgICAgICBwMkJvYXJkLnBsYWNlU2hpcChbOSw4XSwgJ2Rlc3Ryb3llcicsIDIsICdYJyk7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLy9yZW5kZXIgZ2FtZSBib2FyZCBhbmQgc3RhcnQgYnV0dG9uXHJcbiAgICAgICAgRE9NLm5ld0JvYXJkKHAxT2JqLCBwMk9iaik7XHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1N0YXJ0IEdhbWUnKTtcclxuICAgICAgICBET00uYWRkR2FtZUJ0bignU3RhcnQgR2FtZScpO1xyXG4gICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2dhbWVCdXR0b24nLCAnY2xpY2snLCBzdGFydEdhbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3N0YXJ0IGdhbWUgbG9vcCBieSByZW1vdmluZyBzdGFydCBidXR0b24gYW5kIHN0YXJ0aW5nIHBsYXllciAxcyB0dXJuXHJcbiAgICBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsIHN0YXJ0R2FtZSk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUdhbWVCdG4oKTtcclxuICAgICAgICAvL3JhbmRvbWx5IHNlbGVjdCBmaXJzdCBwbGF5ZXJcclxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xyXG4gICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFueSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIDIsIHVwZGF0ZSBnYW1lIGluc3RydWN0aW9ucyBhbmQgYWN0aXZhdGUgYm9hcmQgMiBmb3IgYXR0YWNrXHJcbiAgICBjb25zdCBwMVR1cm4gPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDFCb2FyZCcpO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMkF0dGFjayk7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdChgJHtwMU9iai5uYW1lfSdzIHR1cm4uIFBpY2sgYSBncmlkIHRvIGF0dGFjayBvbiAke3AyT2JqLm5hbWV9J3MgYm9hcmQhYCk7XHJcbiAgICAgICAgLy9pZiBwbGF5ZXIgaXMgY29tcHV0ZXIsIGNvbXB1dGVyIHRvIHRyaWdnZXIgY2xpY2sgb24gcmFuZG9tIGdyaWRcclxuICAgICAgICBpZiAocDFPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHAxQXR0YWNrKCksIDcwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NLmFkZExpbmtDbGFzcygncDJCb2FyZCcpO1xyXG4gICAgICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDFBdHRhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL29uIHBsYXllciAxIGNsaWNrIChhdHRhY2spXHJcbiAgICBjb25zdCBwMUF0dGFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBwMkhpdENvdW50ID0gcDJCb2FyZC5jb3VudEhpdHMoKTtcclxuICAgICAgICBsZXQgcDJNaXNzQ291bnQgPSBwMkJvYXJkLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9yZWNpZXZlIGF0dGFjayBjb29yZGluYXRlcyAoRE9NIGZvciBodW1hbiBvciBtZXRob2QgZm9yIGNvbXApIGFuZCBjb25maXJtIGhpdCBvciBtaXNzXHJcbiAgICAgICAgYXR0YWNrQ29vcmQgPSAocDFPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykgPyBwMU9iai5jb21wQXR0YWNrKHAxQm9hcmQuZ3JpZFNpemUpIDogRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAyQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgIC8vaWYgbmV3IGhpdCwgcmVuZGVyIGhpdCwgY2FsbCBjaGVja0FsbFN1bmsoKSBhbmQgY2hlY2sgZm9yIHdpbm5lci4gSWYgbm90IGFsbCBzaGlwcyBzdW5rLCBuZXh0IHBsYXllciB0dXJuXHJcbiAgICAgICAgaWYgKHAySGl0Q291bnQgIT09IHAyQm9hcmQuY291bnRIaXRzKCkpIHtcclxuICAgICAgICAgICAgRE9NLmJvYXJkSGl0KCdwMkJvYXJkJywgYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgICAgICBpZiAocDJCb2FyZC5jaGVja0FsbFN1bmsoKSkge1xyXG4gICAgICAgICAgICAgICAgd2lubmVyKHAxT2JqLm5hbWUsIHAxQm9hcmQuZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcDJUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHAyTWlzc0NvdW50ICE9PSBwMkJvYXJkLm1pc3Nlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9pZiBuZXcgbWlzcywgcmVuZGVyIG1pc3MgYW5kIGNhbGwgbmV4dCBwbGF5ZXJzIHR1cm5cclxuICAgICAgICAgICAgRE9NLmJvYXJkTWlzcygncDJCb2FyZCcsIGF0dGFja0Nvb3JkKTtcclxuICAgICAgICAgICAgcDJUdXJuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9pZiBncmlkIGhhcyBhbHJlYWR5IGJlZW4gcGlja2VkLCBwaWNrIGFnYWluXHJcbiAgICAgICAgICAgIHAxQXR0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JlbW92ZSBhbnkgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXIgZm9yIHBsYXllciAxLCB1cGRhdGUgZ2FtZSBpbnN0cnVjdGlvbnMgYW5kIGFjdGl2YXRlIGJvYXJkIDIgZm9yIGF0dGFja1xyXG4gICAgY29uc3QgcDJUdXJuID0gKCkgPT4ge1xyXG4gICAgICAgIERPTS5yZW1vdmVMaW5rQ2xhc3MoJ3AyQm9hcmQnKTtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDFBdHRhY2spO1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cDJPYmoubmFtZX0ncyB0dXJuLiBQaWNrIGEgZ3JpZCB0byBhdHRhY2sgb24gJHtwMU9iai5uYW1lfSdzIGJvYXJkIWApO1xyXG4gICAgICAgICAvL2lmIHBsYXllciBpcyBjb21wdXRlciwgY29tcHV0ZXIgdG8gcGljayBhIGdyaWQgYW5kIGF0dGFja1xyXG4gICAgICAgIGlmIChwMk9iai50eXBlID09PSAnY29tcHV0ZXInKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcDJBdHRhY2soKSwgNzAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET00uYWRkTGlua0NsYXNzKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgICAgIERPTS5uZXdFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMkF0dGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL29uIHBsYXllciAyIGNsaWNrIChhdHRhY2spXHJcbiAgICBjb25zdCBwMkF0dGFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBwMUhpdENvdW50ID0gcDFCb2FyZC5jb3VudEhpdHMoKTtcclxuICAgICAgICBsZXQgcDFNaXNzQ291bnQgPSBwMUJvYXJkLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgYXR0YWNrQ29vcmQgPSAocDJPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykgPyBwMk9iai5jb21wQXR0YWNrKHAyQm9hcmQuZ3JpZFNpemUpIDogRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAxQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgIGlmIChwMUhpdENvdW50ICE9PSBwMUJvYXJkLmNvdW50SGl0cygpKSB7XHJcbiAgICAgICAgICAgIERPTS5ib2FyZEhpdCgncDFCb2FyZCcsIGF0dGFja0Nvb3JkKTtcclxuICAgICAgICAgICAgaWYgKHAxQm9hcmQuY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lcihwMk9iai5uYW1lLCBwMkJvYXJkLmdyaWRTaXplKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAxVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChwMU1pc3NDb3VudCAhPT0gcDFCb2FyZC5taXNzZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIERPTS5ib2FyZE1pc3MoJ3AxQm9hcmQnLCBhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgICAgIHAxVHVybigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAyQXR0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCB3aW5uZXIgPSAocGxheWVyLCBncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cGxheWVyfSBpcyB0aGUgd2lubmVyISEgVGhleSBoYXZlIHN1bmsgYWxsIHRoZSBlbmVteSBzaGlwcyFgKTtcclxuICAgICAgICBET00uc2hvd1NoaXBzKCdwMUJvYXJkJywgcDFCb2FyZCk7XHJcbiAgICAgICAgRE9NLnNob3dTaGlwcygncDJCb2FyZCcsIHAyQm9hcmQpO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDJCb2FyZCcsICdjbGljaycsIHAyQXR0YWNrKTtcclxuICAgICAgICBET00ucmVtb3ZlTGlua0NsYXNzKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDJCb2FyZCcpO1xyXG4gICAgICAgIC8vcmVuZGVyIHJlc3RhcnQgYnV0dG9uXHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1Jlc3RhcnQnKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdnYW1lQnV0dG9uJywgJ2NsaWNrJywgKCkgPT4gbmV3R2FtZShncmlkU2l6ZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5ld0dhbWVcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5nYW1lTW9kdWxlLm5ld0dhbWUoMTApOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==