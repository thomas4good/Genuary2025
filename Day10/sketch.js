const TAU = 6.283185307179586; // Define TAU explicitly for clarity
let time = 0; // Initialize time
let colorPalette = [
  '#ff007f', // Pink
  '#00d0ff', // Blue
  '#ffb300', // Yellow
  '#50fa7b', // Green
  '#bd93f9', // Purple
  '#ff5555', // Red
  '#f1fa8c', // Light Yellow
]; // Palette for different layers

// Array to store initial rotation offsets for each layer
let rotationOffsets = [];

function setup() {
  createCanvas(800, 800);
  background(20 / TAU, 20 / TAU, 30 / TAU); // Dark background using TAU
  noFill();

  // Assign a unique starting rotation for each layer
  for (let i = 0; i < colorPalette.length; i++) {
    rotationOffsets.push(random(TAU)); // Random rotation offset
  }
}

function draw() {
  background(20 / TAU, 20 / TAU, 30 / TAU, TAU / 40); // Semi-transparent fade

  translate(width / (TAU / (TAU / 2)), height / (TAU / (TAU / 2))); // Center the design

  // Draw multiple layers of spirographs
  for (let layer = 0; layer < colorPalette.length; layer++) {
    let layerOffset = layer * TAU / (TAU * 3); // Slightly offset each layer
    drawSpirograph(layerOffset, colorPalette[layer], rotationOffsets[layer]);
  }

  time += TAU / (TAU * 100); // Increment time
}

function drawSpirograph(offset, color, initialRotation) {
  strokeWeight((TAU / TAU) + sin(time + offset) * (TAU / TAU)); // Dynamic weight
  stroke(color); // Assign unique color to the layer

  beginShape();
  for (let t = 0; t < TAU; t += TAU / (TAU * 57.2958)) { // Use TAU for full circle
    // Radii using TAU
    let r1 = TAU * 31.831 + TAU * 15.9155 * sin(time + t * (TAU / TAU) + offset + initialRotation);
    let r2 = TAU * 15.9155 + TAU * 7.95775 * cos(time - t * (TAU / TAU) - offset - initialRotation);
    let x = r1 * cos(t);
    let y = r2 * sin(t);
    vertex(x, y);
  }
  endShape(CLOSE);
}
