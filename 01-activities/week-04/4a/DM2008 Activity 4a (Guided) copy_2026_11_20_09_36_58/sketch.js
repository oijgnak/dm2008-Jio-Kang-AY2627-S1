// DM2008 — Activity 4a [Guided]
// Bake a Cookie (30 min)
//
// A class is a blueprint — Cookie describes what every cookie has and can do.
// Your job is to complete the class, then add movement and a flavor randomizer.
//
// Suggested order:
// 1. Add the missing properties to the constructor (sz, x, y)
// 2. Fix show() so it uses this.flavor, this.x, this.y, this.sz
// 3. Implement move() and randomFlavor()
// 4. Wire them up in keyPressed() and mousePressed()
//
// Stretch: add a second cookie with different starting values.

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  rectMode(CENTER)
  cookie = new Cookie("matcha", 160, width / 2, height / 2);
}

function draw() {
  background(230);
  cookie.show();
}

class Cookie {
  constructor(flavor, sz, x, y) {
    // this. binds each value to this specific cookie object
    // Add the missing properties below
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
  }

  show() {
    // Fix this method — it should use this.flavor, this.x, this.y, this.sz
    switch (this.flavor) {
      case "chocolate":
        fill(196, 146, 96);
        break;
      case "gingerbread":
        fill("#cb864d");
        break;
      case "matcha":
        fill("#70794e");
        break;
      default:
        fill(220, 180, 120);
    }
    ellipse(this.x, this.y, this.sz);
    switch (this.flavor){
      case "chocolate":
        fill("#8f5656")
        square(this.x - this.sz*0.22, this.y - this.sz*0.15, this.sz*0.1);
        square(this.x + this.sz*0.18, this.y - this.sz*0.10, this.sz*0.1);
        square(this.x - this.sz*0.05, this.y + this.sz*0.12, this.sz*0.07);
        square(this.x - this.sz*0.2, this.y + this.sz*0.22, this.sz*0.07);
        square(this.x + this.sz*0.20, this.y + this.sz*0.18, this.sz*0.15);
        break;
      case "gingerbread":
        push()
      fill("#cb864d")
        ellipse(this.x - this.sz*0.5, this.y - this.sz*0.2, this.sz*0.5);
        ellipse(this.x + this.sz*0.5, this.y - this.sz*0.2, this.sz*0.5);
        ellipse(this.x - this.sz*0.22, this.y + this.sz*0.28, this.sz*0.6, this.sz);
        ellipse(this.x + this.sz*0.22, this.y + this.sz*0.28, this.sz*0.6, this.sz);      
        ellipse(this.x, this.y - this.sz*0.65, this.sz*0.9);
      fill("#f1eee9")
        ellipse(this.x - this.sz*0.2, this.y - this.sz*0.7, this.sz*0.1);
        ellipse(this.x + this.sz*0.2, this.y - this.sz*0.7, this.sz*0.1);
      fill("#6d1818") 
        ellipse(this.x, this.y - this.sz*0.2, this.sz*0.12);
        ellipse(this.x, this.y, this.sz*0.12);
        ellipse(this.x, this.y + this.sz*0.2, this.sz*0.12);
        noFill();
        stroke("#db0000");
        strokeWeight(this.sz*0.05);
        arc(this.x, this.y - this.sz*0.58, 80, 40, 0, PI);
        pop()
        break;
      case "matcha":
        fill("#f8f3e3")
        ellipse(this.x - this.sz*0.18, this.y - this.sz*0.3, this.sz*0.13);
        square(this.x + this.sz*0.05, this.y - this.sz*0.10, this.sz*0.11);
        ellipse(this.x - this.sz*0.2, this.y + this.sz*0.12, this.sz*0.12);
        square(this.x - this.sz*0.3, this.y + this.sz*0.22, this.sz*0.09);
        square(this.x + this.sz*0.22, this.y + this.sz*0.18, this.sz*0.18);
        break;
    }
  }

  // Add a move() method — update this.x or this.y based on which key is pressed
  move() {
    if(key == "x"){
      this.x = random(this.sz*0.5, width-this.sz*0.5)
    }
    if(key == "y"){
      this.y = random(this.sz*0.5, height-this.sz*0.5)
    }

  }

  // Add a randomFlavor() method — set this.flavor to one of at least 3 options
  randomFlavor() {
  const flavors = ["chocolate", "gingerbread", "matcha"];
    this.flavor = random(flavors);
  }
}

// Call cookie.move() when an arrow key is pressed
function keyPressed() {
    cookie.move();
}

// Call cookie.randomFlavor() when the mouse is clicked
function mousePressed() {
    cookie.randomFlavor();
}