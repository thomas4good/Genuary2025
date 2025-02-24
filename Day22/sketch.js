let flames = [];

function setup() {
  createCanvas(800, 800);
  noStroke();

  // Create flames attached to the torch
  for (let i = 0; i < 10; i++) {
    flames.push(new GradientFlame(width / 2, height - 250, random(50, 200), random(-15, 15)));
  }
}

function draw() {
  background(10, 5, 20); // Dark background

  drawTorch(width / 2, height - 200); // Draw the torch handle

  // Draw and animate each flame
  for (let flame of flames) {
    flame.update();
    flame.display();
  }

  drawSparks(); // Add floating sparks for realism
}

// 🔥 **Torch Handle**
function drawTorch(x, y) {
  fill(80, 40, 20); // Dark brown for wood
  rect(x - 15, y, 30, 150, 10); // Rounded rectangle for the torch handle
}

// 🔥 **Embers & Sparks**
let sparks = [];

function drawSparks() {
  if (random(1) < 0.1) {
    sparks.push(new Spark(width / 2 + random(-20, 20), height - 250));
  }
  
  for (let i = sparks.length - 1; i >= 0; i--) {
    sparks[i].update();
    sparks[i].display();
    if (sparks[i].lifespan <= 0) {
      sparks.splice(i, 1);
    }
  }
}

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-2, -1);
    this.size = random(3, 6);
    this.lifespan = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.lifespan -= 5;
  }

  display() {
    fill(255, 150, 50, this.lifespan);
    ellipse(this.x, this.y, this.size);
  }
}

// 🔥 **Flames with Rotation & Flickering**
class GradientFlame {
  constructor(x, y, maxSize, rotationAngle) {
    this.x = x;
    this.y = y;
    this.size = 0;
    this.maxSize = maxSize;
    this.angle = rotationAngle;
    this.rotationSpeed = random(-0.02, 0.02);
    this.color1 = color(255, random(50, 150), 0);
    this.color2 = color(255, random(150, 255), random(50, 100));
    this.speed = random(1, 3);
    this.noiseOffset = random(1000);
  }

  update() {
    this.size += this.speed;
    this.y -= this.speed * 0.8;
    this.angle += this.rotationSpeed;
    this.x += map(noise(this.noiseOffset + frameCount * 0.01), 0, 1, -1.5, 1.5);

    if (this.size > this.maxSize) {
      this.size = 0;
      this.y = height - 250;
      this.angle = random(-15, 15);
      this.color1 = color(255, random(50, 150), 0);
      this.color2 = color(255, random(150, 255), random(50, 100));
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));

    for (let r = this.size; r > 0; r -= 8) {
      let inter = map(r, 0, this.maxSize, 0, 1);
      let c = lerpColor(this.color1, this.color2, inter);
      fill(c);
      ellipse(0, 0, r * 1.5, r * 3);
    }

    pop();
  }
}
