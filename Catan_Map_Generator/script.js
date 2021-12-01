//Tile co-ordinates
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
    q: -2,
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
  },
}

//Object to hold tile types according to 1-6 key
const tileType = {
  1: "Forest",
  2: "Pasture",
  3: "Field",
  4: "Hill",
  5: "Mountain",
  6: "Desert"
}


//function to generate random integer between a min and max value and excluding one value
function randomExcluded(min, max, excluded) {
  let n = Math.floor(Math.random() * (max - min) + min);
  if (n >= excluded) n++;
  return n;
}

//function to generate random integer between a min and max value
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//function to check tile type
//Only allows 4x Forest, 4x Pasture, 4x field, 3x Hill, 3x Mountain and 1x Desert to be picked
function tileCheck(tile, tileChose) {

  //takes in randomly chosen tile
  //check tile array to see how many of that tile exists and whether anymore is allowed
  //returns true if allowed or false if not allowed
  if (
    tileChose === "Forest" &&
    tile.filter(({
      Type
    }) => Type === "Forest").length < 4
  ) {
    return true;
  } else if (
    tileChose === "Pasture" &&
    tile.filter(({
      Type
    }) => Type === "Pasture").length < 4
  ) {
    return true;
  } else if (
    tileChose === "Field" &&
    tile.filter(({
      Type
    }) => Type === "Field").length < 4
  ) {
    return true;
  } else if (
    tileChose === "Hill" &&
    tile.filter(({
      Type
    }) => Type === "Hill").length < 3
  ) {
    return true;
  } else if (
    tileChose === "Mountain" &&
    tile.filter(({
      Type
    }) => Type === "Mountain").length < 3
  ) {
    return true;
  } else if (
    tileChose === "Desert" &&
    tile.filter(({
      Type
    }) => Type === "Desert").length < 1
  ) {
    return true;
  }
  return false;
}


//create 19 tile array when requested
function createMap() {

  let tileCount = 0;
  let tile = [];

  //loop to assign properties of each of the 19 tiles
  while (tileCount < 19) {

    //Randomly assigns tile types - 1: Forest, 2: Pasture, 3: Field, 4: Hill, 5: Mountain and 6: Desert
    let tileChose = tileType[random(1, 6)];

    console.log("Tile to pick is " + tileChose);
    console.log("Tile count is " + tileCount);


    //Checks chosen tile using tileCheck function whether tile type is permitted and stores to array
    //Randomly assigns a value between 2 and 12 to each tile
    //Assigns co-ordinate values to each tile based on the tile number

    if (tileCheck(tile, tileChose) && tileChose !== "Desert") {
      tileCount++;
      tile.push({
        Number: tileCount, //tile number from 1 to 19
        Type: tileChose,
        Value: randomExcluded(2, 12, 7), //random tile value if tile is not desert
        hexQ: hexCoords[tileCount].q, //q co-ordinate
        hexR: hexCoords[tileCount].r //r co-ordinate
      });
    } else if (tileCheck(tile, tileChose) && tileChose === "Desert") {
      tileCount++;
      tile.push({
        Number: tileCount, //tile number from 1 to 19
        Type: tileChose,
        Value: 0, //0 tile value for desert
        hexQ: hexCoords[tileCount].q, //q co-ordinate
        hexR: hexCoords[tileCount].r //r co-ordinate    
      });
    }
  }


  //Generate tiles with assigned data to tiles 1 to 3
  let div = document.createElement("div");
  let divContn2 = '<div class="col-sm-2 offset-sm-3 border border-secondary content_center">' + tile[0].Value + '<br>' + tile[0].Type + '<br> (' + hexCoords[1].q + ',' + hexCoords[1].r + ') </div>';

  for (let j = 1; j < 3; j++) {
    divContn2 = divContn2.concat('<div class="col-sm-2 offset-sm-0 border border-secondary content_center">' + tile[j].Value + '<br>' + tile[j].Type + '<br> (' + hexCoords[j + 1].q + ',' + hexCoords[j + 1].r + ') </div>');
  }

  div.innerHTML = divContn2;
  document.getElementById("tileGen-2").innerHTML = "";
  document.getElementById("tileGen-2").innerHTML = divContn2;


  //Generate tiles with assigned data to tiles 4 to 7
  let divContn1 = '<div class="col-sm-2 offset-sm-2 border border-secondary content_center">' + tile[3].Value + '<br>' + tile[3].Type + '<br> (' + hexCoords[4].q + ',' + hexCoords[4].r + ') </div>';

  for (j = 4; j < 7; j++) {
    divContn1 = divContn1.concat('<div class="col-sm-2 offset-sm-0 border border-secondary content_center">' + tile[j].Value + '<br>' + tile[j].Type + '<br> (' + hexCoords[j + 1].q + ',' + hexCoords[j + 1].r + ') </div>');
  }

  div.innerHTML = divContn1;
  document.getElementById("tileGen-1").innerHTML = "";
  document.getElementById("tileGen-1").innerHTML = divContn1;


  //Generate tiles with assigned data to tiles 8 to 12
  let divCont0 = '<div class="col-sm-2 offset-sm-1 border border-secondary content_center">' + tile[7].Value + '<br>' + tile[7].Type + '<br> (' + hexCoords[8].q + ',' + hexCoords[8].r + ') </div>';

  for (j = 8; j < 12; j++) {
    divCont0 = divCont0.concat('<div class="col-sm-2 offset-sm-0 border border-secondary content_center">' + tile[j].Value + '<br>' + tile[j].Type + '<br> (' + hexCoords[j + 1].q + ',' + hexCoords[j + 1].r + ') </div>');
  }

  div.innerHTML = divCont0;
  document.getElementById("tileGen0").innerHTML = "";
  document.getElementById("tileGen0").innerHTML = divCont0;


  //Generate tiles with assigned data to tiles 13 to 16
  let divCont1 = '<div class="col-sm-2 offset-sm-2 border border-secondary content_center">' + tile[12].Value + '<br>' + tile[12].Type + '<br> (' + hexCoords[13].q + ',' + hexCoords[13].r + ') </div>';

  for (j = 13; j < 16; j++) {
    divCont1 = divCont1.concat('<div class="col-sm-2 offset-sm-0 border border-secondary content_center">' + tile[j].Value + '<br>' + tile[j].Type + '<br> (' + hexCoords[j + 1].q + ',' + hexCoords[j + 1].r + ') </div>');
  }

  div.innerHTML = divCont1;
  document.getElementById("tileGen1").innerHTML = "";
  document.getElementById("tileGen1").innerHTML = divCont1;


  //Generate tiles with assigned data to tiles 17 to 19
  let divCont2 = '<div class="col-sm-2 offset-sm-3 border border-secondary content_center">' + tile[16].Value + '<br>' + tile[16].Type + '<br> (' + hexCoords[17].q + ',' + hexCoords[17].r + ') </div>';

  for (j = 17; j < 19; j++) {
    divCont2 = divCont2.concat('<div class="col-sm-2 offset-sm-0 border border-secondary content_center">' + tile[j].Value + '<br>' + tile[j].Type + '<br> (' + hexCoords[j + 1].q + ',' + hexCoords[j + 1].r + ') </div>');
  }

  div.innerHTML = divCont2;
  document.getElementById("tileGen2").innerHTML = "";
  document.getElementById("tileGen2").innerHTML = divCont2;

}
