let grid = [[2,0,2],
            [0,0,0],
            [4,0,2]];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // grid = moveDown(grid);
}

function draw() {
  background(220);
}

function moveUp(grid) {
  for (let y=1; y<3; y++) {
    for (let x=0; x<3; x++) {
      if (grid[y][x] !== 0) {
        let thisY = y;
        let thisX = x;
        while (thisY >= 1 && grid[thisY-1][thisX] === 0) { // does not like thisX or thisY
          // swapWithAbove
          grid[thisY -1 ][thisX] = grid[thisY][thisX];
          grid[thisY][thisX] = 0;

          //change thisY
          thisY = thisY - 1;
        }
      }
    }
  }
  return grid;
}

function moveDown(grid) {
  for (let y=1; y >= 0; y--) {
    for (let x=2; x >= 0; x--) {
      if (grid[y][x] !== 0) {
        let thisY = y;
        let thisX = x;
        while (thisY <= 0 && grid[thisY+1][thisX] === 0) { // does not like thisX or thisY
          // swap with below
          grid[thisY + 1 ][thisX] = grid[thisY][thisX];
          grid[thisY][thisX] = 0;

          //change thisY
          thisY = thisY + 1;
        }
      }
    }
  }
  return grid;
}

