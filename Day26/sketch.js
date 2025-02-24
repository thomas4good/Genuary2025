let points = [];
let maxPoints = 50; // Number of moving points
let speed = 2;

function setup() {
  createCanvas(800, 800);
  noFill();
  stroke(255);
  strokeWeight(2);

  // Initialize random points for symmetry
  for (let i = 0; i < maxPoints; i++) {
    points.push(new SymmetricPoint(random(width / 2), random(height)));
  }
}

function draw() {
  background(10);

  for (let p of points) {
    p.update();
    p.display();
  }
}

// Class for moving points that are mirrored
class SymmetricPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(TWO_PI);
    this.speed = random(0.5, speed);
  }

  update() {
    // Move in a smooth circular motion
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.angle += random(-0.1, 0.1); // Random movement variations

    // Bounce off edges
    if (this.x < 0 || this.x > width / 2) this.speed *= -1;
    if (this.y < 0 || this.y > height) this.angle += PI;
  }

  display() {
    // Left side
    ellipse(this.x, this.y, 10, 10);
    
    // Mirrored Right side
    ellipse(width - this.x, this.y, 10, 10);
    
    // Top-Bottom Mirroring (Quadrant symmetry)
    ellipse(this.x, height - this.y, 10, 10);
    ellipse(width - this.x, height - this.y, 10, 10);
  }
}
