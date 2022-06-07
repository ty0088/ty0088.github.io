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
    const createBoard = (player1Obj, player2Obj) => {
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
        document.querySelector('#p1Board + .playerName').innerText = `${player1Obj.name}'s Attack Board`;
        document.querySelector('#p2Board + .playerName').innerText = `${player2Obj.name}'s Attack Board`;
    }

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
    const boardHit = (board, gameBoardObj) => {
        const lastCoord = gameBoardObj.hits.length - 1;
        const coord = gameBoardObj.hits[lastCoord];
        const dataCoord = `${coord[0]},${coord[1]}`;
        const gridElem = document.querySelector(`#${board} > [data-coord="${dataCoord}"]`);
        gridElem.innerHTML = '';
        const attckIcn = document.createElement('span');
        attckIcn.classList.add('material-symbols-outlined');
        attckIcn.innerText = 'cancel';
        gridElem.appendChild(attckIcn);
        window.getComputedStyle(attckIcn).opacity;
        attckIcn.style.opacity = 1;
    };

    //render miss
    const boardMiss = (board, gameBoardObj) => {
        const lastCoord = gameBoardObj.misses.length - 1;
        const coord = gameBoardObj.misses[lastCoord];
        const dataCoord = `${coord[0]},${coord[1]}`;
        const gridElem = document.querySelector(`#${board} > [data-coord="${dataCoord}"]`);
        gridElem.innerHTML = '';
        const missIcn = document.createElement('span');
        missIcn.classList.add('material-symbols-outlined');
        missIcn.innerText = 'radio_button_unchecked';
        gridElem.appendChild(missIcn);
        window.getComputedStyle(missIcn).opacity;
        missIcn.style.opacity = 1; 
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
    const createEventList = (elemID, event, func) => {
        const elem = document.getElementById(elemID);
        elem.addEventListener(event, func);
    };

    //remove an event listener
    const removeEventList =  (elemID, event, func) => {
        const elem = document.getElementById(elemID);
        elem.removeEventListener(event, func);
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

    const activeBoard = (actBoardID) => {
        const actElem = document.getElementById(actBoardID);
        actElem.classList.add('link');
    };

    const deactBoard = (deactBoardID) => {
        const deactElem = document.getElementById(deactBoardID);
        deactElem.classList.remove('link');
    };

    return {
        createBoard,
        addGameBtn,
        removeGameBtn,
        textInstruct,
        createEventList,
        removeEventList,
        clickCoord,
        activeBoard,
        deactBoard,
        boardHit,
        boardMiss,
        showShips
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
/* harmony export */   "createGameBoard": () => (/* binding */ createGameBoard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");


const checkStartCoords = (startCoord, length, direction) => {
    //check start coord is acceptable for ship location on a 10x10 grid
    if (direction === 'X') {
        if ((startCoord[0] + length - 1) <= 10) {
            return true;
        } else {
            return false;
        }
    } else {
        if ((startCoord[1] + length - 1) <= 10) {
            return true;
        } else {
            return false;
        }
    }
};

const returnShipCoords = (length, startCoord, direction) => {
    //return coordinates of whole ship
    if (checkStartCoords(startCoord, length, direction)) {
        let coordsArr = [startCoord];
        for (let i = 1; i < length; i ++) {
            if (direction === 'X') {
                coordsArr.push([startCoord[0] + i, startCoord[1]]);
            } else {
                coordsArr.push([startCoord[0], startCoord[1] + i]);
            }
        }
        return coordsArr;
    } else {
        console.log('Ship will not fit on board, choose a new location!');
        throw new Error("Ship will not fit on board, choose a new location!");
    }
};

const searchCoords = (searchArr, coords) => {
    //search array of coordinates for specific coordinate
    return searchArr.some(arr => arr.toString() === coords.toString());
};

const calPosition = (searchArr, coords) => {
    //calculate the relative position of hit on ship
    const xDiff = Math.abs(searchArr[0][0] - coords[0]);
    const yDiff = Math.abs(searchArr[0][1] - coords[1]);
    if (xDiff === 0 && yDiff === 0) {
        return 1;
    } else if (xDiff === 0 && yDiff > 0) {
        return yDiff + 1;
    } else if (xDiff > 0 && yDiff === 0) {
        return xDiff + 1;
    }
};

const createGameBoard = (player, startCoordArr) => {
    //place carrier, battle, cruiser and destroyer ships
    //carrStart, battStart, cruiStart, destStart
    let [startCoord, direction] = startCoordArr[0];
    const carrier = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(5, returnShipCoords(5, startCoord, direction));
    [startCoord, direction] = startCoordArr[1];
    const battle = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(4, returnShipCoords(4, startCoord, direction));
    [startCoord, direction] = startCoordArr[2];
    const cruiser = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(3, returnShipCoords(3, startCoord, direction));
    [startCoord, direction] = startCoordArr[3];
    const submarine = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(3, returnShipCoords(3, startCoord, direction));
    [startCoord, direction] = startCoordArr[4];
    const destroyer = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(2, returnShipCoords(2, startCoord, direction));
    //initialise hits and misses arrays
    const hits = [];
    const misses = [];
    //recieve attack method. If coords hit then mark appropriate ship hitInfo and update hit array.
    //if miss then update miss array
    const receiveAttack = (coords) => {
        //check if coords already exist in hits/misses
        if (searchCoords(hits, coords) || searchCoords(misses, coords)) {
        } else {
            //if coords aren't already registered then check for hit or miss
            if (searchCoords(carrier.shipCoords, coords)) {
                hits.push(coords);
                const hitPos = calPosition(carrier.shipCoords, coords);
                carrier.hit(hitPos);
            } else if (searchCoords(battle.shipCoords, coords)) {
                hits.push(coords);
                const hitPos = calPosition(battle.shipCoords, coords);
                battle.hit(hitPos);
            } else if (searchCoords(cruiser.shipCoords, coords)) {
                hits.push(coords);
                const hitPos = calPosition(cruiser.shipCoords, coords);
                cruiser.hit(hitPos);
            } else if (searchCoords(submarine.shipCoords, coords)) {
                hits.push(coords);
                const hitPos = calPosition(submarine.shipCoords, coords);
                submarine.hit(hitPos);
            } else if (searchCoords(destroyer.shipCoords, coords)) {
                hits.push(coords);
                const hitPos = calPosition(destroyer.shipCoords, coords);
                destroyer.hit(hitPos);
            } else {
                misses.push(coords);
            }
        }
    };
    //check whether all of the ships have been sunk method
    const checkAllSunk = () => {
        if (!carrier.isSunk()) {
            return false;
        } else if (!battle.isSunk()) {
            return false;
        } else if (!cruiser.isSunk()) {
            return false;
        } else if (!submarine.isSunk()) {
            return false;
        } else if (!destroyer.isSunk()) {
            return false;
        } else {
            return true;
        }
    };
    return { player, carrier, battle, cruiser, submarine, destroyer, hits, misses, receiveAttack, checkAllSunk };
};



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createPlayer = (name, type) => {
    if (type === 'human') {
        return {name, type};
    } else if (type === 'computer') {
        //computer ship placing logic
        const compShipCoords = () => {

        }
        //computer game logic
        const gameLogic = () => {

        }
        return {name, type, compShipCoords, gameLogic};
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPlayer);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
const createShip = (length, shipCoords) => {
    const hitInfo = {};
    for (let i = 1; i <= length; i++) {
        let position = i;
        hitInfo[position] = 'ok';
    }
    const hit = (position) => {
        hitInfo[position] = 'hit';
    };
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
    return { length, shipCoords, hitInfo, hit, isSunk };
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
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _gameBoard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard.js */ "./src/gameBoard.js");
/* harmony import */ var _DOM_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM.js */ "./src/DOM.js");




const gameController = (() => {
    let player1Obj = {};
    let player2Obj  = {};
    let p1GameBoardObj = {};
    let p2GameBoardObj = {};
    let attackCoord = '';

    //initialise new game
    const newGame = () => {
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct('');
        player1Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Player 1', 'human');
        player2Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Player 2', 'human');
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createBoard(player1Obj, player2Obj);
        //input player ship coordinates, manually inputted for now.
        // const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[8,1], 'X'], [[9,8], 'X']];
        p1GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player1Obj.name, p1StartCoordArr);
        p2GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player2Obj.name, p2StartCoordArr);
        //render start game button
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Start Game');
        //call game loop if start button pressed
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createEventList('gameButton', 'click', startGame);
    };

    //start game loop by removing start button and starting player 1s turn
    const startGame = () => {
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('gameButton', 'click', startGame);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeGameBtn();
        p1Turn();
    };

    //remove any existing event listener for player 2, update game instructions and activate board 1
    const p1Turn = () => {
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p1Board', 'click', p2Attack);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${player1Obj.name}'s turn. Pick a grid to attack!`);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.activeBoard('p1Board');
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.deactBoard('p2Board');
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createEventList('p1Board', 'click', p1Attack);
    }

    //on player 1 click (attack)
    const p1Attack = (event) => {
        let p2HitCount = p2GameBoardObj.hits.length;
        let p2MissCount = p2GameBoardObj.misses.length;
        //recieve attack coordinates and confirm hit or miss
        attackCoord = _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p2GameBoardObj.receiveAttack(attackCoord);
        if (p2HitCount !== p2GameBoardObj.hits.length) {
            //if hit, render hit, call checkAllSunk() and check for winner. If not all ships sunk, next player turn
            _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHit('p1Board', p2GameBoardObj);
            if (p2GameBoardObj.checkAllSunk()) {
                winner(player1Obj.name);
            } else {
                p2Turn();
            }
        } else if (p2MissCount !== p2GameBoardObj.misses.length) {
            //if miss, render miss and call next players turn
            _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.boardMiss('p1Board', p2GameBoardObj);
            p2Turn();
        }
    };

    //remove any existing event listener for player 1, update game instructions and activate board 2
    const p2Turn = () => {
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p1Board', 'click', p1Attack);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${player2Obj.name}'s turn. Pick a grid to attack!`);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.activeBoard('p2Board');
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.deactBoard('p1Board');
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createEventList('p2Board', 'click', p2Attack);
    };

    //on player 2 click (attack)
    const p2Attack = (event) => {
        let p1HitCount = p1GameBoardObj.hits.length;
        let p1MissCount = p1GameBoardObj.misses.length;
        attackCoord = _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p1GameBoardObj.receiveAttack(attackCoord);
        if (p1HitCount !== p1GameBoardObj.hits.length) {
            _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHit('p2Board', p1GameBoardObj);
            if (p1GameBoardObj.checkAllSunk()) {
                winner(player2Obj.name);
            } else {
                p1Turn();
            }
        } else if (p1MissCount !== p1GameBoardObj.misses.length) {
            _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.boardMiss('p2Board', p1GameBoardObj);
            p1Turn();
        }
    };

    const winner = (player) => {
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${player} is the winner!! They have sunk all the enemy ships!`);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.showShips('p2Board', p1GameBoardObj);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.showShips('p1Board', p2GameBoardObj);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p1Board', 'click', p1Attack);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p2Board', 'click', p2Attack);
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.deactBoard('p1Board');
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.deactBoard('p2Board');
        //render restart button
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Restart');
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createEventList('gameButton', 'click', newGame);
    };

    return  {
        newGame,
    };
})();

gameController.newGame();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixPQUFPO0FBQ2hDO0FBQ0EsNEJBQTRCLFNBQVM7QUFDckM7QUFDQSxvRUFBb0UsT0FBTyxHQUFHLE9BQU87QUFDckYsb0VBQW9FLE9BQU8sR0FBRyxPQUFPO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLGdCQUFnQjtBQUN4Rix3RUFBd0UsZ0JBQWdCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxTQUFTLEdBQUcsU0FBUztBQUNoRSwrQ0FBK0MsT0FBTyxpQkFBaUIsWUFBWTtBQUNuRixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTLEdBQUcsU0FBUztBQUNsRCxvREFBb0QsT0FBTyxpQkFBaUIsVUFBVTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTLEdBQUcsU0FBUztBQUNsRCxvREFBb0QsT0FBTyxpQkFBaUIsVUFBVTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SnVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCO0FBQ0Esb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0Esc0JBQXNCLG9EQUFVO0FBQ2hDO0FBQ0Esc0JBQXNCLG9EQUFVO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekhBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsWUFBWTs7Ozs7Ozs7Ozs7Ozs7QUNoQjNCO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOzs7Ozs7O1VDeEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ051QztBQUNVO0FBQ2xCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxREFBZ0I7QUFDeEIscUJBQXFCLHNEQUFZO0FBQ2pDLHFCQUFxQixzREFBWTtBQUNqQyxRQUFRLG9EQUFlO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhEQUFlO0FBQ3hDLHlCQUF5Qiw4REFBZTtBQUN4QztBQUNBLFFBQVEsbURBQWM7QUFDdEI7QUFDQSxRQUFRLHdEQUFtQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0RBQW1CO0FBQzNCLFFBQVEsc0RBQWlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFtQjtBQUMzQixRQUFRLHFEQUFnQixJQUFJLGdCQUFnQjtBQUM1QyxRQUFRLG9EQUFlO0FBQ3ZCLFFBQVEsbURBQWM7QUFDdEIsUUFBUSx3REFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbURBQWM7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpREFBWTtBQUN4QjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxZQUFZLGtEQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsd0RBQW1CO0FBQzNCLFFBQVEscURBQWdCLElBQUksZ0JBQWdCO0FBQzVDLFFBQVEsb0RBQWU7QUFDdkIsUUFBUSxtREFBYztBQUN0QixRQUFRLHdEQUFtQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbURBQWM7QUFDcEM7QUFDQTtBQUNBLFlBQVksaURBQVk7QUFDeEI7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWLFlBQVksa0RBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscURBQWdCLElBQUksUUFBUTtBQUNwQyxRQUFRLGtEQUFhO0FBQ3JCLFFBQVEsa0RBQWE7QUFDckIsUUFBUSx3REFBbUI7QUFDM0IsUUFBUSx3REFBbUI7QUFDM0IsUUFBUSxtREFBYztBQUN0QixRQUFRLG1EQUFjO0FBQ3RCO0FBQ0EsUUFBUSxtREFBYztBQUN0QixRQUFRLHdEQUFtQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EseUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAoKCkgPT4ge1xyXG5cclxuICAgIC8vcmVuZGVyIGdhbWUgYm9hcmRzXHJcbiAgICBjb25zdCBjcmVhdGVCb2FyZCA9IChwbGF5ZXIxT2JqLCBwbGF5ZXIyT2JqKSA9PiB7XHJcbiAgICAgICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMUdyaWRcclxuICAgICAgICBjb25zdCBwMUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDFCb2FyZCcpO1xyXG4gICAgICAgIHAxR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIHAxR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDJHcmlkXHJcbiAgICAgICAgY29uc3QgcDJHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AyQm9hcmQnKTtcclxuICAgICAgICBwMkdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMkdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FkZCBjb29yZGluYXRlIGF0dHJpYnV0ZSB0byBlYWNoIHNwYW5cclxuICAgICAgICBjb25zdCBwMUJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AxQm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgcDJCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMkJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAxMDsgeSA+IDA7IHktLSkge1xyXG4gICAgICAgICAgICBjb25zdCB5Q29vcmQgID0geTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeENvb3JkID0geDtcclxuICAgICAgICAgICAgICAgIHAxQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgcDJCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuQ291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZW5kZXIgcGxheWVyIG5hbWVzIGJlbG93IGVhY2ggYm9hcmRcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcDFCb2FyZCArIC5wbGF5ZXJOYW1lJykuaW5uZXJUZXh0ID0gYCR7cGxheWVyMU9iai5uYW1lfSdzIEF0dGFjayBCb2FyZGA7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AyQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3BsYXllcjJPYmoubmFtZX0ncyBBdHRhY2sgQm9hcmRgO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVuZGVyIGFsbCBzaGlwcyBvbiBib2FyZFxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICAvL2NvbGxlY3QgYWxsIHNoaXAgY29vcmRpbmF0ZXMgYW5kIGFkZCBiZyBjbGFzc1xyXG4gICAgICAgIGNvbnN0IHNoaXBzQXJyID0gWydjYXJyaWVyJywgJ2JhdHRsZScsICdjcnVpc2VyJywgICdzdWJtYXJpbmUnLCAnZGVzdHJveWVyJ107XHJcbiAgICAgICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWVCb2FyZE9ialtzaGlwXS5zaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvb3Jkc0Fyci5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWzBdfSwke2Nvb3JkWzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy9yZW5kZXIgaGl0XHJcbiAgICBjb25zdCBib2FyZEhpdCA9IChib2FyZCwgZ2FtZUJvYXJkT2JqKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFzdENvb3JkID0gZ2FtZUJvYXJkT2JqLmhpdHMubGVuZ3RoIC0gMTtcclxuICAgICAgICBjb25zdCBjb29yZCA9IGdhbWVCb2FyZE9iai5oaXRzW2xhc3RDb29yZF07XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgZ3JpZEVsZW0uaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc3QgYXR0Y2tJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgYXR0Y2tJY24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgICAgIGF0dGNrSWNuLmlubmVyVGV4dCA9ICdjYW5jZWwnO1xyXG4gICAgICAgIGdyaWRFbGVtLmFwcGVuZENoaWxkKGF0dGNrSWNuKTtcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhdHRja0ljbikub3BhY2l0eTtcclxuICAgICAgICBhdHRja0ljbi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIH07XHJcblxyXG4gICAgLy9yZW5kZXIgbWlzc1xyXG4gICAgY29uc3QgYm9hcmRNaXNzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICBjb25zdCBsYXN0Q29vcmQgPSBnYW1lQm9hcmRPYmoubWlzc2VzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgY29uc3QgY29vcmQgPSBnYW1lQm9hcmRPYmoubWlzc2VzW2xhc3RDb29yZF07XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgZ3JpZEVsZW0uaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc3QgbWlzc0ljbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBtaXNzSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBtaXNzSWNuLmlubmVyVGV4dCA9ICdyYWRpb19idXR0b25fdW5jaGVja2VkJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChtaXNzSWNuKTtcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtaXNzSWNuKS5vcGFjaXR5O1xyXG4gICAgICAgIG1pc3NJY24uc3R5bGUub3BhY2l0eSA9IDE7IFxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JlbmRlciBhIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgYWRkR2FtZUJ0biA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBidG5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uQ29udGFpbmVyJyk7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGdhbWVCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICAgICAgZ2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgZ2FtZUJ0bi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQnRuKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9yZW1vdmUgc3RhcnQgYnV0dG9uXHJcbiAgICBjb25zdCByZW1vdmVHYW1lQnRuID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQnV0dG9uJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVuZGVyIHRleHQgaW5zdHJ1Y3Rpb25zXHJcbiAgICBjb25zdCB0ZXh0SW5zdHJ1Y3QgPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluc3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9ucycpO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCBjcmVhdGVFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCByZW1vdmVFdmVudExpc3QgPSAgKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuICAgIGNvbnN0IGNsaWNrQ29vcmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgICAgIHJldHVybiBjb29yZDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYWN0aXZlQm9hcmQgPSAoYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RCb2FyZElEKTtcclxuICAgICAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGVhY3RCb2FyZCA9IChkZWFjdEJvYXJkSUQpID0+IHtcclxuICAgICAgICBjb25zdCBkZWFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWFjdEJvYXJkSUQpO1xyXG4gICAgICAgIGRlYWN0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQm9hcmQsXHJcbiAgICAgICAgYWRkR2FtZUJ0bixcclxuICAgICAgICByZW1vdmVHYW1lQnRuLFxyXG4gICAgICAgIHRleHRJbnN0cnVjdCxcclxuICAgICAgICBjcmVhdGVFdmVudExpc3QsXHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0LFxyXG4gICAgICAgIGNsaWNrQ29vcmQsXHJcbiAgICAgICAgYWN0aXZlQm9hcmQsXHJcbiAgICAgICAgZGVhY3RCb2FyZCxcclxuICAgICAgICBib2FyZEhpdCxcclxuICAgICAgICBib2FyZE1pc3MsXHJcbiAgICAgICAgc2hvd1NoaXBzXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgRE9NIH07IiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcclxuXHJcbmNvbnN0IGNoZWNrU3RhcnRDb29yZHMgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgIC8vY2hlY2sgc3RhcnQgY29vcmQgaXMgYWNjZXB0YWJsZSBmb3Igc2hpcCBsb2NhdGlvbiBvbiBhIDEweDEwIGdyaWRcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgIGlmICgoc3RhcnRDb29yZFswXSArIGxlbmd0aCAtIDEpIDw9IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICgoc3RhcnRDb29yZFsxXSArIGxlbmd0aCAtIDEpIDw9IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCByZXR1cm5TaGlwQ29vcmRzID0gKGxlbmd0aCwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAvL3JldHVybiBjb29yZGluYXRlcyBvZiB3aG9sZSBzaGlwXHJcbiAgICBpZiAoY2hlY2tTdGFydENvb3JkcyhzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbikpIHtcclxuICAgICAgICBsZXQgY29vcmRzQXJyID0gW3N0YXJ0Q29vcmRdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzQXJyLnB1c2goW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHNBcnIucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29vcmRzQXJyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnU2hpcCB3aWxsIG5vdCBmaXQgb24gYm9hcmQsIGNob29zZSBhIG5ldyBsb2NhdGlvbiEnKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIHdpbGwgbm90IGZpdCBvbiBib2FyZCwgY2hvb3NlIGEgbmV3IGxvY2F0aW9uIVwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHNlYXJjaENvb3JkcyA9IChzZWFyY2hBcnIsIGNvb3JkcykgPT4ge1xyXG4gICAgLy9zZWFyY2ggYXJyYXkgb2YgY29vcmRpbmF0ZXMgZm9yIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIHJldHVybiBzZWFyY2hBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKTtcclxufTtcclxuXHJcbmNvbnN0IGNhbFBvc2l0aW9uID0gKHNlYXJjaEFyciwgY29vcmRzKSA9PiB7XHJcbiAgICAvL2NhbGN1bGF0ZSB0aGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgaGl0IG9uIHNoaXBcclxuICAgIGNvbnN0IHhEaWZmID0gTWF0aC5hYnMoc2VhcmNoQXJyWzBdWzBdIC0gY29vcmRzWzBdKTtcclxuICAgIGNvbnN0IHlEaWZmID0gTWF0aC5hYnMoc2VhcmNoQXJyWzBdWzFdIC0gY29vcmRzWzFdKTtcclxuICAgIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA+IDApIHtcclxuICAgICAgICByZXR1cm4geURpZmYgKyAxO1xyXG4gICAgfSBlbHNlIGlmICh4RGlmZiA+IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICByZXR1cm4geERpZmYgKyAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKHBsYXllciwgc3RhcnRDb29yZEFycikgPT4ge1xyXG4gICAgLy9wbGFjZSBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIgYW5kIGRlc3Ryb3llciBzaGlwc1xyXG4gICAgLy9jYXJyU3RhcnQsIGJhdHRTdGFydCwgY3J1aVN0YXJ0LCBkZXN0U3RhcnRcclxuICAgIGxldCBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMF07XHJcbiAgICBjb25zdCBjYXJyaWVyID0gY3JlYXRlU2hpcCg1LCByZXR1cm5TaGlwQ29vcmRzKDUsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzFdO1xyXG4gICAgY29uc3QgYmF0dGxlID0gY3JlYXRlU2hpcCg0LCByZXR1cm5TaGlwQ29vcmRzKDQsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzJdO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IGNyZWF0ZVNoaXAoMywgcmV0dXJuU2hpcENvb3JkcygzLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclszXTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgcmV0dXJuU2hpcENvb3JkcygzLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFycls0XTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMiwgcmV0dXJuU2hpcENvb3JkcygyLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIC8vaW5pdGlhbGlzZSBoaXRzIGFuZCBtaXNzZXMgYXJyYXlzXHJcbiAgICBjb25zdCBoaXRzID0gW107XHJcbiAgICBjb25zdCBtaXNzZXMgPSBbXTtcclxuICAgIC8vcmVjaWV2ZSBhdHRhY2sgbWV0aG9kLiBJZiBjb29yZHMgaGl0IHRoZW4gbWFyayBhcHByb3ByaWF0ZSBzaGlwIGhpdEluZm8gYW5kIHVwZGF0ZSBoaXQgYXJyYXkuXHJcbiAgICAvL2lmIG1pc3MgdGhlbiB1cGRhdGUgbWlzcyBhcnJheVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcclxuICAgICAgICAvL2NoZWNrIGlmIGNvb3JkcyBhbHJlYWR5IGV4aXN0IGluIGhpdHMvbWlzc2VzXHJcbiAgICAgICAgaWYgKHNlYXJjaENvb3JkcyhoaXRzLCBjb29yZHMpIHx8IHNlYXJjaENvb3JkcyhtaXNzZXMsIGNvb3JkcykpIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2lmIGNvb3JkcyBhcmVuJ3QgYWxyZWFkeSByZWdpc3RlcmVkIHRoZW4gY2hlY2sgZm9yIGhpdCBvciBtaXNzXHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hDb29yZHMoY2Fycmllci5zaGlwQ29vcmRzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKGNhcnJpZXIuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNhcnJpZXIuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoQ29vcmRzKGJhdHRsZS5zaGlwQ29vcmRzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKGJhdHRsZS5zaGlwQ29vcmRzLCBjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgYmF0dGxlLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhjcnVpc2VyLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oY3J1aXNlci5zaGlwQ29vcmRzLCBjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY3J1aXNlci5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hDb29yZHMoc3VibWFyaW5lLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oc3VibWFyaW5lLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBzdWJtYXJpbmUuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoQ29vcmRzKGRlc3Ryb3llci5zaGlwQ29vcmRzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKGRlc3Ryb3llci5zaGlwQ29vcmRzLCBjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgZGVzdHJveWVyLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWlzc2VzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NoZWNrIHdoZXRoZXIgYWxsIG9mIHRoZSBzaGlwcyBoYXZlIGJlZW4gc3VuayBtZXRob2RcclxuICAgIGNvbnN0IGNoZWNrQWxsU3VuayA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIWNhcnJpZXIuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWJhdHRsZS5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghY3J1aXNlci5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghc3VibWFyaW5lLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFkZXN0cm95ZXIuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4geyBwbGF5ZXIsIGNhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIGhpdHMsIG1pc3NlcywgcmVjZWl2ZUF0dGFjaywgY2hlY2tBbGxTdW5rIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfTsiLCJjb25zdCBjcmVhdGVQbGF5ZXIgPSAobmFtZSwgdHlwZSkgPT4ge1xyXG4gICAgaWYgKHR5cGUgPT09ICdodW1hbicpIHtcclxuICAgICAgICByZXR1cm4ge25hbWUsIHR5cGV9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29tcHV0ZXInKSB7XHJcbiAgICAgICAgLy9jb21wdXRlciBzaGlwIHBsYWNpbmcgbG9naWNcclxuICAgICAgICBjb25zdCBjb21wU2hpcENvb3JkcyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29tcHV0ZXIgZ2FtZSBsb2dpY1xyXG4gICAgICAgIGNvbnN0IGdhbWVMb2dpYyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZSwgY29tcFNoaXBDb29yZHMsIGdhbWVMb2dpY307XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVBsYXllcjsiLCJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCwgc2hpcENvb3JkcykgPT4ge1xyXG4gICAgY29uc3QgaGl0SW5mbyA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBpO1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ29rJztcclxuICAgIH1cclxuICAgIGNvbnN0IGhpdCA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ2hpdCc7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGhpdEluZm9baV0gPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRDb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGxlbmd0aCwgc2hpcENvb3JkcywgaGl0SW5mbywgaGl0LCBpc1N1bmsgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVQbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZC5qc1wiO1xyXG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET00uanNcIjtcclxuXHJcbmNvbnN0IGdhbWVDb250cm9sbGVyID0gKCgpID0+IHtcclxuICAgIGxldCBwbGF5ZXIxT2JqID0ge307XHJcbiAgICBsZXQgcGxheWVyMk9iaiAgPSB7fTtcclxuICAgIGxldCBwMUdhbWVCb2FyZE9iaiA9IHt9O1xyXG4gICAgbGV0IHAyR2FtZUJvYXJkT2JqID0ge307XHJcbiAgICBsZXQgYXR0YWNrQ29vcmQgPSAnJztcclxuXHJcbiAgICAvL2luaXRpYWxpc2UgbmV3IGdhbWVcclxuICAgIGNvbnN0IG5ld0dhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdCgnJyk7XHJcbiAgICAgICAgcGxheWVyMU9iaiA9IGNyZWF0ZVBsYXllcignUGxheWVyIDEnLCAnaHVtYW4nKTtcclxuICAgICAgICBwbGF5ZXIyT2JqID0gY3JlYXRlUGxheWVyKCdQbGF5ZXIgMicsICdodW1hbicpO1xyXG4gICAgICAgIERPTS5jcmVhdGVCb2FyZChwbGF5ZXIxT2JqLCBwbGF5ZXIyT2JqKTtcclxuICAgICAgICAvL2lucHV0IHBsYXllciBzaGlwIGNvb3JkaW5hdGVzLCBtYW51YWxseSBpbnB1dHRlZCBmb3Igbm93LlxyXG4gICAgICAgIC8vIGNvbnN0IHAxU3RhcnRDb29yZEFyciA9IFtbWzYsNF0sICdZJ10sIFtbMSwxXSwgJ1gnXSwgW1syLDZdLCAnWSddLCBbWzQsNl0sICdZJ10sIFtbOSw2XSwgJ1gnXV07XHJcbiAgICAgICAgY29uc3QgcDFTdGFydENvb3JkQXJyID0gW1tbNiw0XSwgJ1knXSwgW1sxLDFdLCAnWCddLCBbWzIsNl0sICdZJ10sIFtbNCw2XSwgJ1knXSwgW1s5LDZdLCAnWCddXTtcclxuICAgICAgICBjb25zdCBwMlN0YXJ0Q29vcmRBcnIgPSBbW1s1LDEwXSwgJ1gnXSwgW1szLDVdLCAnWCddLCBbWzIsN10sICdZJ10sIFtbOCwxXSwgJ1gnXSwgW1s5LDhdLCAnWCddXTtcclxuICAgICAgICBwMUdhbWVCb2FyZE9iaiA9IGNyZWF0ZUdhbWVCb2FyZChwbGF5ZXIxT2JqLm5hbWUsIHAxU3RhcnRDb29yZEFycik7XHJcbiAgICAgICAgcDJHYW1lQm9hcmRPYmogPSBjcmVhdGVHYW1lQm9hcmQocGxheWVyMk9iai5uYW1lLCBwMlN0YXJ0Q29vcmRBcnIpO1xyXG4gICAgICAgIC8vcmVuZGVyIHN0YXJ0IGdhbWUgYnV0dG9uXHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1N0YXJ0IEdhbWUnKTtcclxuICAgICAgICAvL2NhbGwgZ2FtZSBsb29wIGlmIHN0YXJ0IGJ1dHRvbiBwcmVzc2VkXHJcbiAgICAgICAgRE9NLmNyZWF0ZUV2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsIHN0YXJ0R2FtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vc3RhcnQgZ2FtZSBsb29wIGJ5IHJlbW92aW5nIHN0YXJ0IGJ1dHRvbiBhbmQgc3RhcnRpbmcgcGxheWVyIDFzIHR1cm5cclxuICAgIGNvbnN0IHN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdnYW1lQnV0dG9uJywgJ2NsaWNrJywgc3RhcnRHYW1lKTtcclxuICAgICAgICBET00ucmVtb3ZlR2FtZUJ0bigpO1xyXG4gICAgICAgIHAxVHVybigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3JlbW92ZSBhbnkgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXIgZm9yIHBsYXllciAyLCB1cGRhdGUgZ2FtZSBpbnN0cnVjdGlvbnMgYW5kIGFjdGl2YXRlIGJvYXJkIDFcclxuICAgIGNvbnN0IHAxVHVybiA9ICgpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMUJvYXJkJywgJ2NsaWNrJywgcDJBdHRhY2spO1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cGxheWVyMU9iai5uYW1lfSdzIHR1cm4uIFBpY2sgYSBncmlkIHRvIGF0dGFjayFgKTtcclxuICAgICAgICBET00uYWN0aXZlQm9hcmQoJ3AxQm9hcmQnKTtcclxuICAgICAgICBET00uZGVhY3RCb2FyZCgncDJCb2FyZCcpO1xyXG4gICAgICAgIERPTS5jcmVhdGVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9vbiBwbGF5ZXIgMSBjbGljayAoYXR0YWNrKVxyXG4gICAgY29uc3QgcDFBdHRhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgcDJIaXRDb3VudCA9IHAyR2FtZUJvYXJkT2JqLmhpdHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBwMk1pc3NDb3VudCA9IHAyR2FtZUJvYXJkT2JqLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9yZWNpZXZlIGF0dGFjayBjb29yZGluYXRlcyBhbmQgY29uZmlybSBoaXQgb3IgbWlzc1xyXG4gICAgICAgIGF0dGFja0Nvb3JkID0gRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAyR2FtZUJvYXJkT2JqLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgIGlmIChwMkhpdENvdW50ICE9PSBwMkdhbWVCb2FyZE9iai5oaXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2lmIGhpdCwgcmVuZGVyIGhpdCwgY2FsbCBjaGVja0FsbFN1bmsoKSBhbmQgY2hlY2sgZm9yIHdpbm5lci4gSWYgbm90IGFsbCBzaGlwcyBzdW5rLCBuZXh0IHBsYXllciB0dXJuXHJcbiAgICAgICAgICAgIERPTS5ib2FyZEhpdCgncDFCb2FyZCcsIHAyR2FtZUJvYXJkT2JqKTtcclxuICAgICAgICAgICAgaWYgKHAyR2FtZUJvYXJkT2JqLmNoZWNrQWxsU3VuaygpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIocGxheWVyMU9iai5uYW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAyVHVybigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChwMk1pc3NDb3VudCAhPT0gcDJHYW1lQm9hcmRPYmoubWlzc2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2lmIG1pc3MsIHJlbmRlciBtaXNzIGFuZCBjYWxsIG5leHQgcGxheWVycyB0dXJuXHJcbiAgICAgICAgICAgIERPTS5ib2FyZE1pc3MoJ3AxQm9hcmQnLCBwMkdhbWVCb2FyZE9iaik7XHJcbiAgICAgICAgICAgIHAyVHVybigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy9yZW1vdmUgYW55IGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVyIGZvciBwbGF5ZXIgMSwgdXBkYXRlIGdhbWUgaW5zdHJ1Y3Rpb25zIGFuZCBhY3RpdmF0ZSBib2FyZCAyXHJcbiAgICBjb25zdCBwMlR1cm4gPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDFCb2FyZCcsICdjbGljaycsIHAxQXR0YWNrKTtcclxuICAgICAgICBET00udGV4dEluc3RydWN0KGAke3BsYXllcjJPYmoubmFtZX0ncyB0dXJuLiBQaWNrIGEgZ3JpZCB0byBhdHRhY2shYCk7XHJcbiAgICAgICAgRE9NLmFjdGl2ZUJvYXJkKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgRE9NLmRlYWN0Qm9hcmQoJ3AxQm9hcmQnKTtcclxuICAgICAgICBET00uY3JlYXRlRXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDJBdHRhY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL29uIHBsYXllciAyIGNsaWNrIChhdHRhY2spXHJcbiAgICBjb25zdCBwMkF0dGFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBwMUhpdENvdW50ID0gcDFHYW1lQm9hcmRPYmouaGl0cy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHAxTWlzc0NvdW50ID0gcDFHYW1lQm9hcmRPYmoubWlzc2VzLmxlbmd0aDtcclxuICAgICAgICBhdHRhY2tDb29yZCA9IERPTS5jbGlja0Nvb3JkKGV2ZW50KTtcclxuICAgICAgICBwMUdhbWVCb2FyZE9iai5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkKTtcclxuICAgICAgICBpZiAocDFIaXRDb3VudCAhPT0gcDFHYW1lQm9hcmRPYmouaGl0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgRE9NLmJvYXJkSGl0KCdwMkJvYXJkJywgcDFHYW1lQm9hcmRPYmopO1xyXG4gICAgICAgICAgICBpZiAocDFHYW1lQm9hcmRPYmouY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lcihwbGF5ZXIyT2JqLm5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcDFUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHAxTWlzc0NvdW50ICE9PSBwMUdhbWVCb2FyZE9iai5taXNzZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIERPTS5ib2FyZE1pc3MoJ3AyQm9hcmQnLCBwMUdhbWVCb2FyZE9iaik7XHJcbiAgICAgICAgICAgIHAxVHVybigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgd2lubmVyID0gKHBsYXllcikgPT4ge1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cGxheWVyfSBpcyB0aGUgd2lubmVyISEgVGhleSBoYXZlIHN1bmsgYWxsIHRoZSBlbmVteSBzaGlwcyFgKTtcclxuICAgICAgICBET00uc2hvd1NoaXBzKCdwMkJvYXJkJywgcDFHYW1lQm9hcmRPYmopO1xyXG4gICAgICAgIERPTS5zaG93U2hpcHMoJ3AxQm9hcmQnLCBwMkdhbWVCb2FyZE9iaik7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDFCb2FyZCcsICdjbGljaycsIHAxQXR0YWNrKTtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDJBdHRhY2spO1xyXG4gICAgICAgIERPTS5kZWFjdEJvYXJkKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgRE9NLmRlYWN0Qm9hcmQoJ3AyQm9hcmQnKTtcclxuICAgICAgICAvL3JlbmRlciByZXN0YXJ0IGJ1dHRvblxyXG4gICAgICAgIERPTS5hZGRHYW1lQnRuKCdSZXN0YXJ0Jyk7XHJcbiAgICAgICAgRE9NLmNyZWF0ZUV2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsIG5ld0dhbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gIHtcclxuICAgICAgICBuZXdHYW1lLFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmdhbWVDb250cm9sbGVyLm5ld0dhbWUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=