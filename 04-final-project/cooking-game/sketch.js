let honeyX;
let honeyY = 100;
// let honeySpeed;

let honey;

//---------------------------------------------------------------------------------//

function setup() {
  // If you want a canvas that fills the window
  // use createCanvas(windowWidth, windowHeight)
  createCanvas((10/7) * windowHeight, windowHeight);
  rectMode(CENTER);

  honeyX = random(100, width-100);
  // honeySpeed = random(0.4, 1.2);

  honey = new IngredientWord("honey", "sweet", honeyX, 100, 10);
}

//---------------------------------------------------------------------------------//

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

  honey.update();
  honey.display();
}

//---------------------------------------------------------------------------------//

class IngredientWord {
  constructor(word, category, x, y, speed) {
    this.word = word;
    this.category = category;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(255, 204, 0);
    textSize(32);
    text(this.word, this.x, this.y);
  }
}