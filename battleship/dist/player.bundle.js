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
    //render input pop up
    const inputBox = (player) => {
        const container = document.getElementById('pageContainer');
        const inputBox = document.createElement('div');
        inputBox.id = 'inputBox';
        container.appendChild(inputBox);
        
        const inputinst = document.createElement('span');
        inputinst.innerText = `Enter ${player} Name and select Player Type`;
        const inputForm = document.createElement('form');
        inputForm.id = 'inputForm';
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
    const getInputs = (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const type = document.querySelector('input[type="radio"]:checked').value;
        document.getElementById('inputBox').remove();
        return [name, type];
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
        inputBox,
        getInputs
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3BsYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAoKCkgPT4ge1xyXG4gICAgLy9yZW5kZXIgZ2FtZSBib2FyZHNcclxuICAgIGNvbnN0IG5ld0JvYXJkID0gKHAxT2JqLCBwMk9iaikgPT4ge1xyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDFHcmlkXHJcbiAgICAgICAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcclxuICAgICAgICBwMUdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMUdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAyR3JpZFxyXG4gICAgICAgIGNvbnN0IHAyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgcDJHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgcDJHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hZGQgY29vcmRpbmF0ZSBhdHRyaWJ1dGUgdG8gZWFjaCBzcGFuXHJcbiAgICAgICAgY29uc3QgcDFCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMUJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IHAyQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDJCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBsZXQgc3BhbkNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDEwOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICBwMUJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHAyQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgc3BhbkNvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmVuZGVyIHBsYXllciBuYW1lcyBiZWxvdyBlYWNoIGJvYXJkXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AxQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3AxT2JqLm5hbWV9J3MgQm9hcmRgO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwMkJvYXJkICsgLnBsYXllck5hbWUnKS5pbm5lclRleHQgPSBgJHtwMk9iai5uYW1lfSdzIEJvYXJkYDtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBhIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgYWRkR2FtZUJ0biA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBidG5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uQ29udGFpbmVyJyk7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGdhbWVCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICAgICAgZ2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgZ2FtZUJ0bi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQnRuKTtcclxuICAgIH07XHJcbiAgICAvL3JlbW92ZSBzdGFydCBidXR0b25cclxuICAgIGNvbnN0IHJlbW92ZUdhbWVCdG4gPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCdXR0b24nKS5yZW1vdmUoKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciB0ZXh0IGluc3RydWN0aW9uc1xyXG4gICAgY29uc3QgdGV4dEluc3RydWN0ID0gKHRleHQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbnMnKTtcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSAnJztcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfTtcclxuICAgIC8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCBuZXdFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGNvbnN0IHJlbW92ZUV2ZW50TGlzdCA9ICAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgYWRkTGlua0NsYXNzID0gKGFjdEJvYXJkSUQsICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RCb2FyZElEKTtcclxuICAgICAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIH07XHJcbiAgICBjb25zdCByZW1vdmVMaW5rQ2xhc3MgPSAoZGVhY3RCb2FyZElEKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVhY3RCb2FyZElEKTtcclxuICAgICAgICBkZWFjdEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbGluaycpO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGFsbCBzaGlwcyBvbiBib2FyZFxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICAvL2NvbGxlY3QgYWxsIHNoaXAgY29vcmRpbmF0ZXMgYW5kIGFkZCBiZyBjbGFzc1xyXG4gICAgICAgIGNvbnN0IHNoaXBzQXJyID0gWydjYXJyaWVyJywgJ2JhdHRsZScsICdjcnVpc2VyJywgICdzdWJtYXJpbmUnLCAnZGVzdHJveWVyJ107XHJcbiAgICAgICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWVCb2FyZE9ialtzaGlwXS5zaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvb3Jkc0Fyci5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWzBdfSwke2Nvb3JkWzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBoaXRcclxuICAgIGNvbnN0IGJvYXJkSGl0ID0gKGJvYXJkLCBoaXRDb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb29yZCA9IGAke2hpdENvb3JkWzBdfSwke2hpdENvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IGF0dGNrSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGF0dGNrSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBhdHRja0ljbi5pbm5lclRleHQgPSAnY2FuY2VsJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChhdHRja0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoYXR0Y2tJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgYXR0Y2tJY24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgbWlzc1xyXG4gICAgY29uc3QgYm9hcmRNaXNzID0gKGJvYXJkLCBtaXNzQ29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHttaXNzQ29vcmRbMF19LCR7bWlzc0Nvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IG1pc3NJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbWlzc0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgbWlzc0ljbi5pbm5lclRleHQgPSAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQobWlzc0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUobWlzc0ljbikub3BhY2l0eTtcclxuICAgICAgICBtaXNzSWNuLnN0eWxlLm9wYWNpdHkgPSAxOyBcclxuICAgIH07XHJcbiAgICAvL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuICAgIGNvbnN0IGNsaWNrQ29vcmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgICAgIHJldHVybiBjb29yZDtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBpbnB1dCBwb3AgdXBcclxuICAgIGNvbnN0IGlucHV0Qm94ID0gKHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbnB1dEJveC5pZCA9ICdpbnB1dEJveCc7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0Qm94KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBpbnB1dGluc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgaW5wdXRpbnN0LmlubmVyVGV4dCA9IGBFbnRlciAke3BsYXllcn0gTmFtZSBhbmQgc2VsZWN0IFBsYXllciBUeXBlYDtcclxuICAgICAgICBjb25zdCBpbnB1dEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmlkID0gJ2lucHV0Rm9ybSc7XHJcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBuYW1lSW5wdXQuaWQgPSAnbmFtZUlucHV0JztcclxuICAgICAgICBuYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBodW1hblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgaHVtYW5JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaHVtYW5JbnB1dC5pZCA9ICdodW1hbklucHV0JztcclxuICAgICAgICBodW1hbklucHV0Lm5hbWUgPSAndHlwZUlucHV0JztcclxuICAgICAgICBodW1hbklucHV0LnR5cGUgPSAncmFkaW8nO1xyXG4gICAgICAgIGh1bWFuSW5wdXQudmFsdWUgPSAnaHVtYW4nO1xyXG4gICAgICAgIGh1bWFuSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBodW1hbkxhYmVsID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgaHVtYW5MYWJlbC5odG1sRm9yID0gJ2h1bWFuSW5wdXQnO1xyXG4gICAgICAgIGh1bWFuTGFiZWwuaW5uZXJUZXh0ID0gJ0h1bWFuJztcclxuICAgICAgICBjb25zdCBjb21wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBjb21wSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGNvbXBJbnB1dC5pZCA9ICdodW1hbklucHV0JztcclxuICAgICAgICBjb21wSW5wdXQubmFtZSA9ICd0eXBlSW5wdXQnO1xyXG4gICAgICAgIGNvbXBJbnB1dC50eXBlID0gJ3JhZGlvJztcclxuICAgICAgICBjb21wSW5wdXQudmFsdWUgPSAnY29tcHV0ZXInO1xyXG4gICAgICAgIGNvbXBJbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBMYWJlbCA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGNvbXBMYWJlbC5odG1sRm9yID0gJ2NvbXBJbnB1dCc7XHJcbiAgICAgICAgY29tcExhYmVsLmlubmVyVGV4dCA9ICdDb21wdXRlcic7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIHN1Ym1pdElucHV0LmlkID0nc3VibWl0SW5wdXQnXHJcbiAgICAgICAgc3VibWl0SW5wdXQudHlwZSA9ICdzdWJtaXQnO1xyXG4gICAgICAgIHN1Ym1pdElucHV0LnZhbHVlID0gJ0VudGVyJztcclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChpbnB1dGluc3QpO1xyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKGlucHV0Rm9ybSk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XHJcbiAgICAgICAgaHVtYW5TcGFuLmFwcGVuZENoaWxkKGh1bWFuSW5wdXQpO1xyXG4gICAgICAgIGh1bWFuU3Bhbi5hcHBlbmRDaGlsZChodW1hbkxhYmVsKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoaHVtYW5TcGFuKTtcclxuICAgICAgICBjb21wU3Bhbi5hcHBlbmRDaGlsZChjb21wSW5wdXQpO1xyXG4gICAgICAgIGNvbXBTcGFuLmFwcGVuZENoaWxkKGNvbXBMYWJlbCk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGNvbXBTcGFuKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0SW5wdXQpO1xyXG4gICAgfTtcclxuICAgIC8vZ2V0IHBsYXllciBpbnB1dCB2YWx1ZXMgYW5kIHJlbW92ZXMgaW5wdXRCb3hcclxuICAgIGNvbnN0IGdldElucHV0cyA9IChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZUlucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0Qm94JykucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIFtuYW1lLCB0eXBlXTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdCb2FyZCxcclxuICAgICAgICBhZGRHYW1lQnRuLFxyXG4gICAgICAgIHJlbW92ZUdhbWVCdG4sXHJcbiAgICAgICAgdGV4dEluc3RydWN0LFxyXG4gICAgICAgIG5ld0V2ZW50TGlzdCxcclxuICAgICAgICByZW1vdmVFdmVudExpc3QsXHJcbiAgICAgICAgYWRkTGlua0NsYXNzLFxyXG4gICAgICAgIHJlbW92ZUxpbmtDbGFzcyxcclxuICAgICAgICBzaG93U2hpcHMsXHJcbiAgICAgICAgYm9hcmRIaXQsXHJcbiAgICAgICAgYm9hcmRNaXNzLFxyXG4gICAgICAgIGNsaWNrQ29vcmQsXHJcbiAgICAgICAgaW5wdXRCb3gsXHJcbiAgICAgICAgZ2V0SW5wdXRzXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgRE9NIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01cIjtcclxuXHJcbmNvbnN0IG5ld1BsYXllciA9IChuYW1lLCB0eXBlKSA9PiB7XHJcbiAgICBjb25zdCByYW5Db29yZCA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWRTaXplKSArIDE7XHJcbiAgICAgICAgY29uc3QgeUNvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZFNpemUpICsgMTtcclxuICAgICAgICByZXR1cm4gW3hDb29yZCwgeUNvb3JkXTtcclxuICAgIH07XHJcbiAgICBpZiAodHlwZSA9PT0gJ2h1bWFuJykge1xyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZX07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAvL3BpY2sgYSByYW5kb20gZ3JpZCBwb2ludCB3aXRoaW4gYSBncmlkIGFuZCBhIHJhbmRvbSBYL1kgZGlyZWN0aW9uXHJcbiAgICAgICAgY29uc3Qgc2hpcFN0YXJ0UG9zID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHh5RGlyID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/ICdYJyA6ICdZJztcclxuICAgICAgICAgICAgY29uc3QgW3hDb29yZCwgeUNvb3JkXSA9IHJhbkNvb3JkKGdyaWRTaXplKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtbeENvb3JkLCB5Q29vcmRdLCB4eURpcl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcGljayBhIHJhbmRvbSBncmlkIHBvaW50IGdpdmVuIGEgY2VydGFpbiBncmlkIHNpemVcclxuICAgICAgICBjb25zdCBjb21wQXR0YWNrID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByYW5Db29yZChncmlkU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZSwgc2hpcFN0YXJ0UG9zLCBjb21wQXR0YWNrfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgbmV3UGxheWVyIH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9