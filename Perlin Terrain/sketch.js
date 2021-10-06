// Perlin Terrain
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectHeights = [];

let numberOfRects;

let backgroundColor = "purple";

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRects = width * 2;
  generateTerrain();
}

function draw() {
  background(backgroundColor);
  displayTerrain();
}

function displayTerrain() {
  let theWidth = width / rectHeights.length;
  for (let i = 0; i < rectHeights.length; i++) {
    let theHeight = rectHeights[i];
    fill("black");
    rect(theWidth * i, height, 10, -theHeight);
  }
}

function generateTerrain(){
  let time = 0;
  for (let i =0; i < numberOfRects; i++){
    let theHeight = noise(time) * height;
    rectHeights.push(theHeight);
    time += 0.001;
  }
}