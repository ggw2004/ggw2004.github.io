// Grid Base Game
// George Williams
// 10/19/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let backgroundColor = "purple";
let state = "Start Screen";
let letterSize = 48;
let textBoxBuffer = 15;
let grid;
let gridSize = 24;
let cellWidth, cellHeight;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }
  else {
    createCanvas (windowHeight * 0.8, windowHeight * 0.8);
  }

  
}



// main game loop
function draw() {
  background(backgroundColor);


  // run the starting screen
  if (state === "Start Screen") {
    startingWindow();
  }

  // game setup
  if (state === "Game Setup") {
    gameSetup();
  }

  // main game loop
  if (state === "Mine Sweeper") {
    mineSweeper();
  }

}

function mousePressed() {
  let cellWidth = width / gridSize;
  let cellHeight = height / gridSize;
  
  let cellX = Math.floor(mouseX / cellWidth);
  let cellY = Math.floor(mouseY/cellHeight);
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
    // other method
    // if ((dist(mouseX, mouseY, x/2, y*3/5) < 55) && mouseIsPressed) {}

    state = "Game Setup";
  }

}

function gameSetup () {
  grid = createEmpty2DArray(gridSize, gridSize);
  state = "Mine Sweeper";
}

function mineSweeper() {
  displayGrid();
}

function createEmpty2DArray(rows, cols){
  let grid = [];
  for (let y=0; y < rows; y++) {
    grid.push([]);
    for (let x = 0; x < cols; x++) {
      grid[y].push(0);
    }
  }
  return grid;
}

function displayGrid() {
  rectMode(CORNER);
  let cellWidth = width / gridSize;
  let cellHeight = height / gridSize;
  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 0){
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellWidth,y*cellHeight, cellWidth, cellHeight);
    }
  }
}