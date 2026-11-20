// DM2008 — Mini Project
// PONG (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. Get both paddles moving — controls are the first thing to nail
// 2. Get the ball moving — uncomment the velocity in the Ball constructor
// 3. Add scoring when the ball passes a paddle, then reset the ball
// 4. Add game states — at minimum a playing state and a game over state
//
// Stretch: add a start screen, a win condition, or angle variation on paddle hits.

/* ----------------- Globals ----------------- */
let leftPaddle, rightPaddle, ball; //불러오기
let leftScore = 0; //시작할 때 점수
let rightScore = 0;

let a =0; //게임오버 배경

// Game states: "playing" or "gameover" — add more if you need them
 let gameState = "playing"; //플레이 상태로 시작

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(640, 360); //배경이랑 애셋 셋업
  noStroke();
  leftPaddle = new Paddle(30, height / 2 - 30, 10, 60);
  rightPaddle = new Paddle(width - 40, height / 2 - 30, 10, 60);
  ball = new Ball(width / 2, height / 2, 8);
}

function draw() {
  background(18);

  if (gameState === "playing") {
    handleInput(); //패들을 키로 움직일 때의 수(인풋)을 정의

    leftPaddle.update(); //인풋에 따라 패들 위치 실시간 업데이트
    rightPaddle.update();
    ball.update();

    ball.checkWallBounce(); //위아래 벽 튕기기 + 양 옆 닿으면 점수 추가
    ball.checkPaddleBounce(leftPaddle);
    ball.checkPaddleBounce(rightPaddle);

    drawCourt();
    leftPaddle.show();
    rightPaddle.show();
    ball.show();

    // Display scores — look up textAlign() and textSize() in the p5.js reference
    textSize(60);
    textAlign(CENTER);
    text(leftScore, width/4, 70);
    text(rightScore, width*3/4, 70);
    
  }
  //왼쪽이 이겼을 때 화면
  if (leftScore >= 10) {
    gameState = "gameover_leftWins";
  } 

  if (gameState === "gameover_leftWins") {
    // What should the player see when the game ends?
    // How do they restart?
    push();
    fill(150);
    rect(0, 0, width, a);
    a += 5;
    if(a-150 >= height){
      fill(0);
      textSize(80);
      textAlign(CENTER);
      text("Left Wins!", width/2, height/2.5);
    }
    if(a-300 >= height){
      if(220 <= mouseX && 420 >= mouseX && 270 <= mouseY && 320 >= mouseY){
        fill(200)
      }
      else{
        fill(255)
      }
    rect(220, 270, 200, 50)
      fill(0);
      textSize(30);
      textAlign(CENTER);
      text("Restart", 320, 305);
    }    
  }

  //오른쪽이 이겼을 때 화면
  if (rightScore >= 10) {
    gameState = "gameover_rightWins";
  } 

  if (gameState === "gameover_rightWins") {
    // What should the player see when the game ends?
    // How do they restart?
    push();
    fill(150);
    rect(0, 0, width, a);
    a += 5;
    if(a-150 >= height){
      fill(0);
      textSize(80);
      textAlign(CENTER);
      text("Right Wins!", width/2, height/2.5);
    }
    if(a-300 >= height){
      if(220 <= mouseX && 420 >= mouseX && 270 <= mouseY && 320 >= mouseY){
        fill(200)
      }
      else{
        fill(255)
      }
    rect(220, 270, 200, 50)
      fill(0);
      textSize(30);
      textAlign(CENTER);
      text("Restart", 320, 305);
    }    
  }
}

//오른쪽이 이겼을 때 화면
/* ----------------- Input ----------------- */
function handleInput() {
  // Left paddle: W (up) and S (down) — use keyIsDown() with the key's character
  if (keyIsDown("w")) {
    leftPaddle.vy = -leftPaddle.speed;
  }
  if (keyIsDown("s")) {
    leftPaddle.vy = leftPaddle.speed;
  }

  // Right paddle: UP_ARROW and DOWN_ARROW — same pattern as left paddle
  if (keyIsDown(UP_ARROW)) {
    rightPaddle.vy = -rightPaddle.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    rightPaddle.vy = rightPaddle.speed;
  }
}

function keyReleased() {
  leftPaddle.vy = 0;
  rightPaddle.vy = 0;
}

/* ----------------- Classes ----------------- */
class Paddle {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.vy = 0;
    this.speed = 5;
  }

  update() {
    this.pos.y += this.vy;
    this.pos.y = constrain(this.pos.y, 0, height - this.h);
  }

  show() {
    fill(220);
    rect(this.pos.x, this.pos.y, this.w, this.h, 2);
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.xSpeed = 3.5;
    this.ySpeed = 2.0;

    // Give the ball a random starting direction to get it moving
    this.vel = createVector(
      random([-1.5, 1.5]) * this.xSpeed,
      random(-1, 1) * this.ySpeed
    );
  }

  update() {
    this.pos.add(this.vel);
  }

  // checkWallBounce() {
  //   // Bounce off top and bottom walls
  //   if (this.pos.y - this.r <= 0 || this.pos.y + this.r >= height) {
  //     this.vel.y *= -1;
  //     this.pos.y = constrain(this.pos.y, this.r, height - this.r);
  //   }

    // When the ball passes the left or right edge, a player scores
    // Increment the correct score, then call this.reset()
    if (this.pos.x <= 0) {
      rightScore = rightScore +1
      this.reset()
    }
    if (this.pos.x >= width) {
      leftScore = leftScore +1
      this.reset()
    }
  }

  checkPaddleBounce(paddle) {
    const withinY =
      this.pos.y > paddle.pos.y && this.pos.y < paddle.pos.y + paddle.h;
    const withinX =
      this.pos.x + this.r > paddle.pos.x &&
      this.pos.x - this.r < paddle.pos.x + paddle.w;

    if (withinX && withinY) {
      if (this.vel.x < 0) {
        this.pos.x = paddle.pos.x + paddle.w + this.r;
      } else {
        this.pos.x = paddle.pos.x - this.r;
      }
      this.vel.x *= -1;

      // Stretch: add angle variation based on where the ball hits the paddle
     this.vel.y += (this.pos.y - paddle.pos.y - paddle.h / 2) * 0.1;
      
    }
  }

  show() {
    fill(255, 170, 70);
    circle(this.pos.x, this.pos.y, this.r * 2);
  }

  reset() {
    this.pos.set(width / 2, height / 2);
    // random([-1, 1]) picks randomly from an array — a handy pattern for direction
    // this.vel.set(random([-1, 1]) * this.xSpeed, random([-1, 1]) * this.ySpeed);
    this.vel.set(random([-1.5, 1.5]) * this.xSpeed, random(-1, 1) * this.ySpeed)
  }
}

/* ----------------- UI Helpers ----------------- */
function drawCourt() {
  stroke(80);
  strokeWeight(2);
  for (let y = 10; y < height; y += 18) {
    line(width / 2, y, width / 2, y + 8);
  }
  noStroke();
}

function mousePressed() {
    if (220 <= mouseX && 420 >= mouseX && 270 <= mouseY && 320 >= mouseY) {
      if(gameState == "gameover_leftWins"){
        leftScore = 0;
        rightScore = 0;
        a = 0;
        gameState = "playing"
      }
      if (gameState == "gameover_rightWins"){
        leftScore = 0;
        rightScore = 0;
        a = 0;
        gameState = "playing"
      }
      
    }
  }