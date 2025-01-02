let numLayers = 100; // Total number of contour layers
let visibleLayers = 0; // Counter for layers currently visible
let noiseScale = 0.1; // Controls the irregularity of the shapes
let offset = 0; // Animation offset
let revealSpeed = 15; // Frames per layer reveal
let layerData = []; // Stores position, color, and size for each layer
let palette = []; // Color palette

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  noStroke();

  // Define the palette
  palette = [
    color('#0A2463'),
    color('#FB3640'),
    color('#605F5E'),
    color('#247BA0'),
    color('#E2E2E2'),
  ];

  // Initialize layer data
  for (let i = 0; i < numLayers; i++) {
    layerData.push({
      x: random(width),
      y: random(height),
      size: random(50, 200),
      color: random(palette),
    });
  }
}

function draw() {
  background(20, 20, 30);

  // Draw visible layers
  for (let i = 0; i < visibleLayers; i++) {
    let layer = layerData[i];
    let layerOffset = offset;
    let layerColor = layer.color;
    let radius = layer.size;

    fill(layerColor);
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let xoff = cos(angle) * noiseScale * layerOffset;
      let yoff = sin(angle) * noiseScale * layerOffset;
      let r = map(noise(xoff, yoff), 0, 1, radius * 0.8, radius * 1.2);
      let x = layer.x + r * cos(angle);
      let y = layer.y + r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  offset += 0.5;

  // Reveal layers gradually
  if (frameCount % revealSpeed === 0 && visibleLayers < numLayers) {
    visibleLayers++;
  }
}
