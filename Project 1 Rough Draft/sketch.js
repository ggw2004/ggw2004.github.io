// Project 1
// George Williams
// Friday, September 22, 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// global variables
let x;
let y;
let w;
let h;
let speed;
let playerX;
let playerY;
let bulletState;
let bulletSpeed;
let state = "Start Screen";
let letterSize = 48;
let textBoxBuffer = 15;
let backgroundColor = "purple";
let laserCannon;
let cannonSize = 45;
let spaceInvaderPerimeter = 300;
let direction;


function preload() {
  laserCannon = loadImage ("assets/Laser_Cannon.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width;
  y = height;
  
  // Space Invader Control Variables
  playerX = x / 2;
  playerY = y / 7 * 6;
  
  
  // Snake Game Control Variables
  
  
  // Astroid Control Variables
}


// main game loop
function draw() {
  background(backgroundColor);

  // run the starting screen
  if (state === "Start Screen") {
    startingWindow();
  }

  // choose the game you wish to play
  if (state === "gameOptions") {
    chooseGame();
  }
  
  // play Space Invader
  if (state === "Space Invader"){
    spaceInvader();
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
  text("Welcome Player", x / 2, y / 2);
  rect(x / 2, y * 3 / 5, startingBoxWidth, startingBoxHeight);
  fill("white");
  text("Start", x / 2, y * 3 / 5 + textBoxBuffer);
  


  if (
    mouseX >= x / 2 - startingBoxWidth / 2 &&
    mouseX <= x / 2 + startingBoxWidth / 2 &&
    mouseY <= y * 3 / 5 + startingBoxHeight / 2 &&
    mouseY >= y * 3 / 5 - startingBoxHeight / 2 &&
    mouseIsPressed
  ) {
    // other method
    // if ((dist(mouseX, mouseY, x/2, y*3/5) < 55) && mouseIsPressed) {}

    state = "gameOptions";
  }
}


// choose game code
function chooseGame() {
  fill(0);
  textSize(letterSize);
  
  let gameOptionWidth = 335;
  let gameOptionHeight = 60;
  
  textAlign(CENTER);
  rectMode(CENTER);

  
  
  // snake game box
  fill("black");
  rect(x / 2, y /3 - textBoxBuffer, gameOptionWidth, gameOptionHeight);
  fill("white");
  text("Snake Game", x / 2, y / 3);
  
  
  
  // space invader box
  fill("black");
  rect(x / 2, y / 2 - textBoxBuffer, gameOptionWidth, gameOptionHeight);
  fill("white");
  text("Space Invader", x / 2, y / 2);
  
  if (
    mouseX >= x/2 - gameOptionWidth / 2 &&
    mouseX <= x/2 + gameOptionWidth / 2 && 
    mouseY <= y / 2 - textBoxBuffer + gameOptionHeight / 2 &&
    mouseY >= y / 2 - textBoxBuffer - gameOptionHeight / 2 &&
    mouseIsPressed
  ) {
    state = "Space Invader";
  }
  
  

  
  // astroid game box
  fill("black");
  rect(x / 2, y /3 * 2 - textBoxBuffer, gameOptionWidth, gameOptionHeight);
  fill("white");
  text("Astroid", x / 2, y / 3 * 2);
  

}

// Spacce Invader code
function spaceInvader() {

  // perimeter
  if (playerX < 0 + spaceInvaderPerimeter){
    playerX = spaceInvaderPerimeter;
  }

  if (playerX > width - spaceInvaderPerimeter) {
    playerX = width - spaceInvaderPerimeter;
  }



  if (direction === "right") {
    playerX += speed;
  }
  else if (direction === "left") {
    playerX -= speed;
  }
  backgroundColor = 51;
  displayLaserCannon();
  // keyPressed();
  
  
}

function displayLaserCannon(){
  image(laserCannon, playerX, playerY, cannonSize, cannonSize);
}

// keyboard controls
function keyPressed() {
  
  
  // keyboard control for Space Invaders
  if (state === "Space Invader") {
    speed = 4;
    bulletSpeed = 5;
    
    // laser cannon horizontal movement
    
    // move left
    if (keyCode === 65 || keyCode === 37){ // a
      direction = "left";

    }
    
    // move right
    if (keyCode === 68 || keyCode === 39) { // d
      direction = "right";
    }
    



  }
  
}