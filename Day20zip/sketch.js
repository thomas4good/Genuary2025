let citySize = 10; // Number of buildings in a row/column
let blockSpacing = 80; // Distance between buildings
let maxBuildingHeight = 300;
let minBuildingHeight = 50;
let angle = 0;

function setup() {
  createCanvas(800, 800, WEBGL); // Enable 3D mode
  noStroke();
}

function draw() {
  background(0); // Full black background

  // Add static lighting for a polished 3D look
  directionalLight(255, 255, 255, 0.5, -1, -0.5);
  ambientLight(50);

  // Draw static ground plane (large enough to fill the canvas)
  push();
  fill(0); // Black color for the ground
  translate(0, maxBuildingHeight, 0); // Position the ground at the bottom
  plane(citySize * blockSpacing * 2.5, citySize * blockSpacing * 2.5); // Larger size to ensure it fills the canvas
  pop();

  // Rotate the buildings only
  push();
  rotateY(angle); // Rotate the city
  angle += 0.002; // Slow rotation

  // Draw the city grid
  for (let x = -citySize / 2; x < citySize / 2; x++) {
    for (let z = -citySize / 2; z < citySize / 2; z++) {
      push();
      let posX = x * blockSpacing;
      let posZ = z * blockSpacing;

      // Buildings near the center are taller
      let distFromCenter = dist(posX, posZ, 0, 0);
      let height = map(distFromCenter, 0, citySize * blockSpacing / 2, maxBuildingHeight, minBuildingHeight);

      // Add subtle animation to height
      height += sin(frameCount * 0.02 + distFromCenter * 0.1) * 10;

      // Position building
      translate(posX, maxBuildingHeight / 2 - height / 2, posZ); // Align base to the bottom

      // Building color (gradient effect based on height)
      fill(50 + height * 0.5, 100, 200 - height * 0.3, 200);

      // Draw the building
      box(50, height, 50); // 3D box
      pop();
    }
  }
  pop(); // End rotation for buildings
}
