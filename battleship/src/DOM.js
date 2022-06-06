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

export { DOM };