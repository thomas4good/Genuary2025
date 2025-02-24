let sphereDetail = 12; // Level of detail for the sphere
let rotationX = 0; // Rotation angle around X-axis
let rotationY = 0; // Rotation angle around Y-axis
let baseColors; // Static palette for gradients
let transitionSpeed = 0.001; // Speed of color transition
let time = 0; // Global time for color interpolation

function setup() {
  createCanvas(800, 800, WEBGL);
  noStroke();

  // Define a static palette for gradients
  baseColors = [
    color(100, 150, 255), // Soft blue
    color(255, 200, 100), // Soft orange
    color(150, 255, 150), // Soft green
    color(255, 150, 200), // Soft pink
  ];
}

function draw() {
  background(20);

  // Increment time for gradual color transitions
  time += transitionSpeed;

  // Rotate the sphere
  rotateX(rotationX);
  rotateY(rotationY);

  // Draw the sphere with gradients
  let index = 0; // Index for per-triangle offsets
  for (let i = 0; i < sphereDetail; i++) {
    for (let j = 0; j < sphereDetail; j++) {
      let theta1 = map(i, 0, sphereDetail, 0, TWO_PI);
      let theta2 = map(i + 1, 0, sphereDetail, 0, TWO_PI);
      let phi1 = map(j, 0, sphereDetail, 0, PI);
      let phi2 = map(j + 1, 0, sphereDetail, 0, PI);

      // Vertices of the triangles
      let v1 = sphericalToCartesian(200, theta1, phi1);
      let v2 = sphericalToCartesian(200, theta2, phi1);
      let v3 = sphericalToCartesian(200, theta1, phi2);
      let v4 = sphericalToCartesian(200, theta2, phi2);

      // Offset each triangle's color transition using its index
      let offset = index * 0.05; // Offset based on triangle index
      let c1 = lerpColor(baseColors[0], baseColors[1], (sin(time + offset) * 0.5) + 0.5);
      let c2 = lerpColor(baseColors[2], baseColors[3], (cos(time + offset) * 0.5) + 0.5);

      // Draw gradient glow and main triangle
      drawGradientGlowTriangle(v1, v2, v3, c1, c2, 1.5); // Slightly larger glow
      drawGradientTriangle(v1, v2, v3, c1, c2); // Main triangle

      drawGradientGlowTriangle(v2, v3, v4, c1, c2, 1.5);
      drawGradientTriangle(v2, v3, v4, c1, c2);

      index++; // Increment triangle index
    }
  }

  // Increment rotation angles
  rotationX += 0.01;
  rotationY += 0.01;
}

// Convert spherical coordinates to Cartesian
function sphericalToCartesian(radius, theta, phi) {
  let x = radius * sin(phi) * cos(theta);
  let y = radius * sin(phi) * sin(theta);
  let z = radius * cos(phi);
  return createVector(x, y, z);
}

// Draw a triangle with a gradient fill
function drawGradientTriangle(v1, v2, v3, c1, c2) {
  beginShape(TRIANGLES);

  // Assign vertex colors for the gradient
  fill(lerpColor(c1, c2, 0.0));
  vertex(v1.x, v1.y, v1.z);

  fill(lerpColor(c1, c2, 0.5));
  vertex(v2.x, v2.y, v2.z);

  fill(lerpColor(c1, c2, 1.0));
  vertex(v3.x, v3.y, v3.z);

  endShape(CLOSE);
}

// Draw a larger, semi-transparent triangle for glow
function drawGradientGlowTriangle(v1, v2, v3, c1, c2, scale) {
  push();
  beginShape(TRIANGLES);

  // Semi-transparent fill for the glow
  fill(lerpColor(c1, c2, 0.0), 50);
  vertex(v1.x * scale, v1.y * scale, v1.z * scale);

  fill(lerpColor(c1, c2, 0.5), 50);
  vertex(v2.x * scale, v2.y * scale, v2.z * scale);

  fill(lerpColor(c1, c2, 1.0), 50);
  vertex(v3.x * scale, v3.y * scale, v3.z * scale);

  endShape(CLOSE);
  pop();
}
