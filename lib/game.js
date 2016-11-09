const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const Obstacle = require('./obstacle');

function Game(ctx, canvas) {
  this.level = 0;
  this.ctx = ctx;
  this.canvas = canvas;
  this.paddle = new Paddle({}, ctx, canvas);
  this.ball = new Ball({}, ctx, canvas);
  this.obstacle = new Obstacle({}, ctx, canvas);
  this.movePaddles = movePaddle(this);
  this.blocksArray = [];
  this.lifeCounter = 3;
  this.toggleSpaceBar = true;
}

Game.prototype.startScreen = function() {
  if(this.level === 0) {
    this.updateLifeCounterText();
    this.ctx.font = "48px Indie Flower";
    this.ctx.fillText("HOW TO PLAY:", canvas.width/6, canvas.height/3.1)
    this.ctx.font = "24px Indie Flower";
    this.ctx.fillText(" - Use the left and right arrow keys to move the paddle", canvas.width/6, canvas.height/2.4);
    this.ctx.fillText(" - Press space bar to start the ball", canvas.width/6, canvas.height/1.93);
    this.ctx.fillText(" - Click the screen to get breakin'", canvas.width/6, canvas.height/1.6);
  };
};

Game.prototype.run = function() {
  if(this.level < 3) {
    this.setUpGameOnCanvas();
    this.updateLifeCounterText();
  } else {
    this.gameOver();
  };
};

Game.prototype.setUpGameOnCanvas = function() {
  this.paddle.draw();
  this.ball.draw();
  this.ballMovement();
  this.ballCollisionWithWall();
  this.ballCollisionWithPaddle();
  this.ballCollisionWithBlocks();
  this.blocksArray.forEach(function(block){
    block.draw();
  });
  if(this.level === 2) {
    this.obstacle.draw();
    this.obstacle.x += this.obstacle.speed;
    this.obstacleCollisionWithWall();
    this.ballCollisionWithObstacle();
  }
}

Game.prototype.setLevel = function(level){
  this.level = level;
  this.toggleSpaceBar = true;
  this.paddle.x = 325;
  this.paddle.y = 450;
  for(i = 0; i < 8; i++){
    for(j = 0; j < (level + 2) ; j++) {
      this.blocksArray.push(new Block({ x:2 + i * 100, y:50 + j * 25, width:96, height:20 }, this.ctx, this.canvas));
    }
  }
}

Game.prototype.drawBlocks = function() {
  for(i = 0; i < this.blocksArray; i++) {
    this.blocksArray[i].draw();
  }
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
      ball.speedX = ball.speed;
      ball.speedY = ball.speed;
      game.toggleSpaceBar = false;
    }
  });
  ball.x +=  ball.speedX;
  ball.y -=  ball.speedY;
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

Game.prototype.updateLifeCounterText = function() {
  $('.life-counter').text(this.lifeCounter);
};


Game.prototype.gameOver = function() {
  this.ctx.font = "72px Indie Flower";
  this.ctx.fillText('Game Over!', canvas.width/3.5, canvas.height/2, 500);
};

Game.prototype.levelComplete = function() {
  let ball = this.ball;
  let game = this;
  ball.speedX = 0;
  ball.speedY = 0;
  // return game.setLevel(game.level += 1);
  this.ctx.font = '72px Indie Flower';
  this.ctx.fillText('Level Complete!', canvas.width/5, canvas.height/2, 500);
}

Game.prototype.ballCollisionWithPaddle= function (){
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
    this.level = 10;
    }
  }
};

Game.prototype.ballCollisionWithBlocks = function() {
  let ball = this.ball;
  let paddle = this.paddle;
  let block = this.block;
  let game = this;
  this.blocksArray.forEach(function(block, index, game) {
     if (detectCollision(ball, block)) {
       game.splice(index, 1);
         if (detectTopOrBottomCollision(ball, block)) {
           ball.changeDirectionY();
         } else if(detectSideCollision(ball, block)) {
            ball.changeDirectionX();
         }
      };
    });
  if(this.blocksArray.length === 0){
    this.levelComplete()
    this.setLevel(game.level +=1);
  };
}

Game.prototype.ballCollisionWithObstacle = function() {
  let { ball, obstacle } = this;
  if(detectCollision(ball, obstacle)) {
    if((ball.y - ball.radius) - (obstacle.y + obstacle.height) < ball.speed &&
      ball.speedY === 6) {
    ball.changeDirectionY();
    }
  };
}

Game.prototype.obstacleCollisionWithWall = function() {
  let obstacle = this.obstacle;
  if(obstacle.x + obstacle.width > this.canvas.width) {
    obstacle.changeDirection();
  } else if(obstacle.x < 0) {
    obstacle.changeDirection();
  }
}

function detectCollision(ball, block) {
  var bottomOfBlock = false;
  var leftSideOfBlock = false;
  var rightSideOfBlock = false;
  var topOfBlock = false;
  if (ball.y - ball.radius <= block.y + block.height) {
    bottomOfBlock = true;
  }
  if (ball.x + ball.radius >= block.x) {
    leftSideOfBlock = true;
  }
  if (ball.x - ball.radius <= block.x + block.width) {
    rightSideOfBlock = true;
  }
  if (ball.y + ball.radius >= block.y) {
    topOfBlock = true;
  }
  if(bottomOfBlock && leftSideOfBlock && rightSideOfBlock && topOfBlock) {
    return true
  }
};

function detectSideCollision(ball, block) {
  if((ball.x + ball.radius - block.x < ball.speed) || (ball.x - ball.radius) - (block.x + block.width) < ball.speed) {
    return true;
  }
};

function detectTopOrBottomCollision(ball, block) {
  if(((ball.y - ball.radius) - (block.y + block.height)) < ball.speed){
    return true;
  }
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
