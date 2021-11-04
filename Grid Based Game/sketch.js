// Grid Base Game
// George Williams
// 10/19/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



// look up flood.fill


// global variables
let backgroundColor = "lime";
let state = "Start Screen";
let letterSize = 48;
let textBoxBuffer = 15;
let grid;
let gridSize = 24;
let bombGrid;
let bombGridSize = 24;
let bombX;
let bombY;
let neighbourGrid;
let emptyGrid;
let cellWidth, cellHeight;
let numberOfBombs = 35;
let whichGrass;


// image varibales
let bombImg;
let grassImg1;
let grassImg2;
let mudImg;

function preload() {
  bombImg = loadImage("assets/bomb_0.png");
  grassImg1 = loadImage("assets/grass00.png");
  grassImg2 = loadImage("assets/grass03.png");
  mudImg = loadImage("assets/mud1.png");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }
  else {
    createCanvas (windowHeight * 0.8, windowHeight * 0.8);
  }


  cellWidth = width / gridSize;
  cellHeight = height / gridSize;
  
}



// main game loop
function draw() {
  background(backgroundColor);


  // run the starting screen
  if (state === "Start Screen") {
    startingWindow();
  }

  // game setup
  else if (state === "Game Setup") {
    gameSetup();
  }

  // main game loop
  else if (state === "Mine Sweeper") {
    mineSweeper();
  }

  // You Lose
  else if (state === "Game Over") {
    gameOver();
  }

}


// mouse controls
function mousePressed() {

  if (state === "Mine Sweeper") {
    let cellX = Math.floor(mouseX / cellWidth);
    let cellY = Math.floor(mouseY/cellHeight);
    // console.log(cellY, cellX);
  
    if (bombGrid[cellY][cellX] === 4) {
      state = "Game Over";
    }

    else if (bombGrid[cellY][cellX] === 5) {
      if (grid[cellY][cellX] === 0 || grid[cellY][cellX] === 1) {
        grid[cellY][cellX] === 2;
        // image(mudImg, cellX*cellWidth, cellY*cellHeight, cellWidth, cellHeight);
        // console.log(cellX, cellY);
      }
    }
  }
}

// starting window 
function startingWindow() {
  let startingBoxWidth = 115;
  let startingBoxHeight = 55;
  
  
  fill(0);
  textSize(letterSize);
  textAlign(CENTER);
  rectMode(CENTER);
  text("Welcome Soldier", width / 2, height / 2);
  rect(width / 2, height * 3 / 5, startingBoxWidth, startingBoxHeight);
  fill("white");
  text("Start", width / 2, height * 3 / 5 + textBoxBuffer);

  if (
    mouseX >= width / 2 - startingBoxWidth / 2 &&
    mouseX <= width / 2 + startingBoxWidth / 2 &&
    mouseY <= height * 3 / 5 + startingBoxHeight / 2 &&
    mouseY >= height * 3 / 5 - startingBoxHeight / 2 &&
    mouseIsPressed
  ) {


    state = "Game Setup";
  }

}


// initial setup
function gameSetup () {
  grid = createAlternating2DArray(gridSize, gridSize);
  bombGrid = createBomb2DArray(gridSize, gridSize);
  neighbourGrid = neighbourCount2DArray(gridSize, gridSize);
  state = "Mine Sweeper";
}


function floodFill(mouseX, mouseY) {
    
}

// Bomb Grid
function createBomb2DArray(rows, cols) {
  // Create Grid
  let bombGrid = [];
  for (let y=0; y < rows; y++) {
    bombGrid.push([]);
    for (let x = 0; x < cols; x++) {
      bombGrid[y].push(5);
    }
  }

  // place bombs
  for (let bombCounter = 0; bombCounter < numberOfBombs; bombCounter++) {
    let bombed = false;
    while (!bombed) {
      // set bomb coordinates
      bombX = Math.round(random (0, bombGridSize -1));
      bombY = Math.round(random(0, bombGridSize - 1));

      if (bombGrid[bombY][bombX] === 5) {
        bombGrid[bombY][bombX] = 4;
        bombed = true;
      }



    }

  }
  return bombGrid;
}



// 
function mineSweeper() {
  displayGrid();
}


// create mine field
function createAlternating2DArray(rows, cols){
  whichGrass = true;
  let grid = [];
  for (let y=0; y < rows; y++) {
    grid.push([]);
    whichGrass = !whichGrass;
    for (let x = 0; x < cols; x++) {
      if (whichGrass === true) {
        grid[y].push(1);
        whichGrass = !whichGrass;
      }
      else if (whichGrass === false) {
        grid[y].push(0);
        whichGrass = !whichGrass;
      }

    }
  }
  return grid;
}


// display bomb
function displayBomb() {
  rectMode(CORNER);
  displayGrid();
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (bombGrid[y][x] === 4){
        console.log("bomb");
        image(bombImg, x*cellWidth,y*cellHeight, cellWidth, cellHeight);
        noLoop();
      }
    }
  }

}

// display field
function displayGrid() {
  rectMode(CORNER);

  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 0){
        image(grassImg1, x*cellWidth,y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 1) {
        image(grassImg2, x*cellWidth,y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 2) {
        image(mudImg, x*cellWidth,y*cellHeight, cellWidth, cellHeight);
      }


      // rect(x*cellWidth,y*cellHeight, cellWidth, cellHeight);
    }
  }
}


function neighbourCount2DArray(rows, cols) {
  neighbourGrid = createEmpty2DArray(rows, cols);
  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      let neighbours = 0;

      //look for bombsS
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          if (y+i>=0 && x+j>=0 && y+i<gridSize && x+j<gridSize) {
            if (bombGrid[y+i][x+j] === 4) {
              neighbours += 1;
            }
          }
        }
      }

      // do not count your cell if it is a bomb
      if (bombGrid[y][x] === 4) {
        neighbours -= 1;
      }
      neighbourGrid[y][x] = neighbours;
    }
  }
  return neighbourGrid;
}


function createEmpty2DArray(rows, cols, numToFill = 0) {
  let emptyGrid = [];
  for (let y=0; y < rows; y++) {
    emptyGrid.push([]);
    for (let x = 0; x < cols; x++) {
      emptyGrid[y].push(numToFill);
    }
  }
  return emptyGrid;
}


// hit a bomb
function gameOver() {
  displayBomb();
}

