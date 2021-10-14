// Gane of Live
// George Williams
// 10/14/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;
let gridSize = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2DArray(gridSize, gridSize);
}

function draw() {
  background(220);


}


function createEmpty2DArray(rows, cols) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++){
      rect(gridSize,gridSize);
    }
  }
}