/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE9NLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLE9BQU87QUFDNUI7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBLGdFQUFnRSxPQUFPLEdBQUcsT0FBTztBQUNqRixnRUFBZ0UsT0FBTyxHQUFHLE9BQU87QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsU0FBUyxHQUFHLFNBQVM7QUFDNUQsMkNBQTJDLE1BQU0sZ0JBQWdCLFlBQVk7QUFDN0UsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUyxHQUFHLFNBQVM7QUFDbEQsb0RBQW9ELE1BQU0sZ0JBQWdCLFVBQVU7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkJBQTZCLFNBQVMsR0FBRyxTQUFTO0FBQ2xELG9EQUFvRCxNQUFNLGdCQUFnQixVQUFVO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9ET00uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBET00gPSAoKCkgPT4ge1xyXG5cclxuICAgIC8vY3JlYXRlIGdhbWUgZ3JpZHMgb24gcGFnZVxyXG5jb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDFHcmlkXHJcbiAgICBjb25zdCBwMUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDFCb2FyZCcpO1xyXG4gICAgcDFHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICBwMUdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgfVxyXG4gICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMkdyaWRcclxuICAgIGNvbnN0IHAyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMkJvYXJkJyk7XHJcbiAgICBwMkdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgIHAyR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICB9XHJcbiAgICAvL2FkZCBjb29yZGluYXRlIGF0dHJpYnV0ZSB0byBlYWNoIHNwYW5cclxuICAgIGNvbnN0IHAxQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDFCb2FyZD5zcGFuJyk7XHJcbiAgICBjb25zdCBwMkJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AyQm9hcmQ+c3BhbicpO1xyXG4gICAgbGV0IHNwYW5Db3VudCA9IDA7XHJcbiAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICBjb25zdCB5Q29vcmQgID0geTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgIHAxQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICBwMkJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgc3BhbkNvdW50ICsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy9zaG93cyBzaGlwcyBvbiBnYW1lIGJvYXJkcyBvbiBwYWdlXHJcbmNvbnN0IHNob3dTaGlwcyA9IChib2FyZCwgZ2FtZUJvYXJkT2JqKSA9PiB7XHJcbiAgICAvL2NvbGxlY3QgYWxsIHNoaXAgY29vcmRpbmF0ZXMgYW5kIGFkZCBiZyBjbGFzc1xyXG4gICAgbGV0IGNvb3Jkc0FyciA9IFtdXHJcbiAgICBjb25zdCBzaGlwc0FyciA9IFsnY2FycmllcicsICdiYXR0bGUnLCAnY3J1aXNlcicsICAnc3VibWFyaW5lJywgJ2Rlc3Ryb3llciddO1xyXG4gICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgZ2FtZUJvYXJkT2JqW3NoaXBdLnNoaXBDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb29yZHNBcnIucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWzBdfSwke2Nvb3JkWzFdfWA7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0+W2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vL3JlbmRlciBhIGhpdCBvciBtaXNzIG9uIGdhbWVib2FyZFxyXG5jb25zdCBib2FyZEhpdE1pc3MgPSAoYm9hcmQsIGdhbWVCb2FyZE9iaikgPT4ge1xyXG4gICAgLy9yZW5kZXIgaGl0cyB1c2luZyBoaXRzIGFycmF5XHJcbiAgICBnYW1lQm9hcmRPYmouaGl0cy5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHtjb29yZFswXX0sJHtjb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9PltkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgZ3JpZEVsZW0uaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc3QgYXR0Y2tJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgYXR0Y2tJY24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgICAgIGF0dGNrSWNuLmlubmVyVGV4dCA9ICdjYW5jZWwnO1xyXG4gICAgICAgIGdyaWRFbGVtLmFwcGVuZENoaWxkKGF0dGNrSWNuKTtcclxuICAgIH0pO1xyXG4gICAgLy9yZW5kZXIgbWlzc2VzIHVzaW5nIG1pc3NlcyBhcnJheVxyXG4gICAgZ2FtZUJvYXJkT2JqLm1pc3Nlcy5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHtjb29yZFswXX0sJHtjb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9PltkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgZ3JpZEVsZW0uaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc3QgbWlzc0ljbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBtaXNzSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBtaXNzSWNuLmlubmVyVGV4dCA9ICdyYWRpb19idXR0b25fdW5jaGVja2VkJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChtaXNzSWNuKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy9yZW5kZXIgYSBzdGFydCBidXR0b25cclxuY29uc3QgYWRkR2FtZUJ0biA9ICh0ZXh0KSA9PiB7XHJcbiAgICBjb25zdCBnYW1lQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbkNvbnRhaW5lcicpO1xyXG4gICAgYnRuQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgZ2FtZUJ0bi5pZCA9ICdnYW1lQnV0dG9uJztcclxuICAgIGdhbWVCdG4uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgZ2FtZUJ0bi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVCdG4pO1xyXG59O1xyXG5cclxuLy9yZW1vdmUgc3RhcnQgYnV0dG9uXHJcbmNvbnN0IHJlbW92ZUdhbWVCdG4gPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUJ1dHRvbicpLnJlbW92ZSgpO1xyXG59O1xyXG5cclxuXHJcbi8vcmVuZGVyIHRleHQgaW5zdHJ1Y3Rpb25zXHJcbmNvbnN0IHRleHRJbnN0cnVjdCA9ICh0ZXh0KSA9PiB7XHJcbiAgICBjb25zdCBpbnN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbnMnKTtcclxuICAgIGluc3RFbGVtLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcclxufTtcclxuXHJcbi8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbmNvbnN0IGNyZWF0ZUV2ZW50TGlzdCA9IChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbn07XHJcblxyXG4vL3JlbW92ZSBhbiBldmVudCBsaXN0ZW5lclxyXG5jb25zdCByZW1vdmVFdmVudExpc3QgPSAgKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcclxufTtcclxuXHJcbi8vcmV0dXJucyB0aGUgY29vcmRzIGluIGFuIGFycmF5IG9mIGdyaWQgY2xpY2tlZFxyXG5jb25zdCBjbGlja0Nvb3JkID0gKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgY29uc3QgY29vcmRTdHJBcnIgPSBjb29yZFN0ci5zcGxpdCgnLCcpO1xyXG4gICAgbGV0IGNvb3JkID0gW107XHJcbiAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzFdKSk7XHJcbiAgICByZXR1cm4gY29vcmQ7XHJcbn07XHJcblxyXG5jb25zdCBhY3RpdmVCb2FyZCA9IChhY3RCb2FyZElEKSA9PiB7XHJcbiAgICBjb25zdCBhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWN0Qm9hcmRJRCk7XHJcbiAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxufTtcclxuXHJcbmNvbnN0IGRlYWN0Qm9hcmQgPSAoZGVhY3RCb2FyZElEKSA9PiB7XHJcbiAgICBjb25zdCBkZWFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWFjdEJvYXJkSUQpO1xyXG4gICAgZGVhY3RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxufTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUJvYXJkLFxyXG4gICAgICAgIGFkZEdhbWVCdG4sXHJcbiAgICAgICAgcmVtb3ZlR2FtZUJ0bixcclxuICAgICAgICB0ZXh0SW5zdHJ1Y3QsXHJcbiAgICAgICAgY3JlYXRlRXZlbnRMaXN0LFxyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdCxcclxuICAgICAgICBjbGlja0Nvb3JkLFxyXG4gICAgICAgIGFjdGl2ZUJvYXJkLFxyXG4gICAgICAgIGRlYWN0Qm9hcmQsXHJcbiAgICAgICAgYm9hcmRIaXRNaXNzLFxyXG4gICAgICAgIHNob3dTaGlwc1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IERPTSB9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==