let palette = [];
let numSwatches = 6;
let t = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  generatePalette();
}

function draw() {
  t += 0.005;
  
  // Create a smooth vertical gradient background using two palette colors
  let c1 = palette[0];
  let c2 = palette[1];
  for (let y = 0; y < height; y++) {
    let inter = y / height;
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
  
  // Soft, drifting circles overlay
  for (let i = 0; i < 8; i++) {
    let x = noise(t + i * 10) * width;
    let y = noise(t + i * 20) * height;
    let size = noise(t + i * 30) * 80 + 30;
    fill(palette[(i + 2) % palette.length], 30); // Lower opacity for a gentle look
    ellipse(x, y, size, size);
  }
  
  // A subtle pulsing circle in the center
  let centerX = width / 2;
  let centerY = height / 2;
  let pulseSize = map(sin(t * TWO_PI), -1, 1, 50, 150);
  fill(palette[3], 20);
  ellipse(centerX, centerY, pulseSize, pulseSize);
}

function mousePressed() {
  generatePalette();
}

function generatePalette() {
  palette = [];
  // Choose a random base hue and create soft, pastel colors with slight variations
  let baseHue = random(360);
  for (let i = 0; i < numSwatches; i++) {
    let h = (baseHue + random(-20, 20) + 360) % 360;
    let s = random(25, 45);
    let b = random(85, 100);
    palette.push(color(h, s, b));
  }
}
