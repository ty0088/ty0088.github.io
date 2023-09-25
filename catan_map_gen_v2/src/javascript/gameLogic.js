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
const dfTileTypeQty = { // default number of tile types available
    1: 4,
    2: 4,
    3: 4,
    4: 3,
    5: 3,
    6: 1,
};
const dfTokenValQty = { // default number of token values available
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
const totalTiles = Object.keys(dfTileTypeQty).reduce((acc, currKey) => acc += dfTileTypeQty[currKey], 0); // total number of tiles
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

// function generateMap()
//  while (tileCount < 19)
//      chose a random tile number that is still empty
//      assign a random tile type that is still available, check it doesn't exceed adjacent tile limit
//          if limit exceeded, pick a new tile type
//          if no new tile type available, switch last picked tile type with current tile type and check both again
//          if checks fail, keep going back and switching tiles until we run out of tiles to switch
//          if no tile works, all tiles will need to be reset ??
//      assign a random tile value that is still available (only 18 vals available, desert has no value), check it doesnt exceed adjacent probability limit
//          if limit exceeded, pick a new value
//          if no new token values available, switch last picked token val with current token val and check both again
//          if checks fail, keep going back and switching tokens until we run out of tokens to switch
//          if no token works, all tokens will need to be reset ??

const generateMap = () => {
    //init default map properties
    let mapTiles = deepClone(dfMapTiles);
    console.log(deepClone(mapTiles));
    let tileTypeQty = deepClone(dfTileTypeQty);
    let tokenValQty = deepClone(dfTokenValQty);
    let tileCount = 0;

    while (tileCount < totalTiles) {
        console.log(`- ${tileCount} -`);
        // get a random tile num that is still available
        const currTileNum = pickTileNum(mapTiles);
        console.log(`tileNum: ${currTileNum}`);
        
        // chose a random tile type and check its valid
        let currTileType = minMaxRandom(1, 6);
        // keep track of any checked tile types
        let checkedTypes = [currTileType];
        let checkedNums = [];
        console.log(`currentTileType: ${currTileType}`);
        // if tile type is not allowed, pick and check another random tile type
        while (!checkTileType(currTileType, currTileNum, tileTypeQty, mapTiles)) {
            console.log(`currentTileType: ${currTileType}`);
            if (checkedTypes.length === 6) {   
                // if we have checked all types, no more left to check, will need to reorder some tiles or just reset map???? 
                // ---------------------------
                // reset map
                console.log('- RESET -');
                mapTiles = deepClone(dfMapTiles);
                console.log(deepClone(mapTiles));
                tileTypeQty = deepClone(dfTileTypeQty);
                checkedNums = [];
                checkedTypes = [];
                tileCount = 0;
                currTileType = minMaxRandom(1, 6);
                continue;
            } else if (checkedTypes.includes(currTileType)) {
                // if tile type has already been checked, get a new tile type and check again
                currTileType = minMaxRandom(1, 6);
            } else {
                // if tile type has not been checked, add it to checked list
                checkedTypes.push(currTileType);
                currTileType = minMaxRandom(1, 6);
            }
        }

        console.log(`tile type to store: ${currTileType}`);
        if (currTileType) {
            // update tile qty
            tileTypeQty[currTileType]--;
            // update mapTile sameType value for all connected tiles
            updateSameType(currTileNum, currTileType, mapTiles, checkedNums);
            // add new tile to mapTiles
            mapTiles = {...mapTiles, [currTileNum]: {...mapTiles[currTileNum], tileType: currTileType}};
        }
        tileCount++;
        console.log(deepClone(mapTiles));
    }
    return mapTiles;
};

// function to generate random integer between a min and max value
const minMaxRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// function to pick a random available tile number
const pickTileNum = (mapTiles) => {
    while (true) {
        // pick a random tile number
        const tileNum = minMaxRandom(1, totalTiles);
        if (mapTiles[tileNum].tileType === null) {
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

    return true;
};

// function to update adj tiles sameType value if tile type is same
const updateSameType = (tileNum, tileType, mapTiles, checkedNums) => {
    console.log(`! checking tile: ${tileNum}`);
    console.log(checkedNums);
    for (let offset of groupOffsets) {
        const adjTileNum = parseInt(Object.keys(mapTiles).find(tile => mapTiles[tile].q === (mapTiles[tileNum].q + offset[0][0]) && mapTiles[tile].r === (mapTiles[tileNum].r + offset[0][1])));
        if (adjTileNum && mapTiles[adjTileNum].tileType == tileType) {
            console.log(`check adj - tileType: ${tileType} & adjTileType: ${mapTiles[adjTileNum].tileType}`);
            // update sameTypeof tiles not yet checked and call updateSameType on any adj tile not yet checked
            if (!checkedNums.includes(tileNum)) {
                checkedNums.push(tileNum);
                mapTiles[tileNum].sameType++;
            }
            if (!checkedNums.includes(adjTileNum)) {
                console.log(`same type found on new adj tile: ${adjTileNum}`);
                mapTiles[adjTileNum].sameType++;
                checkedNums.push(adjTileNum);
                updateSameType(adjTileNum, tileType, mapTiles, checkedNums);
            }
            console.log(`update mapTiles`);
            console.log(deepClone(mapTiles));
        }
    } 
};

// function checkProbLimit(currQ, currR, tileVal, map) return true/false
//  for each of the 6 intersecting tile groups
//      if tile value doesnt exceed limit in group return true;
//      else return false;

// // start count at 1 for current tile type
// let count = 1;
// for (let offset of groupOffsets) {
//     // find the number of the first and second adjacent tiles. If offset tile is same as current tile add to count
//     // console.log(`mapTiles[tileNum].q: ${mapTiles[tileNum].q} + offset[0][0]: ${offset[0][0]} = ${mapTiles[tileNum].q + offset[0][0]}`);
//     const adjTileNum0 = Object.keys(mapTiles).find(tile => mapTiles[tile].q === (mapTiles[tileNum].q + offset[0][0]) && mapTiles[tile].r === (mapTiles[tileNum].r + offset[0][1]));
//     if (adjTileNum0 && mapTiles[adjTileNum0].tileType == tileType) {
//         console.log(`tile 0 offset num: ${adjTileNum0}`);
//         console.log(`Offset0 type: ${mapTiles[adjTileNum0].tileType} & tileType: ${tileType}`);
//         count++;
//     }
//     const adjTileNum1 = Object.keys(mapTiles).find(tile => mapTiles[tile].q === mapTiles[tileNum].q + offset[1][0] && mapTiles[tile].r === mapTiles[tileNum].r + offset[1][1]);
//     if (adjTileNum1 && mapTiles[adjTileNum1].tileType == tileType) {
//         console.log(`tile 1 offset num: ${adjTileNum1}`);
//         console.log(`Offset1 type: ${mapTiles[adjTileNum1].tileType} & tileType: ${tileType}`);
//         count++;
//     }
//     console.log(`count: ${count}`);
// }        
// // if adj limit exceeded return false
// if (count > tileAdjLimit) {
//     return false;
// }

generateMap();

export default generateMap;