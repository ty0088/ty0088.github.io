const createPlayer = (name, type) => {
    if (type === 'human') {
        return {name, type};
    } else if (type === 'computer') {
        //computer ship placing logic
        const compShipCoords = () => {

        }
        //computer game logic
        const gameLogic = () => {

        }
        return {name, type, compShipCoords, gameLogic};
    }
}

export default createPlayer;