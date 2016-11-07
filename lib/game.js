//knows where player is in the game, ie.e what level player is on etc.
//game constantly being called on in animation loop
const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');

var blocksArray = [];
var livesCounter = 3;

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.paddle = new Paddle({}, ctx, canvas);
  this.ball = new Ball({}, ctx, canvas);
  this.movePaddles = movePaddle(this);
  this.fillArray();
  this.blocksArray = blocksArray;
  this.updateLivesCounter();
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
};
Game.prototype.resetBallAndPaddle = function() {
  let ball = this.ball;
  let paddle = this.paddle;
  ball.x = canvas.width/2;
  ball.y = canvas.height - paddle.height * 8;
  paddle.x = 325;
  paddle.y = 450;
}

Game.prototype.ballMovement = function() {
  let ball = this.ball;
  let paddle = this.paddle;
  $(document).on('keypress', function(e) {

    if(e.keyCode === 32) {
      debugger
      this.resetBallAndPaddle();
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
  if(ball.x > canvas.width - ball.radius){
    ball.changeDirectionX();
  }
  if(ball.x < 0 + ball.radius) {
    ball.changeDirectionX();
  }
  if(ball.y < 0 + ball.radius) {
    ball.changeDirectionY();
  }
  if(ball.y + ball.radius > 550) {
    ball.speedX = 0;
    ball.speedY = 0;
    ball.y = 549;
    this.updateLivesCounter();
  }
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

Game.prototype.ballCollisionWithBlocks = function() {
  let { ball, paddle } = this;
  this.blocksArray.forEach(function(block, index) {
    if(ball.x <= block.x + block.width &&
      ball.x + ball.radius >= block.x &&
      ball.y <= block.y + block.height &&
      ball.radius + ball.y >= block.y){
        block.x = -100;
        block.y = -100;
        block.state = false;
        ball.changeDirectionY();
      }
  });
};

Game.prototype.gameOver = function() {
  this.ctx.font = "72px serif";
  this.ctx.fillText('Game Over!', canvas.width/6, canvas.height/2, 500);
};

Game.prototype.updateLivesCounter = function() {
  $('.lives').text(livesCounter);
  if(livesCounter === 3){
    return livesCounter = 2;

  } else if (livesCounter === 2) {
    return livesCounter = 1;
  } else if (livesCounter === 1) {
    return livesCounter = 0;
    this.gameOver();
  }
}


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
