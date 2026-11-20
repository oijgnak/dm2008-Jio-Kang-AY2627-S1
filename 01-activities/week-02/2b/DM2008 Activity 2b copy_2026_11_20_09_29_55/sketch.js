// DM2008 — Activity 2b
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating pattern of shapes.
// Add a condition to introduce variation, and one interaction that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

let numLines = 5;
let spacing;

function setup() {
  createCanvas(400, 400);
  spacing = width/numLines;
}
 
function draw() {
  background(220, 10);

  for (let i = 0; i < numLines + 1; i++) {
    line(i * spacing, 0, mouseX, mouseY);
    line(0, i * spacing, mouseX, mouseY);
    line(i * spacing, 400, mouseX, mouseY);
    line(400, i * spacing, mouseX, mouseY);
  }
}

function mousePressed() {
  numLines = numLines + 10;
  spacing = width / numLines;
}

function keyPressed() {
  numLines = numLines - 10;
  spacing = width / numLines;
}