let particles = [];
let numParticles = 300;
let windStrength = 0.05; // Strength of wind force
let noiseScale = 0.01; // Controls smoothness of movement

function setup() {
  createCanvas(800, 800);
  noStroke();

  // Initialize particles with random positions
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0,
      size: random(2, 6),
      color: color(150 + random(100), 50, 255, random(100, 200)) // Purple shades
    });
  }
}

function draw() {
  background(10, 10, 30, 50); // Dark, slightly transparent background for a glowing effect

  for (let p of particles) {
    fill(p.color);
    ellipse(p.x, p.y, p.size, p.size);

    // Apply perlin noise wind force
    let angle = noise(p.x * noiseScale, p.y * noiseScale, frameCount * 0.001) * TWO_PI * 2;
    let windX = cos(angle) * windStrength;
    let windY = sin(angle) * windStrength;

    // Update velocity
    p.vx += windX;
    p.vy += windY;

    // Apply movement
    p.x += p.vx;
    p.y += p.vy;

    // Apply slight friction to smooth movement
    p.vx *= 0.98;
    p.vy *= 0.98;

    // Wrap around edges for continuous flow
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }
}
