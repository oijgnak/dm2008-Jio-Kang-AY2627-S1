let wordX;

let honey;

let sweet = ["honey", "sugar", "candy", "syrup", "molasses"];
let spicy = ["chilli", "pepper", "wasabi", "jalapeno", "sambal"];
let sour = ["lemon", "lime", "vinegar", "pickle", "kimchi"];
let veggie = ["carrot", "broccoli", "spinach", "lettuce", "zucchini"];
let meat = ["chicken", "beef", "pork", "lamb", "duck"];

let ingredientGroups = [
  { category: "sweet", words: sweet },
  { category: "spicy", words: spicy },
  { category: "sour", words: sour },
  { category: "veggie", words: veggie },
  { category: "meat", words: meat }
];

let ingredients = [];

let randomWord;
let randomCategory;

//---------------------------------------------------------------------------------//

function setup() {
  // If you want a canvas that fills the window
  // use createCanvas(windowWidth, windowHeight)
  createCanvas((10/7) * windowHeight, windowHeight);
  rectMode(CENTER);

  wordX = random(100, width-100);
}

//---------------------------------------------------------------------------------//

function draw() {
  background(255);

  if (frameCount % 60 === 0) {
    spawnIngredient();
  }

  for (let ingredient of ingredients) {
  ingredient.update();
  ingredient.display();

}
}


function spawnIngredient() {
  randomCategory = random(ingredientGroups);
  randomWord = new IngredientWord(random(randomCategory.words),randomCategory.category,random(100, width - 100), 100, random(0.5, 1.5));
  ingredients.push(randomWord);
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