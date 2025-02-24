let buildings = [];
let fogs = [];

function setup() {
  createCanvas(800, 800);
  noStroke();
  generateCity();
  generateFog();
}

function generateCity() {
  buildings = [];
  let numBuildings = random(5, 10);

  for (let i = 0; i < numBuildings; i++) {
    let w = random(100, 250); // Brutalist block width
    let h = random(200, 600); // Brutalist height
    let x = random(width - w);
    let y = height - h;
    let color1 = color(random(40, 80)); // Dark concrete tones
    let color2 = color(random(120, 180)); // Slightly lighter concrete tones

    buildings.push(new BrutalistBuilding(x, y, w, h, color1, color2));
  }
}

function generateFog() {
  fogs = [];
  for (let i = 0; i < 3; i++) { // Different fog layers
    fogs.push(new FogLayer(random(height * 0.3, height * 0.8), random(1, 3), random(80, 150)));
  }
}

function draw() {
  background(10); // Dark, moody backdrop

  for (let building of buildings) {
    building.display();
  }

  for (let fog of fogs) {
    fog.update();
    fog.display();
  }
}

// 🏢 **Brutalist Buildings (No unnecessary gradients)**
class BrutalistBuilding {
  constructor(x, y, w, h, col1, col2) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color1 = col1;
    this.color2 = col2;
  }

  display() {
    fill(this.color1);
    rect(this.x, this.y, this.w, this.h);
    fill(this.color2);
    rect(this.x + this.w * 0.2, this.y, this.w * 0.8, this.h); // Subtle lighting effect
  }
}

// 🌫 **Fog Layer (Soft, moving mist)**
class FogLayer {
  constructor(y, speed, opacity) {
    this.y = y;
    this.speed = speed * (random() > 0.5 ? 1 : -1); // Move left or right
    this.opacity = opacity;
    this.offset = random(1000); // Unique motion variation
  }

  update() {
    this.y += map(noise(this.offset + frameCount * 0.005), 0, 1, -0.3, 0.3); // Subtle vertical motion
  }

  display() {
    fill(150, 150, 150, this.opacity);
    rect(0, this.y, width, 80); // Moving fog strip
  }
}
