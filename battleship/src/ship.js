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

export { newShip };