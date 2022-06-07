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
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOzs7Ozs7O1VDeEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0RBQVU7QUFDOUI7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7QUFDQSxvQkFBb0Isb0RBQVU7QUFDOUI7QUFDQSxzQkFBc0Isb0RBQVU7QUFDaEM7QUFDQSxzQkFBc0Isb0RBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL2dhbWVCb2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCwgc2hpcENvb3JkcykgPT4ge1xyXG4gICAgY29uc3QgaGl0SW5mbyA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBpO1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ29rJztcclxuICAgIH1cclxuICAgIGNvbnN0IGhpdCA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ2hpdCc7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGhpdEluZm9baV0gPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRDb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGxlbmd0aCwgc2hpcENvb3JkcywgaGl0SW5mbywgaGl0LCBpc1N1bmsgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9zaGlwLmpzXCI7XHJcblxyXG5jb25zdCBjaGVja1N0YXJ0Q29vcmRzID0gKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAvL2NoZWNrIHN0YXJ0IGNvb3JkIGlzIGFjY2VwdGFibGUgZm9yIHNoaXAgbG9jYXRpb24gb24gYSAxMHgxMCBncmlkXHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMF0gKyBsZW5ndGggLSAxKSA8PSAxMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMV0gKyBsZW5ndGggLSAxKSA8PSAxMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgcmV0dXJuU2hpcENvb3JkcyA9IChsZW5ndGgsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgLy9yZXR1cm4gY29vcmRpbmF0ZXMgb2Ygd2hvbGUgc2hpcFxyXG4gICAgaWYgKGNoZWNrU3RhcnRDb29yZHMoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pKSB7XHJcbiAgICAgICAgbGV0IGNvb3Jkc0FyciA9IFtzdGFydENvb3JkXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgICAgIGNvb3Jkc0Fyci5wdXNoKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29vcmRzQXJyLnB1c2goW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc0FycjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NoaXAgd2lsbCBub3QgZml0IG9uIGJvYXJkLCBjaG9vc2UgYSBuZXcgbG9jYXRpb24hJyk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2hpcCB3aWxsIG5vdCBmaXQgb24gYm9hcmQsIGNob29zZSBhIG5ldyBsb2NhdGlvbiFcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBzZWFyY2hDb29yZHMgPSAoc2VhcmNoQXJyLCBjb29yZHMpID0+IHtcclxuICAgIC8vc2VhcmNoIGFycmF5IG9mIGNvb3JkaW5hdGVzIGZvciBzcGVjaWZpYyBjb29yZGluYXRlXHJcbiAgICByZXR1cm4gc2VhcmNoQXJyLnNvbWUoYXJyID0+IGFyci50b1N0cmluZygpID09PSBjb29yZHMudG9TdHJpbmcoKSk7XHJcbn07XHJcblxyXG5jb25zdCBjYWxQb3NpdGlvbiA9IChzZWFyY2hBcnIsIGNvb3JkcykgPT4ge1xyXG4gICAgLy9jYWxjdWxhdGUgdGhlIHJlbGF0aXZlIHBvc2l0aW9uIG9mIGhpdCBvbiBzaGlwXHJcbiAgICBjb25zdCB4RGlmZiA9IE1hdGguYWJzKHNlYXJjaEFyclswXVswXSAtIGNvb3Jkc1swXSk7XHJcbiAgICBjb25zdCB5RGlmZiA9IE1hdGguYWJzKHNlYXJjaEFyclswXVsxXSAtIGNvb3Jkc1sxXSk7XHJcbiAgICBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH0gZWxzZSBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHlEaWZmICsgMTtcclxuICAgIH0gZWxzZSBpZiAoeERpZmYgPiAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHhEaWZmICsgMTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9IChwbGF5ZXIsIHN0YXJ0Q29vcmRBcnIpID0+IHtcclxuICAgIC8vcGxhY2UgY2FycmllciwgYmF0dGxlLCBjcnVpc2VyIGFuZCBkZXN0cm95ZXIgc2hpcHNcclxuICAgIC8vY2FyclN0YXJ0LCBiYXR0U3RhcnQsIGNydWlTdGFydCwgZGVzdFN0YXJ0XHJcbiAgICBsZXQgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzBdO1xyXG4gICAgY29uc3QgY2FycmllciA9IGNyZWF0ZVNoaXAoNSwgcmV0dXJuU2hpcENvb3Jkcyg1LCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclsxXTtcclxuICAgIGNvbnN0IGJhdHRsZSA9IGNyZWF0ZVNoaXAoNCwgcmV0dXJuU2hpcENvb3Jkcyg0LCBzdGFydENvb3JkLCBkaXJlY3Rpb24pKTtcclxuICAgIFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclsyXTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBjcmVhdGVTaGlwKDMsIHJldHVyblNoaXBDb29yZHMoMywgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbM107XHJcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBjcmVhdGVTaGlwKDMsIHJldHVyblNoaXBDb29yZHMoMywgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbNF07XHJcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBjcmVhdGVTaGlwKDIsIHJldHVyblNoaXBDb29yZHMoMiwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICAvL2luaXRpYWxpc2UgaGl0cyBhbmQgbWlzc2VzIGFycmF5c1xyXG4gICAgY29uc3QgaGl0cyA9IFtdO1xyXG4gICAgY29uc3QgbWlzc2VzID0gW107XHJcbiAgICAvL3JlY2lldmUgYXR0YWNrIG1ldGhvZC4gSWYgY29vcmRzIGhpdCB0aGVuIG1hcmsgYXBwcm9wcmlhdGUgc2hpcCBoaXRJbmZvIGFuZCB1cGRhdGUgaGl0IGFycmF5LlxyXG4gICAgLy9pZiBtaXNzIHRoZW4gdXBkYXRlIG1pc3MgYXJyYXlcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XHJcbiAgICAgICAgLy9jaGVjayBpZiBjb29yZHMgYWxyZWFkeSBleGlzdCBpbiBoaXRzL21pc3Nlc1xyXG4gICAgICAgIGlmIChzZWFyY2hDb29yZHMoaGl0cywgY29vcmRzKSB8fCBzZWFyY2hDb29yZHMobWlzc2VzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9pZiBjb29yZHMgYXJlbid0IGFscmVhZHkgcmVnaXN0ZXJlZCB0aGVuIGNoZWNrIGZvciBoaXQgb3IgbWlzc1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoQ29vcmRzKGNhcnJpZXIuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihjYXJyaWVyLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjYXJyaWVyLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhiYXR0bGUuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihiYXR0bGUuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGJhdHRsZS5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hDb29yZHMoY3J1aXNlci5zaGlwQ29vcmRzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKGNydWlzZXIuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNydWlzZXIuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoQ29vcmRzKHN1Ym1hcmluZS5zaGlwQ29vcmRzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKHN1Ym1hcmluZS5zaGlwQ29vcmRzLCBjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgc3VibWFyaW5lLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhkZXN0cm95ZXIuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihkZXN0cm95ZXIuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3llci5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayB3aGV0aGVyIGFsbCBvZiB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmsgbWV0aG9kXHJcbiAgICBjb25zdCBjaGVja0FsbFN1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjYXJyaWVyLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFiYXR0bGUuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWNydWlzZXIuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXN1Ym1hcmluZS5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghZGVzdHJveWVyLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgcGxheWVyLCBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyLCBoaXRzLCBtaXNzZXMsIHJlY2VpdmVBdHRhY2ssIGNoZWNrQWxsU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9