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
            });
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
        const coordStrArr = coordStr.split(',');
        let coord = [];
        coord.push(parseInt(coordStrArr[0]));
        coord.push(parseInt(coordStrArr[1]));
        return coord;
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
    //render ship and direction  selection for click and place
    const showInputShip = (shipName, shipLength, playerName) => {
        const shipInfo = document.getElementById('shipInfo');
        shipInfo.innerHTML = '';
        const textSpan = document.createElement('span');
        textSpan.id = 'shipInstr';
        textSpan.innerText = `${playerName}, place the ship by selecting a grid space (the ship direction can be changed by clicking on X/Y)`;
        shipInfo.appendChild(textSpan);
        const shipType = document.createElement('span');
        shipType.id = 'shipType';
        shipType.innerText = `${shipName} (${shipLength})`;
        shipInfo.appendChild(shipType);
        const shipIcon = document.createElement('span');
        shipIcon.id = 'shipIcon';
        shipIcon.style.gridTemplate = `30px / repeat(${shipLength}, 30px)`;
        shipInfo.appendChild(shipIcon);
        for (let i = 0; i < shipLength; i++) {
            const whiteBox = document.createElement('span');
            whiteBox.classList.add('bgShip');
            shipIcon.appendChild(whiteBox);
        }
        const xySpan = document.createElement('span');
        xySpan.id = 'xyDirect';
        xySpan.innerText = 'X / Y';
        xySpan.classList.add('link');
        shipInfo.appendChild(xySpan);
    };
    //change ship direction
    const changeShipDir = (direct, shipLength) => {
        const shipIcon = document.getElementById('shipIcon');
        if (direct === 'X') {
            shipIcon.style.gridTemplate = `30px / repeat(${shipLength}, 30px)`;
        } else {
            shipIcon.style.gridTemplate = `repeat(${shipLength}, 30px) / 30px`;
        }
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
        clickCoord,
        playerInputBox,
        getPlayerInputs,
        shipInputBox,
        showInputShip,
        changeShipDir
    };
})();


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsV0FBVztBQUN0RSxVQUFVO0FBQ1Ysb0RBQW9ELFdBQVc7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvRE9NLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgRE9NID0gKCgpID0+IHtcclxuICAgIC8vcmVuZGVyIGdhbWUgYm9hcmRzXHJcbiAgICBjb25zdCBuZXdCb2FyZCA9IChwMU9iaiwgcDJPYmopID0+IHtcclxuICAgICAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAxR3JpZFxyXG4gICAgICAgIGNvbnN0IHAxR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgcDFHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMkdyaWRcclxuICAgICAgICBjb25zdCBwMkdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDJCb2FyZCcpO1xyXG4gICAgICAgIHAyR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIHAyR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWRkIGNvb3JkaW5hdGUgYXR0cmlidXRlIHRvIGVhY2ggc3BhblxyXG4gICAgICAgIGNvbnN0IHAxQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDFCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBjb25zdCBwMkJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AyQm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgbGV0IHNwYW5Db3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlDb29yZCAgPSB5O1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICAgICAgcDFCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBwMkJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3JlbmRlciBwbGF5ZXIgbmFtZXMgYmVsb3cgZWFjaCBib2FyZFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwMUJvYXJkICsgLnBsYXllck5hbWUnKS5pbm5lclRleHQgPSBgJHtwMU9iai5uYW1lfSdzIEJvYXJkYDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcDJCb2FyZCArIC5wbGF5ZXJOYW1lJykuaW5uZXJUZXh0ID0gYCR7cDJPYmoubmFtZX0ncyBCb2FyZGA7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgYSBzdGFydCBidXR0b25cclxuICAgIGNvbnN0IGFkZEdhbWVCdG4gPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdhbWVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbkNvbnRhaW5lcicpO1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBnYW1lQnRuLmlkID0gJ2dhbWVCdXR0b24nO1xyXG4gICAgICAgIGdhbWVCdG4uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgICAgIGdhbWVCdG4uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgICAgICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUJ0bik7XHJcbiAgICB9O1xyXG4gICAgLy9yZW1vdmUgc3RhcnQgYnV0dG9uXHJcbiAgICBjb25zdCByZW1vdmVHYW1lQnRuID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQnV0dG9uJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgdGV4dCBpbnN0cnVjdGlvbnNcclxuICAgIGNvbnN0IHRleHRJbnN0cnVjdCA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5zdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb25zJyk7XHJcbiAgICAgICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIH07XHJcbiAgICAvL2NyZWF0ZSBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgY29uc3QgbmV3RXZlbnRMaXN0ID0gKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuICAgIC8vcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCByZW1vdmVFdmVudExpc3QgPSAgKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGFkZExpbmtDbGFzcyA9IChhY3RCb2FyZElELCApID0+IHtcclxuICAgICAgICBjb25zdCBhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWN0Qm9hcmRJRCk7XHJcbiAgICAgICAgYWN0RWxlbS5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVtb3ZlTGlua0NsYXNzID0gKGRlYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlYWN0Qm9hcmRJRCk7XHJcbiAgICAgICAgZGVhY3RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBhbGwgc2hpcHMgb24gYm9hcmRcclxuICAgIGNvbnN0IHNob3dTaGlwcyA9IChib2FyZCwgZ2FtZUJvYXJkT2JqKSA9PiB7XHJcbiAgICAgICAgLy9jb2xsZWN0IGFsbCBzaGlwIGNvb3JkaW5hdGVzIGFuZCBhZGQgYmcgY2xhc3NcclxuICAgICAgICBjb25zdCBzaGlwc0FyciA9IFsnY2FycmllcicsICdiYXR0bGUnLCAnY3J1aXNlcicsICAnc3VibWFyaW5lJywgJ2Rlc3Ryb3llciddO1xyXG4gICAgICAgIHNoaXBzQXJyLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lQm9hcmRPYmpbc2hpcF0uc2hpcENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb29yZHNBcnIucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29vcmRTdHJpbmcgPSBgJHtjb29yZFswXX0sJHtjb29yZFsxXX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtjb29yZFN0cmluZ31cIl1gKS5jbGFzc0xpc3QuYWRkKCdiZ1NoaXAnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgaGl0XHJcbiAgICBjb25zdCBib2FyZEhpdCA9IChib2FyZCwgaGl0Q29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHtoaXRDb29yZFswXX0sJHtoaXRDb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2RhdGFDb29yZH1cIl1gKTtcclxuICAgICAgICBjb25zdCBhdHRja0ljbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBhdHRja0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgYXR0Y2tJY24uaW5uZXJUZXh0ID0gJ2NhbmNlbCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQoYXR0Y2tJY24pO1xyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGF0dGNrSWNuKS5vcGFjaXR5O1xyXG4gICAgICAgIGF0dGNrSWNuLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIG1pc3NcclxuICAgIGNvbnN0IGJvYXJkTWlzcyA9IChib2FyZCwgbWlzc0Nvb3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7bWlzc0Nvb3JkWzBdfSwke21pc3NDb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2RhdGFDb29yZH1cIl1gKTtcclxuICAgICAgICBjb25zdCBtaXNzSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG1pc3NJY24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgICAgIG1pc3NJY24uaW5uZXJUZXh0ID0gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnO1xyXG4gICAgICAgIGdyaWRFbGVtLmFwcGVuZENoaWxkKG1pc3NJY24pO1xyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1pc3NJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgbWlzc0ljbi5zdHlsZS5vcGFjaXR5ID0gMTsgXHJcbiAgICB9O1xyXG4gICAgLy9yZXR1cm5zIHRoZSBjb29yZHMgaW4gYW4gYXJyYXkgb2YgZ3JpZCBjbGlja2VkXHJcbiAgICBjb25zdCBjbGlja0Nvb3JkID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29vcmRTdHIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZFwiKTtcclxuICAgICAgICBjb25zdCBjb29yZFN0ckFyciA9IGNvb3JkU3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgbGV0IGNvb3JkID0gW107XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclswXSkpO1xyXG4gICAgICAgIGNvb3JkLnB1c2gocGFyc2VJbnQoY29vcmRTdHJBcnJbMV0pKTtcclxuICAgICAgICByZXR1cm4gY29vcmQ7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgcGxheWVyIGlucHV0IGJveFxyXG4gICAgY29uc3QgcGxheWVySW5wdXRCb3ggPSAocGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2VDb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBpbnB1dEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGlucHV0Qm94LmlkID0gJ3BsYXllcklucHV0Qm94JztcclxuICAgICAgICBpbnB1dEJveC5jbGFzc0xpc3QuYWRkKCdmbGV4Q29sdW1uQ2VudGVyJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0Qm94KTtcclxuICAgICAgICBjb25zdCBpbnB1dGluc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgaW5wdXRpbnN0LmlubmVyVGV4dCA9IGBFbnRlciAke3BsYXllcn0gTmFtZSBhbmQgc2VsZWN0IFBsYXllciBUeXBlYDtcclxuICAgICAgICBjb25zdCBpbnB1dEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmlkID0gJ2lucHV0Rm9ybSc7XHJcbiAgICAgICAgaW5wdXRGb3JtLmNsYXNzTGlzdC5hZGQoJ2ZsZXhDb2x1bW5DZW50ZXInKTtcclxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIG5hbWVJbnB1dC5pZCA9ICduYW1lSW5wdXQnO1xyXG4gICAgICAgIG5hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIG5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGh1bWFuU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBodW1hbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBodW1hbklucHV0LmlkID0gJ2h1bWFuSW5wdXQnO1xyXG4gICAgICAgIGh1bWFuSW5wdXQubmFtZSA9ICd0eXBlSW5wdXQnO1xyXG4gICAgICAgIGh1bWFuSW5wdXQudHlwZSA9ICdyYWRpbyc7XHJcbiAgICAgICAgaHVtYW5JbnB1dC52YWx1ZSA9ICdodW1hbic7XHJcbiAgICAgICAgaHVtYW5JbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGh1bWFuTGFiZWwgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICBodW1hbkxhYmVsLmh0bWxGb3IgPSAnaHVtYW5JbnB1dCc7XHJcbiAgICAgICAgaHVtYW5MYWJlbC5pbm5lclRleHQgPSAnSHVtYW4nO1xyXG4gICAgICAgIGNvbnN0IGNvbXBTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgY29tcElucHV0LmlkID0gJ2h1bWFuSW5wdXQnO1xyXG4gICAgICAgIGNvbXBJbnB1dC5uYW1lID0gJ3R5cGVJbnB1dCc7XHJcbiAgICAgICAgY29tcElucHV0LnR5cGUgPSAncmFkaW8nO1xyXG4gICAgICAgIGNvbXBJbnB1dC52YWx1ZSA9ICdjb21wdXRlcic7XHJcbiAgICAgICAgY29tcElucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgY29uc3QgY29tcExhYmVsID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgY29tcExhYmVsLmh0bWxGb3IgPSAnY29tcElucHV0JztcclxuICAgICAgICBjb21wTGFiZWwuaW5uZXJUZXh0ID0gJ0NvbXB1dGVyJztcclxuICAgICAgICBjb25zdCBzdWJtaXRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgc3VibWl0SW5wdXQuaWQgPSdzdWJtaXRJbnB1dCdcclxuICAgICAgICBzdWJtaXRJbnB1dC50eXBlID0gJ3N1Ym1pdCc7XHJcbiAgICAgICAgc3VibWl0SW5wdXQudmFsdWUgPSAnRW50ZXInO1xyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKGlucHV0aW5zdCk7XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoaW5wdXRGb3JtKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcclxuICAgICAgICBodW1hblNwYW4uYXBwZW5kQ2hpbGQoaHVtYW5JbnB1dCk7XHJcbiAgICAgICAgaHVtYW5TcGFuLmFwcGVuZENoaWxkKGh1bWFuTGFiZWwpO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChodW1hblNwYW4pO1xyXG4gICAgICAgIGNvbXBTcGFuLmFwcGVuZENoaWxkKGNvbXBJbnB1dCk7XHJcbiAgICAgICAgY29tcFNwYW4uYXBwZW5kQ2hpbGQoY29tcExhYmVsKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoY29tcFNwYW4pO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChzdWJtaXRJbnB1dCk7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIGlucHV0IHZhbHVlcyBhbmQgcmVtb3ZlcyBpbnB1dEJveFxyXG4gICAgY29uc3QgZ2V0UGxheWVySW5wdXRzID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lSW5wdXQnKS52YWx1ZTtcclxuICAgICAgICBjb25zdCB0eXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVySW5wdXRCb3gnKS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gW25hbWUsIHR5cGVdO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGlucHV0IGJveCBhbmQgaW5wdXQgZ3JpZCB0byBnZXQgc2hpcCBwb3NpdGlvbnNcclxuICAgIGNvbnN0IHNoaXBJbnB1dEJveCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZUNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaW5wdXRCb3guaWQgPSAnc2hpcElucHV0Qm94JztcclxuICAgICAgICBpbnB1dEJveC5jbGFzc0xpc3QuYWRkKCdmbGV4Um93Q2VudGVyJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0Qm94KTtcclxuICAgICAgICBjb25zdCBpbnB1dEdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbnB1dEdyaWQuY2xhc3NMaXN0LmFkZCgnZ2FtZUJvYXJkJyk7XHJcbiAgICAgICAgaW5wdXRHcmlkLmNsYXNzTGlzdC5hZGQoJ3RlblB4TWFyZ2luJyk7XHJcbiAgICAgICAgaW5wdXRHcmlkLmlkID0gJ2lucHV0Qm9hcmQnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgaW5wdXRHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoaW5wdXRHcmlkKTtcclxuICAgICAgICBjb25zdCBpbnB1dEJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2lucHV0Qm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgbGV0IHNwYW5Db3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlDb29yZCAgPSB5O1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICAgICAgaW5wdXRCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuQ291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzaGlwSW5mby5pZCA9ICdzaGlwSW5mbyc7XHJcbiAgICAgICAgc2hpcEluZm8uY2xhc3NMaXN0LmFkZCgnZmxleENvbHVtbkNlbnRlcicpO1xyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKHNoaXBJbmZvKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBzaGlwIGFuZCBkaXJlY3Rpb24gIHNlbGVjdGlvbiBmb3IgY2xpY2sgYW5kIHBsYWNlXHJcbiAgICBjb25zdCBzaG93SW5wdXRTaGlwID0gKHNoaXBOYW1lLCBzaGlwTGVuZ3RoLCBwbGF5ZXJOYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcEluZm8nKTtcclxuICAgICAgICBzaGlwSW5mby5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBjb25zdCB0ZXh0U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB0ZXh0U3Bhbi5pZCA9ICdzaGlwSW5zdHInO1xyXG4gICAgICAgIHRleHRTcGFuLmlubmVyVGV4dCA9IGAke3BsYXllck5hbWV9LCBwbGFjZSB0aGUgc2hpcCBieSBzZWxlY3RpbmcgYSBncmlkIHNwYWNlICh0aGUgc2hpcCBkaXJlY3Rpb24gY2FuIGJlIGNoYW5nZWQgYnkgY2xpY2tpbmcgb24gWC9ZKWA7XHJcbiAgICAgICAgc2hpcEluZm8uYXBwZW5kQ2hpbGQodGV4dFNwYW4pO1xyXG4gICAgICAgIGNvbnN0IHNoaXBUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHNoaXBUeXBlLmlkID0gJ3NoaXBUeXBlJztcclxuICAgICAgICBzaGlwVHlwZS5pbm5lclRleHQgPSBgJHtzaGlwTmFtZX0gKCR7c2hpcExlbmd0aH0pYDtcclxuICAgICAgICBzaGlwSW5mby5hcHBlbmRDaGlsZChzaGlwVHlwZSk7XHJcbiAgICAgICAgY29uc3Qgc2hpcEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc2hpcEljb24uaWQgPSAnc2hpcEljb24nO1xyXG4gICAgICAgIHNoaXBJY29uLnN0eWxlLmdyaWRUZW1wbGF0ZSA9IGAzMHB4IC8gcmVwZWF0KCR7c2hpcExlbmd0aH0sIDMwcHgpYDtcclxuICAgICAgICBzaGlwSW5mby5hcHBlbmRDaGlsZChzaGlwSWNvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICBzaGlwSWNvbi5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHh5U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICB4eVNwYW4uaWQgPSAneHlEaXJlY3QnO1xyXG4gICAgICAgIHh5U3Bhbi5pbm5lclRleHQgPSAnWCAvIFknO1xyXG4gICAgICAgIHh5U3Bhbi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgc2hpcEluZm8uYXBwZW5kQ2hpbGQoeHlTcGFuKTtcclxuICAgIH07XHJcbiAgICAvL2NoYW5nZSBzaGlwIGRpcmVjdGlvblxyXG4gICAgY29uc3QgY2hhbmdlU2hpcERpciA9IChkaXJlY3QsIHNoaXBMZW5ndGgpID0+IHtcclxuICAgICAgICBjb25zdCBzaGlwSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwSWNvbicpO1xyXG4gICAgICAgIGlmIChkaXJlY3QgPT09ICdYJykge1xyXG4gICAgICAgICAgICBzaGlwSWNvbi5zdHlsZS5ncmlkVGVtcGxhdGUgPSBgMzBweCAvIHJlcGVhdCgke3NoaXBMZW5ndGh9LCAzMHB4KWA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hpcEljb24uc3R5bGUuZ3JpZFRlbXBsYXRlID0gYHJlcGVhdCgke3NoaXBMZW5ndGh9LCAzMHB4KSAvIDMwcHhgO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdCb2FyZCxcclxuICAgICAgICBhZGRHYW1lQnRuLFxyXG4gICAgICAgIHJlbW92ZUdhbWVCdG4sXHJcbiAgICAgICAgdGV4dEluc3RydWN0LFxyXG4gICAgICAgIG5ld0V2ZW50TGlzdCxcclxuICAgICAgICByZW1vdmVFdmVudExpc3QsXHJcbiAgICAgICAgYWRkTGlua0NsYXNzLFxyXG4gICAgICAgIHJlbW92ZUxpbmtDbGFzcyxcclxuICAgICAgICBzaG93U2hpcHMsXHJcbiAgICAgICAgYm9hcmRIaXQsXHJcbiAgICAgICAgYm9hcmRNaXNzLFxyXG4gICAgICAgIGNsaWNrQ29vcmQsXHJcbiAgICAgICAgcGxheWVySW5wdXRCb3gsXHJcbiAgICAgICAgZ2V0UGxheWVySW5wdXRzLFxyXG4gICAgICAgIHNoaXBJbnB1dEJveCxcclxuICAgICAgICBzaG93SW5wdXRTaGlwLFxyXG4gICAgICAgIGNoYW5nZVNoaXBEaXJcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBET00gfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=