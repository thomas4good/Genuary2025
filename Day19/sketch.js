let gridSize = 40;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(20);

  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let d = map(sin(frameCount * 0.05 + (x + y) * 0.02), -1, 1, 10, gridSize);
      let gradient = map(sin((x + y) * 0.01 + frameCount * 0.03), -1, 1, 50, 255);

      // Alternate colors for the checkerboard
      let color1 = color(255, 100, 150, gradient);
      let color2 = color(50, 150, 255, gradient);
      fill((x + y) % (gridSize * 2) === 0 ? color1 : color2);

      rect(x + gridSize / 2, y + gridSize / 2, d, d);
    }
  }
}
