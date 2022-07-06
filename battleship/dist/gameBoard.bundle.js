/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
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
        if (checkCoord(startCoord, currShipType, length, direction)) {
            const currShipObj = ships.filter(ship => ship.type == currShipType);
            const shipCoords = returnShipCoords(startCoord, length, direction, currShipType);
            currShipObj[0].addShipCoords(shipCoords);
            return true;
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
    //check coords of current ship do not overlap with other ships
    const checkOverlap = (shipCoords, checkShips) =>  {
        //shipCoords.every(coord => !checkShips.every(ship => !searchCoords(ship.shipCoords, coord)));
        return !checkShips.some(ship => shipCoords.some(coord => searchCoords(ship.shipCoords, coord)));
    };
    //check coords fit on board and do not overlap another placed ship
    const checkCoord = (startCoord, currShipType, length, direction) => {
        const shipCoords = returnShipCoords(startCoord, length, direction, currShipType);
        const checkShips = ships.filter(ship => ship.type !== currShipType);
        if (checkBoardFit(startCoord, length, direction, gridSize) && checkOverlap(shipCoords, checkShips)) {
            return true;
        } else {
            return false;
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
    return { gridSize, carrier, battle, cruiser, submarine, destroyer, misses, receiveAttack, checkAllSunk, placeShip, checkCoord, countHits };
};



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7Ozs7Ozs7VUM1Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsOENBQU87QUFDM0IsbUJBQW1CLDhDQUFPO0FBQzFCLG9CQUFvQiw4Q0FBTztBQUMzQixzQkFBc0IsOENBQU87QUFDN0Isc0JBQXNCLDhDQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrQkFBa0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ3dCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL2dhbWVCb2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBuZXdTaGlwID0gKGxlbmd0aCwgdHlwZSkgPT4ge1xyXG4gICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcclxuICAgIC8vYWRkIGFycmF5IG9mIGNvb3Jkc1xyXG4gICAgY29uc3QgYWRkU2hpcENvb3JkcyA9IChjb29yZEFycikgPT4ge1xyXG4gICAgICAgIGNvb3JkQXJyLmZvckVhY2goY29vcmQgPT4gc2hpcENvb3Jkcy5wdXNoKGNvb3JkKSk7XHJcbiAgICB9O1xyXG4gICAgLy9pbml0aWFsaXNlIGFuZCBwb3B1bGF0ZSBhbiBvYmplY3Qgd2hpY2ggc2hvd3MgYW55IGhpdHMgb24gYSBzaGlwXHJcbiAgICBjb25zdCBoaXRJbmZvID0ge307XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGk7XHJcbiAgICAgICAgaGl0SW5mb1twb3NpdGlvbl0gPSAnb2snO1xyXG4gICAgfVxyXG4gICAgLy91cGRhdGUgaGl0IG9uIGEgc2hpcFxyXG4gICAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XHJcbiAgICAgICAgaGl0SW5mb1tjYWxQb3NpdGlvbihjb29yZCldID0gJ2hpdCc7XHJcbiAgICB9O1xyXG4gICAgLy9tZXRob2QgdG8gY2hlY2sgd2hldGhlciBhIHNoaXAgaXMgc3VuayBieSBjaGVja2luZyB0aGUgaGl0SW5mbyBvYmplY3RcclxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaGl0Q291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChoaXRJbmZvW2ldID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICAgaGl0Q291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhpdENvdW50ID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgaGl0IG9uIHNoaXAgYmFzZWQgb24gdGhlIGhpdCBjb29yZFxyXG4gICAgY29uc3QgY2FsUG9zaXRpb24gPSAoY29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCB4RGlmZiA9IE1hdGguYWJzKHNoaXBDb29yZHNbMF1bMF0gLSBjb29yZFswXSk7XHJcbiAgICAgICAgY29uc3QgeURpZmYgPSBNYXRoLmFicyhzaGlwQ29vcmRzWzBdWzFdIC0gY29vcmRbMV0pO1xyXG4gICAgICAgIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4geURpZmYgKyAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeERpZmYgPiAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4RGlmZiArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGxlbmd0aCwgdHlwZSwgc2hpcENvb3JkcywgaGl0SW5mbywgYWRkU2hpcENvb3JkcywgaGl0LCBpc1N1bmsgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IG5ld1NoaXAgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG5ld1NoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBuZXdHYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgIC8vY3JlYXRlIHNoaXAgb2Jqc1xyXG4gICAgY29uc3QgY2FycmllciA9IG5ld1NoaXAoNSwgJ2NhcnJpZXInKTtcclxuICAgIGNvbnN0IGJhdHRsZSA9IG5ld1NoaXAoNCwgJ2JhdHRsZScpO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IG5ld1NoaXAoMywgJ2NydWlzZXInKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ld1NoaXAoMywgJ3N1Ym1hcmluZScpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3U2hpcCgyLCAnZGVzdHJveWVyJyk7XHJcbiAgICBjb25zdCBzaGlwcyA9IFtjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBjaG9zZW4gY29vcmQgaXMgYSBoaXQgb3IgbWlzcyBhbmQgaXMgYSBuZXdcclxuICAgIGxldCBtaXNzZXMgPSBbXTtcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBsZXQgaGl0SW5kaSA9IGZhbHNlO1xyXG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpIHtcclxuICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGhpdEluZGkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhpdEluZGkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VhcmNoQ29vcmRzKG1pc3NlcywgY29vcmQpKSB7XHJcbiAgICAgICAgICAgICAgICBtaXNzZXMucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9tZXRob2QgdG8gc2VhcmNoIGFuIGFycmF5IG9mIGNvb3JkaW5hdGVzIGZvciBhIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIGNvbnN0IHNlYXJjaENvb3JkcyA9IChjb29yZEFyciwgY29vcmQpID0+IHtcclxuICAgICAgICByZXR1cm4gY29vcmRBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3JkLnRvU3RyaW5nKCkpO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcclxuICAgIGNvbnN0IGNoZWNrQWxsU3VuayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICAgIH07XHJcbiAgICAvL3BsYWNlIHNoaXAgd2l0aCBzdGFydCBjb29yZGluYXRlIGFuZCBkaXJlY3Rpb24sIGNoZWNrcyBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgLy9hbmQgZG9lcyBub3Qgb3ZlcmxhcCB3aXRoIG90aGVyIHNoaXBzIHBsYWNlZFxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHN0YXJ0Q29vcmQsIGN1cnJTaGlwVHlwZSwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoY2hlY2tDb29yZChzdGFydENvb3JkLCBjdXJyU2hpcFR5cGUsIGxlbmd0aCwgZGlyZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyU2hpcE9iaiA9IHNoaXBzLmZpbHRlcihzaGlwID0+IHNoaXAudHlwZSA9PSBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwQ29vcmRzID0gcmV0dXJuU2hpcENvb3JkcyhzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgY3VyclNoaXBUeXBlKTtcclxuICAgICAgICAgICAgY3VyclNoaXBPYmpbMF0uYWRkU2hpcENvb3JkcyhzaGlwQ29vcmRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NoZWNrIHN0YXJ0IGNvb3JkIG9mIHNoaXAgZml0cyBvbiBncmlkXHJcbiAgICBjb25zdCBjaGVja0JvYXJkRml0ID0gKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMF0gKyBsZW5ndGggLSAxKSA8PSBncmlkU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMV0gKyBsZW5ndGggLSAxKSA8PSBncmlkU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayBjb29yZHMgb2YgY3VycmVudCBzaGlwIGRvIG5vdCBvdmVybGFwIHdpdGggb3RoZXIgc2hpcHNcclxuICAgIGNvbnN0IGNoZWNrT3ZlcmxhcCA9IChzaGlwQ29vcmRzLCBjaGVja1NoaXBzKSA9PiAge1xyXG4gICAgICAgIC8vc2hpcENvb3Jkcy5ldmVyeShjb29yZCA9PiAhY2hlY2tTaGlwcy5ldmVyeShzaGlwID0+ICFzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpKTtcclxuICAgICAgICByZXR1cm4gIWNoZWNrU2hpcHMuc29tZShzaGlwID0+IHNoaXBDb29yZHMuc29tZShjb29yZCA9PiBzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpKTtcclxuICAgIH07XHJcbiAgICAvL2NoZWNrIGNvb3JkcyBmaXQgb24gYm9hcmQgYW5kIGRvIG5vdCBvdmVybGFwIGFub3RoZXIgcGxhY2VkIHNoaXBcclxuICAgIGNvbnN0IGNoZWNrQ29vcmQgPSAoc3RhcnRDb29yZCwgY3VyclNoaXBUeXBlLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZXR1cm5TaGlwQ29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrU2hpcHMgPSBzaGlwcy5maWx0ZXIoc2hpcCA9PiBzaGlwLnR5cGUgIT09IGN1cnJTaGlwVHlwZSk7XHJcbiAgICAgICAgaWYgKGNoZWNrQm9hcmRGaXQoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24sIGdyaWRTaXplKSAmJiBjaGVja092ZXJsYXAoc2hpcENvb3JkcywgY2hlY2tTaGlwcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL3JldHVybiBjb29yZGluYXRlcyBvZiB3aG9sZSBzaGlwXHJcbiAgICBjb25zdCByZXR1cm5TaGlwQ29vcmRzID0gKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgbGV0IHNoaXBDb29yZHMgPSBbc3RhcnRDb29yZF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZHM7XHJcbiAgICB9O1xyXG4gICAgLy9jb3VudCB0b3RhbCBhbW91bnQgb2YgaGl0cyBvbiBhIGJvYXJkXHJcbiAgICBjb25zdCBjb3VudEhpdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hpcC5oaXRJbmZvW2ldID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGdyaWRTaXplLCBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyLCBtaXNzZXMsIHJlY2VpdmVBdHRhY2ssIGNoZWNrQWxsU3VuaywgcGxhY2VTaGlwLCBjaGVja0Nvb3JkLCBjb3VudEhpdHMgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IG5ld0dhbWVCb2FyZCB9O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=