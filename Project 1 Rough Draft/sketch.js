// Project 1
// George Williams
// Friday, September 22, 2021
//
// Extra for Experts:
// I am not asking you to grade me for my above and beyond as it was a complete fail; however, would you be able to assist me with loading a sound file later as it will no longer be for marks


// global variables 
// NOTE: I am AWARE that I counld have made it so that the all the variables that
// have not yet been assigened any values are in one long list in a single line of code; 
// however, I persoanlly find individual lines of code easier on the eyes and makes it 
// much simplier to locate my variables.
let x;
let y;
let w;
let h;
let speed;
let playerX;
let playerY;
let state = "Start Screen";
let letterSize = 48;
let textBoxBuffer = 15;
let backgroundColor = "purple";
let bullet;
let bulletX;
let bulletY;
let bulletState = "ready";
let bulletSpeed;
let spaceInvaderLaserSound;
// let bulletSize = 50;
let bulletWidth;
let bulletHeight;
let laserCannon;
let cannonSize = 45;
let spaceInvaderPerimeter = 300;
let direction;

// preloads varibales and sprites
function preload() {
  laserCannon = loadImage ("assets/Laser_Cannon.png");
  bullet = loadImage ("assets/laser.png");

  // spaceInvaderLaserSound = loadSound("assets/Laser.wav");
  // console.log(loudSound("Laser.wav"));

}

// window setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width;
  y = height;
  

  
  // Snake Game Control Variables
  
  
  // Asteroid Control Variables
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
  
  // set up Space Invader
  if (state === "Initializing Space Invader") {
    spaceInvaderSetup();
  }

  // play Space Invader
  else if (state === "Space Invader"){
    spaceInvader();
  }

  // console.log(bulletY);

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
    state = "Initializing Space Invader";
  }
  
  

  
  // asteroid game box
  fill("black");
  rect(x / 2, y /3 * 2 - textBoxBuffer, gameOptionWidth, gameOptionHeight);
  fill("white");
  text("Asteroid", x / 2, y / 3 * 2);
  

}

// Setup space invader
function spaceInvaderSetup() {
  // Space Invader initial Variables
  playerX = x / 2;
  playerY = y / 7 * 6;
  bulletX = playerX;
  bulletY = playerY - 20;
  bulletSpeed = 5;
  bulletWidth = 250;
  bulletHeight = 75;
  state = "Space Invader";
}

// Space Invader code
function spaceInvader() {
  console.log (playerX);


  // perimeter
  if (playerX < 0 + spaceInvaderPerimeter){
    playerX = spaceInvaderPerimeter;
  }

  if (playerX > width - spaceInvaderPerimeter) {
    playerX = width - spaceInvaderPerimeter;
  }


  // control states
  if (direction === "right") {
    playerX += speed;
  }
  else if (direction === "left") {
    playerX -= speed;
  }

  // bullet is fired
  if (bulletState === "fire") {
    // creates bullet and plays sound
    displayBullet();
    // spaceInvaderLaserSound.play;
    // spaceInvaderLaserSound.setVolume(1.0);


    // moves bullet
    bulletY -= bulletSpeed;
  }

  // bullet boundary
  if (bulletY < y / 16) {
    bulletState = "ready";

  }





  backgroundColor = 51;
  displayLaserCannon();  
}

// displays laser cannon
function displayLaserCannon(){
  imageMode(CENTER);
  image(laserCannon, playerX, playerY, cannonSize, cannonSize);
}

// diplsays bullet
function displayBullet(){
  if (state === "Space Invader"){
    imageMode(CENTER);
    image(bullet, bulletX, bulletY, bulletWidth, bulletHeight);
  }
 
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
    
    // Fires bullet for laser cannon
    // new bullet is ready to be fired
    if (bulletState === "ready"){
      if (keyCode === 32 || keyCode === 87 || keyCode === 38){
        bulletX = playerX;
        bulletY = playerY - 20;
        bulletState = "fire";
      }
    }

   

  }
  
}

