let tileSize = 40;
let tiles = [];
let gridWidth = 11;
let tractor = { x: -gridWidth / 2 - 1, y: -gridWidth / 2, direction: 1, active: false, planting: false };
let tractorSpeed = 10;
let stars = [];

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);

  for (let x = -gridWidth / 2 - 1; x <= gridWidth / 2 + 1; x++) {
    for (let y = -gridWidth / 2 - 1; y <= gridWidth / 2 + 1; y++) {
      let isTilled = x >= -gridWidth / 2 && x < gridWidth / 2 && y >= -gridWidth / 2 && y < gridWidth / 2;
      let hasCorn = isTilled && random() < 0.9;
      let growth = hasCorn ? 0 : null;
      tiles.push({ x, y, isTilled, hasCorn, growth, ready: false });
    }
  }

  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }
}

function draw() {
  background(10, 10, 30);
  drawStars();

  translate(width / 2, height / 2);

  drawUnderside();

  let allReady = true;
  for (let tile of tiles) {
    drawTile(tile.x, tile.y, tile.isTilled, tile.hasCorn, tile.growth, tile.ready);

    if (tile.hasCorn && tile.growth !== null && tile.growth < 100) {
      tile.growth += 0.2;
    } else if (tile.growth >= 100 && !tile.ready) {
      tile.ready = true;
    }

    if (tile.hasCorn && !tile.ready) {
      allReady = false;
    }
  }

  if (allReady && !tractor.active && !tractor.planting) {
    tractor.active = true;
  }

  if (tractor.active || tractor.planting) {
    drawTractor(tractor.x, tractor.y);

    if (frameCount % tractorSpeed === 0) {
      if (tractor.active) {
        moveTractorForward();
        harvestCorn(tractor.x, tractor.y);
      }
    }
  }
}

function drawStars() {
  noStroke();
  fill(255);
  for (let star of stars) {
    ellipse(star.x, star.y, star.size);
  }
}

function drawUnderside() {
  let layers = [
    { color: color(100, 50, 20), size: 400, depth: 20 },
    { color: color(80, 40, 15), size: 300, depth: 60 },
    { color: color(60, 30, 10), size: 200, depth: 100 },
    { color: color(40, 20, 5), size: 100, depth: 140 }
  ];

  for (let i = 0; i < layers.length; i++) {
    let layer = layers[i];
    fill(layer.color);
    beginShape();
    vertex(0, 0);
    vertex(-layer.size / 2, layer.depth);
    vertex(layer.size / 2, layer.depth);
    endShape(CLOSE);
  }

  fill(20, 10, 5);
  beginShape();
  vertex(0, 0);
  vertex(-50, 160);
  vertex(50, 160);
  vertex(0, 200);
  endShape(CLOSE);
}

function drawTile(x, y, isTilled, hasCorn, growth, ready) {
  let isoX = (x - y) * tileSize / 2;
  let isoY = (x + y) * tileSize / 4;

  if (!isTilled) {
    stroke(34, 139, 34);
    strokeWeight(2);
  } else {
    noStroke();
  }

  fill(isTilled ? color(139, 69, 19) : color(85, 170, 85));
  beginShape();
  vertex(isoX, isoY);
  vertex(isoX + tileSize / 2, isoY + tileSize / 4);
  vertex(isoX, isoY + tileSize / 2);
  vertex(isoX - tileSize / 2, isoY + tileSize / 4);
  endShape(CLOSE);

  if (hasCorn) {
    drawCorn(isoX, isoY, growth, ready);
  }
}

function drawCorn(x, y, growth, ready) {
  if (growth < 30) {
    stroke(34, 139, 34);
    strokeWeight(1);
    line(x, y + 5, x, y);
  } else if (growth < 75) {
    stroke(34, 139, 34);
    strokeWeight(2);
    line(x, y + 10, x, y - 5);
    noStroke();
    fill(34, 139, 34);
    triangle(x, y, x - 3, y + 3, x + 3, y + 3);
  } else if (growth < 90) {
    stroke(34, 139, 34);
    strokeWeight(2);
    line(x, y + 10, x, y - 5);
    noStroke();
    fill(34, 139, 34);
    triangle(x, y, x - 3, y + 3, x + 3, y + 3);
    fill(255, 223, 0);
    ellipse(x, y - 10, 5, 10);
  } else {
    stroke(210, 180, 50);
    strokeWeight(3);
    line(x, y + 15, x, y - 10);
    noStroke();
    fill(210, 180, 50);
    triangle(x, y, x - 5, y + 5, x + 5, y + 5);
    fill(255, 223, 0);
    ellipse(x, y - 10, 5, 10);
  }
}

function drawTractor(x, y) {
  let isoX = (x - y) * tileSize / 2;
  let isoY = (x + y) * tileSize / 4;

  fill(0, 128, 0);
  rect(isoX - 10, isoY - 10, 20, 20, 5);

  fill(0);
  ellipse(isoX - 12, isoY + 10, 5, 5);
  ellipse(isoX + 12, isoY + 10, 5, 5);
}

function moveTractorForward() {
  tractor.x += tractor.direction;

  if (tractor.x > gridWidth / 2 || tractor.x < -gridWidth / 2) {
    tractor.direction *= -1;
    tractor.y++;
  }

  if (tractor.y > gridWidth / 2) {
    tractor.active = false;
    tractor.planting = true;
    tractor.y = gridWidth / 2;
    tractor.direction *= -1;
  }
}

function harvestCorn(x, y) {
  for (let tile of tiles) {
    if (tile.x === x && tile.y === y && tile.hasCorn && tile.ready) {
      tile.hasCorn = false;
      tile.growth = null;
      tile.ready = false;
      break;
    }
  }
}
