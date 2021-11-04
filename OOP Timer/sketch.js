// OOP Timer
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circleTimer, bgTimer;


function setup() {
  createCanvas(windowWidth, windowHeight);

  circleTimer = new Timer(1000);
  bgTimer = new Timer(3000);
}

function draw() {
  if (bgTimer.isDone()) {
    background("black");

  }

  else {
    background("white");
  }

  if (circleTimer.isDone()) {
    fill("purple");
    circle(200, 200, 200);
  }

}

function mousePressed() {
  circleTimer.reset();
}

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