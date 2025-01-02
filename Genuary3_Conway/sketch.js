let cols, rows, grid, next; // Grid dimensions and state
let res = 10; // Cell size in pixels
let updateInterval = 10; // Frames between updates
let frameCounter = 0; // Frame counter to slow down simulation
function setup() {
  createCanvas(420, 420);
  cols = width / res;
  rows = height / res;
  grid = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => (random() > 0.3 ? -1 : 1)) // Some alive, most uninitialized
  );}
function draw() {
  background(30);
  if (frameCounter % updateInterval === 0) {
    next = grid.map((col, x) =>
      col.map((cell, y) => {
        if (cell === -1) return -1; // Skip uninitialized cells
        let sum = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            let nx = (x + i + cols) % cols;
            let ny = (y + j + rows) % rows;
            sum += grid[nx][ny] > 0 ? 1 : 0; // Count neighbors
          }}
        sum -= cell > 0 ? 1 : 0; // Exclude the cell itself
        return (sum === 3 || (cell > 0 && sum === 2)) ? 1 : 0; // Apply rules
      }));
    grid = next.map((col, x) =>
      col.map((cell, y) => (cell === -1 && random() > 0.99 ? 1 : cell))
    );}
  grid.forEach((col, x) =>
    col.forEach((cell, y) => {
      let dying = grid[x][y] > 0 && next[x][y] === 0;
      let colorCode = cell === -1 ? color(50, 50, 50) :  // Uninitialized (dark gray)
                      dying ? color(255, 100, 100) :     // Dying (red)
                      cell > 0 ? color(200, 100, 200) :  // Alive (purple)
                      color(120);                       // Dead (light gray)
      fill(colorCode);
      stroke(50);
      rect(x * res, y * res, res, res);
    }));
  frameCounter++;}
