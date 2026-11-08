let honeyX;
let honeyY = 100;
// let honeySpeed;

function setup() {
  // If you want a canvas that fills the window
  // use createCanvas(windowWidth, windowHeight)
  createCanvas((10/7) * windowHeight, windowHeight);
  rectMode(CENTER);

  honeyX = random(100, width-100);
  // honeySpeed = random(0.4, 1.2);
}

function draw() {
  background(255);

  if (honeyY > height-300) {
    honeyY = 100;
    honeyX = random(100, width-100);
  }

  fill(255, 204, 0);
  textSize(32);
  text("honey", honeyX, honeyY);
  honeyY += 10;
}
