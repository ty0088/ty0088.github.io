import { DOM } from "./DOM";

const newPlayer = (name, type) => {
    const ranCoord = (gridSize) => {
        const xCoord = Math.floor(Math.random() * gridSize) + 1;
        const yCoord = Math.floor(Math.random() * gridSize) + 1;
        return [xCoord, yCoord];
    };
    if (type === 'human') {
        return {name, type};
    } else if (type === 'computer') {
        //pick a random grid point within a grid and a random X/Y direction
        const shipStartPos = (gridSize) => {
            const xyDir = Math.random() < 0.5 ? 'X' : 'Y';
            const [xCoord, yCoord] = ranCoord(gridSize);
            return [[xCoord, yCoord], xyDir];
        }
        //pick a random grid point given a certain grid size
        const compAttack = (gridSize) => {
            return ranCoord(gridSize);
        }
        return {name, type, shipStartPos, compAttack};
    }
}

export { newPlayer };