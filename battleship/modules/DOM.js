const popSquares = () => {
    const p1Grid = document.getElementById('p1Board');
    for (let i = 0; i < 100; i++) {
        const whiteBox = document.createElement('span');
        whiteBox.classList.add('bgWhite');
        p1Grid.appendChild(p1Board);
    }
}

export { popSquares }