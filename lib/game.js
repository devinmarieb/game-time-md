//knows where player is in the game, ie.e what level player is on etc.
//game constantly being called on in animation loop
const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const blocks = [];


function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.paddle = new Paddle({}, ctx, canvas);
  this.ball = new Ball({}, ctx, canvas);
  var blocks = [];
  this.movePaddles = movePaddle(this);
}

Game.prototype.run = function() {
  this.paddle.draw(this.ctx);
  this.ball.draw();
  this.ballMovement();
  this.ballCollisionWithWall();
  this.ballCollisionWithPaddle();
};

Game.prototype.createBlocks = function() {

};

Game.prototype.ballMovement = function() {
  let ball = this.ball;
  $(document).on('keypress', function(e) {
    if(e.keyCode === 32) {
      ball.speedX = 6;
      ball.speedY = 6;
    }
});
  ball.x +=  ball.speedX;
  ball.y -=  ball.speedY;
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
  if(ball.y + ball.radius > 498) {
    ball.speedX = 0;
    ball.speedY = 0;
    this.gameOver();
  }
};

Game.prototype.gameOver = function() {
  this.ctx.font = "72px serif";
  this.ctx.fillText('Game Over Bitch!', canvas.width/6, canvas.height/2, 500);
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
