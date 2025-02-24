let cols = 8;
let rows = 8;
let gridSize;
let speed = 0.05;

function setup() {
  createCanvas(800, 800);
  gridSize = width / cols;
  noFill();
  stroke(255);
  strokeWeight(2);
}

function draw() {
  background(10);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * gridSize + gridSize / 2;
      let y = j * gridSize + gridSize / 2;
      let timeFactor = (i + j) * 0.1 + frameCount * speed;
      let scaleFactor = map(sin(timeFactor), -1, 1, 0.3, 1);

      drawConcentricSquares(x, y, gridSize * scaleFactor);
    }
  }
}

// **Function to draw nested squares centered at (x, y)**
function drawConcentricSquares(x, y, size) {
  let steps = 4;
  for (let i = 0; i < steps; i++) {
    let s = size * (1 - i * 0.25);
    rectMode(CENTER);
    rect(x, y, s, s);
  }
}
