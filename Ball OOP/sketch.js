// Ball OOP
// George Williams
// 10/28/2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let ballArray = [];
let jeffImg;

function preload(){
  jeffImg = loadImage("assets/jeff-bezos-celebrity-mask.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 50; i ++) {
    let x = random(100, width - 100);
    let y = random(100, height - 100);
    let theBall = new Ball(x, y, jeffImg);
    ballArray.push(theBall);
  }
}

function draw() {
  background(220);
  // for (let theBall of ballArray) {
  //   theBall.move();
  //   theBall.display();
  // }

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].move();
    ballArray[i].display();
  }

 
}


function mousePressed() {
  let theBall = new Ball(mouseX, mouseY, jeffImg);
  ballArray.push(theBall);
}

class Ball {
  constructor(x, y, theImage) {
    this.radius = random(20,50);
    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5, 5);
    this.theColor = color(random(255), random(255), random(255), random(255));
    this.theImage = theImage;

    // ball or jeff's face
    let choice = random(100);
    if (choice < 50) {
      this.toDisplay = "circle";
    }
    else {
      this.toDisplay = "image";
    }
  }

  display() {
    if (this.toDisplay === "circle") {
      noStroke();
      fill(this.theColor);
      circle(this.x, this.y, this.radius*2);

    }

    if (this.toDisplay === "image") {
      imageMode(CENTER);
      image(this.theImage, this.x, this.y, this.radius*4, this.radius*2);

    }
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  

    // check if need to bounce
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.dx *= -1;
    }

    
    if  (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.dy *= -1;
    }

  }
}
