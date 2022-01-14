function makeGrid(gridSize) {
    grid.innerHTML = '';
    for (let i = 0; i < gridSize*gridSize; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        grid.appendChild(box);
    }
}

function clearGrid() {
    grid.innerHTML = '';
}

function fillGrid(e) {
    if (e.buttons === 1) {
        if(e.target.classList == 'box') {
            e.target.classList.add('hover');
        } else {
            return;
        }
    }
}

function checkNum() {

    let num = prompt("Please enter grid size (max 100)", 30)

    if (isNaN(num) || num === '' || num === '0') {
        alert("Invalid input. Must be a number");
        return 30;
    } else if (num > 100) {
        alert("Invalid input. Must be a number <= 100");
        return 30;
    } if (num === null) {
        return 30;
    } else {
        return num;
    }
}


const grid = document.getElementById('grid');
const clearButton = document.getElementById('clear_grid');
const changeButton = document.getElementById('change_grid');
let gridSize = 30;

makeGrid(gridSize);

grid.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.buttons === 1) {
        document.addEventListener('mouseover', (e) => {
            fillGrid(e);
        })
    }
});

clearButton.addEventListener('click', () => {
    clearGrid();
    makeGrid(gridSize);
});

changeButton.addEventListener('click', () => {
    gridSize = checkNum();
    grid.style.gridTemplateColumns = 'repeat(' + gridSize + ', 15px)';
    grid.style.gridTemplateRows = 'repeat(' + gridSize + ', 15px)';
    makeGrid(gridSize);
});

