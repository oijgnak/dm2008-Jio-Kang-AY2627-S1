let backgrounds = {};
let customerSprites = [];
let computerFronts = {};

let sweet = ["honey", "sugar", "candy", "syrup", "caramel"];
let spicy = ["chilli", "curry", "wasabi", "sambal", "jalapeno"];
let sour = ["lemon", "lime", "vinegar", "pickle", "sourkraut"];
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

function makeOrder(message, counts) {
  let requirements = [];

  for (let category in counts) {
    requirements.push({
      category: category,
      count: counts[category]
    });
  }

  return {
    message: message,
    requirements: requirements
  };
}

let orderTemplates = {

  // MORNING: 3 categories, 1-2 ingredients
  morning: [
    makeOrder("something sweet\nplease!", {sweet:1}),
    makeOrder("something sour\nplease!", {sour:1}),
    makeOrder("something spicy\nplease!", {spicy:1}),
    makeOrder("a sweet bite\nplease!", {sweet:1}),
    makeOrder("feeling sour\ntoday!", {sour:1}),
    makeOrder("one spicy bite\nfor me!", {spicy:1}),

    makeOrder("two sweets\nplease!", {sweet:2}),
    makeOrder("two sour bites\nplease!", {sour:2}),
    makeOrder("extra spicy!\ntwo please!", {spicy:2}),
    makeOrder("sweet and sour\nplease!", {sweet:1,sour:1}),
    makeOrder("sweet and spicy\nplease!", {sweet:1,spicy:1}),
    makeOrder("sour and spicy\nplease!", {sour:1,spicy:1}),

    makeOrder("I love sugar!\none sweet", {sweet:1}),
    makeOrder("a tangy snack!\none sour", {sour:1}),
    makeOrder("I need a kick!\none spicy", {spicy:1}),
    makeOrder("double sweet!\nthank you!", {sweet:2}),
    makeOrder("double sour!\nthank you!", {sour:2}),
    makeOrder("double spicy!\nthank you!", {spicy:2}),

    makeOrder("sweet and tangy\nsounds good!", {sweet:1,sour:1}),
    makeOrder("hot and sweet\nplease!", {spicy:1,sweet:1}),
    makeOrder("hot and sour\nplease!", {spicy:1,sour:1}),
    makeOrder("a little treat!\nsweet please", {sweet:1}),
    makeOrder("keep it tangy!\nsour please", {sour:1}),
    makeOrder("make it fiery!\nspicy please", {spicy:1})
  ],

  // LUNCH: 4 categories, 2-3 ingredients
  lunch: [
    makeOrder("two sweets\nplease!", {sweet:2}),
    makeOrder("two sour bites\nplease!", {sour:2}),
    makeOrder("two spicy bites\nplease!", {spicy:2}),
    makeOrder("two veggies\nplease!", {veggie:2}),

    makeOrder("sweet and sour\nplease!", {sweet:1,sour:1}),
    makeOrder("sweet and spicy\nplease!", {sweet:1,spicy:1}),
    makeOrder("sweet and veggie\nplease!", {sweet:1,veggie:1}),
    makeOrder("sour and spicy\nplease!", {sour:1,spicy:1}),
    makeOrder("sour and veggie\nplease!", {sour:1,veggie:1}),
    makeOrder("spicy and veggie\nplease!", {spicy:1,veggie:1}),

    makeOrder("triple sweet!\nplease!", {sweet:3}),
    makeOrder("three sour bites\nplease!", {sour:3}),
    makeOrder("triple spicy!\nplease!", {spicy:3}),
    makeOrder("three veggies\nplease!", {veggie:3}),

    makeOrder("two sweets\nand one sour", {sweet:2,sour:1}),
    makeOrder("two sweets\nand one spicy", {sweet:2,spicy:1}),
    makeOrder("two sweets\nand one veggie", {sweet:2,veggie:1}),
    makeOrder("two sour\nand one sweet", {sour:2,sweet:1}),
    makeOrder("two sour\nand one spicy", {sour:2,spicy:1}),
    makeOrder("two sour\nand one veggie", {sour:2,veggie:1}),

    makeOrder("two spicy\nand one sweet", {spicy:2,sweet:1}),
    makeOrder("two spicy\nand one veggie", {spicy:2,veggie:1}),
    makeOrder("two veggies\nand one sour", {veggie:2,sour:1}),
    makeOrder("sweet, sour,\nand spicy!", {sweet:1,sour:1,spicy:1})
  ],

  // EVENING: 5 categories, 3-4 ingredients
  evening: [
    makeOrder("two sweets\nand one meat", {sweet:2,meat:1}),
    makeOrder("two spicy\nand one meat", {spicy:2,meat:1}),
    makeOrder("two sour\nand one meat", {sour:2,meat:1}),
    makeOrder("two veggies\nand one meat", {veggie:2,meat:1}),
    makeOrder("two meats\nand one veggie", {meat:2,veggie:1}),
    makeOrder("two meats\nand one sour", {meat:2,sour:1}),
    makeOrder("two meats\nand one spicy", {meat:2,spicy:1}),
    makeOrder("two sweets\nand one veggie", {sweet:2,veggie:1}),
    makeOrder("two sour\nand one spicy", {sour:2,spicy:1}),
    makeOrder("two veggies\nand one sweet", {veggie:2,sweet:1}),

    makeOrder("sweet, sour\nand meat!", {sweet:1,sour:1,meat:1}),
    makeOrder("spicy, veggie\nand meat!", {spicy:1,veggie:1,meat:1}),
    makeOrder("sweet, spicy\nand veggie!", {sweet:1,spicy:1,veggie:1}),
    makeOrder("sour, veggie\nand meat!", {sour:1,veggie:1,meat:1}),
    makeOrder("sweet, sour\nand spicy!", {sweet:1,sour:1,spicy:1}),

    makeOrder("two sweets\nand two meats!", {sweet:2,meat:2}),
    makeOrder("two sour\nand two spicy!", {sour:2,spicy:2}),
    makeOrder("two veggies\nand two meats!", {veggie:2,meat:2}),
    makeOrder("two spicy\nand two veggies!", {spicy:2,veggie:2}),
    makeOrder("two sweets\nand two sour!", {sweet:2,sour:2}),

    makeOrder("2 sweet, 1 spicy\nand 1 meat!", {sweet:2,spicy:1,meat:1}),
    makeOrder("2 spicy, 1 meat\nand 1 veggie!", {spicy:2,meat:1,veggie:1}),
    makeOrder("2 sour, 1 meat\nand 1 veggie!", {sour:2,meat:1,veggie:1}),
    makeOrder("sweet, sour,\nveggie and meat!", {sweet:1,sour:1,veggie:1,meat:1})
  ]

};

let currentCustomer;

let reputation = 1;

let gameState = "title";
let endReason = "";

let customerServed = false;
let customerServedAt = 0;
let customerFailed = false;

let ThankYouMessages = ["Thank you!", "Thanks!", "Yum!", "Delicious!", "It's just \nmy type!"];

let gameElapsedSeconds = 0;
let gameMinutes = 9 * 60;

let coinImage;
let bottomCoinImage;

let gameFont;

//---------------------------------------------------------------------------------//


async function setup() {
  createCanvas(960, 600);
  rectMode(CENTER);
  noSmooth();

  // Backgrounds
  backgrounds.morning = await loadImage("assets/morning.png");
  backgrounds.lunch = await loadImage("assets/lunch.png");
  backgrounds.evening = await loadImage("assets/evening.png");

  // Customer sprites
  customerSprites = [
    {
      happy: await loadImage("assets/a_happy.png"),
      neutral: await loadImage("assets/a_neutral.png"),
      angry: await loadImage("assets/a_angry.png")
    },
    {
      happy: await loadImage("assets/b_happy.png"),
      neutral: await loadImage("assets/b_neutral.png"),
      angry: await loadImage("assets/b_angry.png")
    },
    {
      happy: await loadImage("assets/c_happy.png"),
      neutral: await loadImage("assets/c_neutral.png"),
      angry: await loadImage("assets/c_angry.png")
    }
  ];

  // Coin
  coinImage = await loadImage("assets/coin.png");

  computerFronts.morning = await loadImage("assets/computer_morning.png");
  computerFronts.lunch = await loadImage("assets/computer_lunch.png");
  computerFronts.evening = await loadImage("assets/computer_evening.png");

  gameFont = await loadFont("assets/Galmuri11.ttf");
  textFont(gameFont); 

  bottomCoinImage = await loadImage("assets/coin_bottom.png");
}

//---------------------------------------------------------------------------------//

function draw() {
  background(255);

   if (gameState === "title") {
    drawTitleScreen();
    return;
  }

  if (gameState === "result") {
    drawResultScreen();
    return;
  }

  gameElapsedSeconds += deltaTime / 1000;

  let quarterHoursPassed = floor(gameElapsedSeconds / 3.75);

  gameMinutes = min(
    9 * 60 + quarterHoursPassed * 15,
    21 * 60
  );

  let currentBackground;

if (gameMinutes < 12 * 60) {
  currentBackground = backgrounds.morning;
} else if (gameMinutes < 16 * 60) {
  currentBackground = backgrounds.lunch;
} else {
  currentBackground = backgrounds.evening;
}

console.log("배경 이미지 목록:", backgrounds);
console.log("현재 배경:", currentBackground);

image(currentBackground, 0, 0, width, height);

  floor(gameElapsedSeconds / 5);

  if (customerServed === false && customerFailed === false) {
    currentCustomer.timeLeft -= deltaTime / 1000;

    if (currentCustomer.timeLeft <= 0) {
      currentCustomer.timeLeft = 0;
      customerFailed = true;
      customerServedAt = millis();

      reputation--;
    }
  }

  if (reputation <= 0 || gameElapsedSeconds >= 180) {
  endReason = reputation <= 0 ? "reputation" : "closing";
  gameState = "result";
  return;
}

  let hour24 = floor(gameMinutes / 60);
  let minute = gameMinutes % 60;

  let hour12 = hour24 % 12;

  if (hour12 === 0) {
    hour12 = 12;
  }

  let period = hour24 >= 12 ? "PM" : "AM";

  let clockText =
    hour12 + ":" + nf(minute, 2) + " " + period;

  push();

  textAlign(CENTER, CENTER);
  textSize(24);
  fill(255, 73, 64);

  text(clockText, 832, 47);

  pop();

  textAlign(LEFT);

//falling ingredients and typing mechanics
  if (frameCount % 30 === 0) {
    spawnIngredient();  
  } 

  for (let i = ingredients.length - 1; i >= 0; i--) {

  ingredients[i].update();
  ingredients[i].display();

    if (ingredients[i].y > height - 200) {
    ingredients.splice(i, 1);
    }
  }


  let currentComputer;

  if (gameMinutes < 12 * 60) {
    currentComputer = computerFronts.morning;
  } else if (gameMinutes < 16 * 60) {
    currentComputer = computerFronts.lunch;
  } else {
    currentComputer = computerFronts.evening;
  }

  image(currentComputer, 0, 0, width, height);

  
//display typed word
  push();

  fill(96, 255, 10);
  textAlign(CENTER, CENTER);
  textSize(22);

  text(typedWord, 750, 420);

  pop();

//customer lines when served
  
if (customerServed === true || customerFailed === true) {

  let message;

  if (customerServed === true) {
    message = currentCustomer.thankYouMessage;
  } else {
    message = "It's taking\ntoo long!";
  }

  push();

  rectMode(CORNER);
  fill(255);
  textAlign(CENTER, TOP);
  textWrap(CHAR);
  textSize(16);

  text(message, 70, 72, 180, 78);

  pop();

} else {

  // 주문 내용
  fill(255);
  textAlign(CENTER, TOP);
  textSize(18);

  
  let orderMessage = currentCustomer.order.message;
 
  push();

  rectMode(CORNER);
  fill(255);
  textAlign(CENTER, TOP);
  textWrap(CHAR);

  // 주문 길이에 따라 글씨 크기 조절
  let orderFontSize = 16;

  if (orderMessage.length > 40) {
    orderFontSize = 13;
  }

  if (orderMessage.length > 65) {
    orderFontSize = 11;
  }

  textSize(orderFontSize);
  textLeading(orderFontSize * 1.3);

  // 왼쪽 모니터 내부에 주문 표시
  text(orderMessage, 70, 72, 180, 78);

  pop();


  // 주문 진행도
  textAlign(CENTER);
  textSize(17);

  let progressText = "";

  for (let req of currentCustomer.order.requirements) {
    let currentCount = currentCustomer.progress[req.category];

    progressText += currentCount + "/" + req.count + "   ";
  }

  progressText = progressText.trim();

  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(17);

  text(progressText, 160, 167);

  pop();
}

textAlign(LEFT);

  
let expression;

if (customerServed === true) {
  expression = "happy";
} else if (customerFailed === true) {
  expression = "angry";
} else {
  expression = currentCustomer.getExpression();
}

let sprite = customerSprites[currentCustomer.spriteId][expression];

image(sprite, 0, 0, width, height);

  if ((customerServed === true || customerFailed === true) && millis() - customerServedAt > 1500) {
    spawnCustomer();

    customerServed = false;
    customerFailed = false;
    customerServedAt = 0;

    typedWord = "";
  }

  image(bottomCoinImage, 0, 0, width, height);

  for (let i = 0; i < reputation - 1; i++) {
  image(coinImage, 0, -i * 10, width, height);
}
}

function spawnIngredient() {
  let availableGroups;

  if (gameMinutes < 12 * 60) {
    availableGroups = ingredientGroups.slice(0, 3);
  } else if (gameMinutes < 16 * 60) {
    availableGroups = ingredientGroups.slice(0, 4);
  } else {
    availableGroups = ingredientGroups;
  }

  let randomCategory = random(availableGroups);
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
    random(320, 790),
  90,
  random(0.5, 1.0)
  );

  ingredients.push(randomWord);
}


function startGame() {
  ingredients = [];
  typedWord = "";

  reputation = 1;

  gameElapsedSeconds = 0;
  gameMinutes = 9 * 60;

  customerServed = false;
  customerFailed = false;
  customerServedAt = 0;

  spawnCustomer();

  gameState = "playing";
}


function drawTitleScreen() {

  push();

  background(0);

  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  fill(96, 255, 10);
  stroke(96, 255, 10);

  // 바깥 테두리
  noFill();
  strokeWeight(2);
  rect(width / 2, height / 2, 860, 500);

  // 제목
  noStroke();
  fill(96, 255, 10);
  textSize(48);
  text("JUST MY TYPE!", width / 2, 175);

  textSize(18);
  text("A TYPING COOKING GAME", width / 2, 235);

  // 조작법
  textSize(16);
  text("TYPE THE FALLING INGREDIENTS", width / 2, 280);
  text("PRESS ENTER TO SUBMIT", width / 2, 310);

  // START 버튼
  noFill();
  stroke(96, 255, 10);
  strokeWeight(2);
  rect(width / 2, 390, 240, 70);

  noStroke();
  fill(96, 255, 10);
  textSize(28);
  text("START", width / 2, 390);

  pop();
}



function drawResultScreen() {

  push();

  background(0);

  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  stroke(96, 255, 10);
  strokeWeight(2);
  noFill();

  // 바깥 테두리
  rect(width / 2, height / 2, 860, 500);

  noStroke();
  fill(96, 255, 10);

  // 엔딩 제목
  textSize(42);

  if (endReason === "reputation") {
    text("GAME OVER!", width / 2, 170);
  } else {
    text("RESTAURANT CLOSED!", width / 2, 170);
  }

  // 최종 평판
  textSize(24);
  text("FINAL REPUTATION: " + reputation, width / 2, 255);


  // 최종 등급 계산
  let grade;
  let gradeMessage;

  if (reputation >= 10) {
    grade = "S";
    gradeMessage = "LEGENDARY CHEF!";
  } else if (reputation >= 7) {
    grade = "A";
    gradeMessage = "AMAZING WORK!";
  } else if (reputation >= 4) {
    grade = "B";
    gradeMessage = "GREAT JOB!";
  } else if (reputation >= 1) {
    grade = "C";
    gradeMessage = "NOT BAD!";
  } else {
    grade = "F";
    gradeMessage = "RESTAURANT FAILED!";
  }

  // 등급 표시
  textSize(36);
  text("RANK: " + grade, width / 2, 310);

  textSize(16);
  text(gradeMessage, width / 2, 345);


  // RETRY 버튼
  noFill();
  stroke(96, 255, 10);
  strokeWeight(2);
  rect(width / 2, 390, 240, 70);

  noStroke();
  fill(96, 255, 10);
  textSize(28);
  text("RETRY", width / 2, 390);

  pop();
}



function mousePressed() {

  // 시작 화면 또는 결과 화면에서만 작동
  if (gameState === "title" || gameState === "result") {

    // START / RETRY 버튼 영역
    if (
      mouseX >= width / 2 - 120 &&
      mouseX <= width / 2 + 120 &&
      mouseY >= 355 &&
      mouseY <= 425
    ) {

      startGame();

    }
  }
}



//chatGPT helped me with this part(keyTyped), but I made sure what each line of code does.
function keyTyped() {
  if (gameState !== "playing") {
    return;
  }

  if (key.length === 1 && /^[a-z]$/i.test(key)) {
    if (customerServed === true || customerFailed === true) {
      return;
    }
    typedWord += key.toLowerCase();
  }
}


function keyPressed(event) {

  if (
  gameState !== "playing" ||
  customerServed === true ||
  customerFailed === true
  ) {
    return false;
  }

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
          currentCustomer.thankYouMessage = random(ThankYouMessages);
        }
      }
    }
    
    typedWord = "";

    return false;
    
  }
}

function spawnCustomer() {

  let availableOrders;
  let waitTime;

  //morning: 9pm - 12am, lunch: 12am - 4am, evening: 4am - 9am
  if (gameMinutes < 12 * 60) {
    availableOrders = orderTemplates.morning;
    waitTime = 20;
  } else if (gameMinutes < 16 * 60) {
    availableOrders = orderTemplates.lunch;
    waitTime = 25;
  } else {
    availableOrders = orderTemplates.evening;
    waitTime = 30;
  }

  let selectOrder = random(availableOrders);
  currentCustomer = new Customer(selectOrder, waitTime);
}


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
  fill(45, 35, 60);
  textAlign(LEFT);
  textSize(22);
  text(this.word, this.x, this.y);
  } 
}

//customer order and timer mechanics
class Customer {
  constructor(order, waitTime) {
    this.order = order;
    this.progress = {};
    for (let req of order.requirements) {
      this.progress[req.category] = 0;
    }
    this.maxTime = waitTime;
    this.timeLeft = waitTime;
    this.spriteId = floor(random(3));
    this.isSpecial = false;
  }
  getExpression() {

    let timeRatio = this.timeLeft / this.maxTime;

    if (timeRatio > 0.5) {
      return "happy";
    } else if (timeRatio > 0.3) {
      return "neutral";
    } else {
      return "angry";
    }
  }
}