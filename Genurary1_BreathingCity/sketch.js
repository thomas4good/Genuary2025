let maxBuildingHeight = 500;
let animationPhase = 0;
let breathingSpeed = 0.02;
let heightChangeLimit = 0.06;
let starField = [];
let cityscape = [];

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  noStroke();

  for (let i = 0; i < 200; i++) {
    starField.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
      brightness: random(150, 255),
    });
  }

  let xPos = 0;
  while (xPos < width) {
    let buildingWidth = random(40, 100);
    let baseHeight = random(maxBuildingHeight * 0.5, maxBuildingHeight * 0.9);
    cityscape.push({ x: xPos, width: buildingWidth, height: baseHeight });
    xPos += buildingWidth + 10;
  }
}

function draw() {
  background(10, 10, 30);

  for (let star of starField) {
    fill(255, 255, 255, star.brightness);
    ellipse(star.x, star.y, star.size);
  }

  fill(240, 240, 220);
  ellipse(width - 150, 150, 80, 80);
  fill(10, 10, 30);
  ellipse(width - 135, 135, 60, 60);

  animationPhase += breathingSpeed;
  let dynamicHeightShift = sin(animationPhase) * (maxBuildingHeight * heightChangeLimit);

  for (let building of cityscape) {
    let baseHeight = building.height;
    let currentHeight = baseHeight + dynamicHeightShift;
    let colorGradient = lerpColor(
      color(100, 100, 200),
      color(255, 150, 100),
      currentHeight / maxBuildingHeight
    );

    fill(colorGradient);
    rect(building.x, height - currentHeight, building.width, currentHeight);

    for (let y = height - currentHeight + 20; y < height; y += 30) {
      if (random() > 0.4) {
        fill(255, 255, 180, 200);
        rect(building.x + 10, y, building.width - 20, 8);
      }
    }
  }

  for (let y = height - 80; y < height; y++) {
    let fogOpacity = map(y, height - 80, height, 2, 0);
    fill(100, 100, 200, 255 * (1 - fogOpacity));
    rect(0, y, width, 1);
  }
}
