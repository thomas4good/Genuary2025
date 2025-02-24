let colors = [];
let rotationAngle = 0;

function setup() {
  createCanvas(800, 800);
  noFill();
  frameRate(30);

  colors = [
    color(200, 100, 50),
    color(50, 150, 200),
    color(150, 255, 150),
    color(255, 150, 200),
    color(255, 200, 100),
  ];
}

function draw() {
  background(20);

  translate(width / 2, height / 2);
  rotate(rotationAngle);

  for (let i = 0; i < 10; i++) {
    let radius = 50 + i * 30;
    let distortion = map(sin(frameCount * 0.02 + i), -1, 1, 0, 1);
    let col = colors[i % colors.length];

    stroke(col);
    strokeWeight(2);
    drawDistortedCircle(radius, distortion);
  }

  rotationAngle += radians(0.5);
}

function drawDistortedCircle(radius, distortion) {
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let x = radius * pow(abs(cos(angle)), distortion) * (cos(angle) > 0 ? 1 : -1);
    let y = radius * pow(abs(sin(angle)), distortion) * (sin(angle) > 0 ? 1 : -1);
    vertex(x, y);
  }
  endShape(CLOSE);
}
