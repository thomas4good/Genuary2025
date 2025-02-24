let gridSize = 1000;
let offset = 0;
let rotationAngle = 0;

function setup() {
  createCanvas(800, 800);
  background(10);
  frameRate(400); // Set to 400 FPS
}

function draw() {
  background(10, 50);
  translate(width / 2, height / 2);

  for (let x = -gridSize / 2; x < gridSize / 2; x += 20) {
    for (let y = -gridSize / 2; y < gridSize / 2; y += 20) {
      let angle = atan2(y, x) + rotationAngle;
      let distanceFromCenter = dist(0, 0, x, y);
      let wave = sin(offset * 0.01 + distanceFromCenter * 0.02) * 50;

      let x1 = cos(angle) * distanceFromCenter + wave;
      let y1 = sin(angle) * distanceFromCenter;
      let x2 = cos(angle + PI / 4) * distanceFromCenter - wave;
      let y2 = sin(angle + PI / 4) * distanceFromCenter + wave;

      let colorIntensity = map(distanceFromCenter, 0, gridSize / 2, 0, 255);
      stroke(colorIntensity, map(x, -gridSize / 2, gridSize / 2, 50, 200), 255 - colorIntensity, 150);
      strokeWeight(1);

      line(x1, y1, x2, y2);
    }
  }

  rotationAngle += 0.01;
  offset += 0.5;
}
