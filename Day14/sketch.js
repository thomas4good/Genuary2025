let t = 0; // Time variable for evolving patterns

function setup() {
  createCanvas(800, 800);
  noFill(); // No fill, only strokes for artistic curves
  strokeWeight(2); // Make lines bolder
}

function draw() {
  background(0); // White background
  stroke(255); // Black lines

  let spacing = 20; // Spacing between curves
  for (let y = 0; y < height; y += spacing) {
    beginShape();
    for (let x = 0; x <= width; x += 10) {
      // Generate y-offset using Perlin noise
      let offset = noise(x * 0.01, y * 0.01, t) * 100;
      vertex(x, y + offset); // Create vertex with procedural offset
    }
    endShape();
  }

  t += 0.01; // Increment time to evolve the pattern
}
