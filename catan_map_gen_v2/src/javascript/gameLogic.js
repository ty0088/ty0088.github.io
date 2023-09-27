import deepClone from 'just-clone';

// map properties
const dfMapTiles = { // default map tile data
    1: {q: 0, r: -2, tileType: null, tokenValue: null, sameType: 0},
    2: {q: 1, r: -2, tileType: null, tokenValue: null, sameType: 0},
    3: {q: 2, r: -2, tileType: null, tokenValue: null, sameType: 0},
    4: {q: -1, r: -1, tileType: null, tokenValue: null, sameType: 0},
    5: {q: 0, r: -1, tileType: null, tokenValue: null, sameType: 0},
    6: {q: 1, r: -1, tileType: null, tokenValue: null, sameType: 0},
    7: {q: 2, r: -1, tileType: null, tokenValue: null, sameType: 0},
    8: {q: -2, r: 0, tileType: null, tokenValue: null, sameType: 0},
    9: {q: -1, r: 0, tileType: null, tokenValue: null, sameType: 0},
    10: {q: 0, r: 0, tileType: null, tokenValue: null, sameType: 0},
    11: {q: 1, r: 0, tileType: null, tokenValue: null, sameType: 0},
    12: {q: 2, r: 0, tileType: null, tokenValue: null, sameType: 0},
    13: {q: -2, r: 1, tileType: null, tokenValue: null, sameType: 0},
    14: {q: -1, r: 1, tileType: null, tokenValue: null, sameType: 0},
    15: {q: 0, r: 1, tileType: null, tokenValue: null, sameType: 0},
    16: {q: 1, r: 1, tileType: null, tokenValue: null, sameType: 0},
    17: {q: -2, r: 2, tileType: null, tokenValue: null, sameType: 0},
    18: {q: -1, r: 2, tileType: null, tokenValue: null, sameType: 0},
    19: {q: 0, r: 2, tileType: null, tokenValue: null, sameType: 0},
};
export const dfTileTypeQty = { // default number of tile types available - 1. Forest, 2. Pasture, 3. Field, 4. Hill, 5. Mountain, 6. Desert
    1: 4,
    2: 4,
    3: 4,
    4: 3,
    5: 3,
    6: 1,
};
export const totalTiles = Object.keys(dfTileTypeQty).reduce((acc, currKey) => acc += dfTileTypeQty[currKey], 0); // total number of tiles
export const dfTokenValQty = { // default number of token values available
    2: 1,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    8: 2,
    9: 2,
    10: 2,
    11: 2,
    12: 1,
};
const tokenProbVals = { // probability values for each tile value
    0: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    8: 5,
    9: 4,
    10: 3,
    11: 2,
    12: 1
};
const probLimit = 12; // probability limit for a group of 3 intersecting tiles
const tileAdjLimit = 2; // limit of the same tiles types that are adjacent to each other
const groupOffsets = [ // offset coords (q, r) to 2 other adjacent tiles for intersecting group relative to current tile
    [[0, -1], [1, -1]],
    [[1, -1], [1, 0]],
    [[1, 0], [0, 1]],
    [[0, 1], [-1, 1]],
    [[-1, 1], [-1, 0]],
    [[-1, 0], [0, -1]],
];

const generateMap = () => {
    //init default map properties
    let mapTiles = deepClone(dfMapTiles);
    console.log(deepClone(mapTiles));
    let tileTypeQty = {...dfTileTypeQty};
    let tokenValQty = {...dfTokenValQty};
    let tileCount = 0;

    // get tile types
    while (tileCount < totalTiles) {
        console.log(`- ${tileCount + 1} -`);
        // get a random tile num that is still available
        const currTileNum = pickTileNum(mapTiles, 'tileType');
        console.log(`tileNum: ${currTileNum}`);

        // chose a random tile type and check its valid
        let {randElem, totalElems} = getRandom(tileTypeQty);
        let currTileType = randElem;
        console.log(`currentTileType: ${currTileType}`);
        // keep track of any checked tile types and nums
        let checkedTypes = [currTileType];
        let checkedNums = [];

        // if tile type is not allowed, reset or get another tile
        while (!checkTileType(currTileType, currTileNum, tileTypeQty, mapTiles)) {
            console.log(checkedTypes);
            console.log(`checked length: ${checkedTypes.length} & total length: ${totalElems}`);
            if (checkedTypes.length === totalElems) {
                // if no valid types left, reset tile types
                console.log('- RESET TYPES -');
                Object.keys(mapTiles).forEach(num => {
                    mapTiles[num].tileType = null;
                    mapTiles[num].sameType = 0;
                });
                console.log(deepClone(mapTiles));
                tileTypeQty = {...dfTileTypeQty};
                checkedNums = [];
                checkedTypes = [];
                tileCount = 0;
                ({randElem, totalElems} = getRandom(tileTypeQty));
                currTileType = randElem;
                console.log(`currentTileType: ${currTileType}`);
                continue;
            } else if (!checkedTypes.includes(currTileType)) {
                // if tile type had not yet been checked, add it to checked list and get new tile type
                checkedTypes.push(currTileType);
                ({randElem, totalElems} = getRandom(tileTypeQty));
                currTileType = randElem;
                console.log(`currentTileType: ${currTileType}`);
            } else {
                // if tile type has previously been checked, get a new random tile type
                ({randElem, totalElems} = getRandom(tileTypeQty));
                currTileType = randElem;
                console.log(`currentTileType: ${currTileType}`);
            }
        }

        // update tile type qty, sameType value and add current tile type to map
        console.log(`tile type to store: ${currTileType}`);
        tileTypeQty[currTileType]--;
        updateSameType(currTileNum, currTileType, mapTiles, checkedNums);
        mapTiles[currTileNum].tileType = currTileType;

        tileCount++;
        console.log(deepClone(mapTiles));
    }

    // reset tile count to get token values
    tileCount = 0;

    // get token values
    while (tileCount < totalTiles) {
        console.log(`- ${tileCount + 1} -`);
        // get a random tile num that is still available
        const currTileNum = pickTileNum(mapTiles, 'tokenValue');
        console.log(`tileNum: ${currTileNum}`);

        if (mapTiles[currTileNum].tileType === 6) {
            // tile type is 6, assign token value 0
            mapTiles[currTileNum].tokenValue = 0;
        } else {
            // tile type is NOT 6, assign random token value
            let {randElem, totalElems} = getRandom(tokenValQty);
            let currTokenVal = randElem;
            console.log(`currTokenVal: ${currTokenVal}`);
            // if token is not valid, reset or get new token
            let checkedVals = [];
    
            while (!checkTokenValue(currTileNum, currTokenVal, tokenValQty, mapTiles)) {
                console.log(checkedVals);
                // no valid tokens left, reset
                if (checkedVals.length === totalElems) {
                    console.log('- RESET TOKENS -');
                    Object.keys(mapTiles).forEach(num => mapTiles[num].tokenValue = null);
                    console.log(deepClone(mapTiles));
                    tokenValQty = {...dfTokenValQty};
                    checkedVals = [];
                    tileCount = 0;
                    ({randElem, totalElems} = getRandom(tokenValQty));
                    currTokenVal = randElem;
                    console.log(`currTokenVal: ${currTokenVal}`);
                    continue;
                } else if (checkedVals.includes(currTokenVal)) {
                    // if previously checked, get new token
                    ({randElem, totalElems} = getRandom(tokenValQty));
                    currTokenVal = randElem;
                    console.log(`currTokenVal: ${currTokenVal}`);
                } else {
                    // if not previously checked, add to checked list and get new token
                    checkedVals.push(currTokenVal);
                    ({randElem, totalElems} = getRandom(tokenValQty));
                    currTokenVal = randElem;
                    console.log(`currTokenVal: ${currTokenVal}`);
                }
            }
    
            console.log(`token value to store: ${currTokenVal}`);
            tokenValQty[currTokenVal]--;
            mapTiles[currTileNum].tokenValue = currTokenVal;
        }

        tileCount++;
        console.log(deepClone(mapTiles));
    }

    return mapTiles;
};

// function to return a random element and total elements available from qty array
const getRandom = (obj) => {
    const keys = Object.keys(obj).filter(key => obj[key] > 0);
    if (keys.length === 0) return { randElem: false, totalElems: 0 };
    console.log(`keys available: [${keys}]`); 
    console.log(obj);
    return {
        randElem: parseInt(keys[Math.floor(Math.random() * keys.length)]),
        totalElems: keys.length,
    };
};

// function to pick a random available tile number
const pickTileNum = (mapTiles, keyName) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // pick a random tile number
        const tileNum = Math.floor(Math.random() * totalTiles + 1);
        console.log(tileNum);
        if (mapTiles[tileNum][keyName] === null) {
            //if tile is not yet assigned a type, return tile num
            return tileNum;
        }
    }
};

// function to check if tile is available and will not exceed adj limit
const checkTileType = (tileType, tileNum, tileTypeQty, mapTiles) => {
    // check tile type not available, return false
    console.log(`tile type amount left: ${tileTypeQty[tileType]}`);
    if (tileTypeQty[tileType] < 1) {
        console.log('tile not available');
        return false;
    }

    // iterate around outer adj tiles in group
    let groupCount = 1;
    for (let offset of groupOffsets) {
        const adjTileNum0 = Object.keys(mapTiles).find(tile => mapTiles[tile].q === (mapTiles[tileNum].q + offset[0][0]) && mapTiles[tile].r === (mapTiles[tileNum].r + offset[0][1]));
        // check adj limit not exceeded for connected tiles to current adj tile
        if ((adjTileNum0 && mapTiles[adjTileNum0].tileType == tileType) && (mapTiles[adjTileNum0].sameType + 1 >= tileAdjLimit)) {
            console.log('connected tiles exceed adj limit');
            return false;
        }
        // check if adj tile is same type as current tile, add to group count if it is
        if (adjTileNum0 && mapTiles[adjTileNum0].tileType == tileType) {
            groupCount++;
        }
    }   

    // check group does not exceed adj limit
    if (groupCount > tileAdjLimit) {
        console.log('group adj limit exceeded');
        return false;
    }

    // if tile is availabe and does not exceed adj limits, return true
    return true;
};

// function to update adj tiles sameType value if tile type is same
const updateSameType = (tileNum, tileType, mapTiles, checkedNums) => {
    console.log(`! checking tile ${tileNum} for adj same types`);
    console.log(checkedNums);
    for (let offset of groupOffsets) {
        const adjTileNum = parseInt(Object.keys(mapTiles).find(tile => mapTiles[tile].q === (mapTiles[tileNum].q + offset[0][0]) && mapTiles[tile].r === (mapTiles[tileNum].r + offset[0][1])));
        if (adjTileNum && mapTiles[adjTileNum].tileType == tileType) {
            console.log(`check adj - tileType: ${tileType} & adjTileType: ${mapTiles[adjTileNum].tileType}`);
            // update sameType of tiles not yet checked and call updateSameType on any adj tile not yet checked
            if (!checkedNums.includes(tileNum)) {
                console.log(`+1 CURRENT tile sameType: ${tileNum}`);
                checkedNums.push(tileNum);
                mapTiles[tileNum].sameType++;
            }
            if (!checkedNums.includes(adjTileNum)) {
                console.log(`+1 ADJACENT tile sameType: ${adjTileNum}`);
                mapTiles[adjTileNum].sameType++;
                checkedNums.push(adjTileNum);
                updateSameType(adjTileNum, tileType, mapTiles, checkedNums);
            }
            console.log(`update mapTiles`);
            console.log(deepClone(mapTiles));
        }
    } 
};

// function to check if token value is valid
const checkTokenValue = (currTileNum, currTokenVal, tokenValQty, mapTiles) => {
    console.log('check token value is valid');

    // check token value is available
    if (tokenValQty[currTokenVal] < 1) {
        console.log(tokenValQty);
        console.log('token not available');
        return false;
    }

    // check token value will not exceed prob limit
    for (let offset of groupOffsets) {
        // get the total probability value of each intersecting group
        const adjTileNum0 = Object.keys(mapTiles).find(tile => mapTiles[tile].q === (mapTiles[currTileNum].q + offset[0][0]) && mapTiles[tile].r === (mapTiles[currTileNum].r + offset[0][1]));
        const adjTileNum1 = Object.keys(mapTiles).find(tile => mapTiles[tile].q === (mapTiles[currTileNum].q + offset[1][0]) && mapTiles[tile].r === (mapTiles[currTileNum].r + offset[1][1]));
        const currTileProb = tokenProbVals[currTokenVal];
        const adjTileProb0 = mapTiles[adjTileNum0] ? mapTiles[adjTileNum0].tokenValue ? tokenProbVals[mapTiles[adjTileNum0].tokenValue] : 0 : 0;
        const adjTileProb1 = mapTiles[adjTileNum1] ? mapTiles[adjTileNum1].tokenValue ? tokenProbVals[mapTiles[adjTileNum1].tokenValue] : 0 : 0;
        const totalProb = currTileProb + adjTileProb0 + adjTileProb1;
        console.log(`currTileProb: ${currTileProb} + adjTileProb0: ${adjTileProb0} + adjTileProb1: ${adjTileProb1}`);
        console.log(`group total prob: ${totalProb}`);
        if (totalProb > probLimit) {
            console.log('probability limit exceeded');
            return false;
        }
    } 

    return true;
};

// generateMap();

export default generateMap;