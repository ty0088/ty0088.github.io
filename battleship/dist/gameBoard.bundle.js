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
    const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(5, 'Carrier');
    const battle = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(4, 'Battle');
    const cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'Cruiser');
    const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'Submarine');
    const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(2, 'Destroyer');
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
    return { gridSize, ships, carrier, battle, cruiser, submarine, destroyer, misses, receiveAttack, checkAllSunk, placeShip, checkCoord, countHits };
};



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixhQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7Ozs7Ozs7VUM1Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsOENBQU87QUFDM0IsbUJBQW1CLDhDQUFPO0FBQzFCLG9CQUFvQiw4Q0FBTztBQUMzQixzQkFBc0IsOENBQU87QUFDN0Isc0JBQXNCLDhDQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUN3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbmV3U2hpcCA9IChsZW5ndGgsIHR5cGUpID0+IHtcclxuICAgIGxldCBzaGlwQ29vcmRzID0gW107XHJcbiAgICAvL2FkZCBhcnJheSBvZiBjb29yZHNcclxuICAgIGNvbnN0IGFkZFNoaXBDb29yZHMgPSAoY29vcmRBcnIpID0+IHtcclxuICAgICAgICBjb29yZEFyci5mb3JFYWNoKGNvb3JkID0+IHNoaXBDb29yZHMucHVzaChjb29yZCkpO1xyXG4gICAgfTtcclxuICAgIC8vaW5pdGlhbGlzZSBhbmQgcG9wdWxhdGUgYW4gb2JqZWN0IHdoaWNoIHNob3dzIGFueSBoaXRzIG9uIGEgc2hpcFxyXG4gICAgY29uc3QgaGl0SW5mbyA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBpO1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ29rJztcclxuICAgIH1cclxuICAgIC8vdXBkYXRlIGhpdCBvbiBhIHNoaXBcclxuICAgIGNvbnN0IGhpdCA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGhpdEluZm9bY2FsUG9zaXRpb24oY29vcmQpXSA9ICdoaXQnO1xyXG4gICAgfTtcclxuICAgIC8vbWV0aG9kIHRvIGNoZWNrIHdoZXRoZXIgYSBzaGlwIGlzIHN1bmsgYnkgY2hlY2tpbmcgdGhlIGhpdEluZm8gb2JqZWN0XHJcbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhpdENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgIGhpdENvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIGhpdCBvbiBzaGlwIGJhc2VkIG9uIHRoZSBoaXQgY29vcmRcclxuICAgIGNvbnN0IGNhbFBvc2l0aW9uID0gKGNvb3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeERpZmYgPSBNYXRoLmFicyhzaGlwQ29vcmRzWzBdWzBdIC0gY29vcmRbMF0pO1xyXG4gICAgICAgIGNvbnN0IHlEaWZmID0gTWF0aC5hYnMoc2hpcENvb3Jkc1swXVsxXSAtIGNvb3JkWzFdKTtcclxuICAgICAgICBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlEaWZmICsgMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHhEaWZmID4gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4geERpZmYgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4geyBsZW5ndGgsIHR5cGUsIHNoaXBDb29yZHMsIGhpdEluZm8sIGFkZFNoaXBDb29yZHMsIGhpdCwgaXNTdW5rIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBuZXdTaGlwIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZXdTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY29uc3QgbmV3R2FtZUJvYXJkID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAvL2NyZWF0ZSBzaGlwIG9ianNcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBuZXdTaGlwKDUsICdDYXJyaWVyJyk7XHJcbiAgICBjb25zdCBiYXR0bGUgPSBuZXdTaGlwKDQsICdCYXR0bGUnKTtcclxuICAgIGNvbnN0IGNydWlzZXIgPSBuZXdTaGlwKDMsICdDcnVpc2VyJyk7XHJcbiAgICBjb25zdCBzdWJtYXJpbmUgPSBuZXdTaGlwKDMsICdTdWJtYXJpbmUnKTtcclxuICAgIGNvbnN0IGRlc3Ryb3llciA9IG5ld1NoaXAoMiwgJ0Rlc3Ryb3llcicpO1xyXG4gICAgY29uc3Qgc2hpcHMgPSBbY2FycmllciwgYmF0dGxlLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llcl07XHJcbiAgICAvL2NoZWNrIHdoZXRoZXIgY2hvc2VuIGNvb3JkIGlzIGEgaGl0IG9yIG1pc3MgYW5kIGlzIGEgbmV3XHJcbiAgICBsZXQgbWlzc2VzID0gW107XHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkKSA9PiB7XHJcbiAgICAgICAgbGV0IGhpdEluZGkgPSBmYWxzZTtcclxuICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoQ29vcmRzKHNoaXAuc2hpcENvb3JkcywgY29vcmQpKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwLmhpdChjb29yZCk7XHJcbiAgICAgICAgICAgICAgICBoaXRJbmRpID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChoaXRJbmRpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBpZiAoIXNlYXJjaENvb3JkcyhtaXNzZXMsIGNvb3JkKSkge1xyXG4gICAgICAgICAgICAgICAgbWlzc2VzLnB1c2goY29vcmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vbWV0aG9kIHRvIHNlYXJjaCBhbiBhcnJheSBvZiBjb29yZGluYXRlcyBmb3IgYSBzcGVjaWZpYyBjb29yZGluYXRlXHJcbiAgICBjb25zdCBzZWFyY2hDb29yZHMgPSAoY29vcmRBcnIsIGNvb3JkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvb3JkQXJyLnNvbWUoYXJyID0+IGFyci50b1N0cmluZygpID09PSBjb29yZC50b1N0cmluZygpKTtcclxuICAgIH07XHJcbiAgICAvL2NoZWNrIHdoZXRoZXIgYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rXHJcbiAgICBjb25zdCBjaGVja0FsbFN1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgICB9O1xyXG4gICAgLy9wbGFjZSBzaGlwIHdpdGggc3RhcnQgY29vcmRpbmF0ZSBhbmQgZGlyZWN0aW9uLCBjaGVja3Mgc2hpcCBmaXRzIG9uIGdyaWRcclxuICAgIC8vYW5kIGRvZXMgbm90IG92ZXJsYXAgd2l0aCBvdGhlciBzaGlwcyBwbGFjZWRcclxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzdGFydENvb3JkLCBjdXJyU2hpcFR5cGUsIGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKGNoZWNrQ29vcmQoc3RhcnRDb29yZCwgY3VyclNoaXBUeXBlLCBsZW5ndGgsIGRpcmVjdGlvbikpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VyclNoaXBPYmogPSBzaGlwcy5maWx0ZXIoc2hpcCA9PiBzaGlwLnR5cGUgPT0gY3VyclNoaXBUeXBlKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcENvb3JkcyA9IHJldHVyblNoaXBDb29yZHMoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24sIGN1cnJTaGlwVHlwZSk7XHJcbiAgICAgICAgICAgIGN1cnJTaGlwT2JqWzBdLmFkZFNoaXBDb29yZHMoc2hpcENvb3Jkcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayBzdGFydCBjb29yZCBvZiBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgY29uc3QgY2hlY2tCb2FyZEZpdCA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzBdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzFdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgY29vcmRzIG9mIGN1cnJlbnQgc2hpcCBkbyBub3Qgb3ZlcmxhcCB3aXRoIG90aGVyIHNoaXBzXHJcbiAgICBjb25zdCBjaGVja092ZXJsYXAgPSAoc2hpcENvb3JkcywgY2hlY2tTaGlwcykgPT4gIHtcclxuICAgICAgICByZXR1cm4gIWNoZWNrU2hpcHMuc29tZShzaGlwID0+IHNoaXBDb29yZHMuc29tZShjb29yZCA9PiBzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpKTtcclxuICAgIH07XHJcbiAgICAvL2NoZWNrIGNvb3JkcyBmaXQgb24gYm9hcmQgYW5kIGRvIG5vdCBvdmVybGFwIGFub3RoZXIgcGxhY2VkIHNoaXBcclxuICAgIGNvbnN0IGNoZWNrQ29vcmQgPSAoc3RhcnRDb29yZCwgY3VyclNoaXBUeXBlLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZXR1cm5TaGlwQ29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrU2hpcHMgPSBzaGlwcy5maWx0ZXIoc2hpcCA9PiBzaGlwLnR5cGUgIT09IGN1cnJTaGlwVHlwZSk7XHJcbiAgICAgICAgaWYgKGNoZWNrQm9hcmRGaXQoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24sIGdyaWRTaXplKSAmJiBjaGVja092ZXJsYXAoc2hpcENvb3JkcywgY2hlY2tTaGlwcykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL3JldHVybiBjb29yZGluYXRlcyBvZiB3aG9sZSBzaGlwXHJcbiAgICBjb25zdCByZXR1cm5TaGlwQ29vcmRzID0gKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgbGV0IHNoaXBDb29yZHMgPSBbc3RhcnRDb29yZF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaGlwQ29vcmRzLnB1c2goW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZHM7XHJcbiAgICB9O1xyXG4gICAgLy9jb3VudCB0b3RhbCBhbW91bnQgb2YgaGl0cyBvbiBhIGJvYXJkXHJcbiAgICBjb25zdCBjb3VudEhpdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hpcC5oaXRJbmZvW2ldID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGdyaWRTaXplLCBzaGlwcywgY2FycmllciwgYmF0dGxlLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgbWlzc2VzLCByZWNlaXZlQXR0YWNrLCBjaGVja0FsbFN1bmssIHBsYWNlU2hpcCwgY2hlY2tDb29yZCwgY291bnRIaXRzIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBuZXdHYW1lQm9hcmQgfTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9