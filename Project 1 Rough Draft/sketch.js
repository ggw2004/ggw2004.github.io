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
let state = "Space Invader";
let letterSize = 48;
let textBoxBuffer = 15;
let backgroundColor = "purple";
let laserCannon;
let cannonSize = 45;
let spaceInvaderPerimeter = 100;


function preload() {
  laserCannon = loadImage ("assets/Laser_Cannon.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth, windowHeight);
  x = width/2;
  y = height-50 ;
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
  backgroundColor = 51;
  displayLaserCannon();
  keyPressed();
  
  
}


function displayLaserCannon(){
  image(laserCannon, x, y, cannonSize, cannonSize);
}

// keyboard controls
function keyPressed() {
  
  
  // keyboard control for Space Invaders
  if (state === "Space Invader") {
    speed = 4;
    
    // laser cannon horizontal movement
    
    // move left
    if (keyCode === 65){ // a
      x -= speed;
    }
    
    // move right
    if (keyCode === 68) { // d
      x += speed;
    }
    
    // perimeter
    if (x < 0 + spaceInvaderPerimeter){
      x = spaceInvaderPerimeter;
    }
    
    if (x > width - spaceInvaderPerimeter) {
      x = width - spaceInvaderPerimeter;
    }
    

    
    
    console.log(width, x);


  }
}