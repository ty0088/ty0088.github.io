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

    //create game grids on page
const createBoard = () => {
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
    const p1BoxSpans = document.querySelectorAll('#p1Board>span');
    const p2BoxSpans = document.querySelectorAll('#p2Board>span');
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
}

//shows ships on game boards on page
const showShips = (board, gameBoardObj) => {
    //collect all ship coordinates and add bg class
    let coordsArr = []
    const shipsArr = ['carrier', 'battle', 'cruiser',  'submarine', 'destroyer'];
    shipsArr.forEach(ship => {
            gameBoardObj[ship].shipCoords.forEach(coord => {
                // coordsArr.push(coord);
                const coordString = `${coord[0]},${coord[1]}`;
                document.querySelector(`#${board}>[data-coord="${coordString}"]`).classList.add('bgShip');
        });
    });
};

//render a hit or miss on gameboard
const boardHitMiss = (board, gameBoardObj) => {
    //render hits using hits array
    gameBoardObj.hits.forEach(coord => {
        const dataCoord = `${coord[0]},${coord[1]}`;
        const gridElem = document.querySelector(`#${board}>[data-coord="${dataCoord}"]`);
        gridElem.innerHTML = '';
        const attckIcn = document.createElement('span');
        attckIcn.classList.add('material-symbols-outlined');
        attckIcn.innerText = 'cancel';
        gridElem.appendChild(attckIcn);
    });
    //render misses using misses array
    gameBoardObj.misses.forEach(coord => {
        const dataCoord = `${coord[0]},${coord[1]}`;
        const gridElem = document.querySelector(`#${board}>[data-coord="${dataCoord}"]`);
        gridElem.innerHTML = '';
        const missIcn = document.createElement('span');
        missIcn.classList.add('material-symbols-outlined');
        missIcn.innerText = 'radio_button_unchecked';
        gridElem.appendChild(missIcn);
    });
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
        boardHitMiss,
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
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createBoard();
        player1Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Player1', 'human');
        player2Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer', 'computer');
        //input player ship coordinates, manually inputted for now.
        // const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[8,1], 'X'], [[9,8], 'X']];
        p1GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player1Obj.name, p1StartCoordArr);
        p2GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player2Obj.name, p2StartCoordArr);
        //render start game button
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Start Game');
        //call game loop if start button pressed
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createEventList('gameButton', 'click', gameLoop);
    };

    //start main game loop by removing start button and starting player 1s turn
    const gameLoop = () => {
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

    //on click (attack)
    const p1Attack = (event) => {
        let p2HitCount = p2GameBoardObj.hits.length;
        let p2MissCount = p2GameBoardObj.misses.length;
        //recieve attack coordinates and confirm hit or miss
        attackCoord = _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p2GameBoardObj.receiveAttack(attackCoord);
        //render hits/misses
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHitMiss('p1Board', p2GameBoardObj);
        if (p2HitCount !== p2GameBoardObj.hits.length) {
            //if hit, call checkAllSunk() and check for winner. If not all ships sunk, next player turn
            if (p2GameBoardObj.checkAllSunk()) {
                winner(player1Obj.name);
            } else {
                p2Turn();
            }
        } else if (p2MissCount !== p2GameBoardObj.misses.length) {
            //if miss and call next players turn
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

    //on click (attack)
    const p2Attack = (event) => {
        let p1HitCount = p1GameBoardObj.hits.length;
        let p1MissCount = p1GameBoardObj.misses.length;
        //recieve attack coordinates and confirm hit or miss
        attackCoord = _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p1GameBoardObj.receiveAttack(attackCoord);
        //render hits/misses
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHitMiss('p2Board', p1GameBoardObj);
        if (p1HitCount !== p1GameBoardObj.hits.length) {
            //if hit, call checkAllSunk() and check for winner. If not all ships sunk, next player turn
            if (p1GameBoardObj.checkAllSunk()) {
                winner(player2Obj.name);
            } else {
                p1Turn();
            }
        } else if (p1MissCount !== p1GameBoardObj.misses.length) {
            //if miss and call next players turn
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

    const restartGame = () => {

    };

    return  {
        newGame,
    };
})();

gameController.newGame();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixPQUFPO0FBQzVCO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQSxnRUFBZ0UsT0FBTyxHQUFHLE9BQU87QUFDakYsZ0VBQWdFLE9BQU8sR0FBRyxPQUFPO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFNBQVMsR0FBRyxTQUFTO0FBQzVELDJDQUEyQyxNQUFNLGdCQUFnQixZQUFZO0FBQzdFLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFNBQVMsR0FBRyxTQUFTO0FBQ2xELG9EQUFvRCxNQUFNLGdCQUFnQixVQUFVO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDZCQUE2QixTQUFTLEdBQUcsU0FBUztBQUNsRCxvREFBb0QsTUFBTSxnQkFBZ0IsVUFBVTtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCO0FBQ0Esb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0Esc0JBQXNCLG9EQUFVO0FBQ2hDO0FBQ0Esc0JBQXNCLG9EQUFVO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDekhBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsWUFBWTs7Ozs7Ozs7Ozs7Ozs7QUNoQjNCO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOzs7Ozs7O1VDeEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ051QztBQUNVO0FBQ2xCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBZTtBQUN2QixxQkFBcUIsc0RBQVk7QUFDakMscUJBQXFCLHNEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhEQUFlO0FBQ3hDLHlCQUF5Qiw4REFBZTtBQUN4QztBQUNBLFFBQVEsbURBQWM7QUFDdEI7QUFDQSxRQUFRLHdEQUFtQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFtQjtBQUMzQixRQUFRLHFEQUFnQixJQUFJLGdCQUFnQjtBQUM1QyxRQUFRLG9EQUFlO0FBQ3ZCLFFBQVEsbURBQWM7QUFDdEIsUUFBUSx3REFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbURBQWM7QUFDcEM7QUFDQTtBQUNBLFFBQVEscURBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFtQjtBQUMzQixRQUFRLHFEQUFnQixJQUFJLGdCQUFnQjtBQUM1QyxRQUFRLG9EQUFlO0FBQ3ZCLFFBQVEsbURBQWM7QUFDdEIsUUFBUSx3REFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbURBQWM7QUFDcEM7QUFDQTtBQUNBLFFBQVEscURBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxREFBZ0IsSUFBSSxRQUFRO0FBQ3BDLFFBQVEsa0RBQWE7QUFDckIsUUFBUSxrREFBYTtBQUNyQixRQUFRLHdEQUFtQjtBQUMzQixRQUFRLHdEQUFtQjtBQUMzQixRQUFRLG1EQUFjO0FBQ3RCLFFBQVEsbURBQWM7QUFDdEI7QUFDQSxRQUFRLG1EQUFjO0FBQ3RCLFFBQVEsd0RBQW1CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NID0gKCgpID0+IHtcclxuXHJcbiAgICAvL2NyZWF0ZSBnYW1lIGdyaWRzIG9uIHBhZ2VcclxuY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAxR3JpZFxyXG4gICAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcclxuICAgIHAxR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgIH1cclxuICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDJHcmlkXHJcbiAgICBjb25zdCBwMkdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDJCb2FyZCcpO1xyXG4gICAgcDJHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICBwMkdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgfVxyXG4gICAgLy9hZGQgY29vcmRpbmF0ZSBhdHRyaWJ1dGUgdG8gZWFjaCBzcGFuXHJcbiAgICBjb25zdCBwMUJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AxQm9hcmQ+c3BhbicpO1xyXG4gICAgY29uc3QgcDJCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMkJvYXJkPnNwYW4nKTtcclxuICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICBwMUJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgcDJCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vc2hvd3Mgc2hpcHMgb24gZ2FtZSBib2FyZHMgb24gcGFnZVxyXG5jb25zdCBzaG93U2hpcHMgPSAoYm9hcmQsIGdhbWVCb2FyZE9iaikgPT4ge1xyXG4gICAgLy9jb2xsZWN0IGFsbCBzaGlwIGNvb3JkaW5hdGVzIGFuZCBhZGQgYmcgY2xhc3NcclxuICAgIGxldCBjb29yZHNBcnIgPSBbXVxyXG4gICAgY29uc3Qgc2hpcHNBcnIgPSBbJ2NhcnJpZXInLCAnYmF0dGxlJywgJ2NydWlzZXInLCAgJ3N1Ym1hcmluZScsICdkZXN0cm95ZXInXTtcclxuICAgIHNoaXBzQXJyLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIGdhbWVCb2FyZE9ialtzaGlwXS5zaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29vcmRzQXJyLnB1c2goY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRTdHJpbmcgPSBgJHtjb29yZFswXX0sJHtjb29yZFsxXX1gO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9PltkYXRhLWNvb3JkPVwiJHtjb29yZFN0cmluZ31cIl1gKS5jbGFzc0xpc3QuYWRkKCdiZ1NoaXAnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy9yZW5kZXIgYSBoaXQgb3IgbWlzcyBvbiBnYW1lYm9hcmRcclxuY29uc3QgYm9hcmRIaXRNaXNzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgIC8vcmVuZGVyIGhpdHMgdXNpbmcgaGl0cyBhcnJheVxyXG4gICAgZ2FtZUJvYXJkT2JqLmhpdHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfT5bZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGdyaWRFbGVtLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGF0dGNrSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGF0dGNrSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBhdHRja0ljbi5pbm5lclRleHQgPSAnY2FuY2VsJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChhdHRja0ljbik7XHJcbiAgICB9KTtcclxuICAgIC8vcmVuZGVyIG1pc3NlcyB1c2luZyBtaXNzZXMgYXJyYXlcclxuICAgIGdhbWVCb2FyZE9iai5taXNzZXMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfT5bZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGdyaWRFbGVtLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IG1pc3NJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbWlzc0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgbWlzc0ljbi5pbm5lclRleHQgPSAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQobWlzc0ljbik7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vcmVuZGVyIGEgc3RhcnQgYnV0dG9uXHJcbmNvbnN0IGFkZEdhbWVCdG4gPSAodGV4dCkgPT4ge1xyXG4gICAgY29uc3QgZ2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGNvbnN0IGJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25Db250YWluZXInKTtcclxuICAgIGJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIGdhbWVCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICBnYW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIGdhbWVCdG4uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQnRuKTtcclxufTtcclxuXHJcbi8vcmVtb3ZlIHN0YXJ0IGJ1dHRvblxyXG5jb25zdCByZW1vdmVHYW1lQnRuID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCdXR0b24nKS5yZW1vdmUoKTtcclxufTtcclxuXHJcblxyXG4vL3JlbmRlciB0ZXh0IGluc3RydWN0aW9uc1xyXG5jb25zdCB0ZXh0SW5zdHJ1Y3QgPSAodGV4dCkgPT4ge1xyXG4gICAgY29uc3QgaW5zdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb25zJyk7XHJcbiAgICBpbnN0RWxlbS5pbm5lclRleHQgPSAnJztcclxuICAgIGluc3RFbGVtLmlubmVyVGV4dCA9IHRleHQ7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBhbiBldmVudCBsaXN0ZW5lclxyXG5jb25zdCBjcmVhdGVFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JRCk7XHJcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG59O1xyXG5cclxuLy9yZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXJcclxuY29uc3QgcmVtb3ZlRXZlbnRMaXN0ID0gIChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbn07XHJcblxyXG4vL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuY29uc3QgY2xpY2tDb29yZCA9IChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgY29vcmRTdHIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZFwiKTtcclxuICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgIGxldCBjb29yZCA9IFtdO1xyXG4gICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclswXSkpO1xyXG4gICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgcmV0dXJuIGNvb3JkO1xyXG59O1xyXG5cclxuY29uc3QgYWN0aXZlQm9hcmQgPSAoYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgY29uc3QgYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdEJvYXJkSUQpO1xyXG4gICAgYWN0RWxlbS5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbn07XHJcblxyXG5jb25zdCBkZWFjdEJvYXJkID0gKGRlYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgY29uc3QgZGVhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVhY3RCb2FyZElEKTtcclxuICAgIGRlYWN0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbn07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVCb2FyZCxcclxuICAgICAgICBhZGRHYW1lQnRuLFxyXG4gICAgICAgIHJlbW92ZUdhbWVCdG4sXHJcbiAgICAgICAgdGV4dEluc3RydWN0LFxyXG4gICAgICAgIGNyZWF0ZUV2ZW50TGlzdCxcclxuICAgICAgICByZW1vdmVFdmVudExpc3QsXHJcbiAgICAgICAgY2xpY2tDb29yZCxcclxuICAgICAgICBhY3RpdmVCb2FyZCxcclxuICAgICAgICBkZWFjdEJvYXJkLFxyXG4gICAgICAgIGJvYXJkSGl0TWlzcyxcclxuICAgICAgICBzaG93U2hpcHNcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBET00gfTsiLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xyXG5cclxuY29uc3QgY2hlY2tTdGFydENvb3JkcyA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgLy9jaGVjayBzdGFydCBjb29yZCBpcyBhY2NlcHRhYmxlIGZvciBzaGlwIGxvY2F0aW9uIG9uIGEgMTB4MTAgZ3JpZFxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1gnKSB7XHJcbiAgICAgICAgaWYgKChzdGFydENvb3JkWzBdICsgbGVuZ3RoIC0gMSkgPD0gMTApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKChzdGFydENvb3JkWzFdICsgbGVuZ3RoIC0gMSkgPD0gMTApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHJldHVyblNoaXBDb29yZHMgPSAobGVuZ3RoLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pID0+IHtcclxuICAgIC8vcmV0dXJuIGNvb3JkaW5hdGVzIG9mIHdob2xlIHNoaXBcclxuICAgIGlmIChjaGVja1N0YXJ0Q29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uKSkge1xyXG4gICAgICAgIGxldCBjb29yZHNBcnIgPSBbc3RhcnRDb29yZF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHNBcnIucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3Jkc0Fyci5wdXNoKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb29yZHNBcnI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTaGlwIHdpbGwgbm90IGZpdCBvbiBib2FyZCwgY2hvb3NlIGEgbmV3IGxvY2F0aW9uIScpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgd2lsbCBub3QgZml0IG9uIGJvYXJkLCBjaG9vc2UgYSBuZXcgbG9jYXRpb24hXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3Qgc2VhcmNoQ29vcmRzID0gKHNlYXJjaEFyciwgY29vcmRzKSA9PiB7XHJcbiAgICAvL3NlYXJjaCBhcnJheSBvZiBjb29yZGluYXRlcyBmb3Igc3BlY2lmaWMgY29vcmRpbmF0ZVxyXG4gICAgcmV0dXJuIHNlYXJjaEFyci5zb21lKGFyciA9PiBhcnIudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpO1xyXG59O1xyXG5cclxuY29uc3QgY2FsUG9zaXRpb24gPSAoc2VhcmNoQXJyLCBjb29yZHMpID0+IHtcclxuICAgIC8vY2FsY3VsYXRlIHRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBoaXQgb24gc2hpcFxyXG4gICAgY29uc3QgeERpZmYgPSBNYXRoLmFicyhzZWFyY2hBcnJbMF1bMF0gLSBjb29yZHNbMF0pO1xyXG4gICAgY29uc3QgeURpZmYgPSBNYXRoLmFicyhzZWFyY2hBcnJbMF1bMV0gLSBjb29yZHNbMV0pO1xyXG4gICAgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2UgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID4gMCkge1xyXG4gICAgICAgIHJldHVybiB5RGlmZiArIDE7XHJcbiAgICB9IGVsc2UgaWYgKHhEaWZmID4gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB4RGlmZiArIDE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAocGxheWVyLCBzdGFydENvb3JkQXJyKSA9PiB7XHJcbiAgICAvL3BsYWNlIGNhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciBhbmQgZGVzdHJveWVyIHNoaXBzXHJcbiAgICAvL2NhcnJTdGFydCwgYmF0dFN0YXJ0LCBjcnVpU3RhcnQsIGRlc3RTdGFydFxyXG4gICAgbGV0IFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclswXTtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBjcmVhdGVTaGlwKDUsIHJldHVyblNoaXBDb29yZHMoNSwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMV07XHJcbiAgICBjb25zdCBiYXR0bGUgPSBjcmVhdGVTaGlwKDQsIHJldHVyblNoaXBDb29yZHMoNCwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMl07XHJcbiAgICBjb25zdCBjcnVpc2VyID0gY3JlYXRlU2hpcCgzLCByZXR1cm5TaGlwQ29vcmRzKDMsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzNdO1xyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgzLCByZXR1cm5TaGlwQ29vcmRzKDMsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzRdO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gY3JlYXRlU2hpcCgyLCByZXR1cm5TaGlwQ29vcmRzKDIsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgLy9pbml0aWFsaXNlIGhpdHMgYW5kIG1pc3NlcyBhcnJheXNcclxuICAgIGNvbnN0IGhpdHMgPSBbXTtcclxuICAgIGNvbnN0IG1pc3NlcyA9IFtdO1xyXG4gICAgLy9yZWNpZXZlIGF0dGFjayBtZXRob2QuIElmIGNvb3JkcyBoaXQgdGhlbiBtYXJrIGFwcHJvcHJpYXRlIHNoaXAgaGl0SW5mbyBhbmQgdXBkYXRlIGhpdCBhcnJheS5cclxuICAgIC8vaWYgbWlzcyB0aGVuIHVwZGF0ZSBtaXNzIGFycmF5XHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xyXG4gICAgICAgIC8vY2hlY2sgaWYgY29vcmRzIGFscmVhZHkgZXhpc3QgaW4gaGl0cy9taXNzZXNcclxuICAgICAgICBpZiAoc2VhcmNoQ29vcmRzKGhpdHMsIGNvb3JkcykgfHwgc2VhcmNoQ29vcmRzKG1pc3NlcywgY29vcmRzKSkge1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vaWYgY29vcmRzIGFyZW4ndCBhbHJlYWR5IHJlZ2lzdGVyZWQgdGhlbiBjaGVjayBmb3IgaGl0IG9yIG1pc3NcclxuICAgICAgICAgICAgaWYgKHNlYXJjaENvb3JkcyhjYXJyaWVyLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oY2Fycmllci5zaGlwQ29vcmRzLCBjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY2Fycmllci5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hDb29yZHMoYmF0dGxlLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oYmF0dGxlLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGUuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoQ29vcmRzKGNydWlzZXIuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihjcnVpc2VyLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjcnVpc2VyLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhzdWJtYXJpbmUuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihzdWJtYXJpbmUuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIHN1Ym1hcmluZS5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hDb29yZHMoZGVzdHJveWVyLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oZGVzdHJveWVyLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBkZXN0cm95ZXIuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtaXNzZXMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBhbGwgb2YgdGhlIHNoaXBzIGhhdmUgYmVlbiBzdW5rIG1ldGhvZFxyXG4gICAgY29uc3QgY2hlY2tBbGxTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghY2Fycmllci5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghYmF0dGxlLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFjcnVpc2VyLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFzdWJtYXJpbmUuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWRlc3Ryb3llci5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7IHBsYXllciwgY2FycmllciwgYmF0dGxlLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgaGl0cywgbWlzc2VzLCByZWNlaXZlQXR0YWNrLCBjaGVja0FsbFN1bmsgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCB9OyIsImNvbnN0IGNyZWF0ZVBsYXllciA9IChuYW1lLCB0eXBlKSA9PiB7XHJcbiAgICBpZiAodHlwZSA9PT0gJ2h1bWFuJykge1xyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZX07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAvL2NvbXB1dGVyIHNoaXAgcGxhY2luZyBsb2dpY1xyXG4gICAgICAgIGNvbnN0IGNvbXBTaGlwQ29vcmRzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb21wdXRlciBnYW1lIGxvZ2ljXHJcbiAgICAgICAgY29uc3QgZ2FtZUxvZ2ljID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtuYW1lLCB0eXBlLCBjb21wU2hpcENvb3JkcywgZ2FtZUxvZ2ljfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGxheWVyOyIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoLCBzaGlwQ29vcmRzKSA9PiB7XHJcbiAgICBjb25zdCBoaXRJbmZvID0ge307XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGk7XHJcbiAgICAgICAgaGl0SW5mb1twb3NpdGlvbl0gPSAnb2snO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaGl0ID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgaGl0SW5mb1twb3NpdGlvbl0gPSAnaGl0JztcclxuICAgIH07XHJcbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhpdENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgIGhpdENvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCBzaGlwQ29vcmRzLCBoaXRJbmZvLCBoaXQsIGlzU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZVBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcclxuaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XHJcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTS5qc1wiO1xyXG5cclxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHBsYXllcjFPYmogPSB7fTtcclxuICAgIGxldCBwbGF5ZXIyT2JqICA9IHt9O1xyXG4gICAgbGV0IHAxR2FtZUJvYXJkT2JqID0ge307XHJcbiAgICBsZXQgcDJHYW1lQm9hcmRPYmogPSB7fTtcclxuICAgIGxldCBhdHRhY2tDb29yZCA9ICcnO1xyXG5cclxuICAgIC8vaW5pdGlhbGlzZSBuZXcgZ2FtZVxyXG4gICAgY29uc3QgbmV3R2FtZSA9ICgpID0+IHtcclxuICAgICAgICBET00uY3JlYXRlQm9hcmQoKTtcclxuICAgICAgICBwbGF5ZXIxT2JqID0gY3JlYXRlUGxheWVyKCdQbGF5ZXIxJywgJ2h1bWFuJyk7XHJcbiAgICAgICAgcGxheWVyMk9iaiA9IGNyZWF0ZVBsYXllcignQ29tcHV0ZXInLCAnY29tcHV0ZXInKTtcclxuICAgICAgICAvL2lucHV0IHBsYXllciBzaGlwIGNvb3JkaW5hdGVzLCBtYW51YWxseSBpbnB1dHRlZCBmb3Igbm93LlxyXG4gICAgICAgIC8vIGNvbnN0IHAxU3RhcnRDb29yZEFyciA9IFtbWzYsNF0sICdZJ10sIFtbMSwxXSwgJ1gnXSwgW1syLDZdLCAnWSddLCBbWzQsNl0sICdZJ10sIFtbOSw2XSwgJ1gnXV07XHJcbiAgICAgICAgY29uc3QgcDFTdGFydENvb3JkQXJyID0gW1tbNiw0XSwgJ1knXSwgW1sxLDFdLCAnWCddLCBbWzIsNl0sICdZJ10sIFtbNCw2XSwgJ1knXSwgW1s5LDZdLCAnWCddXTtcclxuICAgICAgICBjb25zdCBwMlN0YXJ0Q29vcmRBcnIgPSBbW1s1LDEwXSwgJ1gnXSwgW1szLDVdLCAnWCddLCBbWzIsN10sICdZJ10sIFtbOCwxXSwgJ1gnXSwgW1s5LDhdLCAnWCddXTtcclxuICAgICAgICBwMUdhbWVCb2FyZE9iaiA9IGNyZWF0ZUdhbWVCb2FyZChwbGF5ZXIxT2JqLm5hbWUsIHAxU3RhcnRDb29yZEFycik7XHJcbiAgICAgICAgcDJHYW1lQm9hcmRPYmogPSBjcmVhdGVHYW1lQm9hcmQocGxheWVyMk9iai5uYW1lLCBwMlN0YXJ0Q29vcmRBcnIpO1xyXG4gICAgICAgIC8vcmVuZGVyIHN0YXJ0IGdhbWUgYnV0dG9uXHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1N0YXJ0IEdhbWUnKTtcclxuICAgICAgICAvL2NhbGwgZ2FtZSBsb29wIGlmIHN0YXJ0IGJ1dHRvbiBwcmVzc2VkXHJcbiAgICAgICAgRE9NLmNyZWF0ZUV2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsIGdhbWVMb29wKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9zdGFydCBtYWluIGdhbWUgbG9vcCBieSByZW1vdmluZyBzdGFydCBidXR0b24gYW5kIHN0YXJ0aW5nIHBsYXllciAxcyB0dXJuXHJcbiAgICBjb25zdCBnYW1lTG9vcCA9ICgpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlR2FtZUJ0bigpO1xyXG4gICAgICAgIHAxVHVybigpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3JlbW92ZSBhbnkgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXIgZm9yIHBsYXllciAyLCB1cGRhdGUgZ2FtZSBpbnN0cnVjdGlvbnMgYW5kIGFjdGl2YXRlIGJvYXJkIDFcclxuICAgIGNvbnN0IHAxVHVybiA9ICgpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMUJvYXJkJywgJ2NsaWNrJywgcDJBdHRhY2spO1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cGxheWVyMU9iai5uYW1lfSdzIHR1cm4uIFBpY2sgYSBncmlkIHRvIGF0dGFjayFgKTtcclxuICAgICAgICBET00uYWN0aXZlQm9hcmQoJ3AxQm9hcmQnKTtcclxuICAgICAgICBET00uZGVhY3RCb2FyZCgncDJCb2FyZCcpO1xyXG4gICAgICAgIERPTS5jcmVhdGVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9vbiBjbGljayAoYXR0YWNrKVxyXG4gICAgY29uc3QgcDFBdHRhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgcDJIaXRDb3VudCA9IHAyR2FtZUJvYXJkT2JqLmhpdHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBwMk1pc3NDb3VudCA9IHAyR2FtZUJvYXJkT2JqLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9yZWNpZXZlIGF0dGFjayBjb29yZGluYXRlcyBhbmQgY29uZmlybSBoaXQgb3IgbWlzc1xyXG4gICAgICAgIGF0dGFja0Nvb3JkID0gRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAyR2FtZUJvYXJkT2JqLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgIC8vcmVuZGVyIGhpdHMvbWlzc2VzXHJcbiAgICAgICAgRE9NLmJvYXJkSGl0TWlzcygncDFCb2FyZCcsIHAyR2FtZUJvYXJkT2JqKTtcclxuICAgICAgICBpZiAocDJIaXRDb3VudCAhPT0gcDJHYW1lQm9hcmRPYmouaGl0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9pZiBoaXQsIGNhbGwgY2hlY2tBbGxTdW5rKCkgYW5kIGNoZWNrIGZvciB3aW5uZXIuIElmIG5vdCBhbGwgc2hpcHMgc3VuaywgbmV4dCBwbGF5ZXIgdHVyblxyXG4gICAgICAgICAgICBpZiAocDJHYW1lQm9hcmRPYmouY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lcihwbGF5ZXIxT2JqLm5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcDJUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHAyTWlzc0NvdW50ICE9PSBwMkdhbWVCb2FyZE9iai5taXNzZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vaWYgbWlzcyBhbmQgY2FsbCBuZXh0IHBsYXllcnMgdHVyblxyXG4gICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFueSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIDEsIHVwZGF0ZSBnYW1lIGluc3RydWN0aW9ucyBhbmQgYWN0aXZhdGUgYm9hcmQgMlxyXG4gICAgY29uc3QgcDJUdXJuID0gKCkgPT4ge1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdChgJHtwbGF5ZXIyT2JqLm5hbWV9J3MgdHVybi4gUGljayBhIGdyaWQgdG8gYXR0YWNrIWApO1xyXG4gICAgICAgIERPTS5hY3RpdmVCb2FyZCgncDJCb2FyZCcpO1xyXG4gICAgICAgIERPTS5kZWFjdEJvYXJkKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgRE9NLmNyZWF0ZUV2ZW50TGlzdCgncDJCb2FyZCcsICdjbGljaycsIHAyQXR0YWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9vbiBjbGljayAoYXR0YWNrKVxyXG4gICAgY29uc3QgcDJBdHRhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgcDFIaXRDb3VudCA9IHAxR2FtZUJvYXJkT2JqLmhpdHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBwMU1pc3NDb3VudCA9IHAxR2FtZUJvYXJkT2JqLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9yZWNpZXZlIGF0dGFjayBjb29yZGluYXRlcyBhbmQgY29uZmlybSBoaXQgb3IgbWlzc1xyXG4gICAgICAgIGF0dGFja0Nvb3JkID0gRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAxR2FtZUJvYXJkT2JqLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgIC8vcmVuZGVyIGhpdHMvbWlzc2VzXHJcbiAgICAgICAgRE9NLmJvYXJkSGl0TWlzcygncDJCb2FyZCcsIHAxR2FtZUJvYXJkT2JqKTtcclxuICAgICAgICBpZiAocDFIaXRDb3VudCAhPT0gcDFHYW1lQm9hcmRPYmouaGl0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9pZiBoaXQsIGNhbGwgY2hlY2tBbGxTdW5rKCkgYW5kIGNoZWNrIGZvciB3aW5uZXIuIElmIG5vdCBhbGwgc2hpcHMgc3VuaywgbmV4dCBwbGF5ZXIgdHVyblxyXG4gICAgICAgICAgICBpZiAocDFHYW1lQm9hcmRPYmouY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgICAgICAgICAgICAgIHdpbm5lcihwbGF5ZXIyT2JqLm5hbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcDFUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHAxTWlzc0NvdW50ICE9PSBwMUdhbWVCb2FyZE9iai5taXNzZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vaWYgbWlzcyBhbmQgY2FsbCBuZXh0IHBsYXllcnMgdHVyblxyXG4gICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHdpbm5lciA9IChwbGF5ZXIpID0+IHtcclxuICAgICAgICBET00udGV4dEluc3RydWN0KGAke3BsYXllcn0gaXMgdGhlIHdpbm5lciEhIFRoZXkgaGF2ZSBzdW5rIGFsbCB0aGUgZW5lbXkgc2hpcHMhYCk7XHJcbiAgICAgICAgRE9NLnNob3dTaGlwcygncDJCb2FyZCcsIHAxR2FtZUJvYXJkT2JqKTtcclxuICAgICAgICBET00uc2hvd1NoaXBzKCdwMUJvYXJkJywgcDJHYW1lQm9hcmRPYmopO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDJCb2FyZCcsICdjbGljaycsIHAyQXR0YWNrKTtcclxuICAgICAgICBET00uZGVhY3RCb2FyZCgncDFCb2FyZCcpO1xyXG4gICAgICAgIERPTS5kZWFjdEJvYXJkKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgLy9yZW5kZXIgcmVzdGFydCBidXR0b25cclxuICAgICAgICBET00uYWRkR2FtZUJ0bignUmVzdGFydCcpO1xyXG4gICAgICAgIERPTS5jcmVhdGVFdmVudExpc3QoJ2dhbWVCdXR0b24nLCAnY2xpY2snLCBuZXdHYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzdGFydEdhbWUgPSAoKSA9PiB7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gIHtcclxuICAgICAgICBuZXdHYW1lLFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmdhbWVDb250cm9sbGVyLm5ld0dhbWUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=