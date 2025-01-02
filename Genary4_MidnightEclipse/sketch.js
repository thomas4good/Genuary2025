let gradientOffsetX = 0;
let gradientOffsetY = 0;

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  background(0);

  // Draw vertical gradient
  for (let y = 0; y < height; y++) {
    let gradientColor = map(sin(gradientOffsetY + y * 0.01), -1, 1, 5, 25);
    fill(gradientColor);
    rect(0, y, width, 1);
  }

  // Draw horizontal gradient
  for (let x = 0; x < width; x++) {
    let gradientColor = map(cos(gradientOffsetX + x * 0.01), -1, 1, 5, 25);
    fill(gradientColor);
    rect(x, 0, 1, height);
  }

  // Draw central  sphere
  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 150 + sin(frameCount * 0.02) * 20;
  fill(20);
  ellipse(centerX, centerY, radius, radius);

  // Draw wiggling shapes 
  for (let y = 50; y < height; y += 50) {
    let baseX = width / 2 + map(sin(frameCount * 0.03 + y * 0.05), -1, 1, -50, 50);
    let lineWidth = map(sin(frameCount * 0.05 + y * 0.1), -1, 1, 80, 120);

    fill(10);
    rect(baseX - lineWidth / 2, y, lineWidth, 10);

    fill(15);
    rect(baseX - lineWidth / 2 - 5, y + 3, lineWidth, 7);
    rect(baseX - lineWidth / 2 + 5, y - 3, lineWidth, 7);
  }

  // Update gradients
  gradientOffsetX += 0.02;
  gradientOffsetY += 0.015;
}
