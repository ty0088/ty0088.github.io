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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE9NLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsT0FBTztBQUM1QjtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0EsZ0VBQWdFLE9BQU8sR0FBRyxPQUFPO0FBQ2pGLGdFQUFnRSxPQUFPLEdBQUcsT0FBTztBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLCtCQUErQixTQUFTLEdBQUcsU0FBUztBQUNwRCxtQ0FBbUMsTUFBTSxnQkFBZ0IsWUFBWTtBQUNyRSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9ET00uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBET00gPSAoKCkgPT4ge1xyXG5cclxuICAgIC8vY3JlYXRlIGdhbWUgZ3JpZHMgb24gcGFnZVxyXG5jb25zdCBjcmVhdGVCb2FyZCA9ICgpID0+IHtcclxuICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDFHcmlkXHJcbiAgICBjb25zdCBwMUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDFCb2FyZCcpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICBwMUdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgfVxyXG4gICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMkdyaWRcclxuICAgIGNvbnN0IHAyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMkJvYXJkJyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgIHAyR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICB9XHJcbiAgICAvL2FkZCBjb29yZGluYXRlIGF0dHJpYnV0ZSB0byBlYWNoIHNwYW5cclxuICAgIGNvbnN0IHAxQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDFCb2FyZD5zcGFuJyk7XHJcbiAgICBjb25zdCBwMkJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AyQm9hcmQ+c3BhbicpO1xyXG4gICAgbGV0IHNwYW5Db3VudCA9IDA7XHJcbiAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICBjb25zdCB5Q29vcmQgID0geTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgIHAxQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICBwMkJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgc3BhbkNvdW50ICsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy9zaG93cyBzaGlwcyBvbiBnYW1lIGJvYXJkcyBvbiBwYWdlLCBwb3NzaWJseSBub3QgIHJlcXVpcmVkIS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBzaG93U2hpcHMgPSAoYm9hcmQsIGdhbWVCb2FyZE9iaikgPT4ge1xyXG4gICAgLy9jb2xsZWN0IGFsbCBzaGlwIGNvb3JkaW5hdGVzXHJcbiAgICBsZXQgY29vcmRzQXJyID0gW11cclxuICAgIGNvbnN0IHNoaXBzQXJyID0gWydjYXJyaWVyJywgJ2JhdHRsZScsICdjcnVpc2VyJywgICdzdWJtYXJpbmUnLCAnZGVzdHJveWVyJ107XHJcbiAgICBzaGlwc0Fyci5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgICAgICBnYW1lQm9hcmRPYmpbc2hpcF0uc2hpcENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICAgICAgICAgIGNvb3Jkc0Fyci5wdXNoKGNvb3JkKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy9jb2xvdXIgc2hpcCBsb2NhdGlvbiBieSBhZGRpbmcgY3NzIGNsYXNzXHJcbiAgICBjb29yZHNBcnIuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgY29uc3QgY29vcmRTdHJpbmcgPSBgJHtjb29yZFswXX0sJHtjb29yZFsxXX1gO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfT5bZGF0YS1jb29yZD1cIiR7Y29vcmRTdHJpbmd9XCJdYCkuY2xhc3NMaXN0LmFkZCgnYmdCbGFjaycpO1xyXG4gICAgfSk7IFxyXG59O1xyXG5cclxuLy9yZW5kZXIgYSBoaXQgb3IgbWlzcyBvbiBnYW1lYm9hcmRcclxuY29uc3QgYm9hcmRIaXRNaXNzID0gKGF0dGFjaywgY29vcmQsIHBsYXllcikgPT4ge1xyXG4gICAgaWYgKGF0dGFjayA9PT0gJ2hpdCcpIHtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgIH1cclxufTtcclxuXHJcbi8vcmVuZGVyIGEgc3RhcnQgYnV0dG9uXHJcbmNvbnN0IGFkZFN0YXJ0QnRuID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBzdGFydEJ0bi5pZCA9ICdnYW1lQnV0dG9uJztcclxuICAgIHN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIHN0YXJ0QnRuLmlubmVyVGV4dCA9ICdTdGFydCBHYW1lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25Db250YWluZXInKS5hcHBlbmRDaGlsZChzdGFydEJ0bik7XHJcbn07XHJcblxyXG4vL3JlbW92ZSBzdGFydCBidXR0b25cclxuY29uc3QgcmVtb3ZlU3RhcnRCdG4gPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUJ1dHRvbicpLnJlbW92ZSgpO1xyXG59O1xyXG5cclxuXHJcbi8vcmVuZGVyIHRleHQgaW5zdHJ1Y3Rpb25zXHJcbmNvbnN0IHRleHRJbnN0cnVjdCA9ICh0ZXh0KSA9PiB7XHJcbiAgICBjb25zdCBpbnN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbnMnKTtcclxuICAgIGluc3RFbGVtLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcclxufTtcclxuXHJcbi8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbmNvbnN0IGNyZWF0ZUV2ZW50TGlzdCA9IChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbn07XHJcblxyXG4vL3JlbW92ZSBhbiBldmVudCBsaXN0ZW5lciAtLS0tLS0gcmVxdWlyZWQ/Pz8/P1xyXG5jb25zdCByZW1vdmVFdmVudExpc3QgPSAgKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcclxufTtcclxuXHJcbi8vcmV0dXJucyB0aGUgY29vcmRzIGluIGFuIGFycmF5IG9mIGdyaWQgY2xpY2tlZFxyXG5jb25zdCBjbGlja0Nvb3JkID0gKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgY29uc29sZS5sb2coY29vcmRTdHIpXHJcbiAgICBjb25zdCBjb29yZFN0ckFyciA9IGNvb3JkU3RyLnNwbGl0KCcsJyk7XHJcbiAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgIGNvb3JkLnB1c2gocGFyc2VJbnQoY29vcmRTdHJBcnJbMF0pKTtcclxuICAgIGNvb3JkLnB1c2gocGFyc2VJbnQoY29vcmRTdHJBcnJbMV0pKTtcclxuICAgIHJldHVybiBjb29yZDtcclxufTtcclxuXHJcbmNvbnN0IGFjdGl2ZUJvYXJkID0gKGFjdEJvYXJkSUQsIGRlYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgY29uc3QgYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdEJvYXJkSUQpO1xyXG4gICAgY29uc3QgZGVhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVhY3RCb2FyZElEKTtcclxuICAgIGFjdEVsZW0uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgZGVhY3RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxufTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUJvYXJkLFxyXG4gICAgICAgIGFkZFN0YXJ0QnRuLFxyXG4gICAgICAgIHJlbW92ZVN0YXJ0QnRuLFxyXG4gICAgICAgIHRleHRJbnN0cnVjdCxcclxuICAgICAgICBjcmVhdGVFdmVudExpc3QsXHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0LFxyXG4gICAgICAgIGNsaWNrQ29vcmQsXHJcbiAgICAgICAgYWN0aXZlQm9hcmRcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBET00gfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=