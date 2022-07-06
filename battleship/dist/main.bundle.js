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
    const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(5, 'carrier');
    const battle = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(4, 'battle');
    const cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'cruiser');
    const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(3, 'submarine');
    const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.newShip)(2, 'destroyer');
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
        if (checkBoardFit(startCoord, length, direction, gridSize)) {
            const shipCoords = returnShipCoords(startCoord, length, direction, currShipType);
            const checkShips = ships.filter(ship => ship.type !== currShipType);
            if (checkOverlap(shipCoords, checkShips)) {
                let currShipObj = ships.filter(ship => ship.type == currShipType);
                currShipObj[0].addShipCoords(shipCoords);
                return true;
            } else {
                return false;
            }
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
    //check coords of current ship do not overlap with other ships
    const checkOverlap = (shipCoords, checkShips) =>  {
        //shipCoords.every(coord => !checkShips.every(ship => !searchCoords(ship.shipCoords, coord)));
        return !checkShips.some(ship => shipCoords.some(coord => searchCoords(ship.shipCoords, coord)));
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
    return { gridSize, carrier, battle, cruiser, submarine, destroyer, misses, receiveAttack, checkAllSunk, placeShip, countHits };
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
        if (p1Obj.type === 'human') {
            //if p1 is human, render shipInputBox
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.shipInputBox();
            //render showCarrier
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.showInputShip('Carrier', 5, p1Obj.name);
            //add event listener for direction change
            _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.newEventList('xyDirect', 'click', () => {
                shipDirect === 'X' ? shipDirect = 'Y' : shipDirect = 'X';
                _DOM__WEBPACK_IMPORTED_MODULE_2__.DOM.changeShipDir(shipDirect, 5);
            });
            //add event listener drag drop, calling getCarrierLoc
        } else {

        }
        //getShipInputs
        //getP2Ships
    };
    //get player 2's ship locations
    const getP2Ships = () => {
        //re
        loadGame(10);
    };
    //load game boards
    const loadGame = () =>  {
         //players created in code, DOM input to be added
        //----------------------------------------------
        //----------------------------------------------
        //place ships in code, DOM input to be added
        //-------------------------------------------
        p1Board.placeShip([6,4], 'carrier', 5, 'Y');
        p1Board.placeShip([1,1], 'battle', 4, 'X');
        p1Board.placeShip([2,6], 'cruiser', 3, 'Y');
        p1Board.placeShip([4,6], 'submarine', 3, 'Y');
        p1Board.placeShip([9,6], 'destroyer', 2, 'X');
        p2Board.placeShip([5,10], 'carrier', 5, 'X');
        p2Board.placeShip([3,5], 'battle', 4, 'X');
        p2Board.placeShip([2,7], 'cruiser', 3, 'Y');
        p2Board.placeShip([8,1], 'submarine', 3, 'X');
        p2Board.placeShip([9,8], 'destroyer', 2, 'X');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWdCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUZBQXlGLGdEQUFjO0FBQ3ZHO0FBQ0E7QUFDQSxZQUFZLDhDQUFZO0FBQ3hCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFVBQVU7QUFDVixZQUFZLCtDQUFhO0FBQ3pCO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFnQixJQUFJLFFBQVE7QUFDcEMsUUFBUSwrQ0FBYTtBQUNyQixRQUFRLCtDQUFhO0FBQ3JCLFFBQVEscURBQW1CO0FBQzNCLFFBQVEscURBQW1CO0FBQzNCLFFBQVEscURBQW1CO0FBQzNCLFFBQVEscURBQW1CO0FBQzNCO0FBQ0EsUUFBUSxnREFBYztBQUN0QixRQUFRLGtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBfcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0Ly4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwX3Byb2plY3QvLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBET00gPSAoKCkgPT4ge1xyXG4gICAgLy9yZW5kZXIgZ2FtZSBib2FyZHNcclxuICAgIGNvbnN0IG5ld0JvYXJkID0gKHAxT2JqLCBwMk9iaikgPT4ge1xyXG4gICAgICAgIC8vY3JlYXRlIGdyaWQgbGluZXMgb24gcDFHcmlkXHJcbiAgICAgICAgY29uc3QgcDFHcmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AxQm9hcmQnKTtcclxuICAgICAgICBwMUdyaWQuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBwMUdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NyZWF0ZSBncmlkIGxpbmVzIG9uIHAyR3JpZFxyXG4gICAgICAgIGNvbnN0IHAyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwMkJvYXJkJyk7XHJcbiAgICAgICAgcDJHcmlkLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2hpdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdoaXRlQm94LmNsYXNzTGlzdC5hZGQoJ2JnV2hpdGUnKTtcclxuICAgICAgICAgICAgcDJHcmlkLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9hZGQgY29vcmRpbmF0ZSBhdHRyaWJ1dGUgdG8gZWFjaCBzcGFuXHJcbiAgICAgICAgY29uc3QgcDFCb3hTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwMUJvYXJkID4gc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IHAyQm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcDJCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBsZXQgc3BhbkNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDEwOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICBwMUJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHAyQm94U3BhbnNbc3BhbkNvdW50XS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY29vcmQnLCBgJHt4Q29vcmR9LCR7eUNvb3JkfWApO1xyXG4gICAgICAgICAgICAgICAgc3BhbkNvdW50ICsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmVuZGVyIHBsYXllciBuYW1lcyBiZWxvdyBlYWNoIGJvYXJkXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3AxQm9hcmQgKyAucGxheWVyTmFtZScpLmlubmVyVGV4dCA9IGAke3AxT2JqLm5hbWV9J3MgQm9hcmRgO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwMkJvYXJkICsgLnBsYXllck5hbWUnKS5pbm5lclRleHQgPSBgJHtwMk9iai5uYW1lfSdzIEJvYXJkYDtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBhIHN0YXJ0IGJ1dHRvblxyXG4gICAgY29uc3QgYWRkR2FtZUJ0biA9ICh0ZXh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2FtZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBjb25zdCBidG5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uQ29udGFpbmVyJyk7XHJcbiAgICAgICAgYnRuQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGdhbWVCdG4uaWQgPSAnZ2FtZUJ1dHRvbic7XHJcbiAgICAgICAgZ2FtZUJ0bi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XHJcbiAgICAgICAgZ2FtZUJ0bi5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgICAgIGJ0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQnRuKTtcclxuICAgIH07XHJcbiAgICAvL3JlbW92ZSBzdGFydCBidXR0b25cclxuICAgIGNvbnN0IHJlbW92ZUdhbWVCdG4gPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCdXR0b24nKS5yZW1vdmUoKTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciB0ZXh0IGluc3RydWN0aW9uc1xyXG4gICAgY29uc3QgdGV4dEluc3RydWN0ID0gKHRleHQpID0+IHtcclxuICAgICAgICBjb25zdCBpbnN0RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnN0cnVjdGlvbnMnKTtcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSAnJztcclxuICAgICAgICBpbnN0RWxlbS5pbm5lclRleHQgPSB0ZXh0O1xyXG4gICAgfTtcclxuICAgIC8vY3JlYXRlIGFuIGV2ZW50IGxpc3RlbmVyXHJcbiAgICBjb25zdCBuZXdFdmVudExpc3QgPSAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgLy9yZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXJcclxuICAgIGNvbnN0IHJlbW92ZUV2ZW50TGlzdCA9ICAoZWxlbUlELCBldmVudCwgZnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSUQpO1xyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgYWRkTGlua0NsYXNzID0gKGFjdEJvYXJkSUQsICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdEVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RCb2FyZElEKTtcclxuICAgICAgICBhY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgIH07XHJcbiAgICBjb25zdCByZW1vdmVMaW5rQ2xhc3MgPSAoZGVhY3RCb2FyZElEKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVhY3RFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVhY3RCb2FyZElEKTtcclxuICAgICAgICBkZWFjdEVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbGluaycpO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIGFsbCBzaGlwcyBvbiBib2FyZFxyXG4gICAgY29uc3Qgc2hvd1NoaXBzID0gKGJvYXJkLCBnYW1lQm9hcmRPYmopID0+IHtcclxuICAgICAgICAvL2NvbGxlY3QgYWxsIHNoaXAgY29vcmRpbmF0ZXMgYW5kIGFkZCBiZyBjbGFzc1xyXG4gICAgICAgIGNvbnN0IHNoaXBzQXJyID0gWydjYXJyaWVyJywgJ2JhdHRsZScsICdjcnVpc2VyJywgICdzdWJtYXJpbmUnLCAnZGVzdHJveWVyJ107XHJcbiAgICAgICAgc2hpcHNBcnIuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWVCb2FyZE9ialtzaGlwXS5zaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvb3Jkc0Fyci5wdXNoKGNvb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb29yZFN0cmluZyA9IGAke2Nvb3JkWzBdfSwke2Nvb3JkWzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Ym9hcmR9ID4gW2RhdGEtY29vcmQ9XCIke2Nvb3JkU3RyaW5nfVwiXWApLmNsYXNzTGlzdC5hZGQoJ2JnU2hpcCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBoaXRcclxuICAgIGNvbnN0IGJvYXJkSGl0ID0gKGJvYXJkLCBoaXRDb29yZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb29yZCA9IGAke2hpdENvb3JkWzBdfSwke2hpdENvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IGF0dGNrSWNuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGF0dGNrSWNuLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnKTtcclxuICAgICAgICBhdHRja0ljbi5pbm5lclRleHQgPSAnY2FuY2VsJztcclxuICAgICAgICBncmlkRWxlbS5hcHBlbmRDaGlsZChhdHRja0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoYXR0Y2tJY24pLm9wYWNpdHk7XHJcbiAgICAgICAgYXR0Y2tJY24uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgbWlzc1xyXG4gICAgY29uc3QgYm9hcmRNaXNzID0gKGJvYXJkLCBtaXNzQ29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCBkYXRhQ29vcmQgPSBgJHttaXNzQ29vcmRbMF19LCR7bWlzc0Nvb3JkWzFdfWA7XHJcbiAgICAgICAgY29uc3QgZ3JpZEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtib2FyZH0gPiBbZGF0YS1jb29yZD1cIiR7ZGF0YUNvb3JkfVwiXWApO1xyXG4gICAgICAgIGNvbnN0IG1pc3NJY24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgbWlzc0ljbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XHJcbiAgICAgICAgbWlzc0ljbi5pbm5lclRleHQgPSAncmFkaW9fYnV0dG9uX3VuY2hlY2tlZCc7XHJcbiAgICAgICAgZ3JpZEVsZW0uYXBwZW5kQ2hpbGQobWlzc0ljbik7XHJcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUobWlzc0ljbikub3BhY2l0eTtcclxuICAgICAgICBtaXNzSWNuLnN0eWxlLm9wYWNpdHkgPSAxOyBcclxuICAgIH07XHJcbiAgICAvL3JldHVybnMgdGhlIGNvb3JkcyBpbiBhbiBhcnJheSBvZiBncmlkIGNsaWNrZWRcclxuICAgIGNvbnN0IGNsaWNrQ29vcmQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBjb29yZFN0ciA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3JkXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkU3RyQXJyID0gY29vcmRTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICBsZXQgY29vcmQgPSBbXTtcclxuICAgICAgICBjb29yZC5wdXNoKHBhcnNlSW50KGNvb3JkU3RyQXJyWzBdKSk7XHJcbiAgICAgICAgY29vcmQucHVzaChwYXJzZUludChjb29yZFN0ckFyclsxXSkpO1xyXG4gICAgICAgIHJldHVybiBjb29yZDtcclxuICAgIH07XHJcbiAgICAvL3JlbmRlciBwbGF5ZXIgaW5wdXQgYm94XHJcbiAgICBjb25zdCBwbGF5ZXJJbnB1dEJveCA9IChwbGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZUNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaW5wdXRCb3guaWQgPSAncGxheWVySW5wdXRCb3gnO1xyXG4gICAgICAgIGlucHV0Qm94LmNsYXNzTGlzdC5hZGQoJ2ZsZXhDb2x1bW5DZW50ZXInKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRCb3gpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0aW5zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBpbnB1dGluc3QuaW5uZXJUZXh0ID0gYEVudGVyICR7cGxheWVyfSBOYW1lIGFuZCBzZWxlY3QgUGxheWVyIFR5cGVgO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgICAgICBpbnB1dEZvcm0uaWQgPSAnaW5wdXRGb3JtJztcclxuICAgICAgICBpbnB1dEZvcm0uY2xhc3NMaXN0LmFkZCgnZmxleENvbHVtbkNlbnRlcicpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgbmFtZUlucHV0LmlkID0gJ25hbWVJbnB1dCc7XHJcbiAgICAgICAgbmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XHJcbiAgICAgICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgY29uc3QgaHVtYW5TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIGNvbnN0IGh1bWFuSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgIGh1bWFuSW5wdXQuaWQgPSAnaHVtYW5JbnB1dCc7XHJcbiAgICAgICAgaHVtYW5JbnB1dC5uYW1lID0gJ3R5cGVJbnB1dCc7XHJcbiAgICAgICAgaHVtYW5JbnB1dC50eXBlID0gJ3JhZGlvJztcclxuICAgICAgICBodW1hbklucHV0LnZhbHVlID0gJ2h1bWFuJztcclxuICAgICAgICBodW1hbklucHV0LnNldEF0dHJpYnV0ZSgncmVxdWlyZWQnLCAnJyk7XHJcbiAgICAgICAgY29uc3QgaHVtYW5MYWJlbCA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIGh1bWFuTGFiZWwuaHRtbEZvciA9ICdodW1hbklucHV0JztcclxuICAgICAgICBodW1hbkxhYmVsLmlubmVyVGV4dCA9ICdIdW1hbic7XHJcbiAgICAgICAgY29uc3QgY29tcFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgY29uc3QgY29tcElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBjb21wSW5wdXQuaWQgPSAnaHVtYW5JbnB1dCc7XHJcbiAgICAgICAgY29tcElucHV0Lm5hbWUgPSAndHlwZUlucHV0JztcclxuICAgICAgICBjb21wSW5wdXQudHlwZSA9ICdyYWRpbyc7XHJcbiAgICAgICAgY29tcElucHV0LnZhbHVlID0gJ2NvbXB1dGVyJztcclxuICAgICAgICBjb21wSW5wdXQuc2V0QXR0cmlidXRlKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICBjb25zdCBjb21wTGFiZWwgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcclxuICAgICAgICBjb21wTGFiZWwuaHRtbEZvciA9ICdjb21wSW5wdXQnO1xyXG4gICAgICAgIGNvbXBMYWJlbC5pbm5lclRleHQgPSAnQ29tcHV0ZXInO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBzdWJtaXRJbnB1dC5pZCA9J3N1Ym1pdElucHV0J1xyXG4gICAgICAgIHN1Ym1pdElucHV0LnR5cGUgPSAnc3VibWl0JztcclxuICAgICAgICBzdWJtaXRJbnB1dC52YWx1ZSA9ICdFbnRlcic7XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoaW5wdXRpbnN0KTtcclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChpbnB1dEZvcm0pO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xyXG4gICAgICAgIGh1bWFuU3Bhbi5hcHBlbmRDaGlsZChodW1hbklucHV0KTtcclxuICAgICAgICBodW1hblNwYW4uYXBwZW5kQ2hpbGQoaHVtYW5MYWJlbCk7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGh1bWFuU3Bhbik7XHJcbiAgICAgICAgY29tcFNwYW4uYXBwZW5kQ2hpbGQoY29tcElucHV0KTtcclxuICAgICAgICBjb21wU3Bhbi5hcHBlbmRDaGlsZChjb21wTGFiZWwpO1xyXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChjb21wU3Bhbik7XHJcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdElucHV0KTtcclxuICAgIH07XHJcbiAgICAvL2dldCBwbGF5ZXIgaW5wdXQgdmFsdWVzIGFuZCByZW1vdmVzIGlucHV0Qm94XHJcbiAgICBjb25zdCBnZXRQbGF5ZXJJbnB1dHMgPSAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWVJbnB1dCcpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJJbnB1dEJveCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIHJldHVybiBbbmFtZSwgdHlwZV07XHJcbiAgICB9O1xyXG4gICAgLy9yZW5kZXIgaW5wdXQgYm94IGFuZCBpbnB1dCBncmlkIHRvIGdldCBzaGlwIHBvc2l0aW9uc1xyXG4gICAgY29uc3Qgc2hpcElucHV0Qm94ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgaW5wdXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpbnB1dEJveC5pZCA9ICdzaGlwSW5wdXRCb3gnO1xyXG4gICAgICAgIGlucHV0Qm94LmNsYXNzTGlzdC5hZGQoJ2ZsZXhSb3dDZW50ZXInKTtcclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXRCb3gpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGlucHV0R3JpZC5jbGFzc0xpc3QuYWRkKCdnYW1lQm9hcmQnKTtcclxuICAgICAgICBpbnB1dEdyaWQuY2xhc3NMaXN0LmFkZCgndGVuUHhNYXJnaW4nKTtcclxuICAgICAgICBpbnB1dEdyaWQuaWQgPSAnaW5wdXRCb2FyZCc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdXaGl0ZScpO1xyXG4gICAgICAgICAgICBpbnB1dEdyaWQuYXBwZW5kQ2hpbGQod2hpdGVCb3gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnB1dEJveC5hcHBlbmRDaGlsZChpbnB1dEdyaWQpO1xyXG4gICAgICAgIGNvbnN0IGlucHV0Qm94U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaW5wdXRCb2FyZCA+IHNwYW4nKTtcclxuICAgICAgICBsZXQgc3BhbkNvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGxldCB5ID0gMTA7IHkgPiAwOyB5LS0pIHtcclxuICAgICAgICAgICAgY29uc3QgeUNvb3JkICA9IHk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDEwOyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhDb29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEJveFNwYW5zW3NwYW5Db3VudF0uc2V0QXR0cmlidXRlKCdkYXRhLWNvb3JkJywgYCR7eENvb3JkfSwke3lDb29yZH1gKTtcclxuICAgICAgICAgICAgICAgIHNwYW5Db3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaGlwSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHNoaXBJbmZvLmlkID0gJ3NoaXBJbmZvJztcclxuICAgICAgICBzaGlwSW5mby5jbGFzc0xpc3QuYWRkKCdmbGV4Q29sdW1uQ2VudGVyJyk7XHJcbiAgICAgICAgaW5wdXRCb3guYXBwZW5kQ2hpbGQoc2hpcEluZm8pO1xyXG4gICAgfTtcclxuICAgIC8vcmVuZGVyIHNoaXAgYW5kIGRpcmVjdGlvbiAgc2VsZWN0aW9uIGZvciBjbGljayBhbmQgcGxhY2VcclxuICAgIGNvbnN0IHNob3dJbnB1dFNoaXAgPSAoc2hpcE5hbWUsIHNoaXBMZW5ndGgsIHBsYXllck5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBzaGlwSW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwSW5mbycpO1xyXG4gICAgICAgIHNoaXBJbmZvLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IHRleHRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHRleHRTcGFuLmlkID0gJ3NoaXBJbnN0cic7XHJcbiAgICAgICAgdGV4dFNwYW4uaW5uZXJUZXh0ID0gYCR7cGxheWVyTmFtZX0sIHBsYWNlIHRoZSBzaGlwIGJ5IHNlbGVjdGluZyBhIGdyaWQgc3BhY2UgKHRoZSBzaGlwIGRpcmVjdGlvbiBjYW4gYmUgY2hhbmdlZCBieSBjbGlja2luZyBvbiBYL1kpYDtcclxuICAgICAgICBzaGlwSW5mby5hcHBlbmRDaGlsZCh0ZXh0U3Bhbik7XHJcbiAgICAgICAgY29uc3Qgc2hpcFR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgc2hpcFR5cGUuaWQgPSAnc2hpcFR5cGUnO1xyXG4gICAgICAgIHNoaXBUeXBlLmlubmVyVGV4dCA9IGAke3NoaXBOYW1lfSAoJHtzaGlwTGVuZ3RofSlgO1xyXG4gICAgICAgIHNoaXBJbmZvLmFwcGVuZENoaWxkKHNoaXBUeXBlKTtcclxuICAgICAgICBjb25zdCBzaGlwSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICBzaGlwSWNvbi5pZCA9ICdzaGlwSWNvbic7XHJcbiAgICAgICAgc2hpcEljb24uc3R5bGUuZ3JpZFRlbXBsYXRlID0gYDMwcHggLyByZXBlYXQoJHtzaGlwTGVuZ3RofSwgMzBweClgO1xyXG4gICAgICAgIHNoaXBJbmZvLmFwcGVuZENoaWxkKHNoaXBJY29uKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3aGl0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgd2hpdGVCb3guY2xhc3NMaXN0LmFkZCgnYmdTaGlwJyk7XHJcbiAgICAgICAgICAgIHNoaXBJY29uLmFwcGVuZENoaWxkKHdoaXRlQm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgeHlTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgIHh5U3Bhbi5pZCA9ICd4eURpcmVjdCc7XHJcbiAgICAgICAgeHlTcGFuLmlubmVyVGV4dCA9ICdYIC8gWSc7XHJcbiAgICAgICAgeHlTcGFuLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcclxuICAgICAgICBzaGlwSW5mby5hcHBlbmRDaGlsZCh4eVNwYW4pO1xyXG4gICAgfTtcclxuICAgIC8vY2hhbmdlIHNoaXAgZGlyZWN0aW9uXHJcbiAgICBjb25zdCBjaGFuZ2VTaGlwRGlyID0gKGRpcmVjdCwgc2hpcExlbmd0aCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoaXBJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoaXBJY29uJyk7XHJcbiAgICAgICAgaWYgKGRpcmVjdCA9PT0gJ1gnKSB7XHJcbiAgICAgICAgICAgIHNoaXBJY29uLnN0eWxlLmdyaWRUZW1wbGF0ZSA9IGAzMHB4IC8gcmVwZWF0KCR7c2hpcExlbmd0aH0sIDMwcHgpYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaGlwSWNvbi5zdHlsZS5ncmlkVGVtcGxhdGUgPSBgcmVwZWF0KCR7c2hpcExlbmd0aH0sIDMwcHgpIC8gMzBweGA7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5ld0JvYXJkLFxyXG4gICAgICAgIGFkZEdhbWVCdG4sXHJcbiAgICAgICAgcmVtb3ZlR2FtZUJ0bixcclxuICAgICAgICB0ZXh0SW5zdHJ1Y3QsXHJcbiAgICAgICAgbmV3RXZlbnRMaXN0LFxyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdCxcclxuICAgICAgICBhZGRMaW5rQ2xhc3MsXHJcbiAgICAgICAgcmVtb3ZlTGlua0NsYXNzLFxyXG4gICAgICAgIHNob3dTaGlwcyxcclxuICAgICAgICBib2FyZEhpdCxcclxuICAgICAgICBib2FyZE1pc3MsXHJcbiAgICAgICAgY2xpY2tDb29yZCxcclxuICAgICAgICBwbGF5ZXJJbnB1dEJveCxcclxuICAgICAgICBnZXRQbGF5ZXJJbnB1dHMsXHJcbiAgICAgICAgc2hpcElucHV0Qm94LFxyXG4gICAgICAgIHNob3dJbnB1dFNoaXAsXHJcbiAgICAgICAgY2hhbmdlU2hpcERpclxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IERPTSB9OyIsImltcG9ydCB7IG5ld1NoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBuZXdHYW1lQm9hcmQgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgIC8vY3JlYXRlIHNoaXAgb2Jqc1xyXG4gICAgY29uc3QgY2FycmllciA9IG5ld1NoaXAoNSwgJ2NhcnJpZXInKTtcclxuICAgIGNvbnN0IGJhdHRsZSA9IG5ld1NoaXAoNCwgJ2JhdHRsZScpO1xyXG4gICAgY29uc3QgY3J1aXNlciA9IG5ld1NoaXAoMywgJ2NydWlzZXInKTtcclxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IG5ld1NoaXAoMywgJ3N1Ym1hcmluZScpO1xyXG4gICAgY29uc3QgZGVzdHJveWVyID0gbmV3U2hpcCgyLCAnZGVzdHJveWVyJyk7XHJcbiAgICBjb25zdCBzaGlwcyA9IFtjYXJyaWVyLCBiYXR0bGUsIGNydWlzZXIsIHN1Ym1hcmluZSwgZGVzdHJveWVyXTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBjaG9zZW4gY29vcmQgaXMgYSBoaXQgb3IgbWlzcyBhbmQgaXMgYSBuZXdcclxuICAgIGxldCBtaXNzZXMgPSBbXTtcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcclxuICAgICAgICBsZXQgaGl0SW5kaSA9IGZhbHNlO1xyXG4gICAgICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWFyY2hDb29yZHMoc2hpcC5zaGlwQ29vcmRzLCBjb29yZCkpIHtcclxuICAgICAgICAgICAgICAgIHNoaXAuaGl0KGNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGhpdEluZGkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhpdEluZGkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VhcmNoQ29vcmRzKG1pc3NlcywgY29vcmQpKSB7XHJcbiAgICAgICAgICAgICAgICBtaXNzZXMucHVzaChjb29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9tZXRob2QgdG8gc2VhcmNoIGFuIGFycmF5IG9mIGNvb3JkaW5hdGVzIGZvciBhIHNwZWNpZmljIGNvb3JkaW5hdGVcclxuICAgIGNvbnN0IHNlYXJjaENvb3JkcyA9IChjb29yZEFyciwgY29vcmQpID0+IHtcclxuICAgICAgICByZXR1cm4gY29vcmRBcnIuc29tZShhcnIgPT4gYXJyLnRvU3RyaW5nKCkgPT09IGNvb3JkLnRvU3RyaW5nKCkpO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgd2hldGhlciBhbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmtcclxuICAgIGNvbnN0IGNoZWNrQWxsU3VuayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcclxuICAgIH07XHJcbiAgICAvL3BsYWNlIHNoaXAgd2l0aCBzdGFydCBjb29yZGluYXRlIGFuZCBkaXJlY3Rpb24sIGNoZWNrcyBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgLy9hbmQgZG9lcyBub3Qgb3ZlcmxhcCB3aXRoIG90aGVyIHNoaXBzIHBsYWNlZFxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHN0YXJ0Q29vcmQsIGN1cnJTaGlwVHlwZSwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoY2hlY2tCb2FyZEZpdChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZXR1cm5TaGlwQ29vcmRzKHN0YXJ0Q29vcmQsIGxlbmd0aCwgZGlyZWN0aW9uLCBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja1NoaXBzID0gc2hpcHMuZmlsdGVyKHNoaXAgPT4gc2hpcC50eXBlICE9PSBjdXJyU2hpcFR5cGUpO1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tPdmVybGFwKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyclNoaXBPYmogPSBzaGlwcy5maWx0ZXIoc2hpcCA9PiBzaGlwLnR5cGUgPT0gY3VyclNoaXBUeXBlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJTaGlwT2JqWzBdLmFkZFNoaXBDb29yZHMoc2hpcENvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9jaGVjayBzdGFydCBjb29yZCBvZiBzaGlwIGZpdHMgb24gZ3JpZFxyXG4gICAgY29uc3QgY2hlY2tCb2FyZEZpdCA9IChzdGFydENvb3JkLCBsZW5ndGgsIGRpcmVjdGlvbiwgZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzBdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChzdGFydENvb3JkWzFdICsgbGVuZ3RoIC0gMSkgPD0gZ3JpZFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vcmV0dXJuIGNvb3JkaW5hdGVzIG9mIHdob2xlIHNoaXBcclxuICAgIGNvbnN0IHJldHVyblNoaXBDb29yZHMgPSAoc3RhcnRDb29yZCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcclxuICAgICAgICBsZXQgc2hpcENvb3JkcyA9IFtzdGFydENvb3JkXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnWCcpIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNoaXBDb29yZHMucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hpcENvb3JkcztcclxuICAgIH07XHJcbiAgICAvL2NoZWNrIGNvb3JkcyBvZiBjdXJyZW50IHNoaXAgZG8gbm90IG92ZXJsYXAgd2l0aCBvdGhlciBzaGlwc1xyXG4gICAgY29uc3QgY2hlY2tPdmVybGFwID0gKHNoaXBDb29yZHMsIGNoZWNrU2hpcHMpID0+ICB7XHJcbiAgICAgICAgLy9zaGlwQ29vcmRzLmV2ZXJ5KGNvb3JkID0+ICFjaGVja1NoaXBzLmV2ZXJ5KHNoaXAgPT4gIXNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkpO1xyXG4gICAgICAgIHJldHVybiAhY2hlY2tTaGlwcy5zb21lKHNoaXAgPT4gc2hpcENvb3Jkcy5zb21lKGNvb3JkID0+IHNlYXJjaENvb3JkcyhzaGlwLnNoaXBDb29yZHMsIGNvb3JkKSkpO1xyXG4gICAgfTtcclxuICAgIC8vY291bnQgdG90YWwgYW1vdW50IG9mIGhpdHMgb24gYSBib2FyZFxyXG4gICAgY29uc3QgY291bnRIaXRzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuaGl0SW5mb1tpXSA9PT0gJ2hpdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH07XHJcbiAgICByZXR1cm4geyBncmlkU2l6ZSwgY2FycmllciwgYmF0dGxlLCBjcnVpc2VyLCBzdWJtYXJpbmUsIGRlc3Ryb3llciwgbWlzc2VzLCByZWNlaXZlQXR0YWNrLCBjaGVja0FsbFN1bmssIHBsYWNlU2hpcCwgY291bnRIaXRzIH07XHJcbn07XHJcblxyXG5leHBvcnQgeyBuZXdHYW1lQm9hcmQgfTtcclxuIiwiY29uc3QgbmV3UGxheWVyID0gKG5hbWUsIHR5cGUpID0+IHtcclxuICAgIGNvbnN0IHJhbkNvb3JkID0gKGdyaWRTaXplKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeENvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ3JpZFNpemUpICsgMTtcclxuICAgICAgICBjb25zdCB5Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncmlkU2l6ZSkgKyAxO1xyXG4gICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdO1xyXG4gICAgfTtcclxuICAgIGlmICh0eXBlID09PSAnaHVtYW4nKSB7XHJcbiAgICAgICAgcmV0dXJuIHtuYW1lLCB0eXBlfTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbXB1dGVyJykge1xyXG4gICAgICAgIC8vcGljayBhIHJhbmRvbSBncmlkIHBvaW50IHdpdGhpbiBhIGdyaWQgYW5kIGEgcmFuZG9tIFgvWSBkaXJlY3Rpb25cclxuICAgICAgICBjb25zdCBzaGlwU3RhcnRQb3MgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgeHlEaXIgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gJ1gnIDogJ1knO1xyXG4gICAgICAgICAgICBjb25zdCBbeENvb3JkLCB5Q29vcmRdID0gcmFuQ29vcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgICAgICByZXR1cm4gW1t4Q29vcmQsIHlDb29yZF0sIHh5RGlyXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9waWNrIGEgcmFuZG9tIGdyaWQgcG9pbnQgZ2l2ZW4gYSBjZXJ0YWluIGdyaWQgc2l6ZVxyXG4gICAgICAgIGNvbnN0IGNvbXBBdHRhY2sgPSAoZ3JpZFNpemUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJhbkNvb3JkKGdyaWRTaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtuYW1lLCB0eXBlLCBzaGlwU3RhcnRQb3MsIGNvbXBBdHRhY2t9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBuZXdQbGF5ZXIgfTsiLCJjb25zdCBuZXdTaGlwID0gKGxlbmd0aCwgdHlwZSkgPT4ge1xyXG4gICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcclxuICAgIC8vYWRkIGFycmF5IG9mIGNvb3Jkc1xyXG4gICAgY29uc3QgYWRkU2hpcENvb3JkcyA9IChjb29yZEFycikgPT4ge1xyXG4gICAgICAgIGNvb3JkQXJyLmZvckVhY2goY29vcmQgPT4gc2hpcENvb3Jkcy5wdXNoKGNvb3JkKSk7XHJcbiAgICB9O1xyXG4gICAgLy9pbml0aWFsaXNlIGFuZCBwb3B1bGF0ZSBhbiBvYmplY3Qgd2hpY2ggc2hvd3MgYW55IGhpdHMgb24gYSBzaGlwXHJcbiAgICBjb25zdCBoaXRJbmZvID0ge307XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IGk7XHJcbiAgICAgICAgaGl0SW5mb1twb3NpdGlvbl0gPSAnb2snO1xyXG4gICAgfVxyXG4gICAgLy91cGRhdGUgaGl0IG9uIGEgc2hpcFxyXG4gICAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XHJcbiAgICAgICAgaGl0SW5mb1tjYWxQb3NpdGlvbihjb29yZCldID0gJ2hpdCc7XHJcbiAgICB9O1xyXG4gICAgLy9tZXRob2QgdG8gY2hlY2sgd2hldGhlciBhIHNoaXAgaXMgc3VuayBieSBjaGVja2luZyB0aGUgaGl0SW5mbyBvYmplY3RcclxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaGl0Q291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChoaXRJbmZvW2ldID09PSAnaGl0Jykge1xyXG4gICAgICAgICAgICAgICAgaGl0Q291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhpdENvdW50ID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL2NhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb2YgaGl0IG9uIHNoaXAgYmFzZWQgb24gdGhlIGhpdCBjb29yZFxyXG4gICAgY29uc3QgY2FsUG9zaXRpb24gPSAoY29vcmQpID0+IHtcclxuICAgICAgICBjb25zdCB4RGlmZiA9IE1hdGguYWJzKHNoaXBDb29yZHNbMF1bMF0gLSBjb29yZFswXSk7XHJcbiAgICAgICAgY29uc3QgeURpZmYgPSBNYXRoLmFicyhzaGlwQ29vcmRzWzBdWzFdIC0gY29vcmRbMV0pO1xyXG4gICAgICAgIGlmICh4RGlmZiA9PT0gMCAmJiB5RGlmZiA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHhEaWZmID09PSAwICYmIHlEaWZmID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4geURpZmYgKyAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeERpZmYgPiAwICYmIHlEaWZmID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4RGlmZiArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGxlbmd0aCwgdHlwZSwgc2hpcENvb3JkcywgaGl0SW5mbywgYWRkU2hpcENvb3JkcywgaGl0LCBpc1N1bmsgfTtcclxufTtcclxuXHJcbmV4cG9ydCB7IG5ld1NoaXAgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG5ld1BsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgeyBuZXdHYW1lQm9hcmQgfSBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcclxuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4vRE9NXCI7XHJcblxyXG5jb25zdCBnYW1lTW9kdWxlID0oKCkgPT4gIHtcclxuICAgIGxldCBwMU9iaiA9IHt9O1xyXG4gICAgbGV0IHAyT2JqID0ge307XHJcbiAgICBsZXQgcDFCb2FyZCA9IHt9O1xyXG4gICAgbGV0IHAyQm9hcmQgPSB7fTtcclxuICAgIGxldCBwMW5hbWUgPSAnJztcclxuICAgIGxldCBwMm5hbWUgPSAnJztcclxuICAgIGxldCBwMXR5cGUgPSAnJztcclxuICAgIGxldCBwMnR5cGUgPSAnJztcclxuICAgIGxldCBhdHRhY2tDb29yZCA9ICcnO1xyXG4gICAgbGV0IHNoaXBEaXJlY3QgPSAnWCc7XHJcblxyXG4gICAgY29uc3QgbmV3R2FtZSA9IChncmlkU2l6ZSkgPT4ge1xyXG4gICAgICAgIHAxQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIHAyQm9hcmQgPSBuZXdHYW1lQm9hcmQoZ3JpZFNpemUpO1xyXG4gICAgICAgIERPTS50ZXh0SW5zdHJ1Y3QoJycpO1xyXG4gICAgICAgIERPTS5wbGF5ZXJJbnB1dEJveCgnUGxheWVyIDEnKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMSk7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIDEncyBuYW1lIGFuZCB0eXBlIHZhbHVlcyBmcm9tIERPTSwgdGhlbiBnZXQgcGxheWVyIDIncyBkZXRhaWxzXHJcbiAgICBjb25zdCBnZXRQbGF5ZXIxID0gKGUpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMSk7XHJcbiAgICAgICAgW3AxbmFtZSwgcDF0eXBlXSA9IERPTS5nZXRQbGF5ZXJJbnB1dHMoZSk7XHJcbiAgICAgICAgRE9NLnBsYXllcklucHV0Qm94KCdQbGF5ZXIgMicpO1xyXG4gICAgICAgIERPTS5uZXdFdmVudExpc3QoJ2lucHV0Rm9ybScsICdzdWJtaXQnLCBnZXRQbGF5ZXIyKTtcclxuICAgIH07XHJcbiAgICAvL2dldCBwbGF5ZXIgMidzIG5hbWUgYW5kIHR5cGUsIGNyZWF0ZSBwbGF5ZXIgb2JqZWN0cyBhbmQgZ2V0IHNoaXAgbG9jYXRpb25zXHJcbiAgICBjb25zdCBnZXRQbGF5ZXIyID0gKGUpID0+IHtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdpbnB1dEZvcm0nLCAnc3VibWl0JywgZ2V0UGxheWVyMik7XHJcbiAgICAgICAgW3AybmFtZSwgcDJ0eXBlXSA9IERPTS5nZXRQbGF5ZXJJbnB1dHMoZSk7XHJcbiAgICAgICAgcDFPYmogPSBuZXdQbGF5ZXIocDFuYW1lLCBwMXR5cGUpO1xyXG4gICAgICAgIHAyT2JqID0gbmV3UGxheWVyKHAybmFtZSwgcDJ0eXBlKTtcclxuICAgICAgICBnZXRQMVNoaXBzKCk7XHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIDEncyBzaGlwIGxvY2F0aW9uc1xyXG4gICAgY29uc3QgZ2V0UDFTaGlwcyA9ICgpID0+IHtcclxuICAgICAgICBpZiAocDFPYmoudHlwZSA9PT0gJ2h1bWFuJykge1xyXG4gICAgICAgICAgICAvL2lmIHAxIGlzIGh1bWFuLCByZW5kZXIgc2hpcElucHV0Qm94XHJcbiAgICAgICAgICAgIERPTS5zaGlwSW5wdXRCb3goKTtcclxuICAgICAgICAgICAgLy9yZW5kZXIgc2hvd0NhcnJpZXJcclxuICAgICAgICAgICAgRE9NLnNob3dJbnB1dFNoaXAoJ0NhcnJpZXInLCA1LCBwMU9iai5uYW1lKTtcclxuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGRpcmVjdGlvbiBjaGFuZ2VcclxuICAgICAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgneHlEaXJlY3QnLCAnY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzaGlwRGlyZWN0ID09PSAnWCcgPyBzaGlwRGlyZWN0ID0gJ1knIDogc2hpcERpcmVjdCA9ICdYJztcclxuICAgICAgICAgICAgICAgIERPTS5jaGFuZ2VTaGlwRGlyKHNoaXBEaXJlY3QsIDUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgZHJhZyBkcm9wLCBjYWxsaW5nIGdldENhcnJpZXJMb2NcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9nZXRTaGlwSW5wdXRzXHJcbiAgICAgICAgLy9nZXRQMlNoaXBzXHJcbiAgICB9O1xyXG4gICAgLy9nZXQgcGxheWVyIDIncyBzaGlwIGxvY2F0aW9uc1xyXG4gICAgY29uc3QgZ2V0UDJTaGlwcyA9ICgpID0+IHtcclxuICAgICAgICAvL3JlXHJcbiAgICAgICAgbG9hZEdhbWUoMTApO1xyXG4gICAgfTtcclxuICAgIC8vbG9hZCBnYW1lIGJvYXJkc1xyXG4gICAgY29uc3QgbG9hZEdhbWUgPSAoKSA9PiAge1xyXG4gICAgICAgICAvL3BsYXllcnMgY3JlYXRlZCBpbiBjb2RlLCBET00gaW5wdXQgdG8gYmUgYWRkZWRcclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvL3BsYWNlIHNoaXBzIGluIGNvZGUsIERPTSBpbnB1dCB0byBiZSBhZGRlZFxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHAxQm9hcmQucGxhY2VTaGlwKFs2LDRdLCAnY2FycmllcicsIDUsICdZJyk7XHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzEsMV0sICdiYXR0bGUnLCA0LCAnWCcpO1xyXG4gICAgICAgIHAxQm9hcmQucGxhY2VTaGlwKFsyLDZdLCAnY3J1aXNlcicsIDMsICdZJyk7XHJcbiAgICAgICAgcDFCb2FyZC5wbGFjZVNoaXAoWzQsNl0sICdzdWJtYXJpbmUnLCAzLCAnWScpO1xyXG4gICAgICAgIHAxQm9hcmQucGxhY2VTaGlwKFs5LDZdLCAnZGVzdHJveWVyJywgMiwgJ1gnKTtcclxuICAgICAgICBwMkJvYXJkLnBsYWNlU2hpcChbNSwxMF0sICdjYXJyaWVyJywgNSwgJ1gnKTtcclxuICAgICAgICBwMkJvYXJkLnBsYWNlU2hpcChbMyw1XSwgJ2JhdHRsZScsIDQsICdYJyk7XHJcbiAgICAgICAgcDJCb2FyZC5wbGFjZVNoaXAoWzIsN10sICdjcnVpc2VyJywgMywgJ1knKTtcclxuICAgICAgICBwMkJvYXJkLnBsYWNlU2hpcChbOCwxXSwgJ3N1Ym1hcmluZScsIDMsICdYJyk7XHJcbiAgICAgICAgcDJCb2FyZC5wbGFjZVNoaXAoWzksOF0sICdkZXN0cm95ZXInLCAyLCAnWCcpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8vcmVuZGVyIGdhbWUgYm9hcmQgYW5kIHN0YXJ0IGJ1dHRvblxyXG4gICAgICAgIERPTS5uZXdCb2FyZChwMU9iaiwgcDJPYmopO1xyXG4gICAgICAgIERPTS5hZGRHYW1lQnRuKCdTdGFydCBHYW1lJyk7XHJcbiAgICAgICAgRE9NLmFkZEdhbWVCdG4oJ1N0YXJ0IEdhbWUnKTtcclxuICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdnYW1lQnV0dG9uJywgJ2NsaWNrJywgc3RhcnRHYW1lKTtcclxuICAgIH07XHJcbiAgICAvL3N0YXJ0IGdhbWUgbG9vcCBieSByZW1vdmluZyBzdGFydCBidXR0b24gYW5kIHN0YXJ0aW5nIHBsYXllciAxcyB0dXJuXHJcbiAgICBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUV2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsIHN0YXJ0R2FtZSk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUdhbWVCdG4oKTtcclxuICAgICAgICAvL3JhbmRvbWx5IHNlbGVjdCBmaXJzdCBwbGF5ZXJcclxuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xyXG4gICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFueSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIDIsIHVwZGF0ZSBnYW1lIGluc3RydWN0aW9ucyBhbmQgYWN0aXZhdGUgYm9hcmQgMiBmb3IgYXR0YWNrXHJcbiAgICBjb25zdCBwMVR1cm4gPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDFCb2FyZCcpO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AxQm9hcmQnLCAnY2xpY2snLCBwMkF0dGFjayk7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdChgJHtwMU9iai5uYW1lfSdzIHR1cm4uIFBpY2sgYSBncmlkIHRvIGF0dGFjayBvbiAke3AyT2JqLm5hbWV9J3MgYm9hcmQhYCk7XHJcbiAgICAgICAgLy9pZiBwbGF5ZXIgaXMgY29tcHV0ZXIsIGNvbXB1dGVyIHRvIHRyaWdnZXIgY2xpY2sgb24gcmFuZG9tIGdyaWRcclxuICAgICAgICBpZiAocDFPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHAxQXR0YWNrKCksIDcwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRE9NLmFkZExpbmtDbGFzcygncDJCb2FyZCcpO1xyXG4gICAgICAgICAgICBET00ubmV3RXZlbnRMaXN0KCdwMkJvYXJkJywgJ2NsaWNrJywgcDFBdHRhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL29uIHBsYXllciAxIGNsaWNrIChhdHRhY2spXHJcbiAgICBjb25zdCBwMUF0dGFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBwMkhpdENvdW50ID0gcDJCb2FyZC5jb3VudEhpdHMoKTtcclxuICAgICAgICBsZXQgcDJNaXNzQ291bnQgPSBwMkJvYXJkLm1pc3Nlcy5sZW5ndGg7XHJcbiAgICAgICAgLy9yZWNpZXZlIGF0dGFjayBjb29yZGluYXRlcyAoRE9NIGZvciBodW1hbiBvciBtZXRob2QgZm9yIGNvbXApIGFuZCBjb25maXJtIGhpdCBvciBtaXNzXHJcbiAgICAgICAgYXR0YWNrQ29vcmQgPSAocDFPYmoudHlwZSA9PT0gJ2NvbXB1dGVyJykgPyBwMU9iai5jb21wQXR0YWNrKHAxQm9hcmQuZ3JpZFNpemUpIDogRE9NLmNsaWNrQ29vcmQoZXZlbnQpO1xyXG4gICAgICAgIHAyQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgLy9pZiBuZXcgaGl0LCByZW5kZXIgaGl0LCBjYWxsIGNoZWNrQWxsU3VuaygpIGFuZCBjaGVjayBmb3Igd2lubmVyLiBJZiBub3QgYWxsIHNoaXBzIHN1bmssIG5leHQgcGxheWVyIHR1cm5cclxuICAgICAgICBpZiAocDJIaXRDb3VudCAhPT0gcDJCb2FyZC5jb3VudEhpdHMoKSkge1xyXG4gICAgICAgICAgICBET00uYm9hcmRIaXQoJ3AyQm9hcmQnLCBhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgICAgIGlmIChwMkJvYXJkLmNoZWNrQWxsU3VuaygpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIocDFPYmoubmFtZSwgcDFCb2FyZC5ncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocDJNaXNzQ291bnQgIT09IHAyQm9hcmQubWlzc2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2lmIG5ldyBtaXNzLCByZW5kZXIgbWlzcyBhbmQgY2FsbCBuZXh0IHBsYXllcnMgdHVyblxyXG4gICAgICAgICAgICBET00uYm9hcmRNaXNzKCdwMkJvYXJkJywgYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgICAgICBwMlR1cm4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2lmIGdyaWQgaGFzIGFscmVhZHkgYmVlbiBwaWNrZWQsIHBpY2sgYWdhaW5cclxuICAgICAgICAgICAgcDFBdHRhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmVtb3ZlIGFueSBleGlzdGluZyBldmVudCBsaXN0ZW5lciBmb3IgcGxheWVyIDEsIHVwZGF0ZSBnYW1lIGluc3RydWN0aW9ucyBhbmQgYWN0aXZhdGUgYm9hcmQgMiBmb3IgYXR0YWNrXHJcbiAgICBjb25zdCBwMlR1cm4gPSAoKSA9PiB7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDJCb2FyZCcpO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AyQm9hcmQnLCAnY2xpY2snLCBwMUF0dGFjayk7XHJcbiAgICAgICAgRE9NLnRleHRJbnN0cnVjdChgJHtwMk9iai5uYW1lfSdzIHR1cm4uIFBpY2sgYSBncmlkIHRvIGF0dGFjayBvbiAke3AxT2JqLm5hbWV9J3MgYm9hcmQhYCk7XHJcbiAgICAgICAgIC8vaWYgcGxheWVyIGlzIGNvbXB1dGVyLCBjb21wdXRlciB0byBwaWNrIGEgZ3JpZCBhbmQgYXR0YWNrXHJcbiAgICAgICAgaWYgKHAyT2JqLnR5cGUgPT09ICdjb21wdXRlcicpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwMkF0dGFjaygpLCA3MDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTS5hZGRMaW5rQ2xhc3MoJ3AxQm9hcmQnKTtcclxuICAgICAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgncDFCb2FyZCcsICdjbGljaycsIHAyQXR0YWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vb24gcGxheWVyIDIgY2xpY2sgKGF0dGFjaylcclxuICAgIGNvbnN0IHAyQXR0YWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IHAxSGl0Q291bnQgPSBwMUJvYXJkLmNvdW50SGl0cygpO1xyXG4gICAgICAgIGxldCBwMU1pc3NDb3VudCA9IHAxQm9hcmQubWlzc2VzLmxlbmd0aDtcclxuICAgICAgICBhdHRhY2tDb29yZCA9IChwMk9iai50eXBlID09PSAnY29tcHV0ZXInKSA/IHAyT2JqLmNvbXBBdHRhY2socDJCb2FyZC5ncmlkU2l6ZSkgOiBET00uY2xpY2tDb29yZChldmVudCk7XHJcbiAgICAgICAgcDFCb2FyZC5yZWNlaXZlQXR0YWNrKGF0dGFja0Nvb3JkKTtcclxuICAgICAgICBpZiAocDFIaXRDb3VudCAhPT0gcDFCb2FyZC5jb3VudEhpdHMoKSkge1xyXG4gICAgICAgICAgICBET00uYm9hcmRIaXQoJ3AxQm9hcmQnLCBhdHRhY2tDb29yZCk7XHJcbiAgICAgICAgICAgIGlmIChwMUJvYXJkLmNoZWNrQWxsU3VuaygpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5uZXIocDJPYmoubmFtZSwgcDJCb2FyZC5ncmlkU2l6ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAocDFNaXNzQ291bnQgIT09IHAxQm9hcmQubWlzc2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBET00uYm9hcmRNaXNzKCdwMUJvYXJkJywgYXR0YWNrQ29vcmQpO1xyXG4gICAgICAgICAgICBwMVR1cm4oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwMkF0dGFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgd2lubmVyID0gKHBsYXllciwgZ3JpZFNpemUpID0+IHtcclxuICAgICAgICBET00udGV4dEluc3RydWN0KGAke3BsYXllcn0gaXMgdGhlIHdpbm5lciEhIFRoZXkgaGF2ZSBzdW5rIGFsbCB0aGUgZW5lbXkgc2hpcHMhYCk7XHJcbiAgICAgICAgRE9NLnNob3dTaGlwcygncDFCb2FyZCcsIHAxQm9hcmQpO1xyXG4gICAgICAgIERPTS5zaG93U2hpcHMoJ3AyQm9hcmQnLCBwMkJvYXJkKTtcclxuICAgICAgICBET00ucmVtb3ZlRXZlbnRMaXN0KCdwMUJvYXJkJywgJ2NsaWNrJywgcDFBdHRhY2spO1xyXG4gICAgICAgIERPTS5yZW1vdmVFdmVudExpc3QoJ3AyQm9hcmQnLCAnY2xpY2snLCBwMkF0dGFjayk7XHJcbiAgICAgICAgRE9NLnJlbW92ZUxpbmtDbGFzcygncDFCb2FyZCcpO1xyXG4gICAgICAgIERPTS5yZW1vdmVMaW5rQ2xhc3MoJ3AyQm9hcmQnKTtcclxuICAgICAgICAvL3JlbmRlciByZXN0YXJ0IGJ1dHRvblxyXG4gICAgICAgIERPTS5hZGRHYW1lQnRuKCdSZXN0YXJ0Jyk7XHJcbiAgICAgICAgRE9NLm5ld0V2ZW50TGlzdCgnZ2FtZUJ1dHRvbicsICdjbGljaycsICgpID0+IG5ld0dhbWUoZ3JpZFNpemUpKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXdHYW1lXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZ2FtZU1vZHVsZS5uZXdHYW1lKDEwKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=