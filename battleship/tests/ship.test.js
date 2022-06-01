import { createShip } from "../src/ship.js";

test('Carrier at [6,4] in direction Y', () => {
    const ship1 = createShip(5, [[6,4], [6,5], [6,6], [6,7], [6,8]])
    expect(ship1.isSunk()).toBe(false);
});

test('Carrier hit at position 1', () => {
    const ship1 = createShip(5, [[6,4], [6,5], [6,6], [6,7], [6,8]]);
    ship1.hit(1);
    expect(ship1.hitInfo).toEqual({1: 'hit', 2: 'ok', 3: 'ok', 4: 'ok', 5: 'ok'});
});

test('Carrier is sunk', () => {
    const ship1 = createShip(5, [[6,4], [6,5], [6,6], [6,7], [6,8]]);
    ship1.hit(1);
    ship1.hit(2);
    ship1.hit(3);
    ship1.hit(4);
    ship1.hit(5);
    expect(ship1.isSunk()).toEqual(true);
});