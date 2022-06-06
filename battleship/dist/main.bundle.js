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
    for (let i = 0; i < 100; i++) {
        const whiteBox = document.createElement('span');
        whiteBox.classList.add('bgWhite');
        p1Grid.appendChild(whiteBox);
    }
    //create grid lines on p2Grid
    const p2Grid = document.getElementById('p2Board');
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

//shows ships on game boards on page, possibly not  required!------------------------
const showShips = (board, gameBoardObj) => {
    //collect all ship coordinates
    let coordsArr = []
    const shipsArr = ['carrier', 'battle', 'cruiser',  'submarine', 'destroyer'];
    shipsArr.forEach(ship => {
            gameBoardObj[ship].shipCoords.forEach(coord => {
                coordsArr.push(coord);
        });
    });
    //colour ship location by adding css class
    coordsArr.forEach(coord => {
        const coordString = `${coord[0]},${coord[1]}`;
        document.querySelector(`#${board}>[data-coord="${coordString}"]`).classList.add('bgBlack');
    }); 
};

//render a hit or miss on gameboard
const boardHitMiss = (attack, coord, player) => {
    if (attack === 'hit') {

    } else {

    }
};

//render a start button
const addStartBtn = () => {
    const startBtn = document.createElement('span');
    startBtn.id = 'gameButton';
    startBtn.classList.add('link');
    startBtn.innerText = 'Start Game';
    document.getElementById('buttonContainer').appendChild(startBtn);
};

//remove start button
const removeStartBtn = () => {
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

//remove an event listener ------ required?????
const removeEventList =  (elemID, event, func) => {
    const elem = document.getElementById(elemID);
    elem.removeEventListener(event, func);
};

//returns the coords in an array of grid clicked
const clickCoord = (event) => {
    const coordStr = event.target.getAttribute("data-coord");
    console.log(coordStr)
    const coordStrArr = coordStr.split(',');
    let coord = [];
    coord.push(parseInt(coordStrArr[0]));
    coord.push(parseInt(coordStrArr[1]));
    return coord;
};

const activeBoard = (actBoardID, deactBoardID) => {
    const actElem = document.getElementById(actBoardID);
    const deactElem = document.getElementById(deactBoardID);
    actElem.classList.add('link');
    deactElem.classList.remove('link');
};

    return {
        createBoard,
        addStartBtn,
        removeStartBtn,
        textInstruct,
        createEventList,
        removeEventList,
        clickCoord,
        activeBoard
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
        if (!searchCoords(hits, coords) || !searchCoords(misses, coords)) {
            //if coords aren't already registered then check for hit or miss
            console.log('coord hasnt been chosen yet');
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
        } else {
            console.log('coord already picked');
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

    const newGame = () => {
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createBoard();
        player1Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Player1', 'human');
        player2Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer', 'computer');
        //input player ship coordinates, manually inputted for now.
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']];
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[8,1], 'X'], [[9,8], 'X']];
        p1GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player1Obj.name, p1StartCoordArr);
        p2GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player2Obj.name, p2StartCoordArr);
        //render start game button
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.addStartBtn();
        //call mainGameLoop if start button pressed
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.createEventList('gameButton', 'click', gameLoop)
        //remove start button
    };

    const gameLoop = () => {
        _DOM_js__WEBPACK_IMPORTED_MODULE_2__.DOM.removeStartBtn();
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLE9BQU87QUFDNUI7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBLGdFQUFnRSxPQUFPLEdBQUcsT0FBTztBQUNqRixnRUFBZ0UsT0FBTyxHQUFHLE9BQU87QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSwrQkFBK0IsU0FBUyxHQUFHLFNBQVM7QUFDcEQsbUNBQW1DLE1BQU0sZ0JBQWdCLFlBQVk7QUFDckUsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSHVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0EsbUJBQW1CLG9EQUFVO0FBQzdCO0FBQ0Esb0JBQW9CLG9EQUFVO0FBQzlCO0FBQ0Esc0JBQXNCLG9EQUFVO0FBQ2hDO0FBQ0Esc0JBQXNCLG9EQUFVO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzNIQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFlBQVk7Ozs7Ozs7Ozs7Ozs7O0FDaEIzQjtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7Ozs7OztVQ3hCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOdUM7QUFDVTtBQUNsQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvREFBZTtBQUN2QixxQkFBcUIsc0RBQVk7QUFDakMscUJBQXFCLHNEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw4REFBZTtBQUN4Qyx5QkFBeUIsOERBQWU7QUFDeEM7QUFDQSxRQUFRLG9EQUFlO0FBQ3ZCO0FBQ0EsUUFBUSx3REFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NID0gKCgpID0+IHtcclxuXHJcbiAgICAvL2NyZWF0ZSBnYW1lIGdyaWRzIG9uIHBhZ2VcclxuY29uc3QgY3JlYXRlQm9hcmQgPSAoKSA9PiB7XHJcbiAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAxR3JpZFxyXG4gICAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgIH1cclxuICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDJHcmlkXHJcbiAgICBjb25zdCBwMkdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDJCb2FyZCcpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICBwMkdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgfVxyXG4gICAgLy9hZGQgY29vcmRpbmF0ZSBhdHRyaWJ1dGUgdG8gZWFjaCBzcGFuXHJcbiAgICBjb25zdCBwMUJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AxQm9hcmQ+c3BhbicpO1xyXG4gICAgY29uc3QgcDJCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMkJvYXJkPnNwYW4nKTtcclxuICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICBwMUJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgcDJCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vc2hvd3Mgc2hpcHMgb24gZ2FtZSBib2FyZHMgb24gcGFnZSwgcG9zc2libHkgbm90ICByZXF1aXJlZCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgIC8vY29sbGVjdCBhbGwgc2hpcCBjb29yZGluYXRlc1xyXG4gICAgbGV0IGNvb3Jkc0FyciA9IFtdXHJcbiAgICBjb25zdCBzaGlwc0FyciA9IFsnY2FycmllcicsICdiYXR0bGUnLCAnY3J1aXNlcicsICAnc3VibWFyaW5lJywgJ2Rlc3Ryb3llciddO1xyXG4gICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgZ2FtZUJvYXJkT2JqW3NoaXBdLnNoaXBDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHNBcnIucHVzaChjb29yZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vY29sb3VyIHNoaXAgbG9jYXRpb24gYnkgYWRkaW5nIGNzcyBjbGFzc1xyXG4gICAgY29vcmRzQXJyLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyaW5nID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0+W2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnQmxhY2snKTtcclxuICAgIH0pOyBcclxufTtcclxuXHJcbi8vcmVuZGVyIGEgaGl0IG9yIG1pc3Mgb24gZ2FtZWJvYXJkXHJcbmNvbnN0IGJvYXJkSGl0TWlzcyA9IChhdHRhY2ssIGNvb3JkLCBwbGF5ZXIpID0+IHtcclxuICAgIGlmIChhdHRhY2sgPT09ICdoaXQnKSB7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICB9XHJcbn07XHJcblxyXG4vL3JlbmRlciBhIHN0YXJ0IGJ1dHRvblxyXG5jb25zdCBhZGRTdGFydEJ0biA9ICgpID0+IHtcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgc3RhcnRCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICBzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICBzdGFydEJ0bi5pbm5lclRleHQgPSAnU3RhcnQgR2FtZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQoc3RhcnRCdG4pO1xyXG59O1xyXG5cclxuLy9yZW1vdmUgc3RhcnQgYnV0dG9uXHJcbmNvbnN0IHJlbW92ZVN0YXJ0QnRuID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCdXR0b24nKS5yZW1vdmUoKTtcclxufTtcclxuXHJcblxyXG4vL3JlbmRlciB0ZXh0IGluc3RydWN0aW9uc1xyXG5jb25zdCB0ZXh0SW5zdHJ1Y3QgPSAodGV4dCkgPT4ge1xyXG4gICAgY29uc3QgaW5zdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb25zJyk7XHJcbiAgICBpbnN0RWxlbS5pbm5lclRleHQgPSAnJztcclxuICAgIGluc3RFbGVtLmlubmVyVGV4dCA9IHRleHQ7XHJcbn07XHJcblxyXG4vL2NyZWF0ZSBhbiBldmVudCBsaXN0ZW5lclxyXG5jb25zdCBjcmVhdGVFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JRCk7XHJcbiAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG59O1xyXG5cclxuLy9yZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgLS0tLS0tIHJlcXVpcmVkPz8/Pz9cclxuY29uc3QgcmVtb3ZlRXZlbnRMaXN0ID0gIChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbn07XHJcblxyXG4vL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuY29uc3QgY2xpY2tDb29yZCA9IChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgY29vcmRTdHIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZFwiKTtcclxuICAgIGNvbnNvbGUubG9nKGNvb3JkU3RyKVxyXG4gICAgY29uc3QgY29vcmRTdHJBcnIgPSBjb29yZFN0ci5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IGNvb3JkID0gW107XHJcbiAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzFdKSk7XHJcbiAgICByZXR1cm4gY29vcmQ7XHJcbn07XHJcblxyXG5jb25zdCBhY3RpdmVCb2FyZCA9IChhY3RCb2FyZElELCBkZWFjdEJvYXJkSUQpID0+IHtcclxuICAgIGNvbnN0IGFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RCb2FyZElEKTtcclxuICAgIGNvbnN0IGRlYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlYWN0Qm9hcmRJRCk7XHJcbiAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIGRlYWN0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbn07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVCb2FyZCxcclxuICAgICAgICBhZGRTdGFydEJ0bixcclxuICAgICAgICByZW1vdmVTdGFydEJ0bixcclxuICAgICAgICB0ZXh0SW5zdHJ1Y3QsXHJcbiAgICAgICAgY3JlYXRlRXZlbnRMaXN0LFxyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdCxcclxuICAgICAgICBjbGlja0Nvb3JkLFxyXG4gICAgICAgIGFjdGl2ZUJvYXJkXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgRE9NIH07IiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcclxuXHJcbmNvbnN0IGNoZWNrU3RhcnRDb29yZHMgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgIC8vY2hlY2sgc3RhcnQgY29vcmQgaXMgYWNjZXB0YWJsZSBmb3Igc2hpcCBsb2NhdGlvbiBvbiBhIDEweDEwIGdyaWRcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgIGlmICgoc3RhcnRDb29yZFswXSArIGxlbmd0aCAtIDEpIDw9IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICgoc3RhcnRDb29yZFsxXSArIGxlbmd0aCAtIDEpIDw9IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCByZXR1cm5TaGlwQ29vcmRzID0gKGxlbmd0aCwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAvL3JldHVybiBjb29yZGluYXRlcyBvZiB3aG9sZSBzaGlwXHJcbiAgICBpZiAoY2hlY2tTdGFydENvb3JkcyhzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbikpIHtcclxuICAgICAgICBsZXQgY29vcmRzQXJyID0gW3N0YXJ0Q29vcmRdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzQXJyLnB1c2goW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHNBcnIucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29vcmRzQXJyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnU2hpcCB3aWxsIG5vdCBmaXQgb24gYm9hcmQsIGNob29zZSBhIG5ldyBsb2NhdGlvbiEnKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIHdpbGwgbm90IGZpdCBvbiBib2FyZCwgY2hvb3NlIGEgbmV3IGxvY2F0aW9uIVwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHNlYXJjaENvb3JkcyA9IChzZWFyY2hBcnIsIGNvb3JkcykgPT4ge1xyXG4gICAgLy9zZWFyY2ggYXJyYXkgb2YgY29vcmRpbmF0ZXMgZm9yIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIHJldHVybiBzZWFyY2hBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKTtcclxufTtcclxuXHJcbmNvbnN0IGNhbFBvc2l0aW9uID0gKHNlYXJjaEFyciwgY29vcmRzKSA9PiB7XHJcbiAgICAvL2NhbGN1bGF0ZSB0aGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgaGl0IG9uIHNoaXBcclxuICAgIGNvbnN0IHhEaWZmID0gTWF0aC5hYnMoc2VhcmNoQXJyWzBdWzBdIC0gY29vcmRzWzBdKTtcclxuICAgIGNvbnN0IHlEaWZmID0gTWF0aC5hYnMoc2VhcmNoQXJyWzBdWzFdIC0gY29vcmRzWzFdKTtcclxuICAgIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA+IDApIHtcclxuICAgICAgICByZXR1cm4geURpZmYgKyAxO1xyXG4gICAgfSBlbHNlIGlmICh4RGlmZiA+IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICByZXR1cm4geERpZmYgKyAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKHBsYXllciwgc3RhcnRDb29yZEFycikgPT4ge1xyXG4gICAgLy9wbGFjZSBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIgYW5kIGRlc3Ryb3llciBzaGlwc1xyXG4gICAgLy9jYXJyU3RhcnQsIGJhdHRTdGFydCwgY3J1aVN0YXJ0LCBkZXN0U3RhcnRcclxuICAgIGxldCBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMF07XHJcbiAgICBjb25zdCBjYXJyaWVyID0gY3JlYXRlU2hpcCg1LCByZXR1cm5TaGlwQ29vcmRzKDUsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzFdO1xyXG4gICAgY29uc3QgYmF0dGxlID0gY3JlYXRlU2hpcCg0LCByZXR1cm5TaGlwQ29vcmRzKDQsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzJdO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IGNyZWF0ZVNoaXAoMywgcmV0dXJuU2hpcENvb3JkcygzLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclszXTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgcmV0dXJuU2hpcENvb3JkcygzLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFycls0XTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoMiwgcmV0dXJuU2hpcENvb3JkcygyLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIC8vaW5pdGlhbGlzZSBoaXRzIGFuZCBtaXNzZXMgYXJyYXlzXHJcbiAgICBjb25zdCBoaXRzID0gW107XHJcbiAgICBjb25zdCBtaXNzZXMgPSBbXTtcclxuICAgIC8vcmVjaWV2ZSBhdHRhY2sgbWV0aG9kLiBJZiBjb29yZHMgaGl0IHRoZW4gbWFyayBhcHByb3ByaWF0ZSBzaGlwIGhpdEluZm8gYW5kIHVwZGF0ZSBoaXQgYXJyYXkuXHJcbiAgICAvL2lmIG1pc3MgdGhlbiB1cGRhdGUgbWlzcyBhcnJheVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcclxuICAgICAgICAvL2NoZWNrIGlmIGNvb3JkcyBhbHJlYWR5IGV4aXN0IGluIGhpdHMvbWlzc2VzXHJcbiAgICAgICAgaWYgKCFzZWFyY2hDb29yZHMoaGl0cywgY29vcmRzKSB8fCAhc2VhcmNoQ29vcmRzKG1pc3NlcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAvL2lmIGNvb3JkcyBhcmVuJ3QgYWxyZWFkeSByZWdpc3RlcmVkIHRoZW4gY2hlY2sgZm9yIGhpdCBvciBtaXNzXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb29yZCBoYXNudCBiZWVuIGNob3NlbiB5ZXQnKTtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaENvb3JkcyhjYXJyaWVyLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oY2Fycmllci5zaGlwQ29vcmRzLCBjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY2Fycmllci5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hDb29yZHMoYmF0dGxlLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oYmF0dGxlLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBiYXR0bGUuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoQ29vcmRzKGNydWlzZXIuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihjcnVpc2VyLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjcnVpc2VyLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhzdWJtYXJpbmUuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihzdWJtYXJpbmUuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIHN1Ym1hcmluZS5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hDb29yZHMoZGVzdHJveWVyLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgICAgIGhpdHMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oZGVzdHJveWVyLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBkZXN0cm95ZXIuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtaXNzZXMucHVzaChjb29yZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvb3JkIGFscmVhZHkgcGlja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBhbGwgb2YgdGhlIHNoaXBzIGhhdmUgYmVlbiBzdW5rIG1ldGhvZFxyXG4gICAgY29uc3QgY2hlY2tBbGxTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghY2Fycmllci5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghYmF0dGxlLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFjcnVpc2VyLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFzdWJtYXJpbmUuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWRlc3Ryb3llci5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7IHBsYXllciwgY2FycmllciwgYmF0dGxlLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgaGl0cywgbWlzc2VzLCByZWNlaXZlQXR0YWNrLCBjaGVja0FsbFN1bmsgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCB9OyIsImNvbnN0IGNyZWF0ZVBsYXllciA9IChuYW1lLCB0eXBlKSA9PiB7XHJcbiAgICBpZiAodHlwZSA9PT0gJ2h1bWFuJykge1xyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZX07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAvL2NvbXB1dGVyIHNoaXAgcGxhY2luZyBsb2dpY1xyXG4gICAgICAgIGNvbnN0IGNvbXBTaGlwQ29vcmRzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb21wdXRlciBnYW1lIGxvZ2ljXHJcbiAgICAgICAgY29uc3QgZ2FtZUxvZ2ljID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtuYW1lLCB0eXBlLCBjb21wU2hpcENvb3JkcywgZ2FtZUxvZ2ljfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGxheWVyOyIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoLCBzaGlwQ29vcmRzKSA9PiB7XHJcbiAgICBjb25zdCBoaXRJbmZvID0ge307XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGk7XHJcbiAgICAgICAgaGl0SW5mb1twb3NpdGlvbl0gPSAnb2snO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaGl0ID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgaGl0SW5mb1twb3NpdGlvbl0gPSAnaGl0JztcclxuICAgIH07XHJcbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhpdENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgIGhpdENvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCBzaGlwQ29vcmRzLCBoaXRJbmZvLCBoaXQsIGlzU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZVBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcclxuaW1wb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkLmpzXCI7XHJcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTS5qc1wiO1xyXG5cclxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHBsYXllcjFPYmogPSB7fTtcclxuICAgIGxldCBwbGF5ZXIyT2JqICA9IHt9O1xyXG4gICAgbGV0IHAxR2FtZUJvYXJkT2JqID0ge307XHJcbiAgICBsZXQgcDJHYW1lQm9hcmRPYmogPSB7fTtcclxuXHJcbiAgICBjb25zdCBuZXdHYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIERPTS5jcmVhdGVCb2FyZCgpO1xyXG4gICAgICAgIHBsYXllcjFPYmogPSBjcmVhdGVQbGF5ZXIoJ1BsYXllcjEnLCAnaHVtYW4nKTtcclxuICAgICAgICBwbGF5ZXIyT2JqID0gY3JlYXRlUGxheWVyKCdDb21wdXRlcicsICdjb21wdXRlcicpO1xyXG4gICAgICAgIC8vaW5wdXQgcGxheWVyIHNoaXAgY29vcmRpbmF0ZXMsIG1hbnVhbGx5IGlucHV0dGVkIGZvciBub3cuXHJcbiAgICAgICAgY29uc3QgcDFTdGFydENvb3JkQXJyID0gW1tbNiw0XSwgJ1knXSwgW1sxLDFdLCAnWCddLCBbWzIsNl0sICdZJ10sIFtbNCw2XSwgJ1knXSwgW1s5LDZdLCAnWCddXTtcclxuICAgICAgICBjb25zdCBwMlN0YXJ0Q29vcmRBcnIgPSBbW1s1LDEwXSwgJ1gnXSwgW1szLDVdLCAnWCddLCBbWzIsN10sICdZJ10sIFtbOCwxXSwgJ1gnXSwgW1s5LDhdLCAnWCddXTtcclxuICAgICAgICBwMUdhbWVCb2FyZE9iaiA9IGNyZWF0ZUdhbWVCb2FyZChwbGF5ZXIxT2JqLm5hbWUsIHAxU3RhcnRDb29yZEFycik7XHJcbiAgICAgICAgcDJHYW1lQm9hcmRPYmogPSBjcmVhdGVHYW1lQm9hcmQocGxheWVyMk9iai5uYW1lLCBwMlN0YXJ0Q29vcmRBcnIpO1xyXG4gICAgICAgIC8vcmVuZGVyIHN0YXJ0IGdhbWUgYnV0dG9uXHJcbiAgICAgICAgRE9NLmFkZFN0YXJ0QnRuKCk7XHJcbiAgICAgICAgLy9jYWxsIG1haW5HYW1lTG9vcCBpZiBzdGFydCBidXR0b24gcHJlc3NlZFxyXG4gICAgICAgIERPTS5jcmVhdGVFdmVudExpc3QoJ2dhbWVCdXR0b24nLCAnY2xpY2snLCBnYW1lTG9vcClcclxuICAgICAgICAvL3JlbW92ZSBzdGFydCBidXR0b25cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2FtZUxvb3AgPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZVN0YXJ0QnRuKCk7XHJcbiAgICAgICAgLy9ldmVudCBsaXN0ZW5lciBmb3IgbmV4dCBwbGF5ZXIsIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXIgZm9yIG90aGVyIHBsYXllclxyXG4gICAgICAgICAgICAvL3JlY2VpdmVBdHRhY2tcclxuICAgICAgICAgICAgLy9pZiBoaXQsIHVwZGF0ZSBET00sIGNhbGwgaXNTdW5rKClcclxuICAgICAgICAgICAgICAgIC8vaWYgc2hpcHMgc3VuayB0aGVuIGNhbGwgd2lubmVyLCBlbHNlIGNhbGwgbmV4dCBwbGF5ZXIgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICAgICAgLy9pZiBtaXNzLCB1cGRhdGUgRE9NLCBjYWxsIG5leHQgcGxheWVyIGV2ZW50IGxpc3RlbmVyXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAge1xyXG4gICAgICAgIG5ld0dhbWUsXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZ2FtZUNvbnRyb2xsZXIubmV3R2FtZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==