let wordX;
// let wordSpeed;

let honey;

let sweet = ["honey", "sugar", "candy", "syrup", "molasses"];
let spicy = ["chilli", "pepper", "wasabi", "jalapeno", "sambal"];
let sour = ["lemon", "lime", "vinegar", "pickle", "kimchi"];
let veggie = ["carrot", "broccoli", "spinach", "lettuce", "zucchini"];
let meat = ["chicken", "beef", "pork", "lamb", "duck"];

let ingredients = [];

let randomWord;

//---------------------------------------------------------------------------------//

function setup() {
  // If you want a canvas that fills the window
  // use createCanvas(windowWidth, windowHeight)
  createCanvas((10/7) * windowHeight, windowHeight);
  rectMode(CENTER);

  wordX = random(100, width-100);
  // wordSpeed = random(0.4, 1.2);

  // honey = new IngredientWord("honey", "sweet", random(100, width-100), 100, 10);
  // ingredients.push(honey);
  // chilli = new IngredientWord("chilli", "spicy", random(100, width-100), 100, 10);
  // ingredients.push(chilli);
  // lemon = new IngredientWord("lemon", "sour", random(100, width-100), 100, 10);
  // ingredients.push(lemon);

  randomWord = new IngredientWord(random(sweet), "sweet", random(100, width-100), 100, 10);
  ingredients.push(randomWord);

  randomWord = random(sweet);
}

//---------------------------------------------------------------------------------//

function draw() {
  background(255);

  for (let ingredient of ingredients) {
  ingredient.update();
  ingredient.display();
}
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