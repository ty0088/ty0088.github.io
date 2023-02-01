let tile = [];

// Tile co-ordinates
const hexCoords = {
  1: {
    q: 0,
    r: -2
  },
  2: {
    q: 1,
    r: -2
  },
  3: {
    q: 2,
    r: -2
  },
  4: {
    q: -1,
    r: -1
  },
  5: {
    q: 0,
    r: -1
  },
  6: {
    q: 1,
    r: -1
  },
  7: {
    q: 2,
    r: -1
  },
  8: {
    q: -2,
    r: 0
  },
  9: {
    q: -1,
    r: 0
  },
  10: {
    q: 0,
    r: 0
  },
  11: {
    q: 1,
    r: 0
  },
  12: {
    q: 2,
    r: 0
  },
  13: {
    q: -2,
    r: 1
  },
  14: {
    q: -1,
    r: 1
  },
  15: {
    q: 0,
    r: 1
  },
  16: {
    q: 1,
    r: 1
  },
  17: {
    q: -2,
    r: 2
  },
  18: {
    q: -1,
    r: 2
  },
  19: {
    q: 0,
    r: 2
  }
};

// Object to hold tile types according to 1-6 key
const tileType = {
  1: 'Forest',
  2: 'Pasture',
  3: 'Field',
  4: 'Hill',
  5: 'Mountain',
  6: 'Desert'
};

// Probability values for each tile value
const valProbs = {
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

// checks the total probability value of a current tile and the 2 adjacent tiles forming an intersection around it
// does this check for all intersections of current tile
// if all intersection probabilities are less than the define probLim then it returns true otherwise return false
// also checks that no tile has anymore than 2 more of the same type of tile adjacent to it
function valueCheck (curQ, curR, probLim) {
  let typeVal = 0;

  let obj = tile.find(o => o.hexQ === curQ && o.hexR === curR); // find current tile
  let totalVal = valProbs[obj.Value]; // initialise total probability value as probability of current tile
  const prevType = obj.Type;

  obj = tile.find(o => o.hexQ === (curQ + 0) && o.hexR === (curR - 1)); // find 1st intersection
  if (obj !== undefined) { // checks tile exists
    totalVal += valProbs[obj.Value] // add probability value of adjacent tile if exists
    if (obj.Type === prevType) {
      typeVal += 1;
    } // if adjacent tile is the same as current add 1
  }

  obj = tile.find(o => o.hexQ === (curQ + 1) && o.hexR === (curR - 1));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  if (totalVal >= probLim || typeVal > 2) {
    return false; // if either probability value or type value exceeds limits then returns false
  }

  obj = tile.find(o => o.hexQ === curQ && o.hexR === curR);
  totalVal = valProbs[obj.Value];

  obj = tile.find(o => o.hexQ === (curQ + 1) && o.hexR === (curR - 1));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  obj = tile.find(o => o.hexQ === (curQ + 1) && o.hexR === (curR + 0));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  if (totalVal >= probLim || typeVal > 2) {
    return false;
  }

  obj = tile.find(o => o.hexQ === curQ && o.hexR === curR);
  totalVal = valProbs[obj.Value];

  obj = tile.find(o => o.hexQ === (curQ + 1) && o.hexR === (curR + 0));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  obj = tile.find(o => o.hexQ === (curQ + 0) && o.hexR === (curR + 1));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  if (totalVal >= probLim || typeVal > 2) {
    return false;
  }

  obj = tile.find(o => o.hexQ === curQ && o.hexR === curR);
  totalVal = valProbs[obj.Value];

  obj = tile.find(o => o.hexQ === (curQ + 0) && o.hexR === (curR + 1));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  obj = tile.find(o => o.hexQ === (curQ - 1) && o.hexR === (curR + 1));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  if (totalVal >= probLim || typeVal > 2) {
    return false;
  }

  obj = tile.find(o => o.hexQ === curQ && o.hexR === curR);
  totalVal = valProbs[obj.Value];

  obj = tile.find(o => o.hexQ === (curQ - 1) && o.hexR === (curR + 1));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  obj = tile.find(o => o.hexQ === (curQ - 1) && o.hexR === (curR + 0));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  if (totalVal >= probLim || typeVal > 2) {
    return false;
  }

  obj = tile.find(o => o.hexQ === curQ && o.hexR === curR);
  totalVal = valProbs[obj.Value];

  obj = tile.find(o => o.hexQ === (curQ - 1) && o.hexR === (curR + 0));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  obj = tile.find(o => o.hexQ === (curQ + 0) && o.hexR === (curR - 1));
  if (obj !== undefined) {
    totalVal += valProbs[obj.Value];
    if (obj.Type === prevType) {
      typeVal += 1;
    }
  }

  if (totalVal >= probLim || typeVal > 2) {
    return false;
  }

  return true;
};

// function to generate random integer between a min and max value and excluding one value
function randomExcluded (min, max, excluded) {
  let n = Math.floor(Math.random() * (max - min) + min);
  if (n >= excluded) {
    n++;
  }
  return n;
};

// function to generate random integer between a min and max value
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// function to check tile type
// Only allows 4x Forest, 4x Pasture, 4x field, 3x Hill, 3x Mountain and 1x Desert to be picked
function tileCheck (tileChose) {
  // takes in randomly chosen tile
  // check tile array to see how many of that tile exists and whether anymore is allowed
  // returns true if allowed or false if not allowed
  if ((tileChose === 'Forest' || tileChose === 'Pasture' || tileChose === 'Field') && tile.filter(Type => Type === tileChose).length < 4) {
    return true;
  } else if ((tileChose === 'Hill' || tileChose === 'Mountain') && tile.filter(Type => Type === tileChose).length < 3) {
    return true;
  } else if (tileChose === 'Desert' && tile.filter(Type => Type === tileChose).length < 1) {
    return true;
  } else {
    return false;
  }
};

// checks amount of chosen token value to see if it can be assigned
// 2 & 12 tokens should only have 1 each, all other tokens should be 2 each
function tokenCheck (val) {
  if ((val === 2 || val === 12) && tile.filter(Value => Value === val).length < 1) {
    return val;
  } else if ((val === 3 || val === 4 || val === 5 || val === 6 || val === 8 || val === 9 || val === 10 || val === 11) && tile.filter(Value => Value === val).length < 2) {
    return val;
  }
  return tokenCheck(randomExcluded(2, 12, 7));
};

// generate html code for tile grid
function gridHTML () {
  // Generate tiles with assigned data to tiles 1 to 3
  const div = document.createElement('div');
  let divContn2 = '<div class="grid col-sm-2 offset-sm-3 border border-secondary content_center"><div class="' + tile[0].Type + '"></div>' + tile[0].Value + '<br>' + tile[0].Type + '</div>';

  for (let j = 1; j < 3; j++) {
    divContn2 = divContn2.concat('<div class="grid col-sm-2 offset-sm-0 border border-secondary content_center"><div class="' + tile[j].Type + '"></div>' + tile[j].Value + '<br>' + tile[j].Type + '</div>');
  }

  div.innerHTML = divContn2;
  document.getElementById('tileGen-2').innerHTML = '';
  document.getElementById('tileGen-2').innerHTML = divContn2;

  // Generate tiles with assigned data to tiles 4 to 7
  let divContn1 = '<div class="grid col-sm-2 offset-sm-2 border border-secondary content_center"><div class="' + tile[3].Type + '"></div>' + tile[3].Value + '<br>' + tile[3].Type + '</div>';

  for (j = 4; j < 7; j++) {
    divContn1 = divContn1.concat('<div class="grid col-sm-2 offset-sm-0 border border-secondary content_center"><div class="' + tile[j].Type + '"></div>' + tile[j].Value + '<br>' + tile[j].Type + '</div>');
  };

  div.innerHTML = divContn1;
  document.getElementById('tileGen-1').innerHTML = '';
  document.getElementById('tileGen-1').innerHTML = divContn1;

  // Generate tiles with assigned data to tiles 8 to 12
  let divCont0 = '<div class="grid col-sm-2 offset-sm-1 border border-secondary content_center"><div class="' + tile[7].Type + '"></div>' + tile[7].Value + '<br>' + tile[7].Type + '</div>';

  for (j = 8; j < 12; j++) {
    divCont0 = divCont0.concat('<div class="grid col-sm-2 offset-sm-0 border border-secondary content_center"><div class="' + tile[j].Type + '"></div>' + tile[j].Value + '<br>' + tile[j].Type + '</div>');
  };

  div.innerHTML = divCont0;
  document.getElementById('tileGen0').innerHTML = '';
  document.getElementById('tileGen0').innerHTML = divCont0;

  // Generate tiles with assigned data to tiles 13 to 16
  let divCont1 = '<div class="grid col-sm-2 offset-sm-2 border border-secondary content_center"><div class="' + tile[12].Type + '"></div>' + tile[12].Value + '<br>' + tile[12].Type + '</div>';

  for (j = 13; j < 16; j++) {
    divCont1 = divCont1.concat('<div class="grid col-sm-2 offset-sm-0 border border-secondary content_center"><div class="' + tile[j].Type + '"></div>' + tile[j].Value + '<br>' + tile[j].Type + '</div>');
  };

  div.innerHTML = divCont1;
  document.getElementById('tileGen1').innerHTML = '';
  document.getElementById('tileGen1').innerHTML = divCont1;

  // Generate tiles with assigned data to tiles 17 to 19
  let divCont2 = '<div class="grid col-sm-2 offset-sm-3 border border-secondary content_center"><div class="' + tile[16].Type + '"></div>' + tile[16].Value + '<br>' + tile[16].Type + '</div>';

  for (j = 17; j < 19; j++) {
    divCont2 = divCont2.concat('<div class="grid col-sm-2 offset-sm-0 border border-secondary content_center"><div class="' + tile[j].Type + '"></div>' + tile[j].Value + '<br>' + tile[j].Type + '</div>');
  };

  div.innerHTML = divCont2;
  document.getElementById('tileGen2').innerHTML = '';
  document.getElementById('tileGen2').innerHTML = divCont2;
}

// create 19 tile array when requested
function createMap () {
  console.log('createMap() started...');
  let tileCount = 0;
  tile = [];

  // loop to assign properties of each of the 19 tiles
  while (tileCount < 19) {
    // Randomly assigns tile types - 1: Forest, 2: Pasture, 3: Field, 4: Hill, 5: Mountain and 6: Desert
    const tileChose = tileType[random(1, 6)];
    let tokenValue = 0; // initialise tile token value

    // Checks chosen tile using tileCheck function whether tile type is permitted and stores to array
    // Randomly assigns a value between 2 and 12 to each tile
    // Assigns co-ordinate values to each tile based on the tile number
    if (tileCheck(tileChose) && tileChose !== 'Desert') {
      tileCount++;
      tokenValue = tokenCheck(randomExcluded(2, 12, 7)); // random tile value if tile is not desert
      tile.push({
        Number: tileCount, // tile number from 1 to 19
        Type: tileChose,
        Value: tokenValue,
        hexQ: hexCoords[tileCount].q, // q co-ordinate
        hexR: hexCoords[tileCount].r // r co-ordinate
      });
    } else if (tileCheck(tileChose) && tileChose === 'Desert') {
      tileCount++;
      tile.push({
        Number: tileCount, // tile number from 1 to 19
        Type: tileChose,
        Value: 0, // 0 token value for desert
        hexQ: hexCoords[tileCount].q, // q co-ordinate
        hexR: hexCoords[tileCount].r // r co-ordinate
      });
    }
  };

  // checks for tile token value probability limit using valueCheck function
  for (let i = 0; i < tile.length; i++) {
    if (!valueCheck(tile[i].hexQ, tile[i].hexR, 12)) {
      createMap();
    }
  };

  gridHTML();
  console.log('createMap() Completed!');
}
