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
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixPQUFPO0FBQ2hDO0FBQ0EsNEJBQTRCLFNBQVM7QUFDckM7QUFDQSxvRUFBb0UsT0FBTyxHQUFHLE9BQU87QUFDckYsb0VBQW9FLE9BQU8sR0FBRyxPQUFPO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLFdBQVc7QUFDbkYsd0VBQXdFLFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsU0FBUyxHQUFHLFNBQVM7QUFDaEUsK0NBQStDLE9BQU8saUJBQWlCLFlBQVk7QUFDbkYsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsWUFBWSxHQUFHLFlBQVk7QUFDeEQsb0RBQW9ELE9BQU8saUJBQWlCLFVBQVU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsYUFBYSxHQUFHLGFBQWE7QUFDMUQsb0RBQW9ELE9BQU8saUJBQWlCLFVBQVU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7VUN0SUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ040QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9wbGF5ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NID0gKCgpID0+IHtcclxuICAgIC8vcmVuZGVyIGdhbWUgYm9hcmRzXHJcbiAgICBjb25zdCBuZXdCb2FyZCA9IChwMU9iaiwgcDJPYmopID0+IHtcclxuICAgICAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAxR3JpZFxyXG4gICAgICAgIGNvbnN0IHAxR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgcDFHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMkdyaWRcclxuICAgICAgICBjb25zdCBwMkdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDJCb2FyZCcpO1xyXG4gICAgICAgIHAyR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIHAyR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWRkIGNvb3JkaW5hdGUgYXR0cmlidXRlIHRvIGVhY2ggc3BhblxyXG4gICAgICAgIGNvbnN0IHAxQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDFCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBjb25zdCBwMkJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AyQm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgbGV0IHNwYW5Db3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlDb29yZCAgPSB5O1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICAgICAgcDFCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBwMkJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3JlbmRlciBwbGF5ZXIgbmFtZXMgYmVsb3cgZWFjaCBib2FyZFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwMUJvYXJkICsgLnBsYXllck5hbWUnKS5pbm5lclRleHQgPSBgJHtwMU9iai5uYW1lfSdzIEJvYXJkYDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcDJCb2FyZCArIC5wbGF5ZXJOYW1lJykuaW5uZXJUZXh0ID0gYCR7cDJPYmoubmFtZX0ncyBCb2FyZGA7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgYSBzdGFydCBidXR0b25cclxuICAgIGNvbnN0IGFkZEdhbWVCdG4gPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdhbWVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbkNvbnRhaW5lcicpO1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBnYW1lQnRuLmlkID0gJ2dhbWVCdXR0b24nO1xyXG4gICAgICAgIGdhbWVCdG4uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgICAgIGdhbWVCdG4uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgICAgICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUJ0bik7XHJcbiAgICB9O1xyXG4gICAgLy9yZW1vdmUgc3RhcnQgYnV0dG9uXHJcbiAgICBjb25zdCByZW1vdmVHYW1lQnRuID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQnV0dG9uJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgdGV4dCBpbnN0cnVjdGlvbnNcclxuICAgIGNvbnN0IHRleHRJbnN0cnVjdCA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5zdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb25zJyk7XHJcbiAgICAgICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIH07XHJcbiAgICAvL2NyZWF0ZSBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgY29uc3QgbmV3RXZlbnRMaXN0ID0gKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuICAgIC8vcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCByZW1vdmVFdmVudExpc3QgPSAgKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGFkZExpbmtDbGFzcyA9IChhY3RCb2FyZElELCApID0+IHtcclxuICAgICAgICBjb25zdCBhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWN0Qm9hcmRJRCk7XHJcbiAgICAgICAgYWN0RWxlbS5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVtb3ZlTGlua0NsYXNzID0gKGRlYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlYWN0Qm9hcmRJRCk7XHJcbiAgICAgICAgZGVhY3RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBhbGwgc2hpcHMgb24gYm9hcmRcclxuICAgIGNvbnN0IHNob3dTaGlwcyA9IChib2FyZCwgZ2FtZUJvYXJkT2JqKSA9PiB7XHJcbiAgICAgICAgLy9jb2xsZWN0IGFsbCBzaGlwIGNvb3JkaW5hdGVzIGFuZCBhZGQgYmcgY2xhc3NcclxuICAgICAgICBjb25zdCBzaGlwc0FyciA9IFsnY2FycmllcicsICdiYXR0bGUnLCAnY3J1aXNlcicsICAnc3VibWFyaW5lJywgJ2Rlc3Ryb3llciddO1xyXG4gICAgICAgIHNoaXBzQXJyLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lQm9hcmRPYmpbc2hpcF0uc2hpcENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb29yZHNBcnIucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29vcmRTdHJpbmcgPSBgJHtjb29yZFswXX0sJHtjb29yZFsxXX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtjb29yZFN0cmluZ31cIl1gKS5jbGFzc0xpc3QuYWRkKCdiZ1NoaXAnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgaGl0XHJcbiAgICBjb25zdCBib2FyZEhpdCA9IChib2FyZCwgaGl0Q29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHtoaXRDb29yZFswXX0sJHtoaXRDb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2RhdGFDb29yZH1cIl1gKTtcclxuICAgICAgICAvLyBncmlkRWxlbS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBjb25zdCBhdHRja0ljbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBhdHRja0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgYXR0Y2tJY24uaW5uZXJUZXh0ID0gJ2NhbmNlbCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQoYXR0Y2tJY24pO1xyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGF0dGNrSWNuKS5vcGFjaXR5O1xyXG4gICAgICAgIGF0dGNrSWNuLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIG1pc3NcclxuICAgIGNvbnN0IGJvYXJkTWlzcyA9IChib2FyZCwgbWlzc0Nvb3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7bWlzc0Nvb3JkWzBdfSwke21pc3NDb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2RhdGFDb29yZH1cIl1gKTtcclxuICAgICAgICAvLyBncmlkRWxlbS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBjb25zdCBtaXNzSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG1pc3NJY24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgICAgIG1pc3NJY24uaW5uZXJUZXh0ID0gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnO1xyXG4gICAgICAgIGdyaWRFbGVtLmFwcGVuZENoaWxkKG1pc3NJY24pO1xyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1pc3NJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgbWlzc0ljbi5zdHlsZS5vcGFjaXR5ID0gMTsgXHJcbiAgICB9O1xyXG4gICAgLy9yZXR1cm5zIHRoZSBjb29yZHMgaW4gYW4gYXJyYXkgb2YgZ3JpZCBjbGlja2VkXHJcbiAgICBjb25zdCBjbGlja0Nvb3JkID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29vcmRTdHIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZFwiKTtcclxuICAgICAgICBjb25zdCBjb29yZFN0ckFyciA9IGNvb3JkU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgbGV0IGNvb3JkID0gW107XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclswXSkpO1xyXG4gICAgICAgIGNvb3JkLnB1c2gocGFyc2VJbnQoY29vcmRTdHJBcnJbMV0pKTtcclxuICAgICAgICByZXR1cm4gY29vcmQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdCb2FyZCxcclxuICAgICAgICBhZGRHYW1lQnRuLFxyXG4gICAgICAgIHJlbW92ZUdhbWVCdG4sXHJcbiAgICAgICAgdGV4dEluc3RydWN0LFxyXG4gICAgICAgIG5ld0V2ZW50TGlzdCxcclxuICAgICAgICByZW1vdmVFdmVudExpc3QsXHJcbiAgICAgICAgYWRkTGlua0NsYXNzLFxyXG4gICAgICAgIHJlbW92ZUxpbmtDbGFzcyxcclxuICAgICAgICBzaG93U2hpcHMsXHJcbiAgICAgICAgYm9hcmRIaXQsXHJcbiAgICAgICAgYm9hcmRNaXNzLFxyXG4gICAgICAgIGNsaWNrQ29vcmRcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBET00gfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTVwiO1xyXG5cclxuY29uc3QgbmV3UGxheWVyID0gKG5hbWUsIHR5cGUpID0+IHtcclxuICAgIGNvbnN0IHJhbkNvb3JkID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeENvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZFNpemUpICsgMTtcclxuICAgICAgICBjb25zdCB5Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncmlkU2l6ZSkgKyAxO1xyXG4gICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdO1xyXG4gICAgfTtcclxuICAgIGlmICh0eXBlID09PSAnaHVtYW4nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtuYW1lLCB0eXBlfTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbXB1dGVyJykge1xyXG4gICAgICAgIC8vcGljayBhIHJhbmRvbSBncmlkIHBvaW50IHdpdGhpbiBhIGdyaWQgYW5kIGEgcmFuZG9tIFgvWSBkaXJlY3Rpb25cclxuICAgICAgICBjb25zdCBzaGlwU3RhcnRQb3MgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeHlEaXIgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gJ1gnIDogJ1knO1xyXG4gICAgICAgICAgICBjb25zdCBbeENvb3JkLCB5Q29vcmRdID0gcmFuQ29vcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICByZXR1cm4gW1t4Q29vcmQsIHlDb29yZF0sIHh5RGlyXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9waWNrIGEgcmFuZG9tIGdyaWQgcG9pbnQgZ2l2ZW4gYSBjZXJ0YWluIGdyaWQgc2l6ZVxyXG4gICAgICAgIGNvbnN0IGNvbXBBdHRhY2sgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJhbkNvb3JkKGdyaWRTaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtuYW1lLCB0eXBlLCBzaGlwU3RhcnRQb3MsIGNvbXBBdHRhY2t9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBuZXdQbGF5ZXIgfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=