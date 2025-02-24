let points = [];
let maxPoints = 300; // Length of the line
let noiseOffsetX, noiseOffsetY;
let speed = 0.005; // Controls smoothness
let velocity;

function setup() {
  createCanvas(800, 800);
  background(10);
  stroke(255);
  strokeWeight(2);
  noFill();

  // Start the line at the center
  let startX = width / 2;
  let startY = height / 2;
  points.push(createVector(startX, startY));

  // Randomize initial noise offsets
  noiseOffsetX = random(1000);
  noiseOffsetY = random(1000);

  // Initial velocity direction
  velocity = createVector(random(-2, 2), random(-2, 2));
}

function draw() {
  background(10, 20); // Subtle fade effect

  let lastPoint = points[points.length - 1];

  // Use Perlin noise to influence movement direction
  let angle = noise(noiseOffsetX) * TWO_PI * 2;
  velocity.x += cos(angle) * 0.1;
  velocity.y += sin(angle) * 0.1;

  // Limit velocity to prevent erratic motion
  velocity.limit(3);

  let newX = lastPoint.x + velocity.x;
  let newY = lastPoint.y + velocity.y;

  // **Bounce off edges instead of teleporting**
  if (newX <= 0 || newX >= width) {
    velocity.x *= -1; // Reverse horizontal direction
    newX = constrain(newX, 1, width - 1);
  }
  if (newY <= 0 || newY >= height) {
    velocity.y *= -1; // Reverse vertical direction
    newY = constrain(newY, 1, height - 1);
  }

  // Add the new point
  points.push(createVector(newX, newY));

  // Limit the number of points to maintain trail effect
  if (points.length > maxPoints) {
    points.shift();
  }

  // Update noise offsets for smooth randomness
  noiseOffsetX += speed;
  noiseOffsetY += speed;

  // Draw the single continuous line
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape();
}
