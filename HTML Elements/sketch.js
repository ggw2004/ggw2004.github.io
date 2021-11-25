// Project Titled
// Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let someText;

function setup() {
  let canvas = createCanvas(300, 300);
  canvas.position(100, 400);

  someText = createP("Some HTML string");
  someText.position(500, 500);
  someText.style("color", "purple");
  someText.style("font-size", "42pt");
}

function draw() {
  background(220);


  circle(mouseX, mouseY, 100);
}


function mousePressed() {
  someText.html("Something else belongs here...");
}