let cells = [];
let maxCells = 500;
let splitDelay = 30;
let noiseScale = 0.8;
let morphSpeed = 0.02;

function setup() {
  createCanvas(800, 800);
  noStroke();

  // Start with a single cell
  cells.push(new Cell(width / 2, height / 2, 100, randomColor()));
}

function draw() {
  background(20);

  // Update and display all cells
  for (let cell of cells) {
    cell.update();
    cell.display();
  }

  // Split cells periodically
  if (frameCount % splitDelay === 0 && cells.length < maxCells) {
    let cellToSplit = random(cells.filter((cell) => !cell.isSplitting));
    if (cellToSplit) {
      cellToSplit.split();
    }
  }
}

class Cell {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isSplitting = false;
    this.growth = 0;
    this.targetGrowth = 1;
    this.noiseOffset = random(1000);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
  }

  update() {
    if (this.growth < this.targetGrowth) {
      this.growth += 0.05;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.velocity.x *= -1;
    }
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.velocity.y *= -1;
    }

    this.noiseOffset += morphSpeed;
  }

  display() {
    fill(this.color);
    beginShape();
    let angleStep = TWO_PI / 100;
    for (let angle = 0; angle < TWO_PI; angle += angleStep) {
      let noiseFactor = map(
        noise(
          cos(angle) * noiseScale + this.noiseOffset,
          sin(angle) * noiseScale + this.noiseOffset
        ),
        0,
        1,
        0.9,
        1.3
      );
      let r = this.size * this.growth * noiseFactor;
      let x = this.x + cos(angle) * r;
      let y = this.y + sin(angle) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  split() {
    if (this.isSplitting) return;

    this.isSplitting = true;
    let newSize = this.size / 1.5;

    for (let i = 0; i < 2; i++) {
      let offsetX = random(-this.size / 4, this.size / 4);
      let offsetY = random(-this.size / 4, this.size / 4);
      let newColor = randomColor();
      let childVelocity = this.velocity.copy().rotate(random(-PI / 4, PI / 4)).mult(1.1);

      cells.push(
        new Cell(
          this.x + offsetX,
          this.y + offsetY,
          newSize,
          newColor
        )
      );
    }
  }
}

function randomColor() {
  return color(random(100, 255), random(100, 255), random(100, 255), 150);
}
