const createShip = (length, type) => {
    const getLength = () => length;
    const getType = () => type;
    const hitInfo = {};
    for (let i = 1; i <= length; i++) {
        let position = i;
        hitInfo[position] = 'ok';
    }
    const getHitInfo = () => hitInfo;
    const hit = (position) => {
        hitInfo[position] = 'hit';
    };
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
    return {getLength, getType, getHitInfo, hit, isSunk}
}

export { createShip }