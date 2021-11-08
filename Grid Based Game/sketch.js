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
let grid;
let gridSize = 24;
let bombGrid;
let bombGridSize = 24;
let bombX;
let bombY;
let neighbourGrid;
let emptyGrid;
let cellWidth, cellHeight;
let numberOfBombs = 40;
let whichGrass;
let pauseTime;
let cellsCleared;

// button variables
let startingButton;
let replayButton;
let startingBoxWidth = 115;
let startingBoxHeight = 55;
let replayBoxWidth = 170;
let replayBoxHeight = 60;
let hoverColor = "grey";
let notHoverColor = "black";

// text variables
let inBoxTextColor = "white";
let outBoxTextColor = "black";
let letterSize = 48;
let startingTextBoxBuffer = 15;
let replayTextBoxBuffer = 2;
let generalTextBoxBuffer;

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
  startingButton = new Button(width/2 - startingBoxWidth/2, height/2 + startingBoxHeight/2, startingBoxWidth, startingBoxHeight, hoverColor, notHoverColor, letterSize);
  replayButton = new Button (width/2 - replayBoxWidth/2, height/2 + replayBoxHeight/2, replayBoxWidth, replayBoxHeight, hoverColor, notHoverColor, letterSize);
  pauseTime = new Timer(5000);
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

  // You Win
  else if (state === "Minefield Cleared") {
    gameComplete();
  }

}


// mouse controls
function mousePressed() {
  if (state === "Start Screen") {
    if (startingButton.isPointInButton(mouseX, mouseY)) {
      state = "Game Setup";
    }
  }

  if (state === "Mine Sweeper") {
    let cellX = Math.floor(mouseX / cellWidth);
    let cellY = Math.floor(mouseY/cellHeight);
  
    if (bombGrid[cellY][cellX] === 4) {
      state = "Game Over";
    }

    else if (bombGrid[cellY][cellX] === 5) {
      if (grid[cellY][cellX] === 0 || grid[cellY][cellX] === 1) {
        grid[cellY][cellX] = 2;
        cellsCleared += 1;
        console.log(cellsCleared);
      }
    }
  }

  if (state === "Game Over" || state === "Minefield Cleared") {
    pauseTime.reset();
    // pauseTime.startTime();
    if (pauseTime.isDone) {
      if (replayButton.isPointInButton(mouseX, mouseY)) {
        state = "Game Setup";
      } 
    }
  }
}

// starting window 
function startingWindow() {
  startingButton.display();
  displayText();


}

function displayText(){
  let messageText;
  let controlText;
  if (state === "Start Screen") {
    messageText = "Welcome Soldier";
    controlText = "Start";
    generalTextBoxBuffer = startingTextBoxBuffer;
  }

  if (state === "Game Over") {
    messageText = "You stepped on a bomb";
    controlText = "Replay";
    generalTextBoxBuffer = replayTextBoxBuffer;
  }

  if (state === "Minefield Cleared") {
    messageText = "Minefield Cleared";
    controlText = "Replay";
    generalTextBoxBuffer = replayTextBoxBuffer;
  }


  fill(outBoxTextColor);
  textSize(letterSize);
  textAlign(CENTER);
  text(messageText, width / 2, height / 2);
  fill(inBoxTextColor);
  text(controlText, width / 2, height * 3 / 5 + generalTextBoxBuffer);

}

// initial setup
function gameSetup () {
  grid = createAlternating2DArray(gridSize, gridSize);
  bombGrid = createBomb2DArray(gridSize, gridSize);
  neighbourGrid = neighbourCount2DArray(gridSize, gridSize);
  cellsCleared = 0;
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




function mineSweeper() {
  displayGrid();
  clearedMinefield();
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


  for (let bombCounter = 0; bombCounter < numberOfBombs; bombCounter++) {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (bombGrid[y][x] === 4){
          image(bombImg, x*cellWidth,y*cellHeight, cellWidth, cellHeight);
        }
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
        displayNeighbours(y,x);
      }
    }
  }
}

// display neighbours
function displayNeighbours(y,x) {
  
  // draw the square
  fill("white");
  strokeWeight(1);
  
  // show the number
  if (neighbourGrid[y][x] !== 0) {
    fill("black");
    textSize(gridSize*0.75);
    textAlign(CENTER, CENTER);
    text(neighbourGrid[y][x], x * gridSize + gridSize / 2, y * gridSize + gridSize/1.75); 
  }
  
}

// neighbour grid
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

// empty 2D Array for neighbour grid
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


// cleared minefield
function clearedMinefield() {
  if (cellsCleared >= gridSize * gridSize - (numberOfBombs + 1)) {
    state = "Minefield Cleared";
  }
}

function gameComplete() {
  replayButton.display();
  displayText();
}


// hit a bomb
function gameOver() {
  displayBomb();
  replayButton.display();
  displayText();
}



// Create Buttons
class Button {
  constructor(x, y, buttonWidth, buttonHeight, hoverColor, notHoverColor) {
    this.x = x;
    this.y = y;
    this.width = buttonWidth;
    this.height = buttonHeight;
    this.notHoverColor = notHoverColor;
    this.hoverColor = hoverColor;
  
  }

  display() {
    if(this.isPointInButton(mouseX, mouseY)){
      fill(this.hoverColor);
    }
    else {
      fill(this.notHoverColor);
    }
    noStroke();
    rect(this.x, this.y, this.width, this.height);

  }

  isPointInButton(x, y) {
    return x >= this.x && x <= this.x + this.width &&
           y >= this.y && y <= this.y + this.height;
  }
}


// timer to prevent pre-emptive replay
class Timer {
  constructor(waitTime) {
    this.startTime = millis();
    this.waitTime = waitTime;
  }

  isDone() {
    return millis() > this.waitTime + this.startTime;
  }

  reset() {
    this.startTime = millis();
  }
}