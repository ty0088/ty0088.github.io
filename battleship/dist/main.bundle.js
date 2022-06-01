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
/* harmony export */   "createDOMBoard": () => (/* binding */ createDOMBoard)
/* harmony export */ });
//create game grids on page
const createDOMBoard = () => {
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


const checkCoords = (startCoord, length, direction) => {
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

const returnCoords = (length, startCoord, direction) => {
    //return coordinates of whole ship
    if (checkCoords(startCoord, length, direction)) {
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
    const carrier = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(5, returnCoords(5, startCoord, direction));
    [startCoord, direction] = startCoordArr[1];
    const battle = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(4, returnCoords(4, startCoord, direction));
    [startCoord, direction] = startCoordArr[2];
    const cruiser = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(3, returnCoords(3, startCoord, direction));
    [startCoord, direction] = startCoordArr[3];
    const submarine = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(3, returnCoords(3, startCoord, direction));
    [startCoord, direction] = startCoordArr[4];
    const destroyer = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(2, returnCoords(2, startCoord, direction));
    //initialise hits and misses arrays
    const hits = [];
    const misses = [];
    //recieve attack method. If coords hit then mark appropriate ship hitInfo and update hit array.
    //if miss then update miss array
    const receiveAttack = (coords) => {
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
        (0,_DOM_js__WEBPACK_IMPORTED_MODULE_2__.createDOMBoard)();
        player1Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Player1', 'human');
        player2Obj = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Computer', 'computer');
        const p1StartCoordArr = [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]; //create method to recieve start coords based on user input or if computer
        const p2StartCoordArr = [[[5,10], 'X'], [[3,5], 'X'], [[2,7], 'Y'], [[8,1], 'X'], [[9,8], 'X']];
        p1GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player1Obj.name, p1StartCoordArr);
        p2GameBoardObj = (0,_gameBoard_js__WEBPACK_IMPORTED_MODULE_1__.createGameBoard)(player2Obj.name, p2StartCoordArr);
        
    };

    return  {
        newGame,
    };
})();

gameController.newGame();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7O0FDTnVDO0FBQ1U7QUFDSTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1REFBYztBQUN0QixxQkFBcUIsc0RBQVk7QUFDakMscUJBQXFCLHNEQUFZO0FBQ2pDLHdHQUF3RztBQUN4RztBQUNBLHlCQUF5Qiw4REFBZTtBQUN4Qyx5QkFBeUIsOERBQWU7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EseUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL2NyZWF0ZSBnYW1lIGdyaWRzIG9uIHBhZ2VcclxuY29uc3QgY3JlYXRlRE9NQm9hcmQgPSAoKSA9PiB7XHJcbiAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAxR3JpZFxyXG4gICAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgIH1cclxuICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDJHcmlkXHJcbiAgICBjb25zdCBwMkdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDJCb2FyZCcpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICBwMkdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgfVxyXG4gICAgLy9hZGQgY29vcmRpbmF0ZSBhdHRyaWJ1dGUgdG8gZWFjaCBzcGFuXHJcbiAgICBjb25zdCBwMUJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AxQm9hcmQ+c3BhbicpO1xyXG4gICAgY29uc3QgcDJCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMkJvYXJkPnNwYW4nKTtcclxuICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICBwMUJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgcDJCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vc2hvd3Mgc2hpcHMgb24gZ2FtZSBib2FyZHMgb24gcGFnZSwgcG9zc2libHkgbm90ICByZXF1aXJlZCEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgIC8vY29sbGVjdCBhbGwgc2hpcCBjb29yZGluYXRlc1xyXG4gICAgbGV0IGNvb3Jkc0FyciA9IFtdXHJcbiAgICBjb25zdCBzaGlwc0FyciA9IFsnY2FycmllcicsICdiYXR0bGUnLCAnY3J1aXNlcicsICAnc3VibWFyaW5lJywgJ2Rlc3Ryb3llciddO1xyXG4gICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgZ2FtZUJvYXJkT2JqW3NoaXBdLnNoaXBDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHNBcnIucHVzaChjb29yZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vY29sb3VyIHNoaXAgbG9jYXRpb24gYnkgYWRkaW5nIGNzcyBjbGFzc1xyXG4gICAgY29vcmRzQXJyLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyaW5nID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0+W2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnQmxhY2snKTtcclxuICAgIH0pOyBcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZURPTUJvYXJkLCAgfTsiLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xyXG5cclxuY29uc3QgY2hlY2tDb29yZHMgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgIC8vY2hlY2sgc3RhcnQgY29vcmQgaXMgYWNjZXB0YWJsZSBmb3Igc2hpcCBsb2NhdGlvbiBvbiBhIDEweDEwIGdyaWRcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgIGlmICgoc3RhcnRDb29yZFswXSArIGxlbmd0aCAtIDEpIDw9IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICgoc3RhcnRDb29yZFsxXSArIGxlbmd0aCAtIDEpIDw9IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCByZXR1cm5Db29yZHMgPSAobGVuZ3RoLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pID0+IHtcclxuICAgIC8vcmV0dXJuIGNvb3JkaW5hdGVzIG9mIHdob2xlIHNoaXBcclxuICAgIGlmIChjaGVja0Nvb3JkcyhzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbikpIHtcclxuICAgICAgICBsZXQgY29vcmRzQXJyID0gW3N0YXJ0Q29vcmRdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzQXJyLnB1c2goW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHNBcnIucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29vcmRzQXJyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnU2hpcCB3aWxsIG5vdCBmaXQgb24gYm9hcmQsIGNob29zZSBhIG5ldyBsb2NhdGlvbiEnKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaGlwIHdpbGwgbm90IGZpdCBvbiBib2FyZCwgY2hvb3NlIGEgbmV3IGxvY2F0aW9uIVwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHNlYXJjaENvb3JkcyA9IChzZWFyY2hBcnIsIGNvb3JkcykgPT4ge1xyXG4gICAgLy9zZWFyY2ggYXJyYXkgb2YgY29vcmRpbmF0ZXMgZm9yIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIHJldHVybiBzZWFyY2hBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3Jkcy50b1N0cmluZygpKTtcclxufTtcclxuXHJcbmNvbnN0IGNhbFBvc2l0aW9uID0gKHNlYXJjaEFyciwgY29vcmRzKSA9PiB7XHJcbiAgICAvL2NhbGN1bGF0ZSB0aGUgcmVsYXRpdmUgcG9zaXRpb24gb2YgaGl0IG9uIHNoaXBcclxuICAgIGNvbnN0IHhEaWZmID0gTWF0aC5hYnMoc2VhcmNoQXJyWzBdWzBdIC0gY29vcmRzWzBdKTtcclxuICAgIGNvbnN0IHlEaWZmID0gTWF0aC5hYnMoc2VhcmNoQXJyWzBdWzFdIC0gY29vcmRzWzFdKTtcclxuICAgIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA+IDApIHtcclxuICAgICAgICByZXR1cm4geURpZmYgKyAxO1xyXG4gICAgfSBlbHNlIGlmICh4RGlmZiA+IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICByZXR1cm4geERpZmYgKyAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKHBsYXllciwgc3RhcnRDb29yZEFycikgPT4ge1xyXG4gICAgLy9wbGFjZSBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIgYW5kIGRlc3Ryb3llciBzaGlwc1xyXG4gICAgLy9jYXJyU3RhcnQsIGJhdHRTdGFydCwgY3J1aVN0YXJ0LCBkZXN0U3RhcnRcclxuICAgIGxldCBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMF07XHJcbiAgICBjb25zdCBjYXJyaWVyID0gY3JlYXRlU2hpcCg1LCByZXR1cm5Db29yZHMoNSwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMV07XHJcbiAgICBjb25zdCBiYXR0bGUgPSBjcmVhdGVTaGlwKDQsIHJldHVybkNvb3Jkcyg0LCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclsyXTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBjcmVhdGVTaGlwKDMsIHJldHVybkNvb3JkcygzLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclszXTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoMywgcmV0dXJuQ29vcmRzKDMsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzRdO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gY3JlYXRlU2hpcCgyLCByZXR1cm5Db29yZHMoMiwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICAvL2luaXRpYWxpc2UgaGl0cyBhbmQgbWlzc2VzIGFycmF5c1xyXG4gICAgY29uc3QgaGl0cyA9IFtdO1xyXG4gICAgY29uc3QgbWlzc2VzID0gW107XHJcbiAgICAvL3JlY2lldmUgYXR0YWNrIG1ldGhvZC4gSWYgY29vcmRzIGhpdCB0aGVuIG1hcmsgYXBwcm9wcmlhdGUgc2hpcCBoaXRJbmZvIGFuZCB1cGRhdGUgaGl0IGFycmF5LlxyXG4gICAgLy9pZiBtaXNzIHRoZW4gdXBkYXRlIG1pc3MgYXJyYXlcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XHJcbiAgICAgICAgaWYgKHNlYXJjaENvb3JkcyhjYXJyaWVyLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKGNhcnJpZXIuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgY2Fycmllci5oaXQoaGl0UG9zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhiYXR0bGUuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oYmF0dGxlLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIGJhdHRsZS5oaXQoaGl0UG9zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhjcnVpc2VyLnNoaXBDb29yZHMsIGNvb3JkcykpIHtcclxuICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKGNydWlzZXIuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgY3J1aXNlci5oaXQoaGl0UG9zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhzdWJtYXJpbmUuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oc3VibWFyaW5lLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIHN1Ym1hcmluZS5oaXQoaGl0UG9zKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhkZXN0cm95ZXIuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgY29uc3QgaGl0UG9zID0gY2FsUG9zaXRpb24oZGVzdHJveWVyLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIGRlc3Ryb3llci5oaXQoaGl0UG9zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtaXNzZXMucHVzaChjb29yZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NoZWNrIHdoZXRoZXIgYWxsIG9mIHRoZSBzaGlwcyBoYXZlIGJlZW4gc3VuayBtZXRob2RcclxuICAgIGNvbnN0IGNoZWNrQWxsU3VuayA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIWNhcnJpZXIuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWJhdHRsZS5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghY3J1aXNlci5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghc3VibWFyaW5lLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFkZXN0cm95ZXIuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4geyBwbGF5ZXIsIGNhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIGhpdHMsIG1pc3NlcywgcmVjZWl2ZUF0dGFjaywgY2hlY2tBbGxTdW5rIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBjcmVhdGVHYW1lQm9hcmQgfTsiLCJjb25zdCBjcmVhdGVQbGF5ZXIgPSAobmFtZSwgdHlwZSkgPT4ge1xyXG4gICAgaWYgKHR5cGUgPT09ICdodW1hbicpIHtcclxuICAgICAgICByZXR1cm4ge25hbWUsIHR5cGV9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29tcHV0ZXInKSB7XHJcbiAgICAgICAgLy9jb21wdXRlciBzaGlwIHBsYWNpbmcgbG9naWNcclxuICAgICAgICBjb25zdCBjb21wU2hpcENvb3JkcyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY29tcHV0ZXIgZ2FtZSBsb2dpY1xyXG4gICAgICAgIGNvbnN0IGdhbWVMb2dpYyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZSwgY29tcFNoaXBDb29yZHMsIGdhbWVMb2dpY307XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVBsYXllcjsiLCJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCwgc2hpcENvb3JkcykgPT4ge1xyXG4gICAgY29uc3QgaGl0SW5mbyA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBpO1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ29rJztcclxuICAgIH1cclxuICAgIGNvbnN0IGhpdCA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ2hpdCc7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGhpdEluZm9baV0gPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRDb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGxlbmd0aCwgc2hpcENvb3JkcywgaGl0SW5mbywgaGl0LCBpc1N1bmsgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVQbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUdhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZC5qc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVET01Cb2FyZCwgc2hvd1NoaXBzIH0gZnJvbSBcIi4vRE9NLmpzXCI7XHJcblxyXG5jb25zdCBnYW1lQ29udHJvbGxlciA9ICgoKSA9PiB7XHJcbiAgICBsZXQgcGxheWVyMU9iaiA9IHt9O1xyXG4gICAgbGV0IHBsYXllcjJPYmogID0ge307XHJcbiAgICBsZXQgcDFHYW1lQm9hcmRPYmogPSB7fTtcclxuICAgIGxldCBwMkdhbWVCb2FyZE9iaiA9IHt9O1xyXG5cclxuICAgIGNvbnN0IG5ld0dhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgY3JlYXRlRE9NQm9hcmQoKTtcclxuICAgICAgICBwbGF5ZXIxT2JqID0gY3JlYXRlUGxheWVyKCdQbGF5ZXIxJywgJ2h1bWFuJyk7XHJcbiAgICAgICAgcGxheWVyMk9iaiA9IGNyZWF0ZVBsYXllcignQ29tcHV0ZXInLCAnY29tcHV0ZXInKTtcclxuICAgICAgICBjb25zdCBwMVN0YXJ0Q29vcmRBcnIgPSBbW1s2LDRdLCAnWSddLCBbWzEsMV0sICdYJ10sIFtbMiw2XSwgJ1knXSwgW1s0LDZdLCAnWSddLCBbWzksNl0sICdYJ11dOyAvL2NyZWF0ZSBtZXRob2QgdG8gcmVjaWV2ZSBzdGFydCBjb29yZHMgYmFzZWQgb24gdXNlciBpbnB1dCBvciBpZiBjb21wdXRlclxyXG4gICAgICAgIGNvbnN0IHAyU3RhcnRDb29yZEFyciA9IFtbWzUsMTBdLCAnWCddLCBbWzMsNV0sICdYJ10sIFtbMiw3XSwgJ1knXSwgW1s4LDFdLCAnWCddLCBbWzksOF0sICdYJ11dO1xyXG4gICAgICAgIHAxR2FtZUJvYXJkT2JqID0gY3JlYXRlR2FtZUJvYXJkKHBsYXllcjFPYmoubmFtZSwgcDFTdGFydENvb3JkQXJyKTtcclxuICAgICAgICBwMkdhbWVCb2FyZE9iaiA9IGNyZWF0ZUdhbWVCb2FyZChwbGF5ZXIyT2JqLm5hbWUsIHAyU3RhcnRDb29yZEFycik7XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAge1xyXG4gICAgICAgIG5ld0dhbWUsXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZ2FtZUNvbnRyb2xsZXIubmV3R2FtZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==