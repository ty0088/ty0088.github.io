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
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");


const log = (text) => {
    console.log(text);
}

const newGameBoard = (gridSize) => {
    let misses = [];
    //create ship objs
    const carrier = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.newShip)(5, 'carrier');
    const battle = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.newShip)(4, 'battle');
    const cruiser = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'cruiser');
    const submarine = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'submarine');
    const destroyer = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.newShip)(2, 'destroyer');
    const ships = [carrier, battle, cruiser, submarine, destroyer];
    //check whether chosen coord is a hit or miss
    const receiveAttack = (coord) => {
        let hitIndi = false;
        ships.forEach(ship => {
            if (searchCoords(ship.shipCoords, coord)) {
                ship.hit(coord);
                hitIndi = true;
            }
        });
        if (hitIndi === false) {
            misses.push(coord);
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
            }
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
    return { carrier, battle, cruiser, submarine, destroyer, misses, receiveAttack, checkAllSunk, placeShip };
};



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7Ozs7Ozs7VUM1Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlEQUFPO0FBQzNCLG1CQUFtQixpREFBTztBQUMxQixvQkFBb0IsaURBQU87QUFDM0Isc0JBQXNCLGlEQUFPO0FBQzdCLHNCQUFzQixpREFBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5ld1NoaXAgPSAobGVuZ3RoLCB0eXBlKSA9PiB7XHJcbiAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xyXG4gICAgLy9hZGQgYXJyYXkgb2YgY29vcmRzXHJcbiAgICBjb25zdCBhZGRTaGlwQ29vcmRzID0gKGNvb3JkQXJyKSA9PiB7XHJcbiAgICAgICAgY29vcmRBcnIuZm9yRWFjaChjb29yZCA9PiBzaGlwQ29vcmRzLnB1c2goY29vcmQpKTtcclxuICAgIH07XHJcbiAgICAvL2luaXRpYWxpc2UgYW5kIHBvcHVsYXRlIGFuIG9iamVjdCB3aGljaCBzaG93cyBhbnkgaGl0cyBvbiBhIHNoaXBcclxuICAgIGNvbnN0IGhpdEluZm8gPSB7fTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gaTtcclxuICAgICAgICBoaXRJbmZvW3Bvc2l0aW9uXSA9ICdvayc7XHJcbiAgICB9XHJcbiAgICAvL3VwZGF0ZSBoaXQgb24gYSBzaGlwXHJcbiAgICBjb25zdCBoaXQgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBoaXRJbmZvW2NhbFBvc2l0aW9uKGNvb3JkKV0gPSAnaGl0JztcclxuICAgIH07XHJcbiAgICAvL21ldGhvZCB0byBjaGVjayB3aGV0aGVyIGEgc2hpcCBpcyBzdW5rIGJ5IGNoZWNraW5nIHRoZSBoaXRJbmZvIG9iamVjdFxyXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGhpdEluZm9baV0gPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRDb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiBoaXQgb24gc2hpcCBiYXNlZCBvbiB0aGUgaGl0IGNvb3JkXHJcbiAgICBjb25zdCBjYWxQb3NpdGlvbiA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhEaWZmID0gTWF0aC5hYnMoc2hpcENvb3Jkc1swXVswXSAtIGNvb3JkWzBdKTtcclxuICAgICAgICBjb25zdCB5RGlmZiA9IE1hdGguYWJzKHNoaXBDb29yZHNbMF1bMV0gLSBjb29yZFsxXSk7XHJcbiAgICAgICAgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5RGlmZiArIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh4RGlmZiA+IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHhEaWZmICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCB0eXBlLCBzaGlwQ29vcmRzLCBoaXRJbmZvLCBhZGRTaGlwQ29vcmRzLCBoaXQsIGlzU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgbmV3U2hpcCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbmV3U2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcclxuXHJcbmNvbnN0IGxvZyA9ICh0ZXh0KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyh0ZXh0KTtcclxufVxyXG5cclxuY29uc3QgbmV3R2FtZUJvYXJkID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICBsZXQgbWlzc2VzID0gW107XHJcbiAgICAvL2NyZWF0ZSBzaGlwIG9ianNcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXdTaGlwKDUsICdjYXJyaWVyJyk7XHJcbiAgICBjb25zdCBiYXR0bGUgPSBuZXdTaGlwKDQsICdiYXR0bGUnKTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBuZXdTaGlwKDMsICdjcnVpc2VyJyk7XHJcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXdTaGlwKDMsICdzdWJtYXJpbmUnKTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ld1NoaXAoMiwgJ2Rlc3Ryb3llcicpO1xyXG4gICAgY29uc3Qgc2hpcHMgPSBbY2FycmllciwgYmF0dGxlLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl07XHJcbiAgICAvL2NoZWNrIHdoZXRoZXIgY2hvc2VuIGNvb3JkIGlzIGEgaGl0IG9yIG1pc3NcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBsZXQgaGl0SW5kaSA9IGZhbHNlO1xyXG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpIHtcclxuICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGhpdEluZGkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhpdEluZGkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIG1pc3Nlcy5wdXNoKGNvb3JkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9tZXRob2QgdG8gc2VhcmNoIGFuIGFycmF5IG9mIGNvb3JkaW5hdGVzIGZvciBhIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIGNvbnN0IHNlYXJjaENvb3JkcyA9IChjb29yZEFyciwgY29vcmQpID0+IHtcclxuICAgICAgICByZXR1cm4gY29vcmRBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3JkLnRvU3RyaW5nKCkpO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcclxuICAgIGNvbnN0IGNoZWNrQWxsU3VuayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICAgIH07XHJcbiAgICAvL3BsYWNlIHNoaXAgd2l0aCBzdGFydCBjb29yZGluYXRlIGFuZCBkaXJlY3Rpb24sIGNoZWNrcyBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgLy9hbmQgZG9lcyBub3Qgb3ZlcmxhcCB3aXRoIG90aGVyIHNoaXBzIHBsYWNlZFxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHN0YXJ0Q29vcmQsIGN1cnJTaGlwVHlwZSwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoY2hlY2tCb2FyZEZpdChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZXR1cm5TaGlwQ29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja1NoaXBzID0gc2hpcHMuZmlsdGVyKHNoaXAgPT4gc2hpcC50eXBlICE9PSBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tPdmVybGFwKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyclNoaXBPYmogPSBzaGlwcy5maWx0ZXIoc2hpcCA9PiBzaGlwLnR5cGUgPT0gY3VyclNoaXBUeXBlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJTaGlwT2JqWzBdLmFkZFNoaXBDb29yZHMoc2hpcENvb3Jkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayBzdGFydCBjb29yZCBvZiBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgY29uc3QgY2hlY2tCb2FyZEZpdCA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzBdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzFdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vcmV0dXJuIGNvb3JkaW5hdGVzIG9mIHdob2xlIHNoaXBcclxuICAgIGNvbnN0IHJldHVyblNoaXBDb29yZHMgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBsZXQgc2hpcENvb3JkcyA9IFtzdGFydENvb3JkXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hpcENvb3JkcztcclxuICAgIH07XHJcbiAgICAvL2NoZWNrIGNvb3JkcyBvZiBjdXJyZW50IHNoaXAgZG8gbm90IG92ZXJsYXAgd2l0aCBvdGhlciBzaGlwc1xyXG4gICAgY29uc3QgY2hlY2tPdmVybGFwID0gKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpID0+ICB7XHJcbiAgICAgICAgLy9zaGlwQ29vcmRzLmV2ZXJ5KGNvb3JkID0+ICFjaGVja1NoaXBzLmV2ZXJ5KHNoaXAgPT4gIXNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkpO1xyXG4gICAgICAgIHJldHVybiAhY2hlY2tTaGlwcy5zb21lKHNoaXAgPT4gc2hpcENvb3Jkcy5zb21lKGNvb3JkID0+IHNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGNhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIG1pc3NlcywgcmVjZWl2ZUF0dGFjaywgY2hlY2tBbGxTdW5rLCBwbGFjZVNoaXAgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IG5ld0dhbWVCb2FyZCB9O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=