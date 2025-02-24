let shapes = [];

function setup() {
  createCanvas(800, 800);
  background(20, 30, 60); // Deep navy background
  noStroke();

  // Generate random shapes
  for (let i = 0; i < 120; i++) {
    shapes.push({
      x: random(width),
      y: random(height),
      size: random(20, 100),
      type: random(["circle", "arc", "zigzag"]),
      color: random([
        color(255, 50, 100),  // Vibrant pink
        color(50, 200, 255),  // Neon blue
        color(255, 200, 50),  // Bright yellow
        color(100, 255, 150), // Neon green
        color(200, 100, 255)  // Purple
      ]),
      angle: random(TWO_PI), // Initial angle for rotation
      speed: random(0.01, 0.05), // Speed of rotation or movement
    });
  }
}

function draw() {
  background(20, 30, 60, 50); // Semi-transparent background for trail effect

  for (let shape of shapes) {
    fill(shape.color);

    switch (shape.type) {
      case "circle":
        drawPulsingCircle(shape);
        break;

      case "arc":
        drawRotatingArc(shape);
        break;

      case "zigzag":
        drawMovingZigzag(shape);
        break;

    }
  }
}

function drawPulsingCircle(shape) {
  let pulse = sin(frameCount * shape.speed) * shape.size * 0.2; // Pulsing effect
  ellipse(shape.x, shape.y, shape.size + pulse, shape.size + pulse);
}

function drawRotatingArc(shape) {
  push();
  translate(shape.x, shape.y);
  rotate(shape.angle);
  arc(0, 0, shape.size, shape.size, 0, HALF_PI); // Rotating arc
  pop();
  shape.angle += shape.speed; // Update angle for rotation
}

function drawMovingZigzag(shape) {
  stroke(shape.color)
  strokeWeight(4);
  noFill();
  let offset = sin(frameCount * shape.speed) * shape.size * 0.2; // Wavy motion
  beginShape();
  for (let i = 0; i < shape.size; i += shape.size / 5) {
    let dx = i % 2 === 0 ? -shape.size / 4 : shape.size / 4;
    vertex(shape.x + dx + offset, shape.y + i);
  }
  endShape();
  noStroke();
}
