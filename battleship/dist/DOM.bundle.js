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

    //render game boards
    const createBoard = (player1Obj, player2Obj) => {
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
        document.querySelector('#p1Board + .playerName').innerText = `${player1Obj.name}'s Attack Board`;
        document.querySelector('#p2Board + .playerName').innerText = `${player2Obj.name}'s Attack Board`;
    }

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
    const boardHit = (board, gameBoardObj) => {
        const lastCoord = gameBoardObj.hits.length - 1;
        const coord = gameBoardObj.hits[lastCoord];
        const dataCoord = `${coord[0]},${coord[1]}`;
        const gridElem = document.querySelector(`#${board} > [data-coord="${dataCoord}"]`);
        gridElem.innerHTML = '';
        const attckIcn = document.createElement('span');
        attckIcn.classList.add('material-symbols-outlined');
        attckIcn.innerText = 'cancel';
        gridElem.appendChild(attckIcn);
        window.getComputedStyle(attckIcn).opacity;
        attckIcn.style.opacity = 1;
    };

    //render miss
    const boardMiss = (board, gameBoardObj) => {
        const lastCoord = gameBoardObj.misses.length - 1;
        const coord = gameBoardObj.misses[lastCoord];
        const dataCoord = `${coord[0]},${coord[1]}`;
        const gridElem = document.querySelector(`#${board} > [data-coord="${dataCoord}"]`);
        gridElem.innerHTML = '';
        const missIcn = document.createElement('span');
        missIcn.classList.add('material-symbols-outlined');
        missIcn.innerText = 'radio_button_unchecked';
        gridElem.appendChild(missIcn);
        window.getComputedStyle(missIcn).opacity;
        missIcn.style.opacity = 1; 
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
        boardHit,
        boardMiss,
        showShips
    };
})();


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE9NLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLE9BQU87QUFDaEM7QUFDQSw0QkFBNEIsU0FBUztBQUNyQztBQUNBLG9FQUFvRSxPQUFPLEdBQUcsT0FBTztBQUNyRixvRUFBb0UsT0FBTyxHQUFHLE9BQU87QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsZ0JBQWdCO0FBQ3hGLHdFQUF3RSxnQkFBZ0I7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFNBQVMsR0FBRyxTQUFTO0FBQ2hFLCtDQUErQyxPQUFPLGlCQUFpQixZQUFZO0FBQ25GLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFNBQVMsR0FBRyxTQUFTO0FBQ2xELG9EQUFvRCxPQUFPLGlCQUFpQixVQUFVO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFNBQVMsR0FBRyxTQUFTO0FBQ2xELG9EQUFvRCxPQUFPLGlCQUFpQixVQUFVO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9ET00uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBET00gPSAoKCkgPT4ge1xyXG5cclxuICAgIC8vcmVuZGVyIGdhbWUgYm9hcmRzXHJcbiAgICBjb25zdCBjcmVhdGVCb2FyZCA9IChwbGF5ZXIxT2JqLCBwbGF5ZXIyT2JqKSA9PiB7XHJcbiAgICAgICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMUdyaWRcclxuICAgICAgICBjb25zdCBwMUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDFCb2FyZCcpO1xyXG4gICAgICAgIHAxR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIHAxR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDJHcmlkXHJcbiAgICAgICAgY29uc3QgcDJHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AyQm9hcmQnKTtcclxuICAgICAgICBwMkdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMkdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FkZCBjb29yZGluYXRlIGF0dHJpYnV0ZSB0byBlYWNoIHNwYW5cclxuICAgICAgICBjb25zdCBwMUJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AxQm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgcDJCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMkJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAxMDsgeSA+IDA7IHktLSkge1xyXG4gICAgICAgICAgICBjb25zdCB5Q29vcmQgID0geTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeENvb3JkID0geDtcclxuICAgICAgICAgICAgICAgIHAxQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgcDJCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuQ291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZW5kZXIgcGxheWVyIG5hbWVzIGJlbG93IGVhY2ggYm9hcmRcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcDFCb2FyZCArIC5wbGF5ZXJOYW1lJykuaW5uZXJUZXh0ID0gYCR7cGxheWVyMU9iai5uYW1lfSdzIEF0dGFjayBCb2FyZGA7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AyQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3BsYXllcjJPYmoubmFtZX0ncyBBdHRhY2sgQm9hcmRgO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmVuZGVyIGFsbCBzaGlwcyBvbiBib2FyZFxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICAvL2NvbGxlY3QgYWxsIHNoaXAgY29vcmRpbmF0ZXMgYW5kIGFkZCBiZyBjbGFzc1xyXG4gICAgICAgIGNvbnN0IHNoaXBzQXJyID0gWydjYXJyaWVyJywgJ2JhdHRsZScsICdjcnVpc2VyJywgICdzdWJtYXJpbmUnLCAnZGVzdHJveWVyJ107XHJcbiAgICAgICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWVCb2FyZE9ialtzaGlwXS5zaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvb3Jkc0Fyci5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWzBdfSwke2Nvb3JkWzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy9yZW5kZXIgaGl0XHJcbiAgICBjb25zdCBib2FyZEhpdCA9IChib2FyZCwgZ2FtZUJvYXJkT2JqKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFzdENvb3JkID0gZ2FtZUJvYXJkT2JqLmhpdHMubGVuZ3RoIC0gMTtcclxuICAgICAgICBjb25zdCBjb29yZCA9IGdhbWVCb2FyZE9iai5oaXRzW2xhc3RDb29yZF07XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgZ3JpZEVsZW0uaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc3QgYXR0Y2tJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgYXR0Y2tJY24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgICAgIGF0dGNrSWNuLmlubmVyVGV4dCA9ICdjYW5jZWwnO1xyXG4gICAgICAgIGdyaWRFbGVtLmFwcGVuZENoaWxkKGF0dGNrSWNuKTtcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhdHRja0ljbikub3BhY2l0eTtcclxuICAgICAgICBhdHRja0ljbi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIH07XHJcblxyXG4gICAgLy9yZW5kZXIgbWlzc1xyXG4gICAgY29uc3QgYm9hcmRNaXNzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICBjb25zdCBsYXN0Q29vcmQgPSBnYW1lQm9hcmRPYmoubWlzc2VzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgY29uc3QgY29vcmQgPSBnYW1lQm9hcmRPYmoubWlzc2VzW2xhc3RDb29yZF07XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgZ3JpZEVsZW0uaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc3QgbWlzc0ljbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBtaXNzSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBtaXNzSWNuLmlubmVyVGV4dCA9ICdyYWRpb19idXR0b25fdW5jaGVja2VkJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChtaXNzSWNuKTtcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtaXNzSWNuKS5vcGFjaXR5O1xyXG4gICAgICAgIG1pc3NJY24uc3R5bGUub3BhY2l0eSA9IDE7IFxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JlbmRlciBhIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgYWRkR2FtZUJ0biA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBidG5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uQ29udGFpbmVyJyk7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGdhbWVCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICAgICAgZ2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgZ2FtZUJ0bi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQnRuKTtcclxuICAgIH07XHJcblxyXG4gICAgLy9yZW1vdmUgc3RhcnQgYnV0dG9uXHJcbiAgICBjb25zdCByZW1vdmVHYW1lQnRuID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQnV0dG9uJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVuZGVyIHRleHQgaW5zdHJ1Y3Rpb25zXHJcbiAgICBjb25zdCB0ZXh0SW5zdHJ1Y3QgPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluc3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9ucycpO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCBjcmVhdGVFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCByZW1vdmVFdmVudExpc3QgPSAgKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuICAgIGNvbnN0IGNsaWNrQ29vcmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgICAgIHJldHVybiBjb29yZDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYWN0aXZlQm9hcmQgPSAoYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RCb2FyZElEKTtcclxuICAgICAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGVhY3RCb2FyZCA9IChkZWFjdEJvYXJkSUQpID0+IHtcclxuICAgICAgICBjb25zdCBkZWFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWFjdEJvYXJkSUQpO1xyXG4gICAgICAgIGRlYWN0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlQm9hcmQsXHJcbiAgICAgICAgYWRkR2FtZUJ0bixcclxuICAgICAgICByZW1vdmVHYW1lQnRuLFxyXG4gICAgICAgIHRleHRJbnN0cnVjdCxcclxuICAgICAgICBjcmVhdGVFdmVudExpc3QsXHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0LFxyXG4gICAgICAgIGNsaWNrQ29vcmQsXHJcbiAgICAgICAgYWN0aXZlQm9hcmQsXHJcbiAgICAgICAgZGVhY3RCb2FyZCxcclxuICAgICAgICBib2FyZEhpdCxcclxuICAgICAgICBib2FyZE1pc3MsXHJcbiAgICAgICAgc2hvd1NoaXBzXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgRE9NIH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9