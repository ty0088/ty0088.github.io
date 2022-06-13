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
        // gridElem.innerHTML = '';
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
        // gridElem.innerHTML = '';
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
        clickCoord
    };
})();

export { DOM };