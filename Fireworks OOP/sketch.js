// Project Titled
// Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let fireworks = [];
let numberOfParticles;

function setup() {
  createCanvas(windowWidth, windowHeight);

  numberOfParticles = Math.floor(random(100));
}

function draw() {
  background(220);
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
    else {
      fireworks[i].move();
      fireworks[i].display();

    }

  }

}


function mousePressed() {
  for (let i = 0; i < numberOfParticles; i++) {
    let myParticle = new Particle(mouseX, mouseY);
    fireworks.push(myParticle);
  }
}

class Particle {
  constructor(x , y) {
    this.x = x;
    this.y = y;
    this.size = random(3, 7);
    this.alpha = 255;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.theColor = color(this.r, this.g, this.b, this.alpha);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
  }

  display() {
    noStroke();
    fill(this.theColor);
    circle(this.x, this.y, this.size);
  }


  move() {
    this.alpha--;
    this.color = color(this.r, this.g, this.b, this.alpha);
    this.x += this.dx;
    this.y += this.dy;
  }

  isDead() {
    return this.alpha < 0;
  }
}
