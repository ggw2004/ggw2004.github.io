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

function setup() {
  createCanvas(windowWidth *0.8, windowHeight * 0.8);
  
}



// main game loop
function draw() {
  background(backgroundColor);


  // run the starting screen
  if (state === "Start Screen") {
    startingWindow();
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
  text("Welcome Player", width / 2, height / 2);
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

    state = "gameOptions";
  }

}


// center your canvas
