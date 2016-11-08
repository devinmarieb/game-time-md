const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const Obstacle = require('./obstacle');

var gameMode = 0;
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
  this.obstacle = new Obstacle({}, ctx, canvas);
  this.movePaddles = movePaddle(this);
  this.fillArray();
  this.blocksArray = blocksArray;
  this.lifeCounter = 0;
  this.toggleSpaceBar = true;
}

Game.prototype.run = function() {
  if(gameMode === 1) {
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
  } else if(gameMode ===2) {
    this.gameOver();
  }
};

Game.prototype.startScreen = function() {
  if(gameMode === 0) {
    this.updateLifeCounterText();
    this.ctx.font = "48px Indie Flower";
    this.ctx.fillText("HOW TO PLAY:", canvas.width/6, canvas.height/3.1)
    this.ctx.font = "24px Indie Flower";
    this.ctx.fillText(" - Use the left and right arrow keys to move the paddle", canvas.width/6, canvas.height/2.4);
    this.ctx.fillText(" - Press space bar to start the ball", canvas.width/6, canvas.height/1.93);
    this.ctx.fillText(" - Click the screen to get breakin'", canvas.width/6, canvas.height/1.6);
    gameMode = 1;
  };
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
  if(gameMode === 2) {
    isPaused = false;
    let game = this;
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.font = "72px Indie Flower";
    this.ctx.fillText('Game Over!', canvas.width/3.5, canvas.height/2, 500);
    // $(document).on('keydown', function(e){
    //   if(e.keyCode === 32 && game.toggleSpaceBar === false) {
    //     e.preventDefault();
    //   } else if (e.keyCode === 13) {
    //     gameMode = 3;
    //   }
    // })
  }
};

Game.prototype.levelWon = function() {
  let ball = this.ball;
  ball.speedX = 0;
  ball.speedY = 0;
  this.ctx.font = '72px Indie Flower';
  this.ctx.fillText('Level Complete!', canvas.width/5, canvas.height/2, 500);
}

Game.prototype.ballCollisionWithPaddle= function (){
  if(gameMode === 1) {
    let { ball, paddle } = this;
    var paddleLeft = [paddle.x, (paddle.x + paddle.width/6)]
    var paddleRight = [((paddle.x + paddle.width) - (paddle.width/6)), paddle.x + paddle.width]
    if(ball.x <= paddleRight[1] && ball.x >= paddleRight[0] &&
      ball.y >= paddle.y) {
        ball.speedX = 6;
        ball.speedY = 6;
        ball.x += ball.speedX;
        ball.y -= ball.speedY;
      } else if ((ball.x) <= paddleRight[0] && ball.x >= paddleLeft[1] &&
      ball.y >= paddle.y) {
        ball.speedY = 6;
        ball.y -= ball.speedY;
      } else if(ball.x >= paddleLeft[0] && ball.x <= paddleLeft[1] &&
        ball.y >= paddle.y) {
          ball.speedX = -6;
          ball.speedY = 6;
          ball.x += ball.speedX;
          ball.y -= ball.speedY;
        }
      };
  }

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
    // ball.y = ball.y - ball.radius + canvas.height;
    gameMode = 2;
    }
  }
};

Game.prototype.ballCollisionWithBlocks = function() {
  if(gameMode === 1) {
    let ball = this.ball;
    let paddle = this.paddle;
    let block = this.block;
    let game = this;
    this.blocksArray.forEach(function(block, index, game) {
      if(ball.x <= block.x + block.width &&
        ball.x >= block.x &&
        ball.y <= block.y + block.height &&
        ball.y >= block.y){
          block.x = -100;
          block.y = -100;
          block.state = false;
          ball.changeDirectionY();
          if(block.state === false) {
            falseBlocksArray.push(block)
          };
        };
    });
      if(falseBlocksArray.length === 32){
        this.levelWon();
      };
  };
};

Game.prototype.startScreen = function() {
    this.updateLifeCounterText();
    this.ctx.font = "48px Indie Flower";
    this.ctx.fillText("HOW TO PLAY:", canvas.width/6, canvas.height/3.1)
    this.ctx.font = "24px Indie Flower";
    this.ctx.fillText(" - Use the left and right arrow keys to move the paddle", canvas.width/6, canvas.height/2.4);
    this.ctx.fillText(" - Press space bar to start the ball", canvas.width/6, canvas.height/1.93);
    this.ctx.fillText(" - Click the screen to get breakin'", canvas.width/6, canvas.height/1.6);
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
