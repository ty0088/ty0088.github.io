import { newPlayer } from "../src/player";

test('Random coordinate and X/Y direction within grid size 10', () => {
    const player1 = newPlayer('comp', 'computer');
    const [[xCoord, yCoord], xyDir] = player1.shipStartPos(10);
    expect(xCoord).toBeGreaterThanOrEqual(1);
    expect(xCoord).toBeLessThanOrEqual(10);
    expect(yCoord).toBeGreaterThanOrEqual(1);
    expect(yCoord).toBeLessThanOrEqual(10);
    expect(xyDir).toMatch(/[XY]/);
});

test('Random coordinate and X/Y direction within grid size 5', () => {
    const player1 = newPlayer('comp', 'computer');
    const [[xCoord, yCoord], xyDir] = player1.shipStartPos(5);
    expect(xCoord).toBeGreaterThanOrEqual(1);
    expect(xCoord).toBeLessThanOrEqual(5);
    expect(yCoord).toBeGreaterThanOrEqual(1);
    expect(yCoord).toBeLessThanOrEqual(5);
    expect(xyDir).toMatch(/[XY]/);
});
