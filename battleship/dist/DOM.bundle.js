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
                    document.querySelector(`#${board} > [data-coord="${coordString}"]`).classList.remove('bgOverlay');
            });
        });
    };
    //remove all ships from game board
    const removeShips = (board) => {
        const boardSpans = document.querySelectorAll(`#${board} > .bgShip`);
        boardSpans.forEach(span => {
            span.classList.remove('bgShip');
            span.classList.add('bgWhite');
        });
    };
    //render hit
    const boardHit = (board, hitCoord) => {
        const dataCoord = `${hitCoord[0]},${hitCoord[1]}`;
        const gridElem = document.querySelector(`#${board} > [data-coord="${dataCoord}"]`);
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
        if (coordStr !== null) {
            const coordStrArr = coordStr.split(',');
            let coord = [];
            coord.push(parseInt(coordStrArr[0]));
            coord.push(parseInt(coordStrArr[1]));
            return coord;
        }
    };
    //render player input box
    const playerInputBox = (player) => {
        const container = document.getElementById('pageContainer');
        const inputBox = document.createElement('div');
        inputBox.id = 'playerInputBox';
        inputBox.classList.add('flexColumnCenter');
        container.appendChild(inputBox);
        const inputinst = document.createElement('span');
        inputinst.innerText = `Enter ${player} Name and select Player Type`;
        const inputForm = document.createElement('form');
        inputForm.id = 'inputForm';
        inputForm.classList.add('flexColumnCenter');
        const nameInput = document.createElement('input');
        nameInput.id = 'nameInput';
        nameInput.type = 'text';
        nameInput.setAttribute('required', '');
        const humanSpan = document.createElement('span');
        const humanInput = document.createElement('input');
        humanInput.id = 'humanInput';
        humanInput.name = 'typeInput';
        humanInput.type = 'radio';
        humanInput.value = 'human';
        humanInput.setAttribute('required', '');
        const humanLabel =  document.createElement('label');
        humanLabel.htmlFor = 'humanInput';
        humanLabel.innerText = 'Human';
        const compSpan = document.createElement('span');
        const compInput = document.createElement('input');
        compInput.id = 'humanInput';
        compInput.name = 'typeInput';
        compInput.type = 'radio';
        compInput.value = 'computer';
        compInput.setAttribute('required', '');
        const compLabel =  document.createElement('label');
        compLabel.htmlFor = 'compInput';
        compLabel.innerText = 'Computer';
        const submitInput = document.createElement('input');
        submitInput.id ='submitInput'
        submitInput.type = 'submit';
        submitInput.value = 'Enter';
        inputBox.appendChild(inputinst);
        inputBox.appendChild(inputForm);
        inputForm.appendChild(nameInput);
        humanSpan.appendChild(humanInput);
        humanSpan.appendChild(humanLabel);
        inputForm.appendChild(humanSpan);
        compSpan.appendChild(compInput);
        compSpan.appendChild(compLabel);
        inputForm.appendChild(compSpan);
        inputForm.appendChild(submitInput);
    };
    //get player input values and removes inputBox
    const getPlayerInputs = (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const type = document.querySelector('input[type="radio"]:checked').value;
        document.getElementById('playerInputBox').remove();
        return [name, type];
    };
    //render input box and input grid to get ship positions
    const shipInputBox = () => {
        const container = document.getElementById('pageContainer');
        const inputBox = document.createElement('div');
        inputBox.id = 'shipInputBox';
        inputBox.classList.add('flexRowCenter');
        container.appendChild(inputBox);
        const inputGrid = document.createElement('div');
        inputGrid.classList.add('gameBoard');
        inputGrid.classList.add('tenPxMargin');
        inputGrid.classList.add('link');
        inputGrid.id = 'inputBoard';
        for (let i = 0; i < 100; i++) {
            const whiteBox = document.createElement('span');
            whiteBox.classList.add('bgWhite');
            inputGrid.appendChild(whiteBox);
        }
        inputBox.appendChild(inputGrid);
        const inputBoxSpans = document.querySelectorAll('#inputBoard > span');
        let spanCount = 0;
        for (let y = 10; y > 0; y--) {
            const yCoord  = y;
            for (let x = 1; x <= 10; x++) {
                const xCoord = x;
                inputBoxSpans[spanCount].setAttribute('data-coord', `${xCoord},${yCoord}`);
                spanCount ++;
            }
        }
        const shipInfo = document.createElement('div');
        shipInfo.id = 'shipInfo';
        shipInfo.classList.add('flexColumnCenter');
        inputBox.appendChild(shipInfo);
    };
    //render ship and direction selection for click and place
    const showInputShip = (shipName, shipLength, playerName) => {
        const shipInfo = document.getElementById('shipInfo');
        shipInfo.innerHTML = '';
        const textSpan = document.createElement('span');
        textSpan.id = 'shipInstr';
        textSpan.innerText = `${playerName}, place the ship by selecting a grid space (the ship direction can be changed by clicking on the ship icon)`;
        shipInfo.appendChild(textSpan);
        const shipType = document.createElement('span');
        shipType.id = 'shipType';
        shipType.innerText = `${shipName} (${shipLength})`;
        shipInfo.appendChild(shipType);
        const shipIcon = document.createElement('span');
        shipIcon.id = 'shipIcon';
        shipIcon.classList.add('link');
        shipIcon.style.gridTemplate = `20px / repeat(${shipLength}, 20px)`;
        shipInfo.appendChild(shipIcon);
        for (let i = 0; i < shipLength; i++) {
            const whiteBox = document.createElement('span');
            whiteBox.classList.add('bgShip');
            shipIcon.appendChild(whiteBox);
        }
        document.getElementById('inputBoard').classList.add('link');
    };
    //change ship direction
    const changeShipDir = (shipDirect, shipLength) => {
        const shipIcon = document.getElementById('shipIcon');
        if (shipDirect === 'X') {
            shipIcon.style.gridTemplate = `20px / repeat(${shipLength}, 20px)`;
        } else {
            shipIcon.style.gridTemplate = `repeat(${shipLength}, 20px) / 20px`;
        }
    };
    //show overlay of ship on inputBoard
    const shipOverlay = (event, shipDirect, shipLength) => {
        //remove previous overlay
        const boardSpans = document.querySelectorAll('#inputBoard > .bgOverlay');
        boardSpans.forEach(span => {
            span.classList.remove('bgOverlay');
            span.classList.add('bgWhite');
        });
        //add current overlay
        const coord = clickCoord(event);
        let coordX = coord[0];
        let coordY = coord[1];
        if (shipDirect === 'X') {
            for (let i = 0; i < shipLength; i++) {
                let nextCoordX = coordX + i;
                const coordString = `${nextCoordX},${coordY}`;
                const shipElem = document.querySelector(`#inputBoard > [data-coord="${coordString}"]`);
                shipElem.classList.remove('bgWhite');
                shipElem.classList.add('bgOverlay');
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                let nextCoordY = coordY + i;
                const coordString = `${coordX},${nextCoordY}`;
                const shipElem = document.querySelector(`#inputBoard > [data-coord="${coordString}"]`);
                shipElem.classList.remove('bgWhite');
                shipElem.classList.add('bgOverlay');
            }
        }
    };
    //render ship on input board
    //confirm ship placement
    const confirmShip = () => {
        document.getElementById('shipIcon').classList.remove('link');
        document.getElementById('inputBoard').classList.remove('link');
        const infoDiv = document.getElementById('shipInfo');
        const conSpan = document.createElement('span');
        conSpan.id = 'confShip';
        conSpan.classList.add('link');
        conSpan.classList.add('confBtn');
        conSpan.innerText= 'Confirm';
        infoDiv.appendChild(conSpan);
        const cancSpan = document.createElement('span');
        cancSpan.id = 'cancShip';
        cancSpan.classList.add('link');
        cancSpan.classList.add('confBtn');
        cancSpan.innerText = 'Cancel';
        infoDiv.appendChild(cancSpan);
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
        removeShips,
        boardHit,
        boardMiss,
        clickCoord,
        playerInputBox,
        getPlayerInputs,
        shipInputBox,
        showInputShip,
        changeShipDir,
        shipOverlay,
        confirmShip
    };
})();


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFdBQVc7QUFDbEU7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFdBQVc7QUFDdEUsVUFBVTtBQUNWLG9EQUFvRCxXQUFXO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBLHVDQUF1QyxXQUFXLEdBQUcsT0FBTztBQUM1RCxzRkFBc0YsWUFBWTtBQUNsRztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBLHVDQUF1QyxPQUFPLEdBQUcsV0FBVztBQUM1RCxzRkFBc0YsWUFBWTtBQUNsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL0RPTS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IERPTSA9ICgoKSA9PiB7XHJcbiAgICAvL3JlbmRlciBnYW1lIGJvYXJkc1xyXG4gICAgY29uc3QgbmV3Qm9hcmQgPSAocDFPYmosIHAyT2JqKSA9PiB7XHJcbiAgICAgICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMUdyaWRcclxuICAgICAgICBjb25zdCBwMUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDFCb2FyZCcpO1xyXG4gICAgICAgIHAxR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIHAxR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDJHcmlkXHJcbiAgICAgICAgY29uc3QgcDJHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AyQm9hcmQnKTtcclxuICAgICAgICBwMkdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMkdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FkZCBjb29yZGluYXRlIGF0dHJpYnV0ZSB0byBlYWNoIHNwYW5cclxuICAgICAgICBjb25zdCBwMUJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AxQm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgcDJCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMkJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAxMDsgeSA+IDA7IHktLSkge1xyXG4gICAgICAgICAgICBjb25zdCB5Q29vcmQgID0geTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeENvb3JkID0geDtcclxuICAgICAgICAgICAgICAgIHAxQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgcDJCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuQ291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZW5kZXIgcGxheWVyIG5hbWVzIGJlbG93IGVhY2ggYm9hcmRcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcDFCb2FyZCArIC5wbGF5ZXJOYW1lJykuaW5uZXJUZXh0ID0gYCR7cDFPYmoubmFtZX0ncyBCb2FyZGA7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AyQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3AyT2JqLm5hbWV9J3MgQm9hcmRgO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGEgc3RhcnQgYnV0dG9uXHJcbiAgICBjb25zdCBhZGRHYW1lQnRuID0gKHRleHQpID0+IHtcclxuICAgICAgICBjb25zdCBnYW1lQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25Db250YWluZXInKTtcclxuICAgICAgICBidG5Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZ2FtZUJ0bi5pZCA9ICdnYW1lQnV0dG9uJztcclxuICAgICAgICBnYW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgICAgICBnYW1lQnRuLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVCdG4pO1xyXG4gICAgfTtcclxuICAgIC8vcmVtb3ZlIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgcmVtb3ZlR2FtZUJ0biA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUJ1dHRvbicpLnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIHRleHQgaW5zdHJ1Y3Rpb25zXHJcbiAgICBjb25zdCB0ZXh0SW5zdHJ1Y3QgPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluc3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9ucycpO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9O1xyXG4gICAgLy9jcmVhdGUgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGNvbnN0IG5ld0V2ZW50TGlzdCA9IChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JRCk7XHJcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcclxuICAgIH07XHJcbiAgICAvL3JlbW92ZSBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgY29uc3QgcmVtb3ZlRXZlbnRMaXN0ID0gIChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JRCk7XHJcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBhZGRMaW5rQ2xhc3MgPSAoYWN0Qm9hcmRJRCwgKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdEJvYXJkSUQpO1xyXG4gICAgICAgIGFjdEVsZW0uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlbW92ZUxpbmtDbGFzcyA9IChkZWFjdEJvYXJkSUQpID0+IHtcclxuICAgICAgICBjb25zdCBkZWFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWFjdEJvYXJkSUQpO1xyXG4gICAgICAgIGRlYWN0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgYWxsIHNoaXBzIG9uIGJvYXJkXHJcbiAgICBjb25zdCBzaG93U2hpcHMgPSAoYm9hcmQsIGdhbWVCb2FyZE9iaikgPT4ge1xyXG4gICAgICAgIC8vY29sbGVjdCBhbGwgc2hpcCBjb29yZGluYXRlcyBhbmQgYWRkIGJnIGNsYXNzXHJcbiAgICAgICAgY29uc3Qgc2hpcHNBcnIgPSBbJ2NhcnJpZXInLCAnYmF0dGxlJywgJ2NydWlzZXInLCAgJ3N1Ym1hcmluZScsICdkZXN0cm95ZXInXTtcclxuICAgICAgICBzaGlwc0Fyci5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2FtZUJvYXJkT2JqW3NoaXBdLnNoaXBDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29vcmRzQXJyLnB1c2goY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkU3RyaW5nID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7Y29vcmRTdHJpbmd9XCJdYCkuY2xhc3NMaXN0LmFkZCgnYmdTaGlwJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5yZW1vdmUoJ2JnT3ZlcmxheScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL3JlbW92ZSBhbGwgc2hpcHMgZnJvbSBnYW1lIGJvYXJkXHJcbiAgICBjb25zdCByZW1vdmVTaGlwcyA9IChib2FyZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJvYXJkU3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHtib2FyZH0gPiAuYmdTaGlwYCk7XHJcbiAgICAgICAgYm9hcmRTcGFucy5mb3JFYWNoKHNwYW4gPT4ge1xyXG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBoaXRcclxuICAgIGNvbnN0IGJvYXJkSGl0ID0gKGJvYXJkLCBoaXRDb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb29yZCA9IGAke2hpdENvb3JkWzBdfSwke2hpdENvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IGF0dGNrSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGF0dGNrSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBhdHRja0ljbi5pbm5lclRleHQgPSAnY2FuY2VsJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChhdHRja0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoYXR0Y2tJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgYXR0Y2tJY24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgbWlzc1xyXG4gICAgY29uc3QgYm9hcmRNaXNzID0gKGJvYXJkLCBtaXNzQ29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHttaXNzQ29vcmRbMF19LCR7bWlzc0Nvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IG1pc3NJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbWlzc0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgbWlzc0ljbi5pbm5lclRleHQgPSAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQobWlzc0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUobWlzc0ljbikub3BhY2l0eTtcclxuICAgICAgICBtaXNzSWNuLnN0eWxlLm9wYWNpdHkgPSAxOyBcclxuICAgIH07XHJcbiAgICAvL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuICAgIGNvbnN0IGNsaWNrQ29vcmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgICAgIGlmIChjb29yZFN0ciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBjb29yZFN0ckFyciA9IGNvb3JkU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGxldCBjb29yZCA9IFtdO1xyXG4gICAgICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICAgICAgICAgIGNvb3JkLnB1c2gocGFyc2VJbnQoY29vcmRTdHJBcnJbMV0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvb3JkO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBwbGF5ZXIgaW5wdXQgYm94XHJcbiAgICBjb25zdCBwbGF5ZXJJbnB1dEJveCA9IChwbGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZUNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaW5wdXRCb3guaWQgPSAncGxheWVySW5wdXRCb3gnO1xyXG4gICAgICAgIGlucHV0Qm94LmNsYXNzTGlzdC5hZGQoJ2ZsZXhDb2x1bW5DZW50ZXInKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRCb3gpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0aW5zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBpbnB1dGluc3QuaW5uZXJUZXh0ID0gYEVudGVyICR7cGxheWVyfSBOYW1lIGFuZCBzZWxlY3QgUGxheWVyIFR5cGVgO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgICAgICBpbnB1dEZvcm0uaWQgPSAnaW5wdXRGb3JtJztcclxuICAgICAgICBpbnB1dEZvcm0uY2xhc3NMaXN0LmFkZCgnZmxleENvbHVtbkNlbnRlcicpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgbmFtZUlucHV0LmlkID0gJ25hbWVJbnB1dCc7XHJcbiAgICAgICAgbmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XHJcbiAgICAgICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgY29uc3QgaHVtYW5TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IGh1bWFuSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGh1bWFuSW5wdXQuaWQgPSAnaHVtYW5JbnB1dCc7XHJcbiAgICAgICAgaHVtYW5JbnB1dC5uYW1lID0gJ3R5cGVJbnB1dCc7XHJcbiAgICAgICAgaHVtYW5JbnB1dC50eXBlID0gJ3JhZGlvJztcclxuICAgICAgICBodW1hbklucHV0LnZhbHVlID0gJ2h1bWFuJztcclxuICAgICAgICBodW1hbklucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgY29uc3QgaHVtYW5MYWJlbCA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGh1bWFuTGFiZWwuaHRtbEZvciA9ICdodW1hbklucHV0JztcclxuICAgICAgICBodW1hbkxhYmVsLmlubmVyVGV4dCA9ICdIdW1hbic7XHJcbiAgICAgICAgY29uc3QgY29tcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgY29tcElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBjb21wSW5wdXQuaWQgPSAnaHVtYW5JbnB1dCc7XHJcbiAgICAgICAgY29tcElucHV0Lm5hbWUgPSAndHlwZUlucHV0JztcclxuICAgICAgICBjb21wSW5wdXQudHlwZSA9ICdyYWRpbyc7XHJcbiAgICAgICAgY29tcElucHV0LnZhbHVlID0gJ2NvbXB1dGVyJztcclxuICAgICAgICBjb21wSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBjb21wTGFiZWwgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICBjb21wTGFiZWwuaHRtbEZvciA9ICdjb21wSW5wdXQnO1xyXG4gICAgICAgIGNvbXBMYWJlbC5pbm5lclRleHQgPSAnQ29tcHV0ZXInO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBzdWJtaXRJbnB1dC5pZCA9J3N1Ym1pdElucHV0J1xyXG4gICAgICAgIHN1Ym1pdElucHV0LnR5cGUgPSAnc3VibWl0JztcclxuICAgICAgICBzdWJtaXRJbnB1dC52YWx1ZSA9ICdFbnRlcic7XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoaW5wdXRpbnN0KTtcclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChpbnB1dEZvcm0pO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xyXG4gICAgICAgIGh1bWFuU3Bhbi5hcHBlbmRDaGlsZChodW1hbklucHV0KTtcclxuICAgICAgICBodW1hblNwYW4uYXBwZW5kQ2hpbGQoaHVtYW5MYWJlbCk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGh1bWFuU3Bhbik7XHJcbiAgICAgICAgY29tcFNwYW4uYXBwZW5kQ2hpbGQoY29tcElucHV0KTtcclxuICAgICAgICBjb21wU3Bhbi5hcHBlbmRDaGlsZChjb21wTGFiZWwpO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChjb21wU3Bhbik7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdElucHV0KTtcclxuICAgIH07XHJcbiAgICAvL2dldCBwbGF5ZXIgaW5wdXQgdmFsdWVzIGFuZCByZW1vdmVzIGlucHV0Qm94XHJcbiAgICBjb25zdCBnZXRQbGF5ZXJJbnB1dHMgPSAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVJbnB1dCcpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJJbnB1dEJveCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiBbbmFtZSwgdHlwZV07XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgaW5wdXQgYm94IGFuZCBpbnB1dCBncmlkIHRvIGdldCBzaGlwIHBvc2l0aW9uc1xyXG4gICAgY29uc3Qgc2hpcElucHV0Qm94ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbnB1dEJveC5pZCA9ICdzaGlwSW5wdXRCb3gnO1xyXG4gICAgICAgIGlucHV0Qm94LmNsYXNzTGlzdC5hZGQoJ2ZsZXhSb3dDZW50ZXInKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRCb3gpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGlucHV0R3JpZC5jbGFzc0xpc3QuYWRkKCdnYW1lQm9hcmQnKTtcclxuICAgICAgICBpbnB1dEdyaWQuY2xhc3NMaXN0LmFkZCgndGVuUHhNYXJnaW4nKTtcclxuICAgICAgICBpbnB1dEdyaWQuY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgICAgIGlucHV0R3JpZC5pZCA9ICdpbnB1dEJvYXJkJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIGlucHV0R3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKGlucHV0R3JpZCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNpbnB1dEJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAxMDsgeSA+IDA7IHktLSkge1xyXG4gICAgICAgICAgICBjb25zdCB5Q29vcmQgID0geTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeENvb3JkID0geDtcclxuICAgICAgICAgICAgICAgIGlucHV0Qm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgc3BhbkNvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNoaXBJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc2hpcEluZm8uaWQgPSAnc2hpcEluZm8nO1xyXG4gICAgICAgIHNoaXBJbmZvLmNsYXNzTGlzdC5hZGQoJ2ZsZXhDb2x1bW5DZW50ZXInKTtcclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChzaGlwSW5mbyk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgc2hpcCBhbmQgZGlyZWN0aW9uIHNlbGVjdGlvbiBmb3IgY2xpY2sgYW5kIHBsYWNlXHJcbiAgICBjb25zdCBzaG93SW5wdXRTaGlwID0gKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBwbGF5ZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcEluZm8nKTtcclxuICAgICAgICBzaGlwSW5mby5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBjb25zdCB0ZXh0U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB0ZXh0U3Bhbi5pZCA9ICdzaGlwSW5zdHInO1xyXG4gICAgICAgIHRleHRTcGFuLmlubmVyVGV4dCA9IGAke3BsYXllck5hbWV9LCBwbGFjZSB0aGUgc2hpcCBieSBzZWxlY3RpbmcgYSBncmlkIHNwYWNlICh0aGUgc2hpcCBkaXJlY3Rpb24gY2FuIGJlIGNoYW5nZWQgYnkgY2xpY2tpbmcgb24gdGhlIHNoaXAgaWNvbilgO1xyXG4gICAgICAgIHNoaXBJbmZvLmFwcGVuZENoaWxkKHRleHRTcGFuKTtcclxuICAgICAgICBjb25zdCBzaGlwVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBzaGlwVHlwZS5pZCA9ICdzaGlwVHlwZSc7XHJcbiAgICAgICAgc2hpcFR5cGUuaW5uZXJUZXh0ID0gYCR7c2hpcE5hbWV9ICgke3NoaXBMZW5ndGh9KWA7XHJcbiAgICAgICAgc2hpcEluZm8uYXBwZW5kQ2hpbGQoc2hpcFR5cGUpO1xyXG4gICAgICAgIGNvbnN0IHNoaXBJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHNoaXBJY29uLmlkID0gJ3NoaXBJY29uJztcclxuICAgICAgICBzaGlwSWNvbi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgc2hpcEljb24uc3R5bGUuZ3JpZFRlbXBsYXRlID0gYDIwcHggLyByZXBlYXQoJHtzaGlwTGVuZ3RofSwgMjBweClgO1xyXG4gICAgICAgIHNoaXBJbmZvLmFwcGVuZENoaWxkKHNoaXBJY29uKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdTaGlwJyk7XHJcbiAgICAgICAgICAgIHNoaXBJY29uLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0Qm9hcmQnKS5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICB9O1xyXG4gICAgLy9jaGFuZ2Ugc2hpcCBkaXJlY3Rpb25cclxuICAgIGNvbnN0IGNoYW5nZVNoaXBEaXIgPSAoc2hpcERpcmVjdCwgc2hpcExlbmd0aCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoaXBJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBJY29uJyk7XHJcbiAgICAgICAgaWYgKHNoaXBEaXJlY3QgPT09ICdYJykge1xyXG4gICAgICAgICAgICBzaGlwSWNvbi5zdHlsZS5ncmlkVGVtcGxhdGUgPSBgMjBweCAvIHJlcGVhdCgke3NoaXBMZW5ndGh9LCAyMHB4KWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hpcEljb24uc3R5bGUuZ3JpZFRlbXBsYXRlID0gYHJlcGVhdCgke3NoaXBMZW5ndGh9LCAyMHB4KSAvIDIwcHhgO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL3Nob3cgb3ZlcmxheSBvZiBzaGlwIG9uIGlucHV0Qm9hcmRcclxuICAgIGNvbnN0IHNoaXBPdmVybGF5ID0gKGV2ZW50LCBzaGlwRGlyZWN0LCBzaGlwTGVuZ3RoKSA9PiB7XHJcbiAgICAgICAgLy9yZW1vdmUgcHJldmlvdXMgb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IGJvYXJkU3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaW5wdXRCb2FyZCA+IC5iZ092ZXJsYXknKTtcclxuICAgICAgICBib2FyZFNwYW5zLmZvckVhY2goc3BhbiA9PiB7XHJcbiAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LnJlbW92ZSgnYmdPdmVybGF5Jyk7XHJcbiAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vYWRkIGN1cnJlbnQgb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IGNvb3JkID0gY2xpY2tDb29yZChldmVudCk7XHJcbiAgICAgICAgbGV0IGNvb3JkWCA9IGNvb3JkWzBdO1xyXG4gICAgICAgIGxldCBjb29yZFkgPSBjb29yZFsxXTtcclxuICAgICAgICBpZiAoc2hpcERpcmVjdCA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENvb3JkWCA9IGNvb3JkWCArIGk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke25leHRDb29yZFh9LCR7Y29vcmRZfWA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNpbnB1dEJvYXJkID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApO1xyXG4gICAgICAgICAgICAgICAgc2hpcEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICAgICAgc2hpcEVsZW0uY2xhc3NMaXN0LmFkZCgnYmdPdmVybGF5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb29yZFkgPSBjb29yZFkgKyBpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRTdHJpbmcgPSBgJHtjb29yZFh9LCR7bmV4dENvb3JkWX1gO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjaW5wdXRCb2FyZCA+IFtkYXRhLWNvb3JkPVwiJHtjb29yZFN0cmluZ31cIl1gKTtcclxuICAgICAgICAgICAgICAgIHNoaXBFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgICAgIHNoaXBFbGVtLmNsYXNzTGlzdC5hZGQoJ2JnT3ZlcmxheScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIHNoaXAgb24gaW5wdXQgYm9hcmRcclxuICAgIC8vY29uZmlybSBzaGlwIHBsYWNlbWVudFxyXG4gICAgY29uc3QgY29uZmlybVNoaXAgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBJY29uJykuY2xhc3NMaXN0LnJlbW92ZSgnbGluaycpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dEJvYXJkJykuY2xhc3NMaXN0LnJlbW92ZSgnbGluaycpO1xyXG4gICAgICAgIGNvbnN0IGluZm9EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcEluZm8nKTtcclxuICAgICAgICBjb25zdCBjb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNvblNwYW4uaWQgPSAnY29uZlNoaXAnO1xyXG4gICAgICAgIGNvblNwYW4uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgICAgIGNvblNwYW4uY2xhc3NMaXN0LmFkZCgnY29uZkJ0bicpO1xyXG4gICAgICAgIGNvblNwYW4uaW5uZXJUZXh0PSAnQ29uZmlybSc7XHJcbiAgICAgICAgaW5mb0Rpdi5hcHBlbmRDaGlsZChjb25TcGFuKTtcclxuICAgICAgICBjb25zdCBjYW5jU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjYW5jU3Bhbi5pZCA9ICdjYW5jU2hpcCc7XHJcbiAgICAgICAgY2FuY1NwYW4uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgICAgIGNhbmNTcGFuLmNsYXNzTGlzdC5hZGQoJ2NvbmZCdG4nKTtcclxuICAgICAgICBjYW5jU3Bhbi5pbm5lclRleHQgPSAnQ2FuY2VsJztcclxuICAgICAgICBpbmZvRGl2LmFwcGVuZENoaWxkKGNhbmNTcGFuKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdCb2FyZCxcclxuICAgICAgICBhZGRHYW1lQnRuLFxyXG4gICAgICAgIHJlbW92ZUdhbWVCdG4sXHJcbiAgICAgICAgdGV4dEluc3RydWN0LFxyXG4gICAgICAgIG5ld0V2ZW50TGlzdCxcclxuICAgICAgICByZW1vdmVFdmVudExpc3QsXHJcbiAgICAgICAgYWRkTGlua0NsYXNzLFxyXG4gICAgICAgIHJlbW92ZUxpbmtDbGFzcyxcclxuICAgICAgICBzaG93U2hpcHMsXHJcbiAgICAgICAgcmVtb3ZlU2hpcHMsXHJcbiAgICAgICAgYm9hcmRIaXQsXHJcbiAgICAgICAgYm9hcmRNaXNzLFxyXG4gICAgICAgIGNsaWNrQ29vcmQsXHJcbiAgICAgICAgcGxheWVySW5wdXRCb3gsXHJcbiAgICAgICAgZ2V0UGxheWVySW5wdXRzLFxyXG4gICAgICAgIHNoaXBJbnB1dEJveCxcclxuICAgICAgICBzaG93SW5wdXRTaGlwLFxyXG4gICAgICAgIGNoYW5nZVNoaXBEaXIsXHJcbiAgICAgICAgc2hpcE92ZXJsYXksXHJcbiAgICAgICAgY29uZmlybVNoaXBcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBET00gfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=