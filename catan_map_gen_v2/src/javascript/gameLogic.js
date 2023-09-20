// map properties
const dfMapTiles = { // default map tile data
    1: {q: 0, r: -2, tileType: null, tokenValue: null},
    2: {q: 1, r: -2, tileType: null, tokenValue: null},
    3: {q: 2, r: -2, tileType: null, tokenValue: null},
    4: {q: -1, r: -1, tileType: null, tokenValue: null},
    5: {q: 0, r: -1, tileType: null, tokenValue: null},
    6: {q: 1, r: -1, tileType: null, tokenValue: null},
    7: {q: 2, r: -1, tileType: null, tokenValue: null},
    8: {q: -2, r: 0, tileType: null, tokenValue: null},
    9: {q: -1, r: 0, tileType: null, tokenValue: null},
    10: {q: 0, r: 0, tileType: null, tokenValue: null},
    11: {q: 1, r: 0, tileType: null, tokenValue: null},
    12: {q: 2, r: 0, tileType: null, tokenValue: null},
    13: {q: -2, r: 1, tileType: null, tokenValue: null},
    14: {q: -1, r: 1, tileType: null, tokenValue: null},
    15: {q: 0, r: 1, tileType: null, tokenValue: null},
    16: {q: 1, r: 1, tileType: null, tokenValue: null},
    17: {q: -2, r: 2, tileType: null, tokenValue: null},
    18: {q: -1, r: 2, tileType: null, tokenValue: null},
    19: {q: 0, r: 2, tileType: null, tokenValue: null},
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
    //reset map properties
    let mapTiles = {...dfMapTiles};
    let tileTypeQty = {...dfTileTypeQty};
    let tokenValQty = {...dfTokenValQty};
    let tileCount = 0;

    while (tileCount < totalTiles) {
        console.log(`tileCount: ${tileCount}`);
        // get a random tile num that is still available
        const currTileNum = pickTileNum(mapTiles);
        // chose a random tile type and check its valid
        let currTileType = minMaxRandom(1, 6);

        while (!checkTileType(currTileType, currTileNum, tileTypeQty, mapTiles)) {
            currTileType = minMaxRandom(1, 6);
            // need to remember choices to stop any infinite loops --------------------
        }
         
        mapTiles = {...mapTiles, [currTileNum]: {...mapTiles[currTileNum], tileType: currTileType}}
        tileCount++;
    }
    console.log(mapTiles);
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
        if (!mapTiles[tileNum].tileType) {
            //if tile is not yet assigned a type, return tile num
            return tileNum;
        }
    }
};

// function to check if tile and surrounding tiles remain within adjacency limit
const checkTileType = (tileType, tileNum, tileTypeQty, mapTiles) => {
    // check tile type not available, return false
    if (tileTypeQty[tileType] < 1) {
        return false;
    }
    // check tile type does not go over adj limit
    for (let offset of groupOffsets) {
        // start count at 1 for current tile type
        let count = 1;
        // find the number of the first and second adjacent tiles. If offset tile is same as current tile add to count
        const tileOffset0 = Object.keys(mapTiles).find(tile => mapTiles[tile].q === mapTiles[tileNum].q + offset[0][0] && mapTiles[tile].r === mapTiles[tileNum].r + offset[0][1]);
        if (tileOffset0 == tileType) {
            count++;
        }
        const tileOffset1 = Object.keys(mapTiles).find(tile => mapTiles[tile].q === mapTiles[tileNum].q + offset[1][0] && mapTiles[tile].r === mapTiles[tileNum].r + offset[1][1]);
        if (tileOffset1 == tileType) {
            count++;
        }
        console.log(`count: ${count}`);
        // if adj limit exceeded return false
        if (count > tileAdjLimit) {
            return false;
        }
    }
    // if tile type ok, minus 1 from qty and return true
    tileTypeQty[tileType]--;
    return true;
};

// function checkProbLimit(currQ, currR, tileVal, map) return true/false
//  for each of the 6 intersecting tile groups
//      if tile value doesnt exceed limit in group return true;
//      else return false;

// generateMap();

export default generateMap;