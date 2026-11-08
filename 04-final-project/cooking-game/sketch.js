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


let typedWord = "";

let orderTemplates = {
  morning: [
    {
      message: "달콤한 거 두 개 주세요!",
      requirements: [
        { category: "sweet", count: 2 }
      ]
    }
  ],

  lunch: [
    {
      message: "시큼한 거 두 개랑 매운 거 하나 주세요!",
      requirements: [
        { category: "sour", count: 2 },
        { category: "spicy", count: 1 }
      ]
    }
  ],

  evening: [
    {
      message: "달콤한 거 두 개랑 고기 두 개 주세요!",
      requirements: [
        { category: "sweet", count: 2 },
        { category: "meat", count: 2 }
      ]
    }
  ],

  special: [
  {
    message: "매운 걸 다섯 개 내놔!!!!!!!!",
    requirements: [
      { category: "spicy", count: 5 }
    ]
  }
  ]
};

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

//falling ingredients and typing mechanics
  if (frameCount % 30 === 0) {
    spawnIngredient();  
  } 


  for (let i = ingredients.length - 1; i >= 0; i--) {

  ingredients[i].update();
  ingredients[i].display();

    if (ingredients[i].y > height - 300) {
    ingredients.splice(i, 1);
    }
  }
  

  fill(0);
  textSize(28);
  text("" + typedWord, width/2, height - 100);

  //customer order and timer mechanics
  
}

function keyTyped() {
  if (key.length === 1 && /^[a-z]$/i.test(key)) {
    typedWord += key.toLowerCase();
  }
}

function keyPressed(event) {

  if (event.key === "Backspace") {
    typedWord = typedWord.slice(0, -1);
    return false;
  }

  if (event.key === "Enter") {

    for (let i = ingredients.length - 1; i >= 0; i--) {
      if (ingredients[i].word === typedWord) {
        ingredients.splice(i, 1);
        break;
      }
    }

    typedWord = "";
    return false;
  }
}

//customer order and timer mechanics


//---------------------------------------------------------------------------------//

//falling ingredients and typing mechanics
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

function spawnIngredient() {
  let randomCategory = random(ingredientGroups);
  let selectedWord = random(randomCategory.words);

  let sameWordCount = 0;

  for (let ingredient of ingredients) {
    if (ingredient.word === selectedWord) {
      sameWordCount++;
    }
  }

  if (sameWordCount >= 2) {
    return;
  }

  let randomWord = new IngredientWord(
    selectedWord,
    randomCategory.category,
    random(100, width - 100),
    100,
    random(0.5, 1.5)
  );

  ingredients.push(randomWord);
}

//customer order and timer mechanics
class Customer {
  constructor(order) {
    this.order = order;
    this.progress = {};
    this.timeLeft = 20;
    this.spriteId = floor(random(3));
    this.isSpecial = false;
  }
}