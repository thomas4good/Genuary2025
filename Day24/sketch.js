let cols, rows;
let triSize = 50;
let triangles = [];

function setup() {
  createCanvas(800, 800);
  cols = width / triSize;
  rows = height / triSize;

  // Initialize triangles
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      triangles.push(new AnimatedTriangle(i * triSize, j * triSize, triSize));
    }
  }
}

function draw() {
  background(10);

  for (let tri of triangles) {
    tri.update();
    tri.display();
  }
}

class AnimatedTriangle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = random([0, PI / 2, PI, -PI / 2]); // Random initial rotation
    this.rotationSpeed = random(-0.02, 0.02); // Small rotation variation
    this.color1 = color(random(100, 255), random(100, 255), random(255));
    this.color2 = color(random(50, 200), random(50, 200), random(255));
  }

  update() {
    this.rotation += this.rotationSpeed; // Slowly rotate triangles

    // Subtle color shifting over time
    let lerpAmount = map(sin(frameCount * 0.01), -1, 1, 0, 1);
    this.currentColor = lerpColor(this.color1, this.color2, lerpAmount);
  }

  display() {
    push();
    translate(this.x + this.size / 2, this.y + this.size / 2);
    rotate(this.rotation);

    fill(this.currentColor);
    beginShape();
    vertex(-this.size / 2, -this.size / 2);
    vertex(this.size / 2, -this.size / 2);
    vertex(0, this.size / 2);
    endShape(CLOSE);
    
    pop();
  }
}
