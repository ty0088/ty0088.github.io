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
            currShipType = 'Carrier';
            currShipLength = 5;
            showCurrShip();
        } else {
            //get computer to place ships
        }

    };
    //load current input ship
    const showCurrShip = () => {
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
        //place ship
        currBoardObj.placeShip(currCoord, currShipType, currShipLength, shipDirect, 10);
        //remove event listeners
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('confShip', 'click', nextShip)
        _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.removeEventList('cancShip', 'click', showCurrShip)
        //update current ship variables and render next ship
        //if all ships placed, move to next player or start game
        if (!currBoardObj.ships.every(ship => {
            if (ship.shipCoords.length === 0) {
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
                loadGame();
            }
        }
    };
    //load game boards
    const loadGame = () =>  {
        document.getElementById('shipInputBox').remove();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDeEI7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWLFlBQVksK0NBQWE7QUFDekI7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsa0RBQWdCLElBQUksUUFBUTtBQUNwQyxRQUFRLCtDQUFhO0FBQ3JCLFFBQVEsK0NBQWE7QUFDckIsUUFBUSxxREFBbUI7QUFDM0IsUUFBUSxxREFBbUI7QUFDM0IsUUFBUSxxREFBbUI7QUFDM0IsUUFBUSxxREFBbUI7QUFDM0I7QUFDQSxRQUFRLGdEQUFjO0FBQ3RCLFFBQVEsa0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx1QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERPTSA9ICgoKSA9PiB7XHJcbiAgICAvL3JlbmRlciBnYW1lIGJvYXJkc1xyXG4gICAgY29uc3QgbmV3Qm9hcmQgPSAocDFPYmosIHAyT2JqKSA9PiB7XHJcbiAgICAgICAgLy9jcmVhdGUgZ3JpZCBsaW5lcyBvbiBwMUdyaWRcclxuICAgICAgICBjb25zdCBwMUdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDFCb2FyZCcpO1xyXG4gICAgICAgIHAxR3JpZC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgIHAxR3JpZC5hcHBlbmRDaGlsZCh3aGl0ZUJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDJHcmlkXHJcbiAgICAgICAgY29uc3QgcDJHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AyQm9hcmQnKTtcclxuICAgICAgICBwMkdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMkdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2FkZCBjb29yZGluYXRlIGF0dHJpYnV0ZSB0byBlYWNoIHNwYW5cclxuICAgICAgICBjb25zdCBwMUJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3AxQm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgcDJCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMkJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGxldCBzcGFuQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAxMDsgeSA+IDA7IHktLSkge1xyXG4gICAgICAgICAgICBjb25zdCB5Q29vcmQgID0geTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeENvb3JkID0geDtcclxuICAgICAgICAgICAgICAgIHAxQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgcDJCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuQ291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZW5kZXIgcGxheWVyIG5hbWVzIGJlbG93IGVhY2ggYm9hcmRcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcDFCb2FyZCArIC5wbGF5ZXJOYW1lJykuaW5uZXJUZXh0ID0gYCR7cDFPYmoubmFtZX0ncyBCb2FyZGA7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AyQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3AyT2JqLm5hbWV9J3MgQm9hcmRgO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGEgc3RhcnQgYnV0dG9uXHJcbiAgICBjb25zdCBhZGRHYW1lQnRuID0gKHRleHQpID0+IHtcclxuICAgICAgICBjb25zdCBnYW1lQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25Db250YWluZXInKTtcclxuICAgICAgICBidG5Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZ2FtZUJ0bi5pZCA9ICdnYW1lQnV0dG9uJztcclxuICAgICAgICBnYW1lQnRuLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgICAgICBnYW1lQnRuLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVCdG4pO1xyXG4gICAgfTtcclxuICAgIC8vcmVtb3ZlIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgcmVtb3ZlR2FtZUJ0biA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUJ1dHRvbicpLnJlbW92ZSgpO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIHRleHQgaW5zdHJ1Y3Rpb25zXHJcbiAgICBjb25zdCB0ZXh0SW5zdHJ1Y3QgPSAodGV4dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluc3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luc3RydWN0aW9ucycpO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9ICcnO1xyXG4gICAgICAgIGluc3RFbGVtLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB9O1xyXG4gICAgLy9jcmVhdGUgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGNvbnN0IG5ld0V2ZW50TGlzdCA9IChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JRCk7XHJcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcclxuICAgIH07XHJcbiAgICAvL3JlbW92ZSBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgY29uc3QgcmVtb3ZlRXZlbnRMaXN0ID0gIChlbGVtSUQsIGV2ZW50LCBmdW5jKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JRCk7XHJcbiAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBhZGRMaW5rQ2xhc3MgPSAoYWN0Qm9hcmRJRCwgKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdEJvYXJkSUQpO1xyXG4gICAgICAgIGFjdEVsZW0uY2xhc3NMaXN0LmFkZCgnbGluaycpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlbW92ZUxpbmtDbGFzcyA9IChkZWFjdEJvYXJkSUQpID0+IHtcclxuICAgICAgICBjb25zdCBkZWFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWFjdEJvYXJkSUQpO1xyXG4gICAgICAgIGRlYWN0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgYWxsIHNoaXBzIG9uIGJvYXJkXHJcbiAgICBjb25zdCBzaG93U2hpcHMgPSAoYm9hcmQsIGdhbWVCb2FyZE9iaikgPT4ge1xyXG4gICAgICAgIC8vY29sbGVjdCBhbGwgc2hpcCBjb29yZGluYXRlcyBhbmQgYWRkIGJnIGNsYXNzXHJcbiAgICAgICAgY29uc3Qgc2hpcHNBcnIgPSBbJ2NhcnJpZXInLCAnYmF0dGxlJywgJ2NydWlzZXInLCAgJ3N1Ym1hcmluZScsICdkZXN0cm95ZXInXTtcclxuICAgICAgICBzaGlwc0Fyci5mb3JFYWNoKHNoaXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2FtZUJvYXJkT2JqW3NoaXBdLnNoaXBDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29vcmRzQXJyLnB1c2goY29vcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkU3RyaW5nID0gYCR7Y29vcmRbMF19LCR7Y29vcmRbMV19YDtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7Y29vcmRTdHJpbmd9XCJdYCkuY2xhc3NMaXN0LmFkZCgnYmdTaGlwJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGhpdFxyXG4gICAgY29uc3QgYm9hcmRIaXQgPSAoYm9hcmQsIGhpdENvb3JkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvb3JkID0gYCR7aGl0Q29vcmRbMF19LCR7aGl0Q29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgY29uc3QgYXR0Y2tJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgYXR0Y2tJY24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xyXG4gICAgICAgIGF0dGNrSWNuLmlubmVyVGV4dCA9ICdjYW5jZWwnO1xyXG4gICAgICAgIGdyaWRFbGVtLmFwcGVuZENoaWxkKGF0dGNrSWNuKTtcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhdHRja0ljbikub3BhY2l0eTtcclxuICAgICAgICBhdHRja0ljbi5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBtaXNzXHJcbiAgICBjb25zdCBib2FyZE1pc3MgPSAoYm9hcmQsIG1pc3NDb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb29yZCA9IGAke21pc3NDb29yZFswXX0sJHttaXNzQ29vcmRbMV19YDtcclxuICAgICAgICBjb25zdCBncmlkRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2JvYXJkfSA+IFtkYXRhLWNvb3JkPVwiJHtkYXRhQ29vcmR9XCJdYCk7XHJcbiAgICAgICAgY29uc3QgbWlzc0ljbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBtaXNzSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBtaXNzSWNuLmlubmVyVGV4dCA9ICdyYWRpb19idXR0b25fdW5jaGVja2VkJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChtaXNzSWNuKTtcclxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtaXNzSWNuKS5vcGFjaXR5O1xyXG4gICAgICAgIG1pc3NJY24uc3R5bGUub3BhY2l0eSA9IDE7IFxyXG4gICAgfTtcclxuICAgIC8vcmV0dXJucyB0aGUgY29vcmRzIGluIGFuIGFycmF5IG9mIGdyaWQgY2xpY2tlZFxyXG4gICAgY29uc3QgY2xpY2tDb29yZCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29vcmRcIik7XHJcbiAgICAgICAgaWYgKGNvb3JkU3RyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgbGV0IGNvb3JkID0gW107XHJcbiAgICAgICAgICAgIGNvb3JkLnB1c2gocGFyc2VJbnQoY29vcmRTdHJBcnJbMF0pKTtcclxuICAgICAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29vcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIHBsYXllciBpbnB1dCBib3hcclxuICAgIGNvbnN0IHBsYXllcklucHV0Qm94ID0gKHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbnB1dEJveC5pZCA9ICdwbGF5ZXJJbnB1dEJveCc7XHJcbiAgICAgICAgaW5wdXRCb3guY2xhc3NMaXN0LmFkZCgnZmxleENvbHVtbkNlbnRlcicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dEJveCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRpbnN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGlucHV0aW5zdC5pbm5lclRleHQgPSBgRW50ZXIgJHtwbGF5ZXJ9IE5hbWUgYW5kIHNlbGVjdCBQbGF5ZXIgVHlwZWA7XHJcbiAgICAgICAgY29uc3QgaW5wdXRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgICAgIGlucHV0Rm9ybS5pZCA9ICdpbnB1dEZvcm0nO1xyXG4gICAgICAgIGlucHV0Rm9ybS5jbGFzc0xpc3QuYWRkKCdmbGV4Q29sdW1uQ2VudGVyJyk7XHJcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBuYW1lSW5wdXQuaWQgPSAnbmFtZUlucHV0JztcclxuICAgICAgICBuYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBodW1hblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgaHVtYW5JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgaHVtYW5JbnB1dC5pZCA9ICdodW1hbklucHV0JztcclxuICAgICAgICBodW1hbklucHV0Lm5hbWUgPSAndHlwZUlucHV0JztcclxuICAgICAgICBodW1hbklucHV0LnR5cGUgPSAncmFkaW8nO1xyXG4gICAgICAgIGh1bWFuSW5wdXQudmFsdWUgPSAnaHVtYW4nO1xyXG4gICAgICAgIGh1bWFuSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBodW1hbkxhYmVsID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgaHVtYW5MYWJlbC5odG1sRm9yID0gJ2h1bWFuSW5wdXQnO1xyXG4gICAgICAgIGh1bWFuTGFiZWwuaW5uZXJUZXh0ID0gJ0h1bWFuJztcclxuICAgICAgICBjb25zdCBjb21wU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBjb21wSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGNvbXBJbnB1dC5pZCA9ICdodW1hbklucHV0JztcclxuICAgICAgICBjb21wSW5wdXQubmFtZSA9ICd0eXBlSW5wdXQnO1xyXG4gICAgICAgIGNvbXBJbnB1dC50eXBlID0gJ3JhZGlvJztcclxuICAgICAgICBjb21wSW5wdXQudmFsdWUgPSAnY29tcHV0ZXInO1xyXG4gICAgICAgIGNvbXBJbnB1dC5zZXRBdHRyaWJ1dGUoJ3JlcXVpcmVkJywgJycpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBMYWJlbCA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGNvbXBMYWJlbC5odG1sRm9yID0gJ2NvbXBJbnB1dCc7XHJcbiAgICAgICAgY29tcExhYmVsLmlubmVyVGV4dCA9ICdDb21wdXRlcic7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIHN1Ym1pdElucHV0LmlkID0nc3VibWl0SW5wdXQnXHJcbiAgICAgICAgc3VibWl0SW5wdXQudHlwZSA9ICdzdWJtaXQnO1xyXG4gICAgICAgIHN1Ym1pdElucHV0LnZhbHVlID0gJ0VudGVyJztcclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChpbnB1dGluc3QpO1xyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKGlucHV0Rm9ybSk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XHJcbiAgICAgICAgaHVtYW5TcGFuLmFwcGVuZENoaWxkKGh1bWFuSW5wdXQpO1xyXG4gICAgICAgIGh1bWFuU3Bhbi5hcHBlbmRDaGlsZChodW1hbkxhYmVsKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoaHVtYW5TcGFuKTtcclxuICAgICAgICBjb21wU3Bhbi5hcHBlbmRDaGlsZChjb21wSW5wdXQpO1xyXG4gICAgICAgIGNvbXBTcGFuLmFwcGVuZENoaWxkKGNvbXBMYWJlbCk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGNvbXBTcGFuKTtcclxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0SW5wdXQpO1xyXG4gICAgfTtcclxuICAgIC8vZ2V0IHBsYXllciBpbnB1dCB2YWx1ZXMgYW5kIHJlbW92ZXMgaW5wdXRCb3hcclxuICAgIGNvbnN0IGdldFBsYXllcklucHV0cyA9IChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZUlucHV0JykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcklucHV0Qm94JykucmVtb3ZlKCk7XHJcbiAgICAgICAgcmV0dXJuIFtuYW1lLCB0eXBlXTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBpbnB1dCBib3ggYW5kIGlucHV0IGdyaWQgdG8gZ2V0IHNoaXAgcG9zaXRpb25zXHJcbiAgICBjb25zdCBzaGlwSW5wdXRCb3ggPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2VDb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBpbnB1dEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGlucHV0Qm94LmlkID0gJ3NoaXBJbnB1dEJveCc7XHJcbiAgICAgICAgaW5wdXRCb3guY2xhc3NMaXN0LmFkZCgnZmxleFJvd0NlbnRlcicpO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dEJveCk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaW5wdXRHcmlkLmNsYXNzTGlzdC5hZGQoJ2dhbWVCb2FyZCcpO1xyXG4gICAgICAgIGlucHV0R3JpZC5jbGFzc0xpc3QuYWRkKCd0ZW5QeE1hcmdpbicpO1xyXG4gICAgICAgIGlucHV0R3JpZC5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgaW5wdXRHcmlkLmlkID0gJ2lucHV0Qm9hcmQnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgaW5wdXRHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoaW5wdXRHcmlkKTtcclxuICAgICAgICBjb25zdCBpbnB1dEJveFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2lucHV0Qm9hcmQgPiBzcGFuJyk7XHJcbiAgICAgICAgbGV0IHNwYW5Db3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeSA9IDEwOyB5ID4gMDsgeS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHlDb29yZCAgPSB5O1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB4Q29vcmQgPSB4O1xyXG4gICAgICAgICAgICAgICAgaW5wdXRCb3hTcGFuc1tzcGFuQ291bnRdLnNldEF0dHJpYnV0ZSgnZGF0YS1jb29yZCcsIGAke3hDb29yZH0sJHt5Q29vcmR9YCk7XHJcbiAgICAgICAgICAgICAgICBzcGFuQ291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBzaGlwSW5mby5pZCA9ICdzaGlwSW5mbyc7XHJcbiAgICAgICAgc2hpcEluZm8uY2xhc3NMaXN0LmFkZCgnZmxleENvbHVtbkNlbnRlcicpO1xyXG4gICAgICAgIGlucHV0Qm94LmFwcGVuZENoaWxkKHNoaXBJbmZvKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBzaGlwIGFuZCBkaXJlY3Rpb24gc2VsZWN0aW9uIGZvciBjbGljayBhbmQgcGxhY2VcclxuICAgIGNvbnN0IHNob3dJbnB1dFNoaXAgPSAoc2hpcE5hbWUsIHNoaXBMZW5ndGgsIHBsYXllck5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBzaGlwSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwSW5mbycpO1xyXG4gICAgICAgIHNoaXBJbmZvLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHRleHRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHRleHRTcGFuLmlkID0gJ3NoaXBJbnN0cic7XHJcbiAgICAgICAgdGV4dFNwYW4uaW5uZXJUZXh0ID0gYCR7cGxheWVyTmFtZX0sIHBsYWNlIHRoZSBzaGlwIGJ5IHNlbGVjdGluZyBhIGdyaWQgc3BhY2UgKHRoZSBzaGlwIGRpcmVjdGlvbiBjYW4gYmUgY2hhbmdlZCBieSBjbGlja2luZyBvbiB0aGUgc2hpcCBpY29uKWA7XHJcbiAgICAgICAgc2hpcEluZm8uYXBwZW5kQ2hpbGQodGV4dFNwYW4pO1xyXG4gICAgICAgIGNvbnN0IHNoaXBUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHNoaXBUeXBlLmlkID0gJ3NoaXBUeXBlJztcclxuICAgICAgICBzaGlwVHlwZS5pbm5lclRleHQgPSBgJHtzaGlwTmFtZX0gKCR7c2hpcExlbmd0aH0pYDtcclxuICAgICAgICBzaGlwSW5mby5hcHBlbmRDaGlsZChzaGlwVHlwZSk7XHJcbiAgICAgICAgY29uc3Qgc2hpcEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc2hpcEljb24uaWQgPSAnc2hpcEljb24nO1xyXG4gICAgICAgIHNoaXBJY29uLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgICAgICBzaGlwSWNvbi5zdHlsZS5ncmlkVGVtcGxhdGUgPSBgMjBweCAvIHJlcGVhdCgke3NoaXBMZW5ndGh9LCAyMHB4KWA7XHJcbiAgICAgICAgc2hpcEluZm8uYXBwZW5kQ2hpbGQoc2hpcEljb24pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICB3aGl0ZUJveC5jbGFzc0xpc3QuYWRkKCdiZ1NoaXAnKTtcclxuICAgICAgICAgICAgc2hpcEljb24uYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NoYW5nZSBzaGlwIGRpcmVjdGlvblxyXG4gICAgY29uc3QgY2hhbmdlU2hpcERpciA9IChzaGlwRGlyZWN0LCBzaGlwTGVuZ3RoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcEljb24nKTtcclxuICAgICAgICBpZiAoc2hpcERpcmVjdCA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgIHNoaXBJY29uLnN0eWxlLmdyaWRUZW1wbGF0ZSA9IGAyMHB4IC8gcmVwZWF0KCR7c2hpcExlbmd0aH0sIDIwcHgpYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaGlwSWNvbi5zdHlsZS5ncmlkVGVtcGxhdGUgPSBgcmVwZWF0KCR7c2hpcExlbmd0aH0sIDIwcHgpIC8gMjBweGA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vc2hvdyBvdmVybGF5IG9mIHNoaXAgb24gaW5wdXRCb2FyZFxyXG4gICAgY29uc3Qgc2hpcE92ZXJsYXkgPSAoZXZlbnQsIHNoaXBEaXJlY3QsIHNoaXBMZW5ndGgpID0+IHtcclxuICAgICAgICAvL3JlbmRlciBwbGFjZWQgc2hpcHMgYW5kIGN1cnJlbnQgbW91c2UgcG9zaXRpb24gc2hpcCwgYWxsIG90aGVyIHNwYW5zIHRvIHdoaXRlIC0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgYm9hcmRTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNpbnB1dEJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGJvYXJkU3BhbnMuZm9yRWFjaChzcGFuID0+IHtcclxuICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdiZ1NoaXAnKTtcclxuICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgY29vcmQgPSBjbGlja0Nvb3JkKGV2ZW50KTtcclxuICAgICAgICBsZXQgY29vcmRYID0gY29vcmRbMF07XHJcbiAgICAgICAgbGV0IGNvb3JkWSA9IGNvb3JkWzFdO1xyXG4gICAgICAgIGlmIChzaGlwRGlyZWN0ID09PSAnWCcpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29vcmRYID0gY29vcmRYICsgaTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkU3RyaW5nID0gYCR7bmV4dENvb3JkWH0sJHtjb29yZFl9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2lucHV0Qm9hcmQgPiBbZGF0YS1jb29yZD1cIiR7Y29vcmRTdHJpbmd9XCJdYCk7XHJcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS5jbGFzc0xpc3QudG9nZ2xlKCdiZ1doaXRlJyk7XHJcbiAgICAgICAgICAgICAgICBzaGlwRWxlbS5jbGFzc0xpc3QuYWRkKCdiZ1NoaXAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENvb3JkWSA9IGNvb3JkWSArIGk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWH0sJHtuZXh0Q29vcmRZfWA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNpbnB1dEJvYXJkID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApO1xyXG4gICAgICAgICAgICAgICAgc2hpcEVsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICAgICAgc2hpcEVsZW0uY2xhc3NMaXN0LmFkZCgnYmdTaGlwJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jb25maXJtIHNoaXAgcGxhY2VtZW50XHJcbiAgICBjb25zdCBjb25maXJtU2hpcCA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hpcEljb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0Qm9hcmQnKS5jbGFzc0xpc3QucmVtb3ZlKCdsaW5rJyk7XHJcbiAgICAgICAgY29uc3QgaW5mb0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwSW5mbycpO1xyXG4gICAgICAgIGNvbnN0IGNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uU3Bhbi5pZCA9ICdjb25mU2hpcCc7XHJcbiAgICAgICAgY29uU3Bhbi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgY29uU3Bhbi5jbGFzc0xpc3QuYWRkKCdjb25mQnRuJyk7XHJcbiAgICAgICAgY29uU3Bhbi5pbm5lclRleHQ9ICdDb25maXJtJztcclxuICAgICAgICBpbmZvRGl2LmFwcGVuZENoaWxkKGNvblNwYW4pO1xyXG4gICAgICAgIGNvbnN0IGNhbmNTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNhbmNTcGFuLmlkID0gJ2NhbmNTaGlwJztcclxuICAgICAgICBjYW5jU3Bhbi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgY2FuY1NwYW4uY2xhc3NMaXN0LmFkZCgnY29uZkJ0bicpO1xyXG4gICAgICAgIGNhbmNTcGFuLmlubmVyVGV4dCA9ICdDYW5jZWwnO1xyXG4gICAgICAgIGluZm9EaXYuYXBwZW5kQ2hpbGQoY2FuY1NwYW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5ld0JvYXJkLFxyXG4gICAgICAgIGFkZEdhbWVCdG4sXHJcbiAgICAgICAgcmVtb3ZlR2FtZUJ0bixcclxuICAgICAgICB0ZXh0SW5zdHJ1Y3QsXHJcbiAgICAgICAgbmV3RXZlbnRMaXN0LFxyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdCxcclxuICAgICAgICBhZGRMaW5rQ2xhc3MsXHJcbiAgICAgICAgcmVtb3ZlTGlua0NsYXNzLFxyXG4gICAgICAgIHNob3dTaGlwcyxcclxuICAgICAgICBib2FyZEhpdCxcclxuICAgICAgICBib2FyZE1pc3MsXHJcbiAgICAgICAgY2xpY2tDb29yZCxcclxuICAgICAgICBwbGF5ZXJJbnB1dEJveCxcclxuICAgICAgICBnZXRQbGF5ZXJJbnB1dHMsXHJcbiAgICAgICAgc2hpcElucHV0Qm94LFxyXG4gICAgICAgIHNob3dJbnB1dFNoaXAsXHJcbiAgICAgICAgY2hhbmdlU2hpcERpcixcclxuICAgICAgICBzaGlwT3ZlcmxheSxcclxuICAgICAgICBjb25maXJtU2hpcFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IERPTSB9OyIsImltcG9ydCB7IG5ld1NoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBuZXdHYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgIC8vY3JlYXRlIHNoaXAgb2Jqc1xyXG4gICAgY29uc3QgY2FycmllciA9IG5ld1NoaXAoNSwgJ0NhcnJpZXInKTtcclxuICAgIGNvbnN0IGJhdHRsZSA9IG5ld1NoaXAoNCwgJ0JhdHRsZScpO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IG5ld1NoaXAoMywgJ0NydWlzZXInKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ld1NoaXAoMywgJ1N1Ym1hcmluZScpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3U2hpcCgyLCAnRGVzdHJveWVyJyk7XHJcbiAgICBjb25zdCBzaGlwcyA9IFtjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBjaG9zZW4gY29vcmQgaXMgYSBoaXQgb3IgbWlzcyBhbmQgaXMgYSBuZXdcclxuICAgIGxldCBtaXNzZXMgPSBbXTtcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBsZXQgaGl0SW5kaSA9IGZhbHNlO1xyXG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpIHtcclxuICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGhpdEluZGkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhpdEluZGkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VhcmNoQ29vcmRzKG1pc3NlcywgY29vcmQpKSB7XHJcbiAgICAgICAgICAgICAgICBtaXNzZXMucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9tZXRob2QgdG8gc2VhcmNoIGFuIGFycmF5IG9mIGNvb3JkaW5hdGVzIGZvciBhIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIGNvbnN0IHNlYXJjaENvb3JkcyA9IChjb29yZEFyciwgY29vcmQpID0+IHtcclxuICAgICAgICByZXR1cm4gY29vcmRBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3JkLnRvU3RyaW5nKCkpO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcclxuICAgIGNvbnN0IGNoZWNrQWxsU3VuayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICAgIH07XHJcbiAgICAvL3BsYWNlIHNoaXAgd2l0aCBzdGFydCBjb29yZGluYXRlIGFuZCBkaXJlY3Rpb24sIGNoZWNrcyBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgLy9hbmQgZG9lcyBub3Qgb3ZlcmxhcCB3aXRoIG90aGVyIHNoaXBzIHBsYWNlZFxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHN0YXJ0Q29vcmQsIGN1cnJTaGlwVHlwZSwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoY2hlY2tDb29yZChzdGFydENvb3JkLCBjdXJyU2hpcFR5cGUsIGxlbmd0aCwgZGlyZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyU2hpcE9iaiA9IHNoaXBzLmZpbHRlcihzaGlwID0+IHNoaXAudHlwZSA9PSBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwQ29vcmRzID0gcmV0dXJuU2hpcENvb3JkcyhzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgY3VyclNoaXBUeXBlKTtcclxuICAgICAgICAgICAgY3VyclNoaXBPYmpbMF0uYWRkU2hpcENvb3JkcyhzaGlwQ29vcmRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NoZWNrIHN0YXJ0IGNvb3JkIG9mIHNoaXAgZml0cyBvbiBncmlkXHJcbiAgICBjb25zdCBjaGVja0JvYXJkRml0ID0gKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdYJykge1xyXG4gICAgICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMF0gKyBsZW5ndGggLSAxKSA8PSBncmlkU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoKHN0YXJ0Q29vcmRbMV0gKyBsZW5ndGggLSAxKSA8PSBncmlkU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayBjb29yZHMgb2YgY3VycmVudCBzaGlwIGRvIG5vdCBvdmVybGFwIHdpdGggb3RoZXIgc2hpcHNcclxuICAgIGNvbnN0IGNoZWNrT3ZlcmxhcCA9IChzaGlwQ29vcmRzLCBjaGVja1NoaXBzKSA9PiAge1xyXG4gICAgICAgIHJldHVybiAhY2hlY2tTaGlwcy5zb21lKHNoaXAgPT4gc2hpcENvb3Jkcy5zb21lKGNvb3JkID0+IHNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkpO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgY29vcmRzIGZpdCBvbiBib2FyZCBhbmQgZG8gbm90IG92ZXJsYXAgYW5vdGhlciBwbGFjZWQgc2hpcFxyXG4gICAgY29uc3QgY2hlY2tDb29yZCA9IChzdGFydENvb3JkLCBjdXJyU2hpcFR5cGUsIGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hpcENvb3JkcyA9IHJldHVyblNoaXBDb29yZHMoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24sIGN1cnJTaGlwVHlwZSk7XHJcbiAgICAgICAgY29uc3QgY2hlY2tTaGlwcyA9IHNoaXBzLmZpbHRlcihzaGlwID0+IHNoaXAudHlwZSAhPT0gY3VyclNoaXBUeXBlKTtcclxuICAgICAgICBpZiAoY2hlY2tCb2FyZEZpdChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpICYmIGNoZWNrT3ZlcmxhcChzaGlwQ29vcmRzLCBjaGVja1NoaXBzKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vcmV0dXJuIGNvb3JkaW5hdGVzIG9mIHdob2xlIHNoaXBcclxuICAgIGNvbnN0IHJldHVyblNoaXBDb29yZHMgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBsZXQgc2hpcENvb3JkcyA9IFtzdGFydENvb3JkXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hpcENvb3JkcztcclxuICAgIH07XHJcbiAgICAvL2NvdW50IHRvdGFsIGFtb3VudCBvZiBoaXRzIG9uIGEgYm9hcmRcclxuICAgIGNvbnN0IGNvdW50SGl0cyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzaGlwLmhpdEluZm9baV0gPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgZ3JpZFNpemUsIHNoaXBzLCBjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyLCBtaXNzZXMsIHJlY2VpdmVBdHRhY2ssIGNoZWNrQWxsU3VuaywgcGxhY2VTaGlwLCBjaGVja0Nvb3JkLCBjb3VudEhpdHMgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IG5ld0dhbWVCb2FyZCB9O1xyXG4iLCJjb25zdCBuZXdQbGF5ZXIgPSAobmFtZSwgdHlwZSkgPT4ge1xyXG4gICAgY29uc3QgcmFuQ29vcmQgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBjb25zdCB4Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncmlkU2l6ZSkgKyAxO1xyXG4gICAgICAgIGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGdyaWRTaXplKSArIDE7XHJcbiAgICAgICAgcmV0dXJuIFt4Q29vcmQsIHlDb29yZF07XHJcbiAgICB9O1xyXG4gICAgaWYgKHR5cGUgPT09ICdodW1hbicpIHtcclxuICAgICAgICByZXR1cm4ge25hbWUsIHR5cGV9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29tcHV0ZXInKSB7XHJcbiAgICAgICAgLy9waWNrIGEgcmFuZG9tIGdyaWQgcG9pbnQgd2l0aGluIGEgZ3JpZCBhbmQgYSByYW5kb20gWC9ZIGRpcmVjdGlvblxyXG4gICAgICAgIGNvbnN0IHNoaXBTdGFydFBvcyA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB4eURpciA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyAnWCcgOiAnWSc7XHJcbiAgICAgICAgICAgIGNvbnN0IFt4Q29vcmQsIHlDb29yZF0gPSByYW5Db29yZChncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbW3hDb29yZCwgeUNvb3JkXSwgeHlEaXJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3BpY2sgYSByYW5kb20gZ3JpZCBwb2ludCBnaXZlbiBhIGNlcnRhaW4gZ3JpZCBzaXplXHJcbiAgICAgICAgY29uc3QgY29tcEF0dGFjayA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmFuQ29vcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge25hbWUsIHR5cGUsIHNoaXBTdGFydFBvcywgY29tcEF0dGFja307XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IG5ld1BsYXllciB9OyIsImNvbnN0IG5ld1NoaXAgPSAobGVuZ3RoLCB0eXBlKSA9PiB7XHJcbiAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xyXG4gICAgLy9hZGQgYXJyYXkgb2YgY29vcmRzXHJcbiAgICBjb25zdCBhZGRTaGlwQ29vcmRzID0gKGNvb3JkQXJyKSA9PiB7XHJcbiAgICAgICAgY29vcmRBcnIuZm9yRWFjaChjb29yZCA9PiBzaGlwQ29vcmRzLnB1c2goY29vcmQpKTtcclxuICAgIH07XHJcbiAgICAvL2luaXRpYWxpc2UgYW5kIHBvcHVsYXRlIGFuIG9iamVjdCB3aGljaCBzaG93cyBhbnkgaGl0cyBvbiBhIHNoaXBcclxuICAgIGNvbnN0IGhpdEluZm8gPSB7fTtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gaTtcclxuICAgICAgICBoaXRJbmZvW3Bvc2l0aW9uXSA9ICdvayc7XHJcbiAgICB9XHJcbiAgICAvL3VwZGF0ZSBoaXQgb24gYSBzaGlwXHJcbiAgICBjb25zdCBoaXQgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBoaXRJbmZvW2NhbFBvc2l0aW9uKGNvb3JkKV0gPSAnaGl0JztcclxuICAgIH07XHJcbiAgICAvL21ldGhvZCB0byBjaGVjayB3aGV0aGVyIGEgc2hpcCBpcyBzdW5rIGJ5IGNoZWNraW5nIHRoZSBoaXRJbmZvIG9iamVjdFxyXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBoaXRDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGhpdEluZm9baV0gPT09ICdoaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRDb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vY2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvZiBoaXQgb24gc2hpcCBiYXNlZCBvbiB0aGUgaGl0IGNvb3JkXHJcbiAgICBjb25zdCBjYWxQb3NpdGlvbiA9IChjb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHhEaWZmID0gTWF0aC5hYnMoc2hpcENvb3Jkc1swXVswXSAtIGNvb3JkWzBdKTtcclxuICAgICAgICBjb25zdCB5RGlmZiA9IE1hdGguYWJzKHNoaXBDb29yZHNbMF1bMV0gLSBjb29yZFsxXSk7XHJcbiAgICAgICAgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeERpZmYgPT09IDAgJiYgeURpZmYgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5RGlmZiArIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh4RGlmZiA+IDAgJiYgeURpZmYgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHhEaWZmICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgbGVuZ3RoLCB0eXBlLCBzaGlwQ29vcmRzLCBoaXRJbmZvLCBhZGRTaGlwQ29vcmRzLCBoaXQsIGlzU3VuayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHsgbmV3U2hpcCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbmV3UGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XHJcbmltcG9ydCB7IG5ld0dhbWVCb2FyZCB9IGZyb20gXCIuL2dhbWVCb2FyZFwiO1xyXG5pbXBvcnQgeyBET00gfSBmcm9tIFwiLi9ET01cIjtcclxuXHJcbmNvbnN0IGdhbWVNb2R1bGUgPSgoKSA9PiAge1xyXG4gICAgbGV0IHAxT2JqID0ge307XHJcbiAgICBsZXQgcDJPYmogPSB7fTtcclxuICAgIGxldCBwMUJvYXJkID0ge307XHJcbiAgICBsZXQgcDJCb2FyZCA9IHt9O1xyXG4gICAgbGV0IHAxbmFtZSA9ICcnO1xyXG4gICAgbGV0IHAybmFtZSA9ICcnO1xyXG4gICAgbGV0IHAxdHlwZSA9ICcnO1xyXG4gICAgbGV0IHAydHlwZSA9ICcnO1xyXG4gICAgbGV0IGF0dGFja0Nvb3JkID0gJyc7XHJcbiAgICBsZXQgc2hpcERpcmVjdCA9ICdYJztcclxuICAgIGxldCBjdXJyU2hpcFR5cGUgPSAnQ2Fycmllcic7XHJcbiAgICBsZXQgY3VyclNoaXBMZW5ndGggPSA1O1xyXG4gICAgbGV0IGN1cnJDb29yZCA9IFtdO1xyXG4gICAgbGV0IGN1cnJQbGF5T2JqID0ge307XHJcbiAgICBsZXQgY3VyckJvYXJkT2JqID0ge307XHJcblxyXG4gICAgLy9ldmVudCBoYW5kbGVyc1xyXG4gICAgY29uc3QgY2hhbmdlU2hpcENsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHNoaXBEaXJlY3QgPT09ICdYJyA/IHNoaXBEaXJlY3QgPSAnWScgOiBzaGlwRGlyZWN0ID0gJ1gnO1xyXG4gICAgICAgIERPTS5jaGFuZ2VTaGlwRGlyKHNoaXBEaXJlY3QsIGN1cnJTaGlwTGVuZ3RoKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBzaGlwT3ZlcmxheUNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgRE9NLnNoaXBPdmVybGF5KGV2ZW50LCBzaGlwRGlyZWN0LCBjdXJyU2hpcExlbmd0aClcclxuICAgIH07XHJcbiAgICBjb25zdCBzaGlwSW5wdXRDbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIC8vY2hlY2sgc2hpcCBwbGFjZW1lbnQgaXMgYWNjZXB0YWJsZVxyXG4gICAgICAgIGN1cnJDb29yZCA9IERPTS5jbGlja0Nvb3JkKGV2ZW50KTtcclxuICAgICAgICBpZiAoY3VyckJvYXJkT2JqLmNoZWNrQ29vcmQoY3VyckNvb3JkLCBjdXJyU2hpcFR5cGUsIGN1cnJTaGlwTGVuZ3RoLCBzaGlwRGlyZWN0KSkge1xyXG4gICAgICAgICAgICAvL3JlbmRlciBzaGlwIG9uIGlucHV0Qm9hcmQgXHJcbiAgICAgICAgICAgIC8vaWYgb2ssIHJlbW92ZSBzaGlwT3ZlcmxheSBsaXN0ZW5lciBhbmQgaW5wdXRjbGljayBsaXN0ZW5lclxyXG4gICAgICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdzaGlwSWNvbicsICdjbGljaycsIGNoYW5nZVNoaXBDbGljayk7XHJcbiAgICAgICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ2lucHV0Qm9hcmQnLCAnbW91c2VvdmVyJywgc2hpcE92ZXJsYXlDbGljayk7XHJcbiAgICAgICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ2lucHV0Qm9hcmQnLCAnY2xpY2snLCBzaGlwSW5wdXRDbGljayk7XHJcbiAgICAgICAgICAgIC8vYXNrIGZvciBjb25maXJtYXRpb24gdG8gcGxhY2Ugc2hpcCwgaWYgeWVzLCBwbGFjZXNoaXAgYW5kIGxvYWQgbmV4dCBzaGlwXHJcbiAgICAgICAgICAgIERPTS5jb25maXJtU2hpcCgpO1xyXG4gICAgICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdjb25mU2hpcCcsICdjbGljaycsIG5leHRTaGlwKVxyXG4gICAgICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdjYW5jU2hpcCcsICdjbGljaycsIHNob3dDdXJyU2hpcClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG5ld0dhbWUgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBwMUJvYXJkID0gbmV3R2FtZUJvYXJkKGdyaWRTaXplKTtcclxuICAgICAgICBwMkJvYXJkID0gbmV3R2FtZUJvYXJkKGdyaWRTaXplKTtcclxuICAgICAgICBET00udGV4dEluc3RydWN0KCcnKTtcclxuICAgICAgICBET00ucGxheWVySW5wdXRCb3goJ1BsYXllciAxJyk7XHJcbiAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgnaW5wdXRGb3JtJywgJ3N1Ym1pdCcsIGdldFBsYXllcjEpO1xyXG4gICAgfTtcclxuICAgIC8vZ2V0IHBsYXllciAxJ3MgbmFtZSBhbmQgdHlwZSB2YWx1ZXMgZnJvbSBET00sIHRoZW4gZ2V0IHBsYXllciAyJ3MgZGV0YWlsc1xyXG4gICAgY29uc3QgZ2V0UGxheWVyMSA9IChlKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnaW5wdXRGb3JtJywgJ3N1Ym1pdCcsIGdldFBsYXllcjEpO1xyXG4gICAgICAgIFtwMW5hbWUsIHAxdHlwZV0gPSBET00uZ2V0UGxheWVySW5wdXRzKGUpO1xyXG4gICAgICAgIERPTS5wbGF5ZXJJbnB1dEJveCgnUGxheWVyIDInKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMik7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIDIncyBuYW1lIGFuZCB0eXBlLCBjcmVhdGUgcGxheWVyIG9iamVjdHMgYW5kIGdldCBzaGlwIGxvY2F0aW9uc1xyXG4gICAgY29uc3QgZ2V0UGxheWVyMiA9IChlKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnaW5wdXRGb3JtJywgJ3N1Ym1pdCcsIGdldFBsYXllcjIpO1xyXG4gICAgICAgIFtwMm5hbWUsIHAydHlwZV0gPSBET00uZ2V0UGxheWVySW5wdXRzKGUpO1xyXG4gICAgICAgIHAxT2JqID0gbmV3UGxheWVyKHAxbmFtZSwgcDF0eXBlKTtcclxuICAgICAgICBwMk9iaiA9IG5ld1BsYXllcihwMm5hbWUsIHAydHlwZSk7XHJcbiAgICAgICAgZ2V0UDFTaGlwcygpO1xyXG4gICAgfTtcclxuICAgIC8vZ2V0IHBsYXllciAxJ3Mgc2hpcCBsb2NhdGlvbnNcclxuICAgIGNvbnN0IGdldFAxU2hpcHMgPSAoKSA9PiB7XHJcbiAgICAgICAgY3VyclBsYXlPYmogPSBwMU9iajtcclxuICAgICAgICBjdXJyQm9hcmRPYmogPSBwMUJvYXJkO1xyXG4gICAgICAgIGlmIChwMU9iai50eXBlID09PSAnaHVtYW4nKSB7XHJcbiAgICAgICAgICAgIC8vaWYgcDEgaXMgaHVtYW4sIHJlbmRlciBzaGlwSW5wdXRCb3hcclxuICAgICAgICAgICAgRE9NLnNoaXBJbnB1dEJveCgpO1xyXG4gICAgICAgICAgICBzaG93Q3VyclNoaXAoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2dldCBjb21wdXRlciB0byBwbGFjZSBzaGlwc1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2dldFNoaXBJbnB1dHNcclxuICAgICAgICAvL2dldFAyU2hpcHNcclxuICAgIH07XHJcbiAgICAvL2dldCBwbGF5ZXIgMidzIHNoaXAgbG9jYXRpb25zXHJcbiAgICBjb25zdCBnZXRQMlNoaXBzID0gKCkgPT4ge1xyXG4gICAgICAgIGN1cnJQbGF5T2JqID0gcDJPYmo7XHJcbiAgICAgICAgY3VyckJvYXJkT2JqID0gcDJCb2FyZDtcclxuICAgICAgICBpZiAocDJPYmoudHlwZSA9PT0gJ2h1bWFuJykge1xyXG4gICAgICAgICAgICBjdXJyU2hpcFR5cGUgPSAnQ2Fycmllcic7XHJcbiAgICAgICAgICAgIGN1cnJTaGlwTGVuZ3RoID0gNTtcclxuICAgICAgICAgICAgc2hvd0N1cnJTaGlwKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9nZXQgY29tcHV0ZXIgdG8gcGxhY2Ugc2hpcHNcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIC8vbG9hZCBjdXJyZW50IGlucHV0IHNoaXBcclxuICAgIGNvbnN0IHNob3dDdXJyU2hpcCA9ICgpID0+IHtcclxuICAgICAgICAvL3Nob3cgY3VyciBzaGlwXHJcbiAgICAgICAgRE9NLnNob3dJbnB1dFNoaXAoY3VyclNoaXBUeXBlLCBjdXJyU2hpcExlbmd0aCwgY3VyclBsYXlPYmoubmFtZSk7XHJcbiAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRpcmVjdGlvbiBjaGFuZ2VcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdzaGlwSWNvbicsICdjbGljaycsIGNoYW5nZVNoaXBDbGljayk7XHJcbiAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGlucHV0Qm9hcmQsIG9uIGhvdmVyIHNob3VsZCBzaG93IHNoaXBcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdpbnB1dEJvYXJkJywgJ21vdXNlb3ZlcicsIHNoaXBPdmVybGF5Q2xpY2spO1xyXG4gICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBpbnB1dEJvYXJkLCBvbiBjbGljayBzaG91bGQgY2hlY2sgc2hpcCBwbGFjZW1lbnQsIHBsYWNlIHNoaXAgYW5kIGFzayBmb3IgY29uZmlybVxyXG4gICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2lucHV0Qm9hcmQnLCAnY2xpY2snLCBzaGlwSW5wdXRDbGljayk7XHJcbiAgICB9O1xyXG4gICAgLy9jb25maXJtIHNoaXAgcGxhY2VtZW50IGFuZCBsb2FkIG5leHQgc2hpcFxyXG4gICAgY29uc3QgbmV4dFNoaXAgPSAoKSA9PiB7XHJcbiAgICAgICAgLy9wbGFjZSBzaGlwXHJcbiAgICAgICAgY3VyckJvYXJkT2JqLnBsYWNlU2hpcChjdXJyQ29vcmQsIGN1cnJTaGlwVHlwZSwgY3VyclNoaXBMZW5ndGgsIHNoaXBEaXJlY3QsIDEwKTtcclxuICAgICAgICAvL3JlbW92ZSBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdjb25mU2hpcCcsICdjbGljaycsIG5leHRTaGlwKVxyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ2NhbmNTaGlwJywgJ2NsaWNrJywgc2hvd0N1cnJTaGlwKVxyXG4gICAgICAgIC8vdXBkYXRlIGN1cnJlbnQgc2hpcCB2YXJpYWJsZXMgYW5kIHJlbmRlciBuZXh0IHNoaXBcclxuICAgICAgICAvL2lmIGFsbCBzaGlwcyBwbGFjZWQsIG1vdmUgdG8gbmV4dCBwbGF5ZXIgb3Igc3RhcnQgZ2FtZVxyXG4gICAgICAgIGlmICghY3VyckJvYXJkT2JqLnNoaXBzLmV2ZXJ5KHNoaXAgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2hpcC5zaGlwQ29vcmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY3VyclNoaXBUeXBlID0gc2hpcC50eXBlO1xyXG4gICAgICAgICAgICAgICAgY3VyclNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KSkge1xyXG4gICAgICAgICAgICBzaG93Q3VyclNoaXAoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY3VyclBsYXlPYmogPT09IHAxT2JqKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRQMlNoaXBzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkR2FtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vbG9hZCBnYW1lIGJvYXJkc1xyXG4gICAgY29uc3QgbG9hZEdhbWUgPSAoKSA9PiAge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwSW5wdXRCb3gnKS5yZW1vdmUoKTtcclxuICAgICAgICAvL3JlbmRlciBnYW1lIGJvYXJkIGFuZCBzdGFydCBidXR0b25cclxuICAgICAgICBET00ubmV3Qm9hcmQocDFPYmosIHAyT2JqKTtcclxuICAgICAgICBET00uYWRkR2FtZUJ0bignU3RhcnQgR2FtZScpO1xyXG4gICAgICAgIERPTS5hZGRHYW1lQnRuKCdTdGFydCBHYW1lJyk7XHJcbiAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsIHN0YXJ0R2FtZSk7XHJcbiAgICB9O1xyXG4gICAgLy9zdGFydCBnYW1lIGxvb3AgYnkgcmVtb3Zpbmcgc3RhcnQgYnV0dG9uIGFuZCBzdGFydGluZyBwbGF5ZXIgMXMgdHVyblxyXG4gICAgY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ2dhbWVCdXR0b24nLCAnY2xpY2snLCBzdGFydEdhbWUpO1xyXG4gICAgICAgIERPTS5yZW1vdmVHYW1lQnRuKCk7XHJcbiAgICAgICAgLy9yYW5kb21seSBzZWxlY3QgZmlyc3QgcGxheWVyXHJcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjUpIHtcclxuICAgICAgICAgICAgcDFUdXJuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcDJUdXJuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JlbW92ZSBhbnkgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXIgZm9yIHBsYXllciAyLCB1cGRhdGUgZ2FtZSBpbnN0cnVjdGlvbnMgYW5kIGFjdGl2YXRlIGJvYXJkIDIgZm9yIGF0dGFja1xyXG4gICAgY29uc3QgcDFUdXJuID0gKCkgPT4ge1xyXG4gICAgICAgIERPTS5yZW1vdmVMaW5rQ2xhc3MoJ3AxQm9hcmQnKTtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMUJvYXJkJywgJ2NsaWNrJywgcDJBdHRhY2spO1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cDFPYmoubmFtZX0ncyB0dXJuLiBQaWNrIGEgZ3JpZCB0byBhdHRhY2sgb24gJHtwMk9iai5uYW1lfSdzIGJvYXJkIWApO1xyXG4gICAgICAgIC8vaWYgcGxheWVyIGlzIGNvbXB1dGVyLCBjb21wdXRlciB0byB0cmlnZ2VyIGNsaWNrIG9uIHJhbmRvbSBncmlkXHJcbiAgICAgICAgaWYgKHAxT2JqLnR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwMUF0dGFjaygpLCA3MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTS5hZGRMaW5rQ2xhc3MoJ3AyQm9hcmQnKTtcclxuICAgICAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgncDJCb2FyZCcsICdjbGljaycsIHAxQXR0YWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9vbiBwbGF5ZXIgMSBjbGljayAoYXR0YWNrKVxyXG4gICAgY29uc3QgcDFBdHRhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgcDJIaXRDb3VudCA9IHAyQm9hcmQuY291bnRIaXRzKCk7XHJcbiAgICAgICAgbGV0IHAyTWlzc0NvdW50ID0gcDJCb2FyZC5taXNzZXMubGVuZ3RoO1xyXG4gICAgICAgIC8vcmVjaWV2ZSBhdHRhY2sgY29vcmRpbmF0ZXMgKERPTSBmb3IgaHVtYW4gb3IgbWV0aG9kIGZvciBjb21wKSBhbmQgY29uZmlybSBoaXQgb3IgbWlzc1xyXG4gICAgICAgIGF0dGFja0Nvb3JkID0gKHAxT2JqLnR5cGUgPT09ICdjb21wdXRlcicpID8gcDFPYmouY29tcEF0dGFjayhwMUJvYXJkLmdyaWRTaXplKSA6IERPTS5jbGlja0Nvb3JkKGV2ZW50KTtcclxuICAgICAgICBwMkJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgIC8vaWYgbmV3IGhpdCwgcmVuZGVyIGhpdCwgY2FsbCBjaGVja0FsbFN1bmsoKSBhbmQgY2hlY2sgZm9yIHdpbm5lci4gSWYgbm90IGFsbCBzaGlwcyBzdW5rLCBuZXh0IHBsYXllciB0dXJuXHJcbiAgICAgICAgaWYgKHAySGl0Q291bnQgIT09IHAyQm9hcmQuY291bnRIaXRzKCkpIHtcclxuICAgICAgICAgICAgRE9NLmJvYXJkSGl0KCdwMkJvYXJkJywgYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgICAgICBpZiAocDJCb2FyZC5jaGVja0FsbFN1bmsoKSkge1xyXG4gICAgICAgICAgICAgICAgd2lubmVyKHAxT2JqLm5hbWUsIHAxQm9hcmQuZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcDJUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHAyTWlzc0NvdW50ICE9PSBwMkJvYXJkLm1pc3Nlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9pZiBuZXcgbWlzcywgcmVuZGVyIG1pc3MgYW5kIGNhbGwgbmV4dCBwbGF5ZXJzIHR1cm5cclxuICAgICAgICAgICAgRE9NLmJvYXJkTWlzcygncDJCb2FyZCcsIGF0dGFja0Nvb3JkKTtcclxuICAgICAgICAgICAgcDJUdXJuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9pZiBncmlkIGhhcyBhbHJlYWR5IGJlZW4gcGlja2VkLCBwaWNrIGFnYWluXHJcbiAgICAgICAgICAgIHAxQXR0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JlbW92ZSBhbnkgZXhpc3RpbmcgZXZlbnQgbGlzdGVuZXIgZm9yIHBsYXllciAxLCB1cGRhdGUgZ2FtZSBpbnN0cnVjdGlvbnMgYW5kIGFjdGl2YXRlIGJvYXJkIDIgZm9yIGF0dGFja1xyXG4gICAgY29uc3QgcDJUdXJuID0gKCkgPT4ge1xyXG4gICAgICAgIERPTS5yZW1vdmVMaW5rQ2xhc3MoJ3AyQm9hcmQnKTtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDFBdHRhY2spO1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoYCR7cDJPYmoubmFtZX0ncyB0dXJuLiBQaWNrIGEgZ3JpZCB0byBhdHRhY2sgb24gJHtwMU9iai5uYW1lfSdzIGJvYXJkIWApO1xyXG4gICAgICAgICAvL2lmIHBsYXllciBpcyBjb21wdXRlciwgY29tcHV0ZXIgdG8gcGljayBhIGdyaWQgYW5kIGF0dGFja1xyXG4gICAgICAgIGlmIChwMk9iai50eXBlID09PSAnY29tcHV0ZXInKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcDJBdHRhY2soKSwgNzAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET00uYWRkTGlua0NsYXNzKCdwMUJvYXJkJyk7XHJcbiAgICAgICAgICAgIERPTS5uZXdFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMkF0dGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvL29uIHBsYXllciAyIGNsaWNrIChhdHRhY2spXHJcbiAgICBjb25zdCBwMkF0dGFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBwMUhpdENvdW50ID0gcDFCb2FyZC5jb3VudEhpdHMoKTtcclxuICAgICAgICBsZXQgcDFNaXNzQ291bnQgPSBwMUJvYXJkLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgYXR0YWNrQ29vcmQgPSAocDJPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykgPyBwMk9iai5jb21wQXR0YWNrKHAyQm9hcmQuZ3JpZFNpemUpIDogRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAxQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgaWYgKHAxSGl0Q291bnQgIT09IHAxQm9hcmQuY291bnRIaXRzKCkpIHtcclxuICAgICAgICAgICAgRE9NLmJvYXJkSGl0KCdwMUJvYXJkJywgYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgICAgICBpZiAocDFCb2FyZC5jaGVja0FsbFN1bmsoKSkge1xyXG4gICAgICAgICAgICAgICAgd2lubmVyKHAyT2JqLm5hbWUsIHAyQm9hcmQuZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcDFUdXJuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHAxTWlzc0NvdW50ICE9PSBwMUJvYXJkLm1pc3Nlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgRE9NLmJvYXJkTWlzcygncDFCb2FyZCcsIGF0dGFja0Nvb3JkKTtcclxuICAgICAgICAgICAgcDFUdXJuKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcDJBdHRhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHdpbm5lciA9IChwbGF5ZXIsIGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdChgJHtwbGF5ZXJ9IGlzIHRoZSB3aW5uZXIhISBUaGV5IGhhdmUgc3VuayBhbGwgdGhlIGVuZW15IHNoaXBzIWApO1xyXG4gICAgICAgIERPTS5zaG93U2hpcHMoJ3AxQm9hcmQnLCBwMUJvYXJkKTtcclxuICAgICAgICBET00uc2hvd1NoaXBzKCdwMkJvYXJkJywgcDJCb2FyZCk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgncDFCb2FyZCcsICdjbGljaycsIHAxQXR0YWNrKTtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDJBdHRhY2spO1xyXG4gICAgICAgIERPTS5yZW1vdmVMaW5rQ2xhc3MoJ3AxQm9hcmQnKTtcclxuICAgICAgICBET00ucmVtb3ZlTGlua0NsYXNzKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgLy9yZW5kZXIgcmVzdGFydCBidXR0b25cclxuICAgICAgICBET00uYWRkR2FtZUJ0bignUmVzdGFydCcpO1xyXG4gICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2dhbWVCdXR0b24nLCAnY2xpY2snLCAoKSA9PiBuZXdHYW1lKGdyaWRTaXplKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV3R2FtZVxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmdhbWVNb2R1bGUubmV3R2FtZSgxMCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9