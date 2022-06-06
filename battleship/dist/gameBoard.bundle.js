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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZUJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGFBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOzs7Ozs7O1VDeEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0RBQVU7QUFDOUI7QUFDQSxtQkFBbUIsb0RBQVU7QUFDN0I7QUFDQSxvQkFBb0Isb0RBQVU7QUFDOUI7QUFDQSxzQkFBc0Isb0RBQVU7QUFDaEM7QUFDQSxzQkFBc0Isb0RBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlU2hpcCA9IChsZW5ndGgsIHNoaXBDb29yZHMpID0+IHtcclxuICAgIGNvbnN0IGhpdEluZm8gPSB7fTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gaTtcclxuICAgICAgICBoaXRJbmZvW3Bvc2l0aW9uXSA9ICdvayc7XHJcbiAgICB9XHJcbiAgICBjb25zdCBoaXQgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBoaXRJbmZvW3Bvc2l0aW9uXSA9ICdoaXQnO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaGl0Q291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChoaXRJbmZvW2ldID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICAgaGl0Q291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhpdENvdW50ID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4geyBsZW5ndGgsIHNoaXBDb29yZHMsIGhpdEluZm8sIGhpdCwgaXNTdW5rIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBjcmVhdGVTaGlwIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xyXG5cclxuY29uc3QgY2hlY2tTdGFydENvb3JkcyA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgLy9jaGVjayBzdGFydCBjb29yZCBpcyBhY2NlcHRhYmxlIGZvciBzaGlwIGxvY2F0aW9uIG9uIGEgMTB4MTAgZ3JpZFxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1gnKSB7XHJcbiAgICAgICAgaWYgKChzdGFydENvb3JkWzBdICsgbGVuZ3RoIC0gMSkgPD0gMTApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKChzdGFydENvb3JkWzFdICsgbGVuZ3RoIC0gMSkgPD0gMTApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHJldHVyblNoaXBDb29yZHMgPSAobGVuZ3RoLCBzdGFydENvb3JkLCBkaXJlY3Rpb24pID0+IHtcclxuICAgIC8vcmV0dXJuIGNvb3JkaW5hdGVzIG9mIHdob2xlIHNoaXBcclxuICAgIGlmIChjaGVja1N0YXJ0Q29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uKSkge1xyXG4gICAgICAgIGxldCBjb29yZHNBcnIgPSBbc3RhcnRDb29yZF07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgICAgICBjb29yZHNBcnIucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvb3Jkc0Fyci5wdXNoKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb29yZHNBcnI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTaGlwIHdpbGwgbm90IGZpdCBvbiBib2FyZCwgY2hvb3NlIGEgbmV3IGxvY2F0aW9uIScpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNoaXAgd2lsbCBub3QgZml0IG9uIGJvYXJkLCBjaG9vc2UgYSBuZXcgbG9jYXRpb24hXCIpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3Qgc2VhcmNoQ29vcmRzID0gKHNlYXJjaEFyciwgY29vcmRzKSA9PiB7XHJcbiAgICAvL3NlYXJjaCBhcnJheSBvZiBjb29yZGluYXRlcyBmb3Igc3BlY2lmaWMgY29vcmRpbmF0ZVxyXG4gICAgcmV0dXJuIHNlYXJjaEFyci5zb21lKGFyciA9PiBhcnIudG9TdHJpbmcoKSA9PT0gY29vcmRzLnRvU3RyaW5nKCkpO1xyXG59O1xyXG5cclxuY29uc3QgY2FsUG9zaXRpb24gPSAoc2VhcmNoQXJyLCBjb29yZHMpID0+IHtcclxuICAgIC8vY2FsY3VsYXRlIHRoZSByZWxhdGl2ZSBwb3NpdGlvbiBvZiBoaXQgb24gc2hpcFxyXG4gICAgY29uc3QgeERpZmYgPSBNYXRoLmFicyhzZWFyY2hBcnJbMF1bMF0gLSBjb29yZHNbMF0pO1xyXG4gICAgY29uc3QgeURpZmYgPSBNYXRoLmFicyhzZWFyY2hBcnJbMF1bMV0gLSBjb29yZHNbMV0pO1xyXG4gICAgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2UgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID4gMCkge1xyXG4gICAgICAgIHJldHVybiB5RGlmZiArIDE7XHJcbiAgICB9IGVsc2UgaWYgKHhEaWZmID4gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB4RGlmZiArIDE7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAocGxheWVyLCBzdGFydENvb3JkQXJyKSA9PiB7XHJcbiAgICAvL3BsYWNlIGNhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciBhbmQgZGVzdHJveWVyIHNoaXBzXHJcbiAgICAvL2NhcnJTdGFydCwgYmF0dFN0YXJ0LCBjcnVpU3RhcnQsIGRlc3RTdGFydFxyXG4gICAgbGV0IFtzdGFydENvb3JkLCBkaXJlY3Rpb25dID0gc3RhcnRDb29yZEFyclswXTtcclxuICAgIGNvbnN0IGNhcnJpZXIgPSBjcmVhdGVTaGlwKDUsIHJldHVyblNoaXBDb29yZHMoNSwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMV07XHJcbiAgICBjb25zdCBiYXR0bGUgPSBjcmVhdGVTaGlwKDQsIHJldHVyblNoaXBDb29yZHMoNCwgc3RhcnRDb29yZCwgZGlyZWN0aW9uKSk7XHJcbiAgICBbc3RhcnRDb29yZCwgZGlyZWN0aW9uXSA9IHN0YXJ0Q29vcmRBcnJbMl07XHJcbiAgICBjb25zdCBjcnVpc2VyID0gY3JlYXRlU2hpcCgzLCByZXR1cm5TaGlwQ29vcmRzKDMsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzNdO1xyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgzLCByZXR1cm5TaGlwQ29vcmRzKDMsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgW3N0YXJ0Q29vcmQsIGRpcmVjdGlvbl0gPSBzdGFydENvb3JkQXJyWzRdO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gY3JlYXRlU2hpcCgyLCByZXR1cm5TaGlwQ29vcmRzKDIsIHN0YXJ0Q29vcmQsIGRpcmVjdGlvbikpO1xyXG4gICAgLy9pbml0aWFsaXNlIGhpdHMgYW5kIG1pc3NlcyBhcnJheXNcclxuICAgIGNvbnN0IGhpdHMgPSBbXTtcclxuICAgIGNvbnN0IG1pc3NlcyA9IFtdO1xyXG4gICAgLy9yZWNpZXZlIGF0dGFjayBtZXRob2QuIElmIGNvb3JkcyBoaXQgdGhlbiBtYXJrIGFwcHJvcHJpYXRlIHNoaXAgaGl0SW5mbyBhbmQgdXBkYXRlIGhpdCBhcnJheS5cclxuICAgIC8vaWYgbWlzcyB0aGVuIHVwZGF0ZSBtaXNzIGFycmF5XHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xyXG4gICAgICAgIC8vY2hlY2sgaWYgY29vcmRzIGFscmVhZHkgZXhpc3QgaW4gaGl0cy9taXNzZXNcclxuICAgICAgICBpZiAoIXNlYXJjaENvb3JkcyhoaXRzLCBjb29yZHMpIHx8ICFzZWFyY2hDb29yZHMobWlzc2VzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgIC8vaWYgY29vcmRzIGFyZW4ndCBhbHJlYWR5IHJlZ2lzdGVyZWQgdGhlbiBjaGVjayBmb3IgaGl0IG9yIG1pc3NcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvb3JkIGhhc250IGJlZW4gY2hvc2VuIHlldCcpO1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoQ29vcmRzKGNhcnJpZXIuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihjYXJyaWVyLnNoaXBDb29yZHMsIGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjYXJyaWVyLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhiYXR0bGUuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihiYXR0bGUuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGJhdHRsZS5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWFyY2hDb29yZHMoY3J1aXNlci5zaGlwQ29vcmRzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKGNydWlzZXIuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNydWlzZXIuaGl0KGhpdFBvcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VhcmNoQ29vcmRzKHN1Ym1hcmluZS5zaGlwQ29vcmRzLCBjb29yZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRzLnB1c2goY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhpdFBvcyA9IGNhbFBvc2l0aW9uKHN1Ym1hcmluZS5zaGlwQ29vcmRzLCBjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgc3VibWFyaW5lLmhpdChoaXRQb3MpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNlYXJjaENvb3JkcyhkZXN0cm95ZXIuc2hpcENvb3JkcywgY29vcmRzKSkge1xyXG4gICAgICAgICAgICAgICAgaGl0cy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoaXRQb3MgPSBjYWxQb3NpdGlvbihkZXN0cm95ZXIuc2hpcENvb3JkcywgY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb3llci5oaXQoaGl0UG9zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1pc3Nlcy5wdXNoKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29vcmQgYWxyZWFkeSBwaWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayB3aGV0aGVyIGFsbCBvZiB0aGUgc2hpcHMgaGF2ZSBiZWVuIHN1bmsgbWV0aG9kXHJcbiAgICBjb25zdCBjaGVja0FsbFN1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjYXJyaWVyLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFiYXR0bGUuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIWNydWlzZXIuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXN1Ym1hcmluZS5pc1N1bmsoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmICghZGVzdHJveWVyLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgcGxheWVyLCBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyLCBoaXRzLCBtaXNzZXMsIHJlY2VpdmVBdHRhY2ssIGNoZWNrQWxsU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgY3JlYXRlR2FtZUJvYXJkIH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9