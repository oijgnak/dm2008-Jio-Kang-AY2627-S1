// DM2008 — Activity 1b [Ryoji Ikeda]
// Learning By Making (30 min)

let x;
let w;
let y;
let z;
let m = "#2ad4bd"
let t = "#e01a2e"

function setup() {
  createCanvas(800, 800);
  background(255);
  noStroke();
}

function draw() {
  background(255, 10);

  fill(m)
  x = random(width);
  w = random(1, 150);
  rect(x, 0, w, height/3.5);
  
  x = random(width);
  rect(x, height/3.5, w, height*2/3);

 fill(t)
  y = random(height)
  z = random(0, 120)
  circle(mouseX, y, z)

  fill(t)
  y = random(height)
  z = random(0, 80)
  circle(x, mouseY, z)
    fill(t)

}


function keyPressed() {
  saveCanvas("activity1b-image", "jpg");
}