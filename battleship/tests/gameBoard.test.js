import { createGameBoard } from "../src/gameBoard.js";

test('Carrier length', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    expect(player1.carrier.length).toBe(5);
})

test('Battles ship placed at [1,1] going in X direction', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    expect(player1.battle.shipCoords).toEqual([[1,1], [2,1], [3,1], [4,1]]);
})

test('Recieve attack at coords [6,4], register carrier hitInfo', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    player1.receiveAttack([6,4]);
    expect(player1.carrier.hitInfo).toEqual({1: 'hit', 2: 'ok', 3: 'ok', 4: 'ok', 5: 'ok'});
})

test('Recieve attack at coords [6,4], register hits', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    player1.receiveAttack([6,4]);
    expect(player1.hits).toEqual([[6,4]]);
})

test('Recieve attack at coords [10.6], register hits', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    player1.receiveAttack([10,6]);
    expect(player1.hits).toEqual([[10,6]]);
})

test('Recieve attack at coords [10.6], register destroyer hitInfo', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    player1.receiveAttack([10,6]);
    expect(player1.destroyer.hitInfo).toEqual({1: 'ok', 2: 'hit'});
})

test('Recieve attack at coords [10,10], register miss', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    player1.receiveAttack([10,10]);
    expect(player1.misses).toEqual([[10,10]]);
})

test('Check not all ships have been sunk', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    expect(player1.checkAllSunk()).toBe(false);
})

test('Check all ships have been sunk', () => {
    const player1 = createGameBoard('Player 1', [[[6,4], 'Y'], [[1,1], 'X'], [[2,6], 'Y'], [[4,6], 'Y'], [[9,6], 'X']]);
    player1.carrier.hit(1);
    player1.carrier.hit(2);
    player1.carrier.hit(3);
    player1.carrier.hit(4);
    player1.carrier.hit(5);
    player1.battle.hit(1);
    player1.battle.hit(2);
    player1.battle.hit(3);
    player1.battle.hit(4);
    player1.cruiser.hit(1);
    player1.cruiser.hit(2);
    player1.cruiser.hit(3);
    player1.submarine.hit(1);
    player1.submarine.hit(2);
    player1.submarine.hit(3);
    player1.destroyer.hit(1);
    player1.destroyer.hit(2);
    expect(player1.checkAllSunk()).toBe(true);
})