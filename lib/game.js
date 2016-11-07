//knows where player is in the game, ie.e what level player is on etc.
//game constantly being called on in animation loop
const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const Obstacle = require('./obstacle');

var blocksArray = [];
var falseBlocksArray = [];
var lifeCounter = 3;

Game.prototype.updateLifeCounterText = function() {
  $('.life-counter').text(lifeCounter);
};

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.paddle = new Paddle({}, ctx, canvas);
  this.ball = new Ball({}, ctx, canvas);
  this.obstacle = new Obstacle({}, ctx, canvas);
  this.movePaddles = movePaddle(this);
  this.fillArray();
  this.blocksArray = blocksArray;
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
  $(document).on('keypress', function(e) {
    if(e.keyCode === 32) {
      game.updateLifeCounterText();
      ball.x = canvas.width/2;
      ball.y = canvas.height - paddle.height * 8;
      paddle.x = 325;
      paddle.y = 450;
      ball.speedX = 6;
      ball.speedY = 6;
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
  for(i = 0; i < 8; i++){
    for(j = 0; j < 4; j++) {
      blocksArray.push(new Block({ x:2 + i * 100, y:50 + j * 25, width:96, height:20 }, this.ctx, this.canvas));
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
    if(lifeCounter > 0) {
    this.updateLifeCounter();
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
  return lifeCounter -= 1;
};

Game.prototype.gameOver = function() {
  this.ctx.font = "72px serif";
  this.ctx.fillText('Game Over!', canvas.width/6, canvas.height/2, 500);
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

// Game.prototype.nextLevel = function() {
//   if(block.state === false) {
//     falseBlocksArray.push(this.block)
//   if(falseBlocksArray.length === 4){
//     console.log(obstacle)
//     this.obstacle.draw();
//   };
//   };
// }

Game.prototype.ballCollisionWithBlocks = function() {
  let { ball, paddle, obstacle } = this;
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
          falseBlocksArray.push(this.block)
        if(falseBlocksArray.length === 4){
          console.log(obstacle)
          obstacle.draw();
        };
        };
      }
  });
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
