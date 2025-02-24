let shapes = [];

function setup() {
  createCanvas(800, 800);

  // Add shapes to test collision
  shapes.push(new Rectangle(200, 200, 150, 100));
  shapes.push(new Circle(500, 300, 50));
}

function draw() {
  background(30);

  // Update and show shapes
  for (let shape of shapes) {
    shape.update();
    shape.show();
  }

  // Check for collisions between all pairs of shapes
  for (let i = 0; i < shapes.length; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      if (shapes[i].collidesWith(shapes[j])) {
        // Resolve collision and adjust velocities
        resolveCollision(shapes[i], shapes[j]);
      }
    }
  }
}

// Resolves collision by swapping velocities based on their relative positions
function resolveCollision(a, b) {
  if (a instanceof Rectangle && b instanceof Rectangle) {
    // Swap velocities for rectangles
    let tempVx = a.vx;
    let tempVy = a.vy;
    a.vx = b.vx;
    a.vy = b.vy;
    b.vx = tempVx;
    b.vy = tempVy;
  } else if (a instanceof Circle && b instanceof Circle) {
    // Circle-Circle bounce
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    let distance = sqrt(dx * dx + dy * dy);

    // Normalized collision vector
    let nx = dx / distance;
    let ny = dy / distance;

    // Relative velocity
    let relVx = b.vx - a.vx;
    let relVy = b.vy - a.vy;

    // Relative velocity along the normal
    let dot = relVx * nx + relVy * ny;

    // Apply velocity changes
    a.vx -= dot * nx;
    a.vy -= dot * ny;
    b.vx += dot * nx;
    b.vy += dot * ny;
  } else if (a instanceof Rectangle && b instanceof Circle) {
    // Delegate to Circle-Rectangle collision
    resolveCollision(b, a);
  } else if (a instanceof Circle && b instanceof Rectangle) {
    // Reflect the circle's velocity
    let nearestX = constrain(a.x, b.x, b.x + b.w);
    let nearestY = constrain(a.y, b.y, b.y + b.h);

    let dx = a.x - nearestX;
    let dy = a.y - nearestY;

    let distance = sqrt(dx * dx + dy * dy);
    if (distance === 0) return;

    let nx = dx / distance;
    let ny = dy / distance;

    let dot = a.vx * nx + a.vy * ny;
    a.vx -= 2 * dot * nx;
    a.vy -= 2 * dot * ny;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  show() {
    fill(100, 150, 255);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.bounce();
  }

  bounce() {
    if (this.x < 0 || this.x + this.w > width) this.vx *= -1;
    if (this.y < 0 || this.y + this.h > height) this.vy *= -1;
  }

  collidesWith(other) {
    if (other instanceof Rectangle) {
      return (
        this.x < other.x + other.w &&
        this.x + this.w > other.x &&
        this.y < other.y + other.h &&
        this.y + this.h > other.y
      );
    } else if (other instanceof Circle) {
      return other.collidesWith(this); // Delegate to Circle-Rectangle collision
    }
    return false;
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  show() {
    fill(255, 100, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.bounce();
  }

  bounce() {
    if (this.x - this.r < 0 || this.x + this.r > width) this.vx *= -1;
    if (this.y - this.r < 0 || this.y + this.r > height) this.vy *= -1;
  }

  collidesWith(other) {
    if (other instanceof Circle) {
      let distSq = (this.x - other.x) ** 2 + (this.y - other.y) ** 2;
      let radiusSum = this.r + other.r;
      return distSq <= radiusSum ** 2;
    } else if (other instanceof Rectangle) {
      let nearestX = constrain(this.x, other.x, other.x + other.w);
      let nearestY = constrain(this.y, other.y, other.y + other.h);
      let distSq = (this.x - nearestX) ** 2 + (this.y - nearestY) ** 2;
      return distSq <= this.r ** 2;
    }
    return false;
  }
}
