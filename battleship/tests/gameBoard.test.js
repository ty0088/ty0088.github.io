import  { newGameBoard } from '../src/gameBoard';

test('Carrier to receive attack', () => {
    const p1Board = newGameBoard();
    p1Board.carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    p1Board.receiveAttack([6,4]);
    expect(p1Board.carrier.hitInfo).toEqual({1: 'hit', 2: 'ok', 3: 'ok', 4: 'ok', 5: 'ok'});
});

test('Missed attack', () => {
    const p1Board = newGameBoard();
    p1Board.carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    p1Board.receiveAttack([6,3]);
    expect(p1Board.carrier.hitInfo).toEqual({1: 'ok', 2: 'ok', 3: 'ok', 4: 'ok', 5: 'ok'});
    expect(p1Board.misses).toEqual([[6,3]]);
});

test('Not all sunk', () => {
    const p1Board = newGameBoard();
    p1Board.carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    p1Board.battle.addShipCoords([[6,4], [6,5], [6,6], [6,7]]);
    p1Board.cruiser.addShipCoords([[6,4], [6,5], [6,6]]);
    p1Board.submarine.addShipCoords([[6,4], [6,5], [6,6]]);
    p1Board.destroyer.addShipCoords([[6,4], [6,5]]);
    p1Board.receiveAttack([6,4]);
    p1Board.receiveAttack([6,5]);
    p1Board.receiveAttack([6,6]);
    p1Board.receiveAttack([6,7]);
    expect(p1Board.checkAllSunk()).toBe(false);
});

test('All sunk', () => {
    const p1Board = newGameBoard();
    p1Board.carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    p1Board.battle.addShipCoords([[6,4], [6,5], [6,6], [6,7]]);
    p1Board.cruiser.addShipCoords([[6,4], [6,5], [6,6]]);
    p1Board.submarine.addShipCoords([[6,4], [6,5], [6,6]]);
    p1Board.destroyer.addShipCoords([[6,4], [6,5]]);
    p1Board.receiveAttack([6,4]);
    p1Board.receiveAttack([6,5]);
    p1Board.receiveAttack([6,6]);
    p1Board.receiveAttack([6,7]);
    p1Board.receiveAttack([6,8]);
    expect(p1Board.checkAllSunk()).toBe(true);
});

test('Carrier placed at [6,4], Y', () => {
    const p1Board = newGameBoard(10);
    p1Board.placeShip([6,4], 'carrier', 5, 'Y');
    expect(p1Board.carrier.shipCoords).toEqual([[6,4], [6,5], [6,6], [6,7], [6,8]]);
});

test('all ships placed', () => {
    const p1Board = newGameBoard(10);
    p1Board.placeShip([6,4], 'carrier', 5, 'Y');
    p1Board.placeShip([1,1], 'battle', 4, 'X');
    p1Board.placeShip([2,6], 'cruiser', 3, 'Y');
    p1Board.placeShip([4,6], 'submarine', 3, 'Y');
    p1Board.placeShip([9,6], 'destroyer', 2, 'X');
    expect(p1Board.carrier.shipCoords).toEqual([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    expect(p1Board.battle.shipCoords).toEqual([[1,1], [2,1], [3,1], [4,1]]);
    expect(p1Board.cruiser.shipCoords).toEqual([[2,6], [2,7], [2,8]]);
    expect(p1Board.submarine.shipCoords).toEqual([[4,6], [4,7], [4,8]]);
    expect(p1Board.destroyer.shipCoords).toEqual([[9,6], [10,6]]);
});

test('ships overlap', () => {
    const p1Board = newGameBoard(10);
    p1Board.placeShip([6,4], 'carrier', 5, 'Y');
    expect(p1Board.placeShip([5,5], 'battle', 4, 'X')).toBe(false);
});

test('Carrier placed off board', ()=> {
    const p1Board = newGameBoard(10);
    expect(p1Board.placeShip([10,10], 'carriier', 5, 'X')).toBe(false);
});

test('Carrier hit 4 times', () => {
    const p1Board = newGameBoard();
    p1Board.carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    p1Board.receiveAttack([6,4]);
    p1Board.receiveAttack([6,5]);
    p1Board.receiveAttack([6,6]);
    p1Board.receiveAttack([6,7]);
    expect(p1Board.countHits()).toBe(4);
});