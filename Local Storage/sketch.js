// Click Local Storage
// Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let clickCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  // currentclick
  textSize(42);
  fill("black");
  text(clickCount, width/2, height/2);

  // highest click
  fill("red");
  text(getItem("highestClick"), 100, 100);
}

function mousePressed() {
  clickCount++;
  if (clickCount > getItem("highestClick")) {
    storeItem("highestClick", clickCount);
  }
}
