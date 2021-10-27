// OOP Walker
// Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let kayaan, nick, hannah;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kayaan = new Walker(width/2, height/2, "purple");
  nick = new Walker(width/6, height/2, "lime");
  hannah = new Walker(100, height/2, "blue");
}

function draw() {
  kayaan.display();
  nick.display();
  hannah.display();
  hannah.move();
  kayaan.move();
  nick.move();

}

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.color = theColor;
    this.speed = 5;
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, 3);

  }

  move() {
    let choice = random(100);
    if (choice < 25) { // up
      this.y -= this.speed;
    }
    else if (choice < 50) { //down
      this.y += this.speed;
    }
    else if (choice < 75) { // left
      this.x -= this.speed;
    }
    else { //down
      this.x += this.speed;
    }
    
    
  }
}


