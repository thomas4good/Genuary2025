let img;
let cols = 50; // Grid size (higher = more detail)
let rows = 50;
let gridSize;
let sortedPixels = [];
let sortMode = "brightness"; // Can be "brightness", "weight", "age", "size"

function preload() {
  img = loadImage("your_image.jpg"); // ✅ Upload an image and replace this filename
}

function setup() {
  createCanvas(800, 800);
  img.resize(width, height);
  img.loadPixels();
  gridSize = width / cols;

  pixelSortGrid();
}

function draw() {
  background(10);
  displaySortedPixels();
}

// **Sort pixels in a grid-based manner**
function pixelSortGrid() {
  sortedPixels = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * gridSize;
      let y = j * gridSize;

      let pixelsArray = [];

      for (let py = y; py < y + gridSize; py++) {
        for (let px = x; px < x + gridSize; px++) {
          let index = (py * img.width + px) * 4;
          let r = img.pixels[index];
          let g = img.pixels[index + 1];
          let b = img.pixels[index + 2];

          let sortingValue;
          if (sortMode === "brightness") {
            sortingValue = (r + g + b) / 3;
          } else if (sortMode === "weight") {
            sortingValue = r * 0.3 + g * 0.59 + b * 0.11;
          } else if (sortMode === "age") {
            sortingValue = (frameCount + px + py) % 255;
          } else if (sortMode === "size") {
            sortingValue = sqrt(r * r + g * g + b * b);
          }

          pixelsArray.push({ r, g, b, sortingValue });
        }
      }

      pixelsArray.sort((a, b) => a.sortingValue - b.sortingValue);
      sortedPixels.push({ x, y, pixelsArray });
    }
  }
}

// **Display the sorted pixels**
function displaySortedPixels() {
  for (let section of sortedPixels) {
    let { x, y, pixelsArray } = section;
    let i = 0;

    for (let py = y; py < y + gridSize; py++) {
      for (let px = x; px < x + gridSize; px++) {
        if (i < pixelsArray.length) {
          let col = pixelsArray[i];
          fill(col.r, col.g, col.b);
          noStroke();
          rect(px, py, 1, 1);
          i++;
        }
      }
    }
  }
}

// **Cycle through sorting modes on mouse click**
function mousePressed() {
  let modes = ["brightness", "weight", "age", "size"];
  sortMode = modes[(modes.indexOf(sortMode) + 1) % modes.length];
  pixelSortGrid();
}
