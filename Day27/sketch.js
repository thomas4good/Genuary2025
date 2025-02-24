let gridSize = 40; // Base size of each square
let step = 2; // Growth step for animation

function setup() {
  createCanvas(800, 800);
  noFill();
  stroke(255);
  strokeWeight(2);
}

function draw() {
  background(10);

  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let offset = (frameCount % (gridSize * 2)) / step; // Deterministic animation
      drawNestedSquares(x, y, gridSize - offset);
    }
  }
}

// **Structured, Recursive Square Growth**
function drawNestedSquares(x, y, size) {
  for (let i = 0; i < 4; i++) { // Always 4 layers deep, no randomness
    let s = size - i * (size / 4);
    rect(x + (gridSize - s) / 2, y + (gridSize - s) / 2, s, s);
  }
}
