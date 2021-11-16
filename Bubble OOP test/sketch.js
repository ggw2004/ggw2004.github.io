// Do not edit the code between these comments. 
// You should only edit the class Bubble below.
// -----------------------------------------------
let myBubble;

function setup() {
  createCanvas(400, 400);
  myBubble = new Bubble(width/2, height, "red");
}

function draw() {
  background(220);
  myBubble.up();
  myBubble.display();
}

function mousePressed(){
  myBubble = new Bubble(random(width), random(400, 350));  
  
}

// -----------------------------------------------


class Bubble {
  constuctor(x ,y, theColor) {
    this.x = x;
    this.y = y;
    this.radius = random (5, 15);
    this.dx = random(-5,5);
    this.dy = random(3, 5);
    this.theColor = "red";
  }
  
  up() {
    this.x += this.dx;
    this.y += this.dy;
  }
  
  display() {
    fill(0);
    // console.log(this.theColor);
    circle(this.x, this.y, this.radius * 2);
  }
  // Your code should go here!
  // Make the class work as described in the quiz question...
}