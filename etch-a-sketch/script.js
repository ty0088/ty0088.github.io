function makeGrid () {
    for (let i = 0; i < 30*30; i++) {
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

const grid = document.getElementById('grid');
const clearButton = document.getElementById('clear')

makeGrid();

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
    makeGrid();
});