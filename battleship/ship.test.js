import { createShip } from "./ship";

test('Ship with length 5, hit in position 3', () => {
    const ship1 = createShip(5);
    ship1.hit(3);
    expect(ship1.getHitInfo()).toEqual({1: 'ok', 2: 'ok', 3: 'hit', 4: 'ok', 5: 'ok'});
});

test('Ship with length 6, hit in positions 1 & 6', () => {
    const ship1 = createShip(6);
    ship1.hit(1);
    ship1.hit(6);
    expect(ship1.getHitInfo()).toEqual({1: 'hit', 2: 'ok', 3: 'ok', 4: 'ok', 5: 'ok', 6: 'hit'});
});

test('Ship with length 5', () => {
    const ship1 = createShip(5);
    expect(ship1.getLength()).toEqual(5);
});

test('Ship with length 3, is sunk', () => {
    const ship1 = createShip(3);
    ship1.hit(1);
    ship1.hit(2);
    ship1.hit(3);
    expect(ship1.isSunk()).toBe(true);
});

test('Ship with length 4, is NOT sunk', () => {
    const ship1 = createShip(4);
    ship1.hit(1);
    ship1.hit(2);
    ship1.hit(3);
    expect(ship1.isSunk()).toBe(false);
});