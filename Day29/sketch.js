let numCols = 10;
let numRows = 10;
let cellSize;
let colors;

function setup() {
  createCanvas(800, 800);
  cellSize = width / numCols;
  angleMode(DEGREES);
  
  // A custom color palette I really like
  colors = [
    color(239, 71, 111),
    color(255, 209, 102),
    color(6, 214, 160),
    color(17, 138, 178),
    color(7, 59, 76)
  ];
  
  noStroke();
}

function draw() {
  background(20);
  let t = frameCount * 0.5;
  
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      // Calculate the center of the current cell
      let posX = col * cellSize + cellSize / 2;
      let posY = row * cellSize + cellSize / 2;
      
      push();
      translate(posX, posY);
      
      // Generate a smooth noise value unique to each cell
      let noiseVal = noise(col * 0.3, row * 0.3, frameCount * 0.01);
      
      // Decide shape type based on noise value
      let drawSquare = noiseVal < 0.5;
      
      // Determine rotation: a mix of noise mapping and a sine oscillation for extra flair
      let angleOffset = map(noiseVal, 0, 1, -45, 45) + sin(t + col + row) * 15;
      rotate(angleOffset);
      
      // Pick a color from the palette using the noise value
      let index = floor(map(noiseVal, 0, 1, 0, colors.length));
      fill(colors[index]);
      
      let sizeFactor = cellSize * 0.6;
      if (drawSquare) {
        rectMode(CENTER);
        rect(0, 0, sizeFactor, sizeFactor);
      } else {
        ellipse(0, 0, sizeFactor, sizeFactor);
      }
      
      pop();
    }
  }
}
