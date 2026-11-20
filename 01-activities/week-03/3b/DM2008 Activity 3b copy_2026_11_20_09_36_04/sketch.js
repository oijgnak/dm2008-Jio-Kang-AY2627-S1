// DM2008 — Activity 3b
// One Function Wonder (30 min)
//
// Write a function that draws a shape or group of shapes.
// It should take at least one parameter — try x, y, size, or color.
// Call it several times with different values to create variation.
//
// Ideas: a simple face, a flower, a house, an icon.
// Example: myShape(100, 200, 50); myShape(300, 200, 80);
//
// Stretch: call your function inside a for loop to create a repeating pattern.

let angle = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
    if (mouseIsPressed === true) {
    return;
  }
  push();
  background("#fff68f");
  rotateShape(0)
  rotateShape(20)
  rotateShape(40)
  rotateShape(60)
  rotateShape(80)
  rotateShape(100)
  rotateShape(120)
  rotateShape(140)
  rotateShape(160)
  rotateShape(180)
  rotateShape(200)
  rotateShape(220)
  rotateShape(240)
  rotateShape(260)
  rotateShape(280)
  rotateShape(300)
  rotateShape(320)
  rotateShape(340)
  angle += 0.02;
  pop();  // Call your function here with different values each time
  } 

// Define your function outside draw()
// It can be called from anywhere in your sketch

function myShape(x, y, w, h) {
  noStroke()
  fill("#37c4bb")
  ellipse(x, y, w, h);
  ellipse(y, x, h, w);
  ellipse(400-x, 400-y, w, h);
  ellipse(400-y, 400-x, h, w);
}

function rotateShape(a) {
  translate(mouseX, mouseY); 
  rotate(angle+a); 
  myShape(0, 0, random(300), random(300));
}