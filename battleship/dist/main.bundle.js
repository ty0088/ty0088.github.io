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
        //render placed ships and current mouse position ship, all other spans to white --------------
        const boardSpans = document.querySelectorAll('#inputBoard > span');
        boardSpans.forEach(span => {
            span.classList.remove('bgShip');
            span.classList.add('bgWhite');
        });
        //-------------------------------------
        const coord = clickCoord(event);
        let coordX = coord[0];
        let coordY = coord[1];
        if (shipDirect === 'X') {
            for (let i = 0; i < shipLength; i++) {
                let nextCoordX = coordX + i;
                const coordString = `${nextCoordX},${coordY}`;
                const shipElem = document.querySelector(`#inputBoard > [data-coord="${coordString}"]`);
                shipElem.classList.toggle('bgWhite');
                shipElem.classList.add('bgShip');
            }
        } else {
            for (let i = 0; i < shipLength; i++) {
                let nextCoordY = coordY + i;
                const coordString = `${coordX},${nextCoordY}`;
                const shipElem = document.querySelector(`#inputBoard > [data-coord="${coordString}"]`);
                shipElem.classList.toggle('bgWhite');
                shipElem.classList.add('bgShip');
            }
        }
    };
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



/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newPlayer": () => (/* binding */ newPlayer)
/* harmony export */ });
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



/***/ }),

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
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");




const gameModule =(() =>  {
    let p1Obj = {};
    let p2Obj = {};
    let p1Board = {};
    let p2Board = {};
    let p1name = '';
    let p2name = '';
    let p1type = '';
    let p2type = '';
    let attackCoord = '';
    let shipDirect = 'X';
    let currShipType = 'Carrier';
    let currShipLength = 5;
    let currCoord = [];
    let currPlayObj = {};
    let currBoardObj = {};

    //event handlers
    const changeShipClick = () => {
        shipDirect === 'X' ? shipDirect = 'Y' : shipDirect = 'X';
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.changeShipDir(shipDirect, currShipLength);
    };
    const shipOverlayClick = (event) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.shipOverlay(event, shipDirect, currShipLength)
    };
    const shipInputClick = (event) => {
        //check ship placement is acceptable
        currCoord = _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        if (currBoardObj.checkCoord(currCoord, currShipType, currShipLength, shipDirect)) {
            //render ship on inputBoard 
            //if ok, remove shipOverlay listener and inputclick listener
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('shipIcon', 'click', changeShipClick);
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('inputBoard', 'mouseover', shipOverlayClick);
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('inputBoard', 'click', shipInputClick);
            //ask for confirmation to place ship, if yes, placeship and load next ship
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.confirmShip();
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('confShip', 'click', nextShip)
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('cancShip', 'click', showCurrShip)
        }
    };

    const newGame = (gridSize) => {
        p1Board = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.newGameBoard)(gridSize);
        p2Board = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__.newGameBoard)(gridSize);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct('');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.playerInputBox('Player 1');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('inputForm', 'submit', getPlayer1);
    };
    //get player 1's name and type values from DOM, then get player 2's details
    const getPlayer1 = (e) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('inputForm', 'submit', getPlayer1);
        [p1name, p1type] = _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.getPlayerInputs(e);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.playerInputBox('Player 2');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('inputForm', 'submit', getPlayer2);
    };
    //get player 2's name and type, create player objects and get ship locations
    const getPlayer2 = (e) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('inputForm', 'submit', getPlayer2);
        [p2name, p2type] = _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.getPlayerInputs(e);
        p1Obj = (0,_player__WEBPACK_IMPORTED_MODULE_0__.newPlayer)(p1name, p1type);
        p2Obj = (0,_player__WEBPACK_IMPORTED_MODULE_0__.newPlayer)(p2name, p2type);
        getP1Ships();
    };
    //get player 1's ship locations
    const getP1Ships = () => {
        currPlayObj = p1Obj;
        currBoardObj = p1Board;
        if (p1Obj.type === 'human') {
            //if p1 is human, render shipInputBox
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.shipInputBox();
            showCurrShip();
        } else {
            //get computer to place ships
        }
        //getShipInputs
        //getP2Ships
    };
    //get player 2's ship locations
    const getP2Ships = () => {
        currPlayObj = p2Obj;
        currBoardObj = p2Board;
        if (p2Obj.type === 'human') {
            nextShip();//-------------- this places ship straight away!
        } else {
            //get computer to place ships
        }

    };
    //load current input ship
    const showCurrShip = () => {
        console.log(currShipType)
        //show curr ship
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.showInputShip(currShipType, currShipLength, currPlayObj.name);
        //add event listener for direction change
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('shipIcon', 'click', changeShipClick);
        //add event listener for inputBoard, on hover should show ship
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('inputBoard', 'mouseover', shipOverlayClick);
        //add event listener for inputBoard, on click should check ship placement, place ship and ask for confirm
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('inputBoard', 'click', shipInputClick);
    };
    //confirm ship placement and load next ship
    const nextShip = () => {
        console.log('1')
        //place ship
        currBoardObj.placeShip(currCoord, currShipType, currShipLength, shipDirect, 10);
        //remove event listeners
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('confShip', 'click', nextShip)
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('cancShip', 'click', showCurrShip)
        console.log('2')
        //update current ship variables and render next ship
        //if all ships placed, move to next player or start game
        console.log(currBoardObj.ships)
        if (!currBoardObj.ships.every(ship => { //---------------------
            console.log('3')
            if (ship.shipCoords.length === 0) {
                console.log('4')
                currShipType = ship.type;
                currShipLength = ship.length;
                return false;
            }
            return true;
        })) {
            showCurrShip();
        } else {
            if (currPlayObj === p1Obj) {
                getP2Ships();
            } else {
                //remove input box and load game ---------------
                loadGame(10);
            }
        }
    };
    //load game boards
    const loadGame = () =>  {
        //place ships in code, DOM input to be added
        //-------------------------------------------
        // p1Board.placeShip([6,4], 'carrier', 5, 'Y');
        // p1Board.placeShip([1,1], 'battle', 4, 'X');
        // p1Board.placeShip([2,6], 'cruiser', 3, 'Y');
        // p1Board.placeShip([4,6], 'submarine', 3, 'Y');
        // p1Board.placeShip([9,6], 'destroyer', 2, 'X');
        // p2Board.placeShip([5,10], 'carrier', 5, 'X');
        // p2Board.placeShip([3,5], 'battle', 4, 'X');
        // p2Board.placeShip([2,7], 'cruiser', 3, 'Y');
        // p2Board.placeShip([8,1], 'submarine', 3, 'X');
        // p2Board.placeShip([9,8], 'destroyer', 2, 'X');
        //-------------------------------------------
        //render game board and start button
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newBoard(p1Obj, p2Obj);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Start Game');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Start Game');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('gameButton', 'click', startGame);
    };
    //start game loop by removing start button and starting player 1s turn
    const startGame = () => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('gameButton', 'click', startGame);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeGameBtn();
        //randomly select first player
        if (Math.random() < 0.5) {
            p1Turn();
        } else {
            p2Turn();
        }
    };

    //remove any existing event listener for player 2, update game instructions and activate board 2 for attack
    const p1Turn = () => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p1Board');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p1Board', 'click', p2Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${p1Obj.name}'s turn. Pick a grid to attack on ${p2Obj.name}'s board!`);
        //if player is computer, computer to trigger click on random grid
        if (p1Obj.type === 'computer') {
            setTimeout(() => p1Attack(), 700);
        } else {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addLinkClass('p2Board');
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('p2Board', 'click', p1Attack);
        }
    }

    //on player 1 click (attack)
    const p1Attack = (event) => {
        let p2HitCount = p2Board.countHits();
        let p2MissCount = p2Board.misses.length;
        //recieve attack coordinates (DOM for human or method for comp) and confirm hit or miss
        attackCoord = (p1Obj.type === 'computer') ? p1Obj.compAttack(p1Board.gridSize) : _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p2Board.receiveAttack(attackCoord);
        //if new hit, render hit, call checkAllSunk() and check for winner. If not all ships sunk, next player turn
        if (p2HitCount !== p2Board.countHits()) {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHit('p2Board', attackCoord);
            if (p2Board.checkAllSunk()) {
                winner(p1Obj.name, p1Board.gridSize);
            } else {
                p2Turn();
            }
        } else if (p2MissCount !== p2Board.misses.length) {
            //if new miss, render miss and call next players turn
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardMiss('p2Board', attackCoord);
            p2Turn();
        } else {
            //if grid has already been picked, pick again
            p1Attack();
        }
    };

    //remove any existing event listener for player 1, update game instructions and activate board 2 for attack
    const p2Turn = () => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p2Board');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p2Board', 'click', p1Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${p2Obj.name}'s turn. Pick a grid to attack on ${p1Obj.name}'s board!`);
         //if player is computer, computer to pick a grid and attack
        if (p2Obj.type === 'computer') {
            setTimeout(() => p2Attack(), 700);
        } else {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addLinkClass('p1Board');
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('p1Board', 'click', p2Attack);
        }
    };

    //on player 2 click (attack)
    const p2Attack = (event) => {
        let p1HitCount = p1Board.countHits();
        let p1MissCount = p1Board.misses.length;
        attackCoord = (p2Obj.type === 'computer') ? p2Obj.compAttack(p2Board.gridSize) : _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.clickCoord(event);
        p1Board.receiveAttack(attackCoord);
        if (p1HitCount !== p1Board.countHits()) {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardHit('p1Board', attackCoord);
            if (p1Board.checkAllSunk()) {
                winner(p2Obj.name, p2Board.gridSize);
            } else {
                p1Turn();
            }
        } else if (p1MissCount !== p1Board.misses.length) {
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.boardMiss('p1Board', attackCoord);
            p1Turn();
        } else {
            p2Attack();
        }
    };

    const winner = (player, gridSize) => {
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.textInstruct(`${player} is the winner!! They have sunk all the enemy ships!`);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.showShips('p1Board', p1Board);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.showShips('p2Board', p2Board);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p1Board', 'click', p1Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('p2Board', 'click', p2Attack);
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p1Board');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeLinkClass('p2Board');
        //render restart button
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.addGameBtn('Restart');
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('gameButton', 'click', () => newGame(gridSize));
    };

    return {
        newGame
    };
})();

gameModule.newGame(10);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUM1QixZQUFZLGtEQUFnQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlGQUF5RixnREFBYztBQUN2RztBQUNBO0FBQ0EsWUFBWSw4Q0FBWTtBQUN4QjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsWUFBWSwrQ0FBYTtBQUN6QjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBZ0IsSUFBSSxRQUFRO0FBQ3BDLFFBQVEsK0NBQWE7QUFDckIsUUFBUSwrQ0FBYTtBQUNyQixRQUFRLHFEQUFtQjtBQUMzQixRQUFRLHFEQUFtQjtBQUMzQixRQUFRLHFEQUFtQjtBQUMzQixRQUFRLHFEQUFtQjtBQUMzQjtBQUNBLFFBQVEsZ0RBQWM7QUFDdEIsUUFBUSxrREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgRE9NID0gKCgpID0+IHtcclxuICAgIC8vcmVuZGVyIGdhbWUgYm9hcmRzXHJcbiAgICBjb25zdCBuZXdCb2FyZCA9IChwMU9iaiwgcDJPYmopID0+IHtcclxuICAgICAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAxR3JpZFxyXG4gICAgICAgIGNvbnN0IHAxR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgcDFHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgcDFHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMkdyaWRcclxuICAgICAgICBjb25zdCBwMkdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDJCb2FyZCcpO1xyXG4gICAgICAgIHAyR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIHAyR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vYWRkIGNvb3JkaW5hdGUgYXR0cmlidXRlIHRvIGVhY2ggc3BhblxyXG4gICAgICAgIGNvbnN0IHAxQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDFCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBjb25zdCBwMkJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AyQm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgbGV0IHNwYW5Db3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlDb29yZCAgPSB5O1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICAgICAgcDFCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBwMkJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3JlbmRlciBwbGF5ZXIgbmFtZXMgYmVsb3cgZWFjaCBib2FyZFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwMUJvYXJkICsgLnBsYXllck5hbWUnKS5pbm5lclRleHQgPSBgJHtwMU9iai5uYW1lfSdzIEJvYXJkYDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcDJCb2FyZCArIC5wbGF5ZXJOYW1lJykuaW5uZXJUZXh0ID0gYCR7cDJPYmoubmFtZX0ncyBCb2FyZGA7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgYSBzdGFydCBidXR0b25cclxuICAgIGNvbnN0IGFkZEdhbWVCdG4gPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdhbWVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbkNvbnRhaW5lcicpO1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBnYW1lQnRuLmlkID0gJ2dhbWVCdXR0b24nO1xyXG4gICAgICAgIGdhbWVCdG4uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgICAgIGdhbWVCdG4uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgICAgICBidG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUJ0bik7XHJcbiAgICB9O1xyXG4gICAgLy9yZW1vdmUgc3RhcnQgYnV0dG9uXHJcbiAgICBjb25zdCByZW1vdmVHYW1lQnRuID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQnV0dG9uJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgdGV4dCBpbnN0cnVjdGlvbnNcclxuICAgIGNvbnN0IHRleHRJbnN0cnVjdCA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5zdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5zdHJ1Y3Rpb25zJyk7XHJcbiAgICAgICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgaW5zdEVsZW0uaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIH07XHJcbiAgICAvL2NyZWF0ZSBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgY29uc3QgbmV3RXZlbnRMaXN0ID0gKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuICAgIC8vcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCByZW1vdmVFdmVudExpc3QgPSAgKGVsZW1JRCwgZXZlbnQsIGZ1bmMpID0+IHtcclxuICAgICAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlEKTtcclxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGFkZExpbmtDbGFzcyA9IChhY3RCb2FyZElELCApID0+IHtcclxuICAgICAgICBjb25zdCBhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYWN0Qm9hcmRJRCk7XHJcbiAgICAgICAgYWN0RWxlbS5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVtb3ZlTGlua0NsYXNzID0gKGRlYWN0Qm9hcmRJRCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlYWN0Qm9hcmRJRCk7XHJcbiAgICAgICAgZGVhY3RFbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBhbGwgc2hpcHMgb24gYm9hcmRcclxuICAgIGNvbnN0IHNob3dTaGlwcyA9IChib2FyZCwgZ2FtZUJvYXJkT2JqKSA9PiB7XHJcbiAgICAgICAgLy9jb2xsZWN0IGFsbCBzaGlwIGNvb3JkaW5hdGVzIGFuZCBhZGQgYmcgY2xhc3NcclxuICAgICAgICBjb25zdCBzaGlwc0FyciA9IFsnY2FycmllcicsICdiYXR0bGUnLCAnY3J1aXNlcicsICAnc3VibWFyaW5lJywgJ2Rlc3Ryb3llciddO1xyXG4gICAgICAgIHNoaXBzQXJyLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgICAgICBnYW1lQm9hcmRPYmpbc2hpcF0uc2hpcENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb29yZHNBcnIucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29vcmRTdHJpbmcgPSBgJHtjb29yZFswXX0sJHtjb29yZFsxXX1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtjb29yZFN0cmluZ31cIl1gKS5jbGFzc0xpc3QuYWRkKCdiZ1NoaXAnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgaGl0XHJcbiAgICBjb25zdCBib2FyZEhpdCA9IChib2FyZCwgaGl0Q29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHtoaXRDb29yZFswXX0sJHtoaXRDb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2RhdGFDb29yZH1cIl1gKTtcclxuICAgICAgICBjb25zdCBhdHRja0ljbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBhdHRja0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgYXR0Y2tJY24uaW5uZXJUZXh0ID0gJ2NhbmNlbCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQoYXR0Y2tJY24pO1xyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGF0dGNrSWNuKS5vcGFjaXR5O1xyXG4gICAgICAgIGF0dGNrSWNuLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIG1pc3NcclxuICAgIGNvbnN0IGJvYXJkTWlzcyA9IChib2FyZCwgbWlzc0Nvb3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7bWlzc0Nvb3JkWzBdfSwke21pc3NDb29yZFsxXX1gO1xyXG4gICAgICAgIGNvbnN0IGdyaWRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2RhdGFDb29yZH1cIl1gKTtcclxuICAgICAgICBjb25zdCBtaXNzSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIG1pc3NJY24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgICAgIG1pc3NJY24uaW5uZXJUZXh0ID0gJ3JhZGlvX2J1dHRvbl91bmNoZWNrZWQnO1xyXG4gICAgICAgIGdyaWRFbGVtLmFwcGVuZENoaWxkKG1pc3NJY24pO1xyXG4gICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1pc3NJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgbWlzc0ljbi5zdHlsZS5vcGFjaXR5ID0gMTsgXHJcbiAgICB9O1xyXG4gICAgLy9yZXR1cm5zIHRoZSBjb29yZHMgaW4gYW4gYXJyYXkgb2YgZ3JpZCBjbGlja2VkXHJcbiAgICBjb25zdCBjbGlja0Nvb3JkID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29vcmRTdHIgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZFwiKTtcclxuICAgICAgICBpZiAoY29vcmRTdHIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgY29vcmRTdHJBcnIgPSBjb29yZFN0ci5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgICAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclswXSkpO1xyXG4gICAgICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzFdKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb29yZDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgcGxheWVyIGlucHV0IGJveFxyXG4gICAgY29uc3QgcGxheWVySW5wdXRCb3ggPSAocGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2VDb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBpbnB1dEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGlucHV0Qm94LmlkID0gJ3BsYXllcklucHV0Qm94JztcclxuICAgICAgICBpbnB1dEJveC5jbGFzc0xpc3QuYWRkKCdmbGV4Q29sdW1uQ2VudGVyJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0Qm94KTtcclxuICAgICAgICBjb25zdCBpbnB1dGluc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgaW5wdXRpbnN0LmlubmVyVGV4dCA9IGBFbnRlciAke3BsYXllcn0gTmFtZSBhbmQgc2VsZWN0IFBsYXllciBUeXBlYDtcclxuICAgICAgICBjb25zdCBpbnB1dEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmlkID0gJ2lucHV0Rm9ybSc7XHJcbiAgICAgICAgaW5wdXRGb3JtLmNsYXNzTGlzdC5hZGQoJ2ZsZXhDb2x1bW5DZW50ZXInKTtcclxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIG5hbWVJbnB1dC5pZCA9ICduYW1lSW5wdXQnO1xyXG4gICAgICAgIG5hbWVJbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIG5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGh1bWFuU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBodW1hbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBodW1hbklucHV0LmlkID0gJ2h1bWFuSW5wdXQnO1xyXG4gICAgICAgIGh1bWFuSW5wdXQubmFtZSA9ICd0eXBlSW5wdXQnO1xyXG4gICAgICAgIGh1bWFuSW5wdXQudHlwZSA9ICdyYWRpbyc7XHJcbiAgICAgICAgaHVtYW5JbnB1dC52YWx1ZSA9ICdodW1hbic7XHJcbiAgICAgICAgaHVtYW5JbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGh1bWFuTGFiZWwgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICBodW1hbkxhYmVsLmh0bWxGb3IgPSAnaHVtYW5JbnB1dCc7XHJcbiAgICAgICAgaHVtYW5MYWJlbC5pbm5lclRleHQgPSAnSHVtYW4nO1xyXG4gICAgICAgIGNvbnN0IGNvbXBTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgY29tcElucHV0LmlkID0gJ2h1bWFuSW5wdXQnO1xyXG4gICAgICAgIGNvbXBJbnB1dC5uYW1lID0gJ3R5cGVJbnB1dCc7XHJcbiAgICAgICAgY29tcElucHV0LnR5cGUgPSAncmFkaW8nO1xyXG4gICAgICAgIGNvbXBJbnB1dC52YWx1ZSA9ICdjb21wdXRlcic7XHJcbiAgICAgICAgY29tcElucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgY29uc3QgY29tcExhYmVsID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgY29tcExhYmVsLmh0bWxGb3IgPSAnY29tcElucHV0JztcclxuICAgICAgICBjb21wTGFiZWwuaW5uZXJUZXh0ID0gJ0NvbXB1dGVyJztcclxuICAgICAgICBjb25zdCBzdWJtaXRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgc3VibWl0SW5wdXQuaWQgPSdzdWJtaXRJbnB1dCdcclxuICAgICAgICBzdWJtaXRJbnB1dC50eXBlID0gJ3N1Ym1pdCc7XHJcbiAgICAgICAgc3VibWl0SW5wdXQudmFsdWUgPSAnRW50ZXInO1xyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKGlucHV0aW5zdCk7XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoaW5wdXRGb3JtKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcclxuICAgICAgICBodW1hblNwYW4uYXBwZW5kQ2hpbGQoaHVtYW5JbnB1dCk7XHJcbiAgICAgICAgaHVtYW5TcGFuLmFwcGVuZENoaWxkKGh1bWFuTGFiZWwpO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChodW1hblNwYW4pO1xyXG4gICAgICAgIGNvbXBTcGFuLmFwcGVuZENoaWxkKGNvbXBJbnB1dCk7XHJcbiAgICAgICAgY29tcFNwYW4uYXBwZW5kQ2hpbGQoY29tcExhYmVsKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoY29tcFNwYW4pO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChzdWJtaXRJbnB1dCk7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIGlucHV0IHZhbHVlcyBhbmQgcmVtb3ZlcyBpbnB1dEJveFxyXG4gICAgY29uc3QgZ2V0UGxheWVySW5wdXRzID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYW1lSW5wdXQnKS52YWx1ZTtcclxuICAgICAgICBjb25zdCB0eXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVySW5wdXRCb3gnKS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm4gW25hbWUsIHR5cGVdO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGlucHV0IGJveCBhbmQgaW5wdXQgZ3JpZCB0byBnZXQgc2hpcCBwb3NpdGlvbnNcclxuICAgIGNvbnN0IHNoaXBJbnB1dEJveCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZUNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaW5wdXRCb3guaWQgPSAnc2hpcElucHV0Qm94JztcclxuICAgICAgICBpbnB1dEJveC5jbGFzc0xpc3QuYWRkKCdmbGV4Um93Q2VudGVyJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0Qm94KTtcclxuICAgICAgICBjb25zdCBpbnB1dEdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbnB1dEdyaWQuY2xhc3NMaXN0LmFkZCgnZ2FtZUJvYXJkJyk7XHJcbiAgICAgICAgaW5wdXRHcmlkLmNsYXNzTGlzdC5hZGQoJ3RlblB4TWFyZ2luJyk7XHJcbiAgICAgICAgaW5wdXRHcmlkLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgICAgICBpbnB1dEdyaWQuaWQgPSAnaW5wdXRCb2FyZCc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBpbnB1dEdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChpbnB1dEdyaWQpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Qm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaW5wdXRCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBsZXQgc3BhbkNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDEwOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaGlwSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHNoaXBJbmZvLmlkID0gJ3NoaXBJbmZvJztcclxuICAgICAgICBzaGlwSW5mby5jbGFzc0xpc3QuYWRkKCdmbGV4Q29sdW1uQ2VudGVyJyk7XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoc2hpcEluZm8pO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIHNoaXAgYW5kIGRpcmVjdGlvbiBzZWxlY3Rpb24gZm9yIGNsaWNrIGFuZCBwbGFjZVxyXG4gICAgY29uc3Qgc2hvd0lucHV0U2hpcCA9IChzaGlwTmFtZSwgc2hpcExlbmd0aCwgcGxheWVyTmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoaXBJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBJbmZvJyk7XHJcbiAgICAgICAgc2hpcEluZm8uaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgY29uc3QgdGV4dFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgdGV4dFNwYW4uaWQgPSAnc2hpcEluc3RyJztcclxuICAgICAgICB0ZXh0U3Bhbi5pbm5lclRleHQgPSBgJHtwbGF5ZXJOYW1lfSwgcGxhY2UgdGhlIHNoaXAgYnkgc2VsZWN0aW5nIGEgZ3JpZCBzcGFjZSAodGhlIHNoaXAgZGlyZWN0aW9uIGNhbiBiZSBjaGFuZ2VkIGJ5IGNsaWNraW5nIG9uIHRoZSBzaGlwIGljb24pYDtcclxuICAgICAgICBzaGlwSW5mby5hcHBlbmRDaGlsZCh0ZXh0U3Bhbik7XHJcbiAgICAgICAgY29uc3Qgc2hpcFR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc2hpcFR5cGUuaWQgPSAnc2hpcFR5cGUnO1xyXG4gICAgICAgIHNoaXBUeXBlLmlubmVyVGV4dCA9IGAke3NoaXBOYW1lfSAoJHtzaGlwTGVuZ3RofSlgO1xyXG4gICAgICAgIHNoaXBJbmZvLmFwcGVuZENoaWxkKHNoaXBUeXBlKTtcclxuICAgICAgICBjb25zdCBzaGlwSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBzaGlwSWNvbi5pZCA9ICdzaGlwSWNvbic7XHJcbiAgICAgICAgc2hpcEljb24uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgICAgIHNoaXBJY29uLnN0eWxlLmdyaWRUZW1wbGF0ZSA9IGAyMHB4IC8gcmVwZWF0KCR7c2hpcExlbmd0aH0sIDIwcHgpYDtcclxuICAgICAgICBzaGlwSW5mby5hcHBlbmRDaGlsZChzaGlwSWNvbik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICBzaGlwSWNvbi5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2hhbmdlIHNoaXAgZGlyZWN0aW9uXHJcbiAgICBjb25zdCBjaGFuZ2VTaGlwRGlyID0gKHNoaXBEaXJlY3QsIHNoaXBMZW5ndGgpID0+IHtcclxuICAgICAgICBjb25zdCBzaGlwSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwSWNvbicpO1xyXG4gICAgICAgIGlmIChzaGlwRGlyZWN0ID09PSAnWCcpIHtcclxuICAgICAgICAgICAgc2hpcEljb24uc3R5bGUuZ3JpZFRlbXBsYXRlID0gYDIwcHggLyByZXBlYXQoJHtzaGlwTGVuZ3RofSwgMjBweClgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNoaXBJY29uLnN0eWxlLmdyaWRUZW1wbGF0ZSA9IGByZXBlYXQoJHtzaGlwTGVuZ3RofSwgMjBweCkgLyAyMHB4YDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9zaG93IG92ZXJsYXkgb2Ygc2hpcCBvbiBpbnB1dEJvYXJkXHJcbiAgICBjb25zdCBzaGlwT3ZlcmxheSA9IChldmVudCwgc2hpcERpcmVjdCwgc2hpcExlbmd0aCkgPT4ge1xyXG4gICAgICAgIC8vcmVuZGVyIHBsYWNlZCBzaGlwcyBhbmQgY3VycmVudCBtb3VzZSBwb3NpdGlvbiBzaGlwLCBhbGwgb3RoZXIgc3BhbnMgdG8gd2hpdGUgLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBjb25zdCBib2FyZFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2lucHV0Qm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgYm9hcmRTcGFucy5mb3JFYWNoKHNwYW4gPT4ge1xyXG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICBjb25zdCBjb29yZCA9IGNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIGxldCBjb29yZFggPSBjb29yZFswXTtcclxuICAgICAgICBsZXQgY29vcmRZID0gY29vcmRbMV07XHJcbiAgICAgICAgaWYgKHNoaXBEaXJlY3QgPT09ICdYJykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb29yZFggPSBjb29yZFggKyBpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRTdHJpbmcgPSBgJHtuZXh0Q29vcmRYfSwke2Nvb3JkWX1gO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpcEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjaW5wdXRCb2FyZCA+IFtkYXRhLWNvb3JkPVwiJHtjb29yZFN0cmluZ31cIl1gKTtcclxuICAgICAgICAgICAgICAgIHNoaXBFbGVtLmNsYXNzTGlzdC50b2dnbGUoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgICAgIHNoaXBFbGVtLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29vcmRZID0gY29vcmRZICsgaTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkU3RyaW5nID0gYCR7Y29vcmRYfSwke25leHRDb29yZFl9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2lucHV0Qm9hcmQgPiBbZGF0YS1jb29yZD1cIiR7Y29vcmRTdHJpbmd9XCJdYCk7XHJcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS5jbGFzc0xpc3QudG9nZ2xlKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS5jbGFzc0xpc3QuYWRkKCdiZ1NoaXAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NvbmZpcm0gc2hpcCBwbGFjZW1lbnRcclxuICAgIGNvbnN0IGNvbmZpcm1TaGlwID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwSWNvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXRCb2FyZCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2xpbmsnKTtcclxuICAgICAgICBjb25zdCBpbmZvRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBJbmZvJyk7XHJcbiAgICAgICAgY29uc3QgY29uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25TcGFuLmlkID0gJ2NvbmZTaGlwJztcclxuICAgICAgICBjb25TcGFuLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgICAgICBjb25TcGFuLmNsYXNzTGlzdC5hZGQoJ2NvbmZCdG4nKTtcclxuICAgICAgICBjb25TcGFuLmlubmVyVGV4dD0gJ0NvbmZpcm0nO1xyXG4gICAgICAgIGluZm9EaXYuYXBwZW5kQ2hpbGQoY29uU3Bhbik7XHJcbiAgICAgICAgY29uc3QgY2FuY1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY2FuY1NwYW4uaWQgPSAnY2FuY1NoaXAnO1xyXG4gICAgICAgIGNhbmNTcGFuLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgICAgICBjYW5jU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb25mQnRuJyk7XHJcbiAgICAgICAgY2FuY1NwYW4uaW5uZXJUZXh0ID0gJ0NhbmNlbCc7XHJcbiAgICAgICAgaW5mb0Rpdi5hcHBlbmRDaGlsZChjYW5jU3Bhbik7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV3Qm9hcmQsXHJcbiAgICAgICAgYWRkR2FtZUJ0bixcclxuICAgICAgICByZW1vdmVHYW1lQnRuLFxyXG4gICAgICAgIHRleHRJbnN0cnVjdCxcclxuICAgICAgICBuZXdFdmVudExpc3QsXHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0LFxyXG4gICAgICAgIGFkZExpbmtDbGFzcyxcclxuICAgICAgICByZW1vdmVMaW5rQ2xhc3MsXHJcbiAgICAgICAgc2hvd1NoaXBzLFxyXG4gICAgICAgIGJvYXJkSGl0LFxyXG4gICAgICAgIGJvYXJkTWlzcyxcclxuICAgICAgICBjbGlja0Nvb3JkLFxyXG4gICAgICAgIHBsYXllcklucHV0Qm94LFxyXG4gICAgICAgIGdldFBsYXllcklucHV0cyxcclxuICAgICAgICBzaGlwSW5wdXRCb3gsXHJcbiAgICAgICAgc2hvd0lucHV0U2hpcCxcclxuICAgICAgICBjaGFuZ2VTaGlwRGlyLFxyXG4gICAgICAgIHNoaXBPdmVybGF5LFxyXG4gICAgICAgIGNvbmZpcm1TaGlwXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgRE9NIH07IiwiaW1wb3J0IHsgbmV3U2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IG5ld0dhbWVCb2FyZCA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgLy9jcmVhdGUgc2hpcCBvYmpzXHJcbiAgICBjb25zdCBjYXJyaWVyID0gbmV3U2hpcCg1LCAnQ2FycmllcicpO1xyXG4gICAgY29uc3QgYmF0dGxlID0gbmV3U2hpcCg0LCAnQmF0dGxlJyk7XHJcbiAgICBjb25zdCBjcnVpc2VyID0gbmV3U2hpcCgzLCAnQ3J1aXNlcicpO1xyXG4gICAgY29uc3Qgc3VibWFyaW5lID0gbmV3U2hpcCgzLCAnU3VibWFyaW5lJyk7XHJcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBuZXdTaGlwKDIsICdEZXN0cm95ZXInKTtcclxuICAgIGNvbnN0IHNoaXBzID0gW2NhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXJdO1xyXG4gICAgLy9jaGVjayB3aGV0aGVyIGNob3NlbiBjb29yZCBpcyBhIGhpdCBvciBtaXNzIGFuZCBpcyBhIG5ld1xyXG4gICAgbGV0IG1pc3NlcyA9IFtdO1xyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRJbmRpID0gZmFsc2U7XHJcbiAgICAgICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkge1xyXG4gICAgICAgICAgICAgICAgc2hpcC5oaXQoY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgaGl0SW5kaSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaGl0SW5kaSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWFyY2hDb29yZHMobWlzc2VzLCBjb29yZCkpIHtcclxuICAgICAgICAgICAgICAgIG1pc3Nlcy5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL21ldGhvZCB0byBzZWFyY2ggYW4gYXJyYXkgb2YgY29vcmRpbmF0ZXMgZm9yIGEgc3BlY2lmaWMgY29vcmRpbmF0ZVxyXG4gICAgY29uc3Qgc2VhcmNoQ29vcmRzID0gKGNvb3JkQXJyLCBjb29yZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBjb29yZEFyci5zb21lKGFyciA9PiBhcnIudG9TdHJpbmcoKSA9PT0gY29vcmQudG9TdHJpbmcoKSk7XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayB3aGV0aGVyIGFsbCBzaGlwcyBoYXZlIGJlZW4gc3Vua1xyXG4gICAgY29uc3QgY2hlY2tBbGxTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuaXNTdW5rKCkpO1xyXG4gICAgfTtcclxuICAgIC8vcGxhY2Ugc2hpcCB3aXRoIHN0YXJ0IGNvb3JkaW5hdGUgYW5kIGRpcmVjdGlvbiwgY2hlY2tzIHNoaXAgZml0cyBvbiBncmlkXHJcbiAgICAvL2FuZCBkb2VzIG5vdCBvdmVybGFwIHdpdGggb3RoZXIgc2hpcHMgcGxhY2VkXHJcbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc3RhcnRDb29yZCwgY3VyclNoaXBUeXBlLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChjaGVja0Nvb3JkKHN0YXJ0Q29vcmQsIGN1cnJTaGlwVHlwZSwgbGVuZ3RoLCBkaXJlY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJTaGlwT2JqID0gc2hpcHMuZmlsdGVyKHNoaXAgPT4gc2hpcC50eXBlID09IGN1cnJTaGlwVHlwZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZXR1cm5TaGlwQ29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBjdXJyU2hpcE9ialswXS5hZGRTaGlwQ29vcmRzKHNoaXBDb29yZHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgc3RhcnQgY29vcmQgb2Ygc2hpcCBmaXRzIG9uIGdyaWRcclxuICAgIGNvbnN0IGNoZWNrQm9hcmRGaXQgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24sIGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgIGlmICgoc3RhcnRDb29yZFswXSArIGxlbmd0aCAtIDEpIDw9IGdyaWRTaXplKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgoc3RhcnRDb29yZFsxXSArIGxlbmd0aCAtIDEpIDw9IGdyaWRTaXplKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NoZWNrIGNvb3JkcyBvZiBjdXJyZW50IHNoaXAgZG8gbm90IG92ZXJsYXAgd2l0aCBvdGhlciBzaGlwc1xyXG4gICAgY29uc3QgY2hlY2tPdmVybGFwID0gKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpID0+ICB7XHJcbiAgICAgICAgcmV0dXJuICFjaGVja1NoaXBzLnNvbWUoc2hpcCA9PiBzaGlwQ29vcmRzLnNvbWUoY29vcmQgPT4gc2VhcmNoQ29vcmRzKHNoaXAuc2hpcENvb3JkcywgY29vcmQpKSk7XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayBjb29yZHMgZml0IG9uIGJvYXJkIGFuZCBkbyBub3Qgb3ZlcmxhcCBhbm90aGVyIHBsYWNlZCBzaGlwXHJcbiAgICBjb25zdCBjaGVja0Nvb3JkID0gKHN0YXJ0Q29vcmQsIGN1cnJTaGlwVHlwZSwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCBzaGlwQ29vcmRzID0gcmV0dXJuU2hpcENvb3JkcyhzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgY3VyclNoaXBUeXBlKTtcclxuICAgICAgICBjb25zdCBjaGVja1NoaXBzID0gc2hpcHMuZmlsdGVyKHNoaXAgPT4gc2hpcC50eXBlICE9PSBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgIGlmIChjaGVja0JvYXJkRml0KHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBncmlkU2l6ZSkgJiYgY2hlY2tPdmVybGFwKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9yZXR1cm4gY29vcmRpbmF0ZXMgb2Ygd2hvbGUgc2hpcFxyXG4gICAgY29uc3QgcmV0dXJuU2hpcENvb3JkcyA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAgIGxldCBzaGlwQ29vcmRzID0gW3N0YXJ0Q29vcmRdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2hpcENvb3Jkcy5wdXNoKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaGlwQ29vcmRzO1xyXG4gICAgfTtcclxuICAgIC8vY291bnQgdG90YWwgYW1vdW50IG9mIGhpdHMgb24gYSBib2FyZFxyXG4gICAgY29uc3QgY291bnRIaXRzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH07XHJcbiAgICByZXR1cm4geyBncmlkU2l6ZSwgc2hpcHMsIGNhcnJpZXIsIGJhdHRsZSwgY3J1aXNlciwgc3VibWFyaW5lLCBkZXN0cm95ZXIsIG1pc3NlcywgcmVjZWl2ZUF0dGFjaywgY2hlY2tBbGxTdW5rLCBwbGFjZVNoaXAsIGNoZWNrQ29vcmQsIGNvdW50SGl0cyB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgbmV3R2FtZUJvYXJkIH07XHJcbiIsImNvbnN0IG5ld1BsYXllciA9IChuYW1lLCB0eXBlKSA9PiB7XHJcbiAgICBjb25zdCByYW5Db29yZCA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWRTaXplKSArIDE7XHJcbiAgICAgICAgY29uc3QgeUNvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZFNpemUpICsgMTtcclxuICAgICAgICByZXR1cm4gW3hDb29yZCwgeUNvb3JkXTtcclxuICAgIH07XHJcbiAgICBpZiAodHlwZSA9PT0gJ2h1bWFuJykge1xyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZX07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAvL3BpY2sgYSByYW5kb20gZ3JpZCBwb2ludCB3aXRoaW4gYSBncmlkIGFuZCBhIHJhbmRvbSBYL1kgZGlyZWN0aW9uXHJcbiAgICAgICAgY29uc3Qgc2hpcFN0YXJ0UG9zID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHh5RGlyID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/ICdYJyA6ICdZJztcclxuICAgICAgICAgICAgY29uc3QgW3hDb29yZCwgeUNvb3JkXSA9IHJhbkNvb3JkKGdyaWRTaXplKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtbeENvb3JkLCB5Q29vcmRdLCB4eURpcl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcGljayBhIHJhbmRvbSBncmlkIHBvaW50IGdpdmVuIGEgY2VydGFpbiBncmlkIHNpemVcclxuICAgICAgICBjb25zdCBjb21wQXR0YWNrID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByYW5Db29yZChncmlkU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7bmFtZSwgdHlwZSwgc2hpcFN0YXJ0UG9zLCBjb21wQXR0YWNrfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgbmV3UGxheWVyIH07IiwiY29uc3QgbmV3U2hpcCA9IChsZW5ndGgsIHR5cGUpID0+IHtcclxuICAgIGxldCBzaGlwQ29vcmRzID0gW107XHJcbiAgICAvL2FkZCBhcnJheSBvZiBjb29yZHNcclxuICAgIGNvbnN0IGFkZFNoaXBDb29yZHMgPSAoY29vcmRBcnIpID0+IHtcclxuICAgICAgICBjb29yZEFyci5mb3JFYWNoKGNvb3JkID0+IHNoaXBDb29yZHMucHVzaChjb29yZCkpO1xyXG4gICAgfTtcclxuICAgIC8vaW5pdGlhbGlzZSBhbmQgcG9wdWxhdGUgYW4gb2JqZWN0IHdoaWNoIHNob3dzIGFueSBoaXRzIG9uIGEgc2hpcFxyXG4gICAgY29uc3QgaGl0SW5mbyA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBpO1xyXG4gICAgICAgIGhpdEluZm9bcG9zaXRpb25dID0gJ29rJztcclxuICAgIH1cclxuICAgIC8vdXBkYXRlIGhpdCBvbiBhIHNoaXBcclxuICAgIGNvbnN0IGhpdCA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGhpdEluZm9bY2FsUG9zaXRpb24oY29vcmQpXSA9ICdoaXQnO1xyXG4gICAgfTtcclxuICAgIC8vbWV0aG9kIHRvIGNoZWNrIHdoZXRoZXIgYSBzaGlwIGlzIHN1bmsgYnkgY2hlY2tpbmcgdGhlIGhpdEluZm8gb2JqZWN0XHJcbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGhpdENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgIGhpdENvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9mIGhpdCBvbiBzaGlwIGJhc2VkIG9uIHRoZSBoaXQgY29vcmRcclxuICAgIGNvbnN0IGNhbFBvc2l0aW9uID0gKGNvb3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeERpZmYgPSBNYXRoLmFicyhzaGlwQ29vcmRzWzBdWzBdIC0gY29vcmRbMF0pO1xyXG4gICAgICAgIGNvbnN0IHlEaWZmID0gTWF0aC5hYnMoc2hpcENvb3Jkc1swXVsxXSAtIGNvb3JkWzFdKTtcclxuICAgICAgICBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlEaWZmICsgMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHhEaWZmID4gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4geERpZmYgKyAxO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4geyBsZW5ndGgsIHR5cGUsIHNoaXBDb29yZHMsIGhpdEluZm8sIGFkZFNoaXBDb29yZHMsIGhpdCwgaXNTdW5rIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBuZXdTaGlwIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZXdQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcclxuaW1wb3J0IHsgbmV3R2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XHJcbmltcG9ydCB7IERPTSB9IGZyb20gXCIuL0RPTVwiO1xyXG5cclxuY29uc3QgZ2FtZU1vZHVsZSA9KCgpID0+ICB7XHJcbiAgICBsZXQgcDFPYmogPSB7fTtcclxuICAgIGxldCBwMk9iaiA9IHt9O1xyXG4gICAgbGV0IHAxQm9hcmQgPSB7fTtcclxuICAgIGxldCBwMkJvYXJkID0ge307XHJcbiAgICBsZXQgcDFuYW1lID0gJyc7XHJcbiAgICBsZXQgcDJuYW1lID0gJyc7XHJcbiAgICBsZXQgcDF0eXBlID0gJyc7XHJcbiAgICBsZXQgcDJ0eXBlID0gJyc7XHJcbiAgICBsZXQgYXR0YWNrQ29vcmQgPSAnJztcclxuICAgIGxldCBzaGlwRGlyZWN0ID0gJ1gnO1xyXG4gICAgbGV0IGN1cnJTaGlwVHlwZSA9ICdDYXJyaWVyJztcclxuICAgIGxldCBjdXJyU2hpcExlbmd0aCA9IDU7XHJcbiAgICBsZXQgY3VyckNvb3JkID0gW107XHJcbiAgICBsZXQgY3VyclBsYXlPYmogPSB7fTtcclxuICAgIGxldCBjdXJyQm9hcmRPYmogPSB7fTtcclxuXHJcbiAgICAvL2V2ZW50IGhhbmRsZXJzXHJcbiAgICBjb25zdCBjaGFuZ2VTaGlwQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgc2hpcERpcmVjdCA9PT0gJ1gnID8gc2hpcERpcmVjdCA9ICdZJyA6IHNoaXBEaXJlY3QgPSAnWCc7XHJcbiAgICAgICAgRE9NLmNoYW5nZVNoaXBEaXIoc2hpcERpcmVjdCwgY3VyclNoaXBMZW5ndGgpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHNoaXBPdmVybGF5Q2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBET00uc2hpcE92ZXJsYXkoZXZlbnQsIHNoaXBEaXJlY3QsIGN1cnJTaGlwTGVuZ3RoKVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNoaXBJbnB1dENsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy9jaGVjayBzaGlwIHBsYWNlbWVudCBpcyBhY2NlcHRhYmxlXHJcbiAgICAgICAgY3VyckNvb3JkID0gRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIGlmIChjdXJyQm9hcmRPYmouY2hlY2tDb29yZChjdXJyQ29vcmQsIGN1cnJTaGlwVHlwZSwgY3VyclNoaXBMZW5ndGgsIHNoaXBEaXJlY3QpKSB7XHJcbiAgICAgICAgICAgIC8vcmVuZGVyIHNoaXAgb24gaW5wdXRCb2FyZCBcclxuICAgICAgICAgICAgLy9pZiBvaywgcmVtb3ZlIHNoaXBPdmVybGF5IGxpc3RlbmVyIGFuZCBpbnB1dGNsaWNrIGxpc3RlbmVyXHJcbiAgICAgICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3NoaXBJY29uJywgJ2NsaWNrJywgY2hhbmdlU2hpcENsaWNrKTtcclxuICAgICAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnaW5wdXRCb2FyZCcsICdtb3VzZW92ZXInLCBzaGlwT3ZlcmxheUNsaWNrKTtcclxuICAgICAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnaW5wdXRCb2FyZCcsICdjbGljaycsIHNoaXBJbnB1dENsaWNrKTtcclxuICAgICAgICAgICAgLy9hc2sgZm9yIGNvbmZpcm1hdGlvbiB0byBwbGFjZSBzaGlwLCBpZiB5ZXMsIHBsYWNlc2hpcCBhbmQgbG9hZCBuZXh0IHNoaXBcclxuICAgICAgICAgICAgRE9NLmNvbmZpcm1TaGlwKCk7XHJcbiAgICAgICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2NvbmZTaGlwJywgJ2NsaWNrJywgbmV4dFNoaXApXHJcbiAgICAgICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2NhbmNTaGlwJywgJ2NsaWNrJywgc2hvd0N1cnJTaGlwKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbmV3R2FtZSA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIHAxQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIHAyQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoJycpO1xyXG4gICAgICAgIERPTS5wbGF5ZXJJbnB1dEJveCgnUGxheWVyIDEnKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMSk7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIDEncyBuYW1lIGFuZCB0eXBlIHZhbHVlcyBmcm9tIERPTSwgdGhlbiBnZXQgcGxheWVyIDIncyBkZXRhaWxzXHJcbiAgICBjb25zdCBnZXRQbGF5ZXIxID0gKGUpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMSk7XHJcbiAgICAgICAgW3AxbmFtZSwgcDF0eXBlXSA9IERPTS5nZXRQbGF5ZXJJbnB1dHMoZSk7XHJcbiAgICAgICAgRE9NLnBsYXllcklucHV0Qm94KCdQbGF5ZXIgMicpO1xyXG4gICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2lucHV0Rm9ybScsICdzdWJtaXQnLCBnZXRQbGF5ZXIyKTtcclxuICAgIH07XHJcbiAgICAvL2dldCBwbGF5ZXIgMidzIG5hbWUgYW5kIHR5cGUsIGNyZWF0ZSBwbGF5ZXIgb2JqZWN0cyBhbmQgZ2V0IHNoaXAgbG9jYXRpb25zXHJcbiAgICBjb25zdCBnZXRQbGF5ZXIyID0gKGUpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMik7XHJcbiAgICAgICAgW3AybmFtZSwgcDJ0eXBlXSA9IERPTS5nZXRQbGF5ZXJJbnB1dHMoZSk7XHJcbiAgICAgICAgcDFPYmogPSBuZXdQbGF5ZXIocDFuYW1lLCBwMXR5cGUpO1xyXG4gICAgICAgIHAyT2JqID0gbmV3UGxheWVyKHAybmFtZSwgcDJ0eXBlKTtcclxuICAgICAgICBnZXRQMVNoaXBzKCk7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIDEncyBzaGlwIGxvY2F0aW9uc1xyXG4gICAgY29uc3QgZ2V0UDFTaGlwcyA9ICgpID0+IHtcclxuICAgICAgICBjdXJyUGxheU9iaiA9IHAxT2JqO1xyXG4gICAgICAgIGN1cnJCb2FyZE9iaiA9IHAxQm9hcmQ7XHJcbiAgICAgICAgaWYgKHAxT2JqLnR5cGUgPT09ICdodW1hbicpIHtcclxuICAgICAgICAgICAgLy9pZiBwMSBpcyBodW1hbiwgcmVuZGVyIHNoaXBJbnB1dEJveFxyXG4gICAgICAgICAgICBET00uc2hpcElucHV0Qm94KCk7XHJcbiAgICAgICAgICAgIHNob3dDdXJyU2hpcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vZ2V0IGNvbXB1dGVyIHRvIHBsYWNlIHNoaXBzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZ2V0U2hpcElucHV0c1xyXG4gICAgICAgIC8vZ2V0UDJTaGlwc1xyXG4gICAgfTtcclxuICAgIC8vZ2V0IHBsYXllciAyJ3Mgc2hpcCBsb2NhdGlvbnNcclxuICAgIGNvbnN0IGdldFAyU2hpcHMgPSAoKSA9PiB7XHJcbiAgICAgICAgY3VyclBsYXlPYmogPSBwMk9iajtcclxuICAgICAgICBjdXJyQm9hcmRPYmogPSBwMkJvYXJkO1xyXG4gICAgICAgIGlmIChwMk9iai50eXBlID09PSAnaHVtYW4nKSB7XHJcbiAgICAgICAgICAgIG5leHRTaGlwKCk7Ly8tLS0tLS0tLS0tLS0tLSB0aGlzIHBsYWNlcyBzaGlwIHN0cmFpZ2h0IGF3YXkhXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9nZXQgY29tcHV0ZXIgdG8gcGxhY2Ugc2hpcHNcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIC8vbG9hZCBjdXJyZW50IGlucHV0IHNoaXBcclxuICAgIGNvbnN0IHNob3dDdXJyU2hpcCA9ICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhjdXJyU2hpcFR5cGUpXHJcbiAgICAgICAgLy9zaG93IGN1cnIgc2hpcFxyXG4gICAgICAgIERPTS5zaG93SW5wdXRTaGlwKGN1cnJTaGlwVHlwZSwgY3VyclNoaXBMZW5ndGgsIGN1cnJQbGF5T2JqLm5hbWUpO1xyXG4gICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBkaXJlY3Rpb24gY2hhbmdlXHJcbiAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgnc2hpcEljb24nLCAnY2xpY2snLCBjaGFuZ2VTaGlwQ2xpY2spO1xyXG4gICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBpbnB1dEJvYXJkLCBvbiBob3ZlciBzaG91bGQgc2hvdyBzaGlwXHJcbiAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgnaW5wdXRCb2FyZCcsICdtb3VzZW92ZXInLCBzaGlwT3ZlcmxheUNsaWNrKTtcclxuICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciBmb3IgaW5wdXRCb2FyZCwgb24gY2xpY2sgc2hvdWxkIGNoZWNrIHNoaXAgcGxhY2VtZW50LCBwbGFjZSBzaGlwIGFuZCBhc2sgZm9yIGNvbmZpcm1cclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdpbnB1dEJvYXJkJywgJ2NsaWNrJywgc2hpcElucHV0Q2xpY2spO1xyXG4gICAgfTtcclxuICAgIC8vY29uZmlybSBzaGlwIHBsYWNlbWVudCBhbmQgbG9hZCBuZXh0IHNoaXBcclxuICAgIGNvbnN0IG5leHRTaGlwID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcxJylcclxuICAgICAgICAvL3BsYWNlIHNoaXBcclxuICAgICAgICBjdXJyQm9hcmRPYmoucGxhY2VTaGlwKGN1cnJDb29yZCwgY3VyclNoaXBUeXBlLCBjdXJyU2hpcExlbmd0aCwgc2hpcERpcmVjdCwgMTApO1xyXG4gICAgICAgIC8vcmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ2NvbmZTaGlwJywgJ2NsaWNrJywgbmV4dFNoaXApXHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnY2FuY1NoaXAnLCAnY2xpY2snLCBzaG93Q3VyclNoaXApXHJcbiAgICAgICAgY29uc29sZS5sb2coJzInKVxyXG4gICAgICAgIC8vdXBkYXRlIGN1cnJlbnQgc2hpcCB2YXJpYWJsZXMgYW5kIHJlbmRlciBuZXh0IHNoaXBcclxuICAgICAgICAvL2lmIGFsbCBzaGlwcyBwbGFjZWQsIG1vdmUgdG8gbmV4dCBwbGF5ZXIgb3Igc3RhcnQgZ2FtZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJCb2FyZE9iai5zaGlwcylcclxuICAgICAgICBpZiAoIWN1cnJCb2FyZE9iai5zaGlwcy5ldmVyeShzaGlwID0+IHsgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJzMnKVxyXG4gICAgICAgICAgICBpZiAoc2hpcC5zaGlwQ29vcmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJzQnKVxyXG4gICAgICAgICAgICAgICAgY3VyclNoaXBUeXBlID0gc2hpcC50eXBlO1xyXG4gICAgICAgICAgICAgICAgY3VyclNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICBzaG93Q3VyclNoaXAoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY3VyclBsYXlPYmogPT09IHAxT2JqKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRQMlNoaXBzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3JlbW92ZSBpbnB1dCBib3ggYW5kIGxvYWQgZ2FtZSAtLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgIGxvYWRHYW1lKDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2xvYWQgZ2FtZSBib2FyZHNcclxuICAgIGNvbnN0IGxvYWRHYW1lID0gKCkgPT4gIHtcclxuICAgICAgICAvL3BsYWNlIHNoaXBzIGluIGNvZGUsIERPTSBpbnB1dCB0byBiZSBhZGRlZFxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vIHAxQm9hcmQucGxhY2VTaGlwKFs2LDRdLCAnY2FycmllcicsIDUsICdZJyk7XHJcbiAgICAgICAgLy8gcDFCb2FyZC5wbGFjZVNoaXAoWzEsMV0sICdiYXR0bGUnLCA0LCAnWCcpO1xyXG4gICAgICAgIC8vIHAxQm9hcmQucGxhY2VTaGlwKFsyLDZdLCAnY3J1aXNlcicsIDMsICdZJyk7XHJcbiAgICAgICAgLy8gcDFCb2FyZC5wbGFjZVNoaXAoWzQsNl0sICdzdWJtYXJpbmUnLCAzLCAnWScpO1xyXG4gICAgICAgIC8vIHAxQm9hcmQucGxhY2VTaGlwKFs5LDZdLCAnZGVzdHJveWVyJywgMiwgJ1gnKTtcclxuICAgICAgICAvLyBwMkJvYXJkLnBsYWNlU2hpcChbNSwxMF0sICdjYXJyaWVyJywgNSwgJ1gnKTtcclxuICAgICAgICAvLyBwMkJvYXJkLnBsYWNlU2hpcChbMyw1XSwgJ2JhdHRsZScsIDQsICdYJyk7XHJcbiAgICAgICAgLy8gcDJCb2FyZC5wbGFjZVNoaXAoWzIsN10sICdjcnVpc2VyJywgMywgJ1knKTtcclxuICAgICAgICAvLyBwMkJvYXJkLnBsYWNlU2hpcChbOCwxXSwgJ3N1Ym1hcmluZScsIDMsICdYJyk7XHJcbiAgICAgICAgLy8gcDJCb2FyZC5wbGFjZVNoaXAoWzksOF0sICdkZXN0cm95ZXInLCAyLCAnWCcpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vcmVuZGVyIGdhbWUgYm9hcmQgYW5kIHN0YXJ0IGJ1dHRvblxyXG4gICAgICAgIERPTS5uZXdCb2FyZChwMU9iaiwgcDJPYmopO1xyXG4gICAgICAgIERPTS5hZGRHYW1lQnRuKCdTdGFydCBHYW1lJyk7XHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1N0YXJ0IEdhbWUnKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdnYW1lQnV0dG9uJywgJ2NsaWNrJywgc3RhcnRHYW1lKTtcclxuICAgIH07XHJcbiAgICAvL3N0YXJ0IGdhbWUgbG9vcCBieSByZW1vdmluZyBzdGFydCBidXR0b24gYW5kIHN0YXJ0aW5nIHBsYXllciAxcyB0dXJuXHJcbiAgICBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsIHN0YXJ0R2FtZSk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUdhbWVCdG4oKTtcclxuICAgICAgICAvL3JhbmRvbWx5IHNlbGVjdCBmaXJzdCBwbGF5ZXJcclxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xyXG4gICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFueSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIDIsIHVwZGF0ZSBnYW1lIGluc3RydWN0aW9ucyBhbmQgYWN0aXZhdGUgYm9hcmQgMiBmb3IgYXR0YWNrXHJcbiAgICBjb25zdCBwMVR1cm4gPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDFCb2FyZCcpO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMkF0dGFjayk7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdChgJHtwMU9iai5uYW1lfSdzIHR1cm4uIFBpY2sgYSBncmlkIHRvIGF0dGFjayBvbiAke3AyT2JqLm5hbWV9J3MgYm9hcmQhYCk7XHJcbiAgICAgICAgLy9pZiBwbGF5ZXIgaXMgY29tcHV0ZXIsIGNvbXB1dGVyIHRvIHRyaWdnZXIgY2xpY2sgb24gcmFuZG9tIGdyaWRcclxuICAgICAgICBpZiAocDFPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHAxQXR0YWNrKCksIDcwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NLmFkZExpbmtDbGFzcygncDJCb2FyZCcpO1xyXG4gICAgICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDFBdHRhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL29uIHBsYXllciAxIGNsaWNrIChhdHRhY2spXHJcbiAgICBjb25zdCBwMUF0dGFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBwMkhpdENvdW50ID0gcDJCb2FyZC5jb3VudEhpdHMoKTtcclxuICAgICAgICBsZXQgcDJNaXNzQ291bnQgPSBwMkJvYXJkLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9yZWNpZXZlIGF0dGFjayBjb29yZGluYXRlcyAoRE9NIGZvciBodW1hbiBvciBtZXRob2QgZm9yIGNvbXApIGFuZCBjb25maXJtIGhpdCBvciBtaXNzXHJcbiAgICAgICAgYXR0YWNrQ29vcmQgPSAocDFPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykgPyBwMU9iai5jb21wQXR0YWNrKHAxQm9hcmQuZ3JpZFNpemUpIDogRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAyQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgLy9pZiBuZXcgaGl0LCByZW5kZXIgaGl0LCBjYWxsIGNoZWNrQWxsU3VuaygpIGFuZCBjaGVjayBmb3Igd2lubmVyLiBJZiBub3QgYWxsIHNoaXBzIHN1bmssIG5leHQgcGxheWVyIHR1cm5cclxuICAgICAgICBpZiAocDJIaXRDb3VudCAhPT0gcDJCb2FyZC5jb3VudEhpdHMoKSkge1xyXG4gICAgICAgICAgICBET00uYm9hcmRIaXQoJ3AyQm9hcmQnLCBhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgICAgIGlmIChwMkJvYXJkLmNoZWNrQWxsU3VuaygpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIocDFPYmoubmFtZSwgcDFCb2FyZC5ncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocDJNaXNzQ291bnQgIT09IHAyQm9hcmQubWlzc2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2lmIG5ldyBtaXNzLCByZW5kZXIgbWlzcyBhbmQgY2FsbCBuZXh0IHBsYXllcnMgdHVyblxyXG4gICAgICAgICAgICBET00uYm9hcmRNaXNzKCdwMkJvYXJkJywgYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2lmIGdyaWQgaGFzIGFscmVhZHkgYmVlbiBwaWNrZWQsIHBpY2sgYWdhaW5cclxuICAgICAgICAgICAgcDFBdHRhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFueSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIDEsIHVwZGF0ZSBnYW1lIGluc3RydWN0aW9ucyBhbmQgYWN0aXZhdGUgYm9hcmQgMiBmb3IgYXR0YWNrXHJcbiAgICBjb25zdCBwMlR1cm4gPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDJCb2FyZCcpO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AyQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdChgJHtwMk9iai5uYW1lfSdzIHR1cm4uIFBpY2sgYSBncmlkIHRvIGF0dGFjayBvbiAke3AxT2JqLm5hbWV9J3MgYm9hcmQhYCk7XHJcbiAgICAgICAgIC8vaWYgcGxheWVyIGlzIGNvbXB1dGVyLCBjb21wdXRlciB0byBwaWNrIGEgZ3JpZCBhbmQgYXR0YWNrXHJcbiAgICAgICAgaWYgKHAyT2JqLnR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwMkF0dGFjaygpLCA3MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTS5hZGRMaW5rQ2xhc3MoJ3AxQm9hcmQnKTtcclxuICAgICAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgncDFCb2FyZCcsICdjbGljaycsIHAyQXR0YWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vb24gcGxheWVyIDIgY2xpY2sgKGF0dGFjaylcclxuICAgIGNvbnN0IHAyQXR0YWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IHAxSGl0Q291bnQgPSBwMUJvYXJkLmNvdW50SGl0cygpO1xyXG4gICAgICAgIGxldCBwMU1pc3NDb3VudCA9IHAxQm9hcmQubWlzc2VzLmxlbmd0aDtcclxuICAgICAgICBhdHRhY2tDb29yZCA9IChwMk9iai50eXBlID09PSAnY29tcHV0ZXInKSA/IHAyT2JqLmNvbXBBdHRhY2socDJCb2FyZC5ncmlkU2l6ZSkgOiBET00uY2xpY2tDb29yZChldmVudCk7XHJcbiAgICAgICAgcDFCb2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkKTtcclxuICAgICAgICBpZiAocDFIaXRDb3VudCAhPT0gcDFCb2FyZC5jb3VudEhpdHMoKSkge1xyXG4gICAgICAgICAgICBET00uYm9hcmRIaXQoJ3AxQm9hcmQnLCBhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgICAgIGlmIChwMUJvYXJkLmNoZWNrQWxsU3VuaygpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIocDJPYmoubmFtZSwgcDJCb2FyZC5ncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocDFNaXNzQ291bnQgIT09IHAxQm9hcmQubWlzc2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBET00uYm9hcmRNaXNzKCdwMUJvYXJkJywgYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwMkF0dGFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgd2lubmVyID0gKHBsYXllciwgZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBET00udGV4dEluc3RydWN0KGAke3BsYXllcn0gaXMgdGhlIHdpbm5lciEhIFRoZXkgaGF2ZSBzdW5rIGFsbCB0aGUgZW5lbXkgc2hpcHMhYCk7XHJcbiAgICAgICAgRE9NLnNob3dTaGlwcygncDFCb2FyZCcsIHAxQm9hcmQpO1xyXG4gICAgICAgIERPTS5zaG93U2hpcHMoJ3AyQm9hcmQnLCBwMkJvYXJkKTtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMUJvYXJkJywgJ2NsaWNrJywgcDFBdHRhY2spO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AyQm9hcmQnLCAnY2xpY2snLCBwMkF0dGFjayk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDFCb2FyZCcpO1xyXG4gICAgICAgIERPTS5yZW1vdmVMaW5rQ2xhc3MoJ3AyQm9hcmQnKTtcclxuICAgICAgICAvL3JlbmRlciByZXN0YXJ0IGJ1dHRvblxyXG4gICAgICAgIERPTS5hZGRHYW1lQnRuKCdSZXN0YXJ0Jyk7XHJcbiAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsICgpID0+IG5ld0dhbWUoZ3JpZFNpemUpKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdHYW1lXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZ2FtZU1vZHVsZS5uZXdHYW1lKDEwKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=