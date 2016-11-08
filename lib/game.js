const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const Obstacle = require('./obstacle');

var blocksArray = [];
var falseBlocksArray = [];

Game.prototype.updateLifeCounterText = function() {
  $('.life-counter').text(this.lifeCounter);
};

function Game(ctx, canvas) {
  this.level = 1;
  this.ctx = ctx;
  this.canvas = canvas;
  this.paddle = new Paddle({}, ctx, canvas);
  this.ball = new Ball({}, ctx, canvas);
  this.movePaddles = movePaddle(this);
  this.fillArray();
  this.blocksArray = blocksArray;
  this.lifeCounter = 1;
  this.toggleSpaceBar = true;
}

Game.prototype.run = function() {
  this.paddle.draw();
  this.ball.draw();
  this.ballMovement();
  this.ballCollisionWithWall();
  this.ballCollisionWithPaddle();
  this.ballCollisionWithBlocks();
  this.blocksArray.forEach(function(block){
    block.draw();
  });
  this.updateLifeCounterText();
};

Game.prototype.ballMovement = function() {
  let ball = this.ball;
  let paddle = this.paddle;
  let game = this;
  if(game.toggleSpaceBar === true) {
    ball.x = paddle.x + paddle.width/2;
    ball.y = paddle.y - ball.radius;
  }
  $(document).on('keydown', function(e) {
    if(e.keyCode === 32 && game.toggleSpaceBar === true) {
      game.updateLifeCounterText();
      ball.speedX = 6;
      ball.speedY = 6;
      game.toggleSpaceBar = false;
    }
});
  ball.x +=  ball.speedX;
  ball.y -=  ball.speedY;
};

Game.prototype.drawBlocks = function() {
  for(i = 0; i < this.blocksArray; i++) {
    this.blocksArray[i].draw();
  }
};

Game.prototype.fillArray = function() {
  switch(this.level){
    case 1:
      this.level1();
      break;
    case 2:
      this.level2();
      break;
  }
};

Game.prototype.level1 = function() {
  for(i = 0; i < 8; i++){
    for(j = 0; j < 4; j++) {
      blocksArray.push(new Block({ x:2 + i * 100, y:50 + j * 25, width:96, height:20 }, this.ctx, this.canvas));
    }
  }
}

Game.prototype.level2 = function() {
  for(i = 0; i < 3; i++){
    for(j = 0; j < 4; j++) {
      blocksArray.push(new Block({ x:2 + i * 100, y:50 + j * 25, width:36, height:20 }, this.ctx, this.canvas));
    }
  }
};

Game.prototype.ballCollisionWithWall = function() {
  let ball = this.ball;
  let paddle = this.paddle;
  if(ball.x > canvas.width - ball.radius){
    ball.changeDirectionX();
  }
  if(ball.x < 0 + ball.radius) {
    ball.changeDirectionX();
  }
  if(ball.y < 0 + ball.radius) {
    ball.changeDirectionY();
  }
  if(ball.y - ball.radius > canvas.height) {
    this.resetPaddleAndBall();
    if(this.lifeCounter > 0) {
    this.updateLifeCounter();
    this.toggleSpaceBar = true;
  } else {
    ball.y = ball.y - ball.radius + canvas.height;
    this.gameOver();
    }
  }
};

Game.prototype.resetPaddleAndBall = function() {
  let {paddle, ball} = this;
  ball.speedX = 0;
  ball.speedY = 0;
  ball.x = canvas.width/2;
  ball.y = canvas.height - paddle.height * 8;
  paddle.x = 325;
  paddle.y = 450;
  return this;
}

Game.prototype.updateLifeCounter = function() {
  return this.lifeCounter -= 1;
};

Game.prototype.gameOver = function() {
  let game = this;
  this.ctx.font = "72px serif";
  this.ctx.fillText('Game Over!', canvas.width/6, canvas.height/2, 500);
  $(document).on('keydown', function(e){
    if(e.keyCode === 32 && game.toggleSpaceBar === false) {
      e.preventDefault();
    }
  })
};

Game.prototype.ballCollisionWithPaddle= function (){
  let { ball, paddle } = this;
  if(ball.x < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y < paddle.y + paddle.height &&
    ball.radius + ball.y > paddle.y){
      ball.changeDirectionY();
  }
};

Game.prototype.levelWon = function() {
  let ball = this.ball;
  ball.speedX = 0;
  ball.speedY = 0;
  this.ctx.font = "72px serif";
  this.ctx.fillText('Level Complete!', canvas.width/6, canvas.height/2, 500);
}

Game.prototype.ballCollisionWithBlocks = function() {
  let ball = this.ball;
  let paddle = this.paddle;
  let block = this.block;
  let game = this;
  this.blocksArray.forEach(function(block, index, game) {
    if(ball.x <= block.x + block.width &&
      ball.x + ball.radius >= block.x &&
      ball.y <= block.y + block.height &&
      ball.radius + ball.y >= block.y){
        block.x = -100;
        block.y = -100;
        block.state = false;
        ball.changeDirectionY();
        if(block.state === false) {
          falseBlocksArray.push(block)
        };
    };
  });
    if(falseBlocksArray.length === 1){
      this.levelWon();
  };
};

Game.prototype.startScreen = function() {
    this.updateLifeCounterText();
    this.ctx.font = "72px serif";
    this.ctx.fillText('#BADA55 Breakout!', canvas.width/5.6, canvas.height/3, 500);
    this.ctx.font = "24px serif";
    this.ctx.fillText('Use the left and right arrow keys to move the paddle', canvas.width/6, canvas.height/3 + canvas.height/3);
    this.ctx.fillText("Click the screen to get breakin'", canvas.width/6, canvas.height/3 + canvas.height/3 + 50);
  };


function movePaddle(game) {
   let paddle = game.paddle;
  $(document).on('keydown', function(e) {
    if(e.keyCode === 37) {
      paddle.moveLeft();}
      if(e.keyCode === 39) {
        paddle.moveRight(); }
        return paddle.x;
  });
}






module.exports = Game;
