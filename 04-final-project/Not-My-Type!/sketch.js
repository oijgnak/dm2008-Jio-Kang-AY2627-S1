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

let typedWord = "";

let orderTemplates = {
  morning: [
    {
      message: "단거 하나",
      requirements: [
        { category: "sweet", count: 1 }
      ]
    }
    ,{
      message: "신거 하나",
      requirements: [
        { category: "sour", count: 1 }
      ]
    }
    ,{
      message: "매운거 하나",
      requirements: [
        { category: "spicy", count: 1 }
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

let currentCustomer;

let reputation = 0;

let customerServed = false;
let customerServedAt = 0;


//---------------------------------------------------------------------------------//

function setup() {
  // If you want a canvas that fills the window
  // use createCanvas(windowWidth, windowHeight)
  createCanvas(960,600);
  rectMode(CENTER);

  let selectOrder = random(orderTemplates.morning);
  currentCustomer = new Customer(selectOrder);

  console.log(currentCustomer);
  console.log(currentCustomer.progress);
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
  
//display typed word
  fill(0);
  textSize(14);
  text("" + typedWord, width/2, height - 100);

//customer lines when served
  if (customerServed === true) {
    fill(0);
    textAlign(CENTER);
    textSize(24);
    text("고마워요!", width / 2, 350);
  } else {
    // display customer order
      //Got help from chatGPT for this part, but I made sure what each line of code does and how it works.

      fill(0);
      textAlign(CENTER);

      textSize(24);
      text(currentCustomer.order.message, width / 2, 350);

      textSize(20);

      let progressY = 390;

      for (let req of currentCustomer.order.requirements) {

        let category = req.category;
        let currentCount = currentCustomer.progress[category];

        text(
          category + ": " + currentCount + " / " + req.count,
          width / 2,
          progressY
        );

        progressY += 30;
      }

      textAlign(LEFT);
  }
  if (customerServed === true && millis() - customerServedAt > 1500) {
    let selectOrder = random(orderTemplates.morning);
    currentCustomer = new Customer(selectOrder);

    customerServed = false;
    customerServedAt = 0;

    typedWord = "";
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
    random(0.5, 1.0)
  );

  ingredients.push(randomWord);
}

//chatGPT helped me with this part(keyTyped), but I made sure what each line of code does.
function keyTyped() {
  if (key.length === 1 && /^[a-z]$/i.test(key)) {
    if (customerServed === true) {
      return;
    }
    typedWord += key.toLowerCase();
  }
}


function keyPressed(event) {

  if (event.key === "Backspace") {
    typedWord = typedWord.slice(0, -1);
    return false;
  }

  if (event.key === "Enter") {

    let matchedIngredient = null;

    for (let i = ingredients.length - 1; i >= 0; i--) {

      if (ingredients[i].word === typedWord) {
        matchedIngredient = ingredients[i];
        ingredients.splice(i, 1);
        break;
      }
    }

    if (matchedIngredient !== null) {

      let isCorrectCategory = false;

      for (let req of currentCustomer.order.requirements) {

        if (
          matchedIngredient.category === req.category &&
          currentCustomer.progress[req.category] < req.count
        ) {

          currentCustomer.progress[req.category]++;
          isCorrectCategory = true;
          break;
        }
      }

      if (isCorrectCategory === false) {
        currentCustomer.timeLeft -= 5;
      }

      if (isCorrectCategory === true) {
        let isOrderComplete = true;

        for (let req of currentCustomer.order.requirements) {
          if (currentCustomer.progress[req.category] < req.count) {
            isOrderComplete = false;
            break;
          }
        }

        if (isOrderComplete === true) {
          reputation++;

          customerServed = true;
          customerServedAt = millis();

          console.log("주문 완료!");
          console.log("평판: " + reputation);
        }
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
    textSize(20);
    text(this.word, this.x, this.y);
  }
}

//customer order and timer mechanics
class Customer {
  constructor(order) {
    this.order = order;
    this.progress = {};
    for (let req of order.requirements) {
      this.progress[req.category] = 0;
    }
    this.timeLeft = 20;
    this.spriteId = floor(random(3));
    this.isSpecial = false;
  }
}