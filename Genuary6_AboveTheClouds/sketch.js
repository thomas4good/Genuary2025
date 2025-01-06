function setup() {
  createCanvas(800, 600);
  noStroke();

  drawSky();
  drawStars();
  drawSunsetGlow();

  drawSlopedCloudLayer(height * 0.9, height, color(240, 240, 240, 200), color(255, 255, 255, 180), 80, 0);
  drawSlopedCloudLayer(height * 1.2, height, color(240, 240, 240, 200), color(255, 255, 255, 180), 80, 0);
}

function drawSky() {
  for (let y = 0; y < height; y++) {
    let t = map(y, 0, height, 0, 1);
    let col = lerpColor(color(34, 29, 85), color(255, 140, 85), t);
    fill(col);
    rect(0, y, width, 1);
  }
}

function drawStars() {
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height * 0.3);
    let size = random(1, 3);
    let brightness = random(150, 255);
    fill(brightness);
    ellipse(x, y, size, size);
  }
}

function drawSunsetGlow() {
  fill(255, 180, 85, 150);
  ellipse(width / 2, height - 100, 400, 150);

  fill(255, 220, 120, 180);
  ellipse(width / 2, height - 110, 200, 100);
}

function drawSlopedCloudLayer(yStart, yEnd, baseColor, highlightColor, slopeHeight, offset) {
  let cloudCount = 200;

  for (let i = 0; i < cloudCount; i++) {
    let x = random(-100, width + 100) + offset;
    x = x % (width + 200);
    let y = map(x, 0, width, yStart, yStart - slopeHeight) + random(-20, 20);
    let size = random(100, 300);
    drawCloud(x, constrain(y, yStart - slopeHeight, yEnd), size, baseColor, highlightColor);
  }
}

function drawCloud(x, y, size, baseColor, highlightColor) {
  fill(baseColor);
  ellipse(x, y, size, size * 0.6);

  fill(highlightColor);
  ellipse(x - size * 0.2, y - size * 0.1, size * 0.6, size * 0.4);
  ellipse(x + size * 0.2, y - size * 0.2, size * 0.5, size * 0.3);
}
