// DM2008 — Activity 4b [Guided]
// Objects in Motion (50 min)
//
// You have a working Agent class to start with — your job is to bring it to life.
// Each agent moves, changes over time, and is drawn to the screen.
// Mouse click adds a new agent. C clears them all.
//
// Things to try:
// - Change the starting values (size, speed, color) to see what happens
// - Make agents bounce instead of wrap — what needs to change?
// - Add a second method to your class beyond update() and show()
//
// Stretch: give each agent a lifespan — shrink or fade it over time, then remove it.
// Hint: a backward loop lets you safely splice items while iterating.

let agents = [];
const NUM_START = 12;

function setup() {
  createCanvas(600, 400);
  noStroke();

  for (let i = 0; i < NUM_START; i++) {
    let x = random(144, 456);
    let y = random(144, 256);
    let sz = random(6, 144);
    let speedX = random(-2, 2);
    let speedY = random(-5, 1);
    let dsz = random(-0.5, 0.5)
    agents.push(new Agent(x, y, sz, speedX, speedY, dsz));
  }
}

function draw() {
  background(230);

  for (let i = 0; i < agents.length; i++) {
    agents[i].update();
    agents[i].show();
    agents[i].pulse();
  }
}

function mousePressed() {
  let sz = random(6, 60);
  let speedX = random(-2, 2);
  let speedY = random(-2, 2);
  let dsz = random(-1.5, 1.5)
  agents.push(new Agent(mouseX, mouseY, sz, speedX, speedY, dsz));
}

function keyPressed() {
  // Replacing the array with an empty one effectively clears all agents
  if (key == "C" || key == "c") {
    agents = [];
  }
}

class Agent {
  constructor(x, y, sz, speedX, speedY, dsz) {
    this.x = x;
    this.y = y;
    this.sz = sz;
    this.dx = speedX;
    this.dy = speedY;
    this.col = random(255); 
    this.dsz = dsz;
    // a color value that will change over time
    // What else might your agent need to know about itself?
  }

  update() {
    // Position changes by speed each frame — can you see why?
    this.x += this.dx;
    this.y += this.dy;

    // This is a property changing over time — try changing size or speed instead
    this.col = (this.col + 1) % 255;
    
    // This wraps agents around the edges — could you make them bounce instead?
    if (this.x > width - this.sz*0.5) {
      this.dx = -this.dx
    }
    if (this.x < 0 + this.sz*0.5) {
      this.dx = -this.dx
    }
    if (this.y > height - this.sz*0.5) {
      this.dy = -this.dy
    }
    if (this.y < 0 + this.sz*0.5) {
      this.dy = -this.dy
    }
  }

  show() {
    // this.col drives the color shift — how could you use your other properties here?
    fill(this.col, this.col, 220);
    ellipse(this.x, this.y, this.sz);
  }

  pulse() {
        this.sz = this.sz + this.dsz

    if (this.sz > 150 || this.sz <= 0) {
      this.dsz = - this.dsz
    }

  }
}