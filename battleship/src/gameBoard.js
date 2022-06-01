import { createShip } from "./ship.js";

const checkCoords = (startCoord, length, direction) => {
    //check start coord is acceptable for ship location on a 10x10 grid
    if (direction === 'X') {
        if ((startCoord[0] + length - 1) <= 10) {
            return true;
        } else {
            return false;
        }
    } else {
        if ((startCoord[1] + length - 1) <= 10) {
            return true;
        } else {
            return false;
        }
    }
};

const returnCoords = (length, startCoord, direction) => {
    //return coordinates of whole ship
    if (checkCoords(startCoord, length, direction)) {
        let coordsArr = [startCoord];
        for (let i = 1; i < length; i ++) {
            if (direction === 'X') {
                coordsArr.push([startCoord[0] + i, startCoord[1]]);
            } else {
                coordsArr.push([startCoord[0], startCoord[1] + i]);
            }
        }
        return coordsArr;
    } else {
        console.log('Ship will not fit on board, choose a new location!');
        throw new Error("Ship will not fit on board, choose a new location!");
    }
};

const searchCoords = (searchArr, coords) => {
    //search array of coordinates for specific coordinate
    return searchArr.some(arr => arr.toString() === coords.toString());
};

const calPosition = (searchArr, coords) => {
    //calculate the relative position of hit on ship
    const xDiff = Math.abs(searchArr[0][0] - coords[0]);
    const yDiff = Math.abs(searchArr[0][1] - coords[1]);
    if (xDiff === 0 && yDiff === 0) {
        return 1;
    } else if (xDiff === 0 && yDiff > 0) {
        return yDiff + 1;
    } else if (xDiff > 0 && yDiff === 0) {
        return xDiff + 1;
    }
};

const createGameBoard = (player, startCoordArr) => {
    //place carrier, battle, cruiser and destroyer ships
    //carrStart, battStart, cruiStart, destStart
    let [startCoord, direction] = startCoordArr[0];
    const carrier = createShip(5, returnCoords(5, startCoord, direction));
    [startCoord, direction] = startCoordArr[1];
    const battle = createShip(4, returnCoords(4, startCoord, direction));
    [startCoord, direction] = startCoordArr[2];
    const cruiser = createShip(3, returnCoords(3, startCoord, direction));
    [startCoord, direction] = startCoordArr[3];
    const submarine = createShip(3, returnCoords(3, startCoord, direction));
    [startCoord, direction] = startCoordArr[4];
    const destroyer = createShip(2, returnCoords(2, startCoord, direction));
    //initialise hits and misses arrays
    const hits = [];
    const misses = [];
    //recieve attack method. If coords hit then mark appropriate ship hitInfo and update hit array.
    //if miss then update miss array
    const receiveAttack = (coords) => {
        if (searchCoords(carrier.shipCoords, coords)) {
            hits.push(coords);
            const hitPos = calPosition(carrier.shipCoords, coords);
            carrier.hit(hitPos);
        } else if (searchCoords(battle.shipCoords, coords)) {
            hits.push(coords);
            const hitPos = calPosition(battle.shipCoords, coords);
            battle.hit(hitPos);
        } else if (searchCoords(cruiser.shipCoords, coords)) {
            hits.push(coords);
            const hitPos = calPosition(cruiser.shipCoords, coords);
            cruiser.hit(hitPos);
        } else if (searchCoords(submarine.shipCoords, coords)) {
            hits.push(coords);
            const hitPos = calPosition(submarine.shipCoords, coords);
            submarine.hit(hitPos);
        } else if (searchCoords(destroyer.shipCoords, coords)) {
            hits.push(coords);
            const hitPos = calPosition(destroyer.shipCoords, coords);
            destroyer.hit(hitPos);
        } else {
            misses.push(coords);
        }
    };
    //check whether all of the ships have been sunk method
    const checkAllSunk = () => {
        if (!carrier.isSunk()) {
            return false;
        } else if (!battle.isSunk()) {
            return false;
        } else if (!cruiser.isSunk()) {
            return false;
        } else if (!submarine.isSunk()) {
            return false;
        } else if (!destroyer.isSunk()) {
            return false;
        } else {
            return true;
        }
    };
    return { player, carrier, battle, cruiser, submarine, destroyer, hits, misses, receiveAttack, checkAllSunk };
};

export { createGameBoard };