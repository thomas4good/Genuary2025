let tileSize = 40; // Size of each pattern tile
let colors = [];
let patterns = [];

function setup() {
  createCanvas(800, 800);
  noStroke();
  frameRate(30);

  // Define a color palette
  colors = [
    color(200, 100, 50), // Earthy orange
    color(50, 150, 200), // Soft blue
    color(100, 200, 150), // Calming green
    color(255, 255, 200), // Pale yellow
    color(20, 20, 20),    // Deep black
  ];

  // Initialize patterns array
  let rows = height / tileSize;
  let cols = width / tileSize;
  for (let y = 0; y < rows; y++) {
    patterns.push([]);
    for (let x = 0; x < cols; x++) {
      patterns[y].push({
        type: int(random(3)), // Random pattern type
        color: random(colors), // Random color
        morph: random(1), // Morphing factor for animation
      });
    }
  }
}

function draw() {
  background(240);

  // Draw and animate the patterns
  for (let y = 0; y < patterns.length; y++) {
    for (let x = 0; x < patterns[y].length; x++) {
      let px = x * tileSize;
      let py = y * tileSize;

      let pattern = patterns[y][x];
      pattern.morph = (pattern.morph + 0.01) % 1; // Smoothly animate morphing factor
      pattern.color = lerpColor(random(colors), pattern.color, 0.95); // Slight color shift

      push();
      translate(px, py);
      fill(pattern.color);
      drawAnimatedPattern(tileSize, pattern.type, pattern.morph);
      pop();
    }
  }

  // Add symmetry to the rug design
  addSymmetry();
}

// Function to draw animated patterns
function drawAnimatedPattern(size, type, morph) {
  switch (type) {
    case 0: // Diamond
      beginShape();
      vertex(size / 2, size * morph); // Top
      vertex(size * morph, size / 2); // Right
      vertex(size / 2, size * (1 - morph)); // Bottom
      vertex(size * (1 - morph), size / 2); // Left
      endShape(CLOSE);
      break;

    case 1: // Triangle
      triangle(
        size * (1 - morph), size, // Bottom-left
        size / 2, size * (1 - morph), // Top
        size * morph, size // Bottom-right
      );
      break;

    case 2: // Circle (Morph into ellipse)
      ellipse(size / 2, size / 2, size * morph, size * (1 - morph));
      break;
  }
}

// Add symmetry to the rug design
function addSymmetry() {
  let img = get(0, 0, width, height); // Get current canvas as an image

  // Mirror vertically
  push();
  translate(0, height);
  scale(1, -1);
  image(img, 0, 0);
  pop();

  // Mirror horizontally
  push();
  translate(width, 0);
  scale(-1, 1);
  image(img, 0, 0);
  pop();
}
