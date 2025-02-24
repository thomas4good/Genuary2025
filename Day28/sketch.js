let roadWidth = 300;
let laneMarkerSpacing = 40;
let laneMarkers = [];
let car;
let sideObjects = [];
let speed = 5;

function setup() {
  createCanvas(800, 800);
  noStroke();

  // Initialize lane markers
  for (let i = 0; i < height / laneMarkerSpacing + 2; i++) {
    laneMarkers.push(new LaneMarker(i * laneMarkerSpacing));
  }

  // Generate roadside objects (trees, poles, fences)
  for (let i = 0; i < 10; i++) {
    sideObjects.push(new RoadsideObject(i * 200));
  }

  // Create the car
  car = new Car(width / 2, height - 150);
}

function draw() {
  background(30);

  // Create road perspective effect
  drawRoad();

  // Update lane markers
  fill(255);
  for (let marker of laneMarkers) {
    marker.update();
    marker.display();
  }

  // Update roadside objects
  for (let obj of sideObjects) {
    obj.update();
    obj.display();
  }

  // Draw the car
  car.display();
}

// **Perspective Road with Sidewalks**
function drawRoad() {
  fill(50);
  quad(width / 2 - roadWidth / 1.5, 0, width / 2 + roadWidth / 1.5, 0,
       width / 2 + roadWidth / 2, height, width / 2 - roadWidth / 2, height);

  // Sidewalks
  fill(100);
  rect(0, 0, width / 2 - roadWidth / 1.5, height);
  rect(width / 2 + roadWidth / 1.5, 0, width / 2 - roadWidth / 1.5, height);
}

// **Lane Markers for Infinite Scrolling**
class LaneMarker {
  constructor(y) {
    this.x = width / 2;
    this.y = y;
    this.width = 8;
    this.height = 30;
  }

  update() {
    this.y += speed; // Move lane markers downward

    // Reset lane marker to loop infinitely
    if (this.y > height) {
      this.y = -this.height;
    }
  }

  display() {
    rect(this.x - this.width / 2, this.y, this.width, this.height);
  }
}

// **Roadside Objects for Depth Illusion**
class RoadsideObject {
  constructor(y) {
    this.y = y;
    this.xLeft = width / 2 - roadWidth / 1.5 - 30;
    this.xRight = width / 2 + roadWidth / 1.5 + 10;
    this.type = int(y / 200) % 2; // Alternate between trees and poles
  }

  update() {
    this.y += speed;

    if (this.y > height) {
      this.y = -50;
    }
  }

  display() {
    fill(80, 200, 80); // Tree color
    if (this.type == 0) {
      ellipse(this.xLeft, this.y, 30, 50);
      ellipse(this.xRight, this.y, 30, 50);
    } else {
      fill(150);
      rect(this.xLeft - 5, this.y, 10, 40);
      rect(this.xRight - 5, this.y, 10, 40);
    }
  }
}

// **Car Object (More Realistic)**
class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 120;
  }

  display() {
    fill(200, 0, 0); // Car body
    rect(this.x - this.width / 2, this.y, this.width, this.height, 10);
    
    // Windshield & Windows
    fill(100);
    rect(this.x - this.width / 3, this.y + 20, this.width / 1.5, this.height / 3, 5);
    
    // Headlights
    fill(255, 255, 180);
    ellipse(this.x - this.width / 2 + 10, this.y + 10, 10, 10);
    ellipse(this.x + this.width / 2 - 10, this.y + 10, 10, 10);
    
    // Wheels
    fill(0);
    rect(this.x - this.width / 2, this.y + 15, 12, 20);
    rect(this.x + this.width / 2 - 12, this.y + 15, 12, 20);
    rect(this.x - this.width / 2, this.y + this.height - 35, 12, 20);
    rect(this.x + this.width / 2 - 12, this.y + this.height - 35, 12, 20);
  }
}
