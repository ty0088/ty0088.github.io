import { newShip } from '../src/ship';

test('Add ship coordinates', () => {
    const carrier = newShip(5, 'carrier');
    carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    expect(carrier.shipCoords).toEqual([[6,4], [6,5], [6,6], [6,7], [6,8]]);
});

test('Carrier hit at position 1', () => {
    const carrier = newShip(5, 'carrier');
    carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    carrier.hit([6,4]);
    expect(carrier.hitInfo).toEqual({1: 'hit', 2: 'ok', 3: 'ok', 4: 'ok', 5: 'ok'});
});

test('Carrier is sunk', () => {
    const carrier = newShip(5, 'carrier');
    carrier.addShipCoords([[6,4], [6,5], [6,6], [6,7], [6,8]]);
    carrier.hit([6,4]);
    carrier.hit([6,5]);
    carrier.hit([6,6]);
    carrier.hit([6,7]);
    carrier.hit([6,8]);
    expect(carrier.isSunk()).toBe(true);
});