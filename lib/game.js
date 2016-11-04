//knows where player is in the game, ie.e what level player is on etc.
//game constantly being called on in animation loop
const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const blocks = [];
var ctx = canvas.getContext('2d');



var paddle = new Paddle({}, ctx, canvas);
var ball = new Ball({}, ctx, canvas);

function Game() {
  this.ctx = ctx;
  this.canvas = canvas;
  var blocks = [];
}

Game.prototype.run = function() {
  paddle.draw();
  ball.draw();
  this.ballMovement();
  this.ballCollisionWithWall();

};

Game.prototype.createBlocks = function() {

};

Game.prototype.ballMovement = function() {
  ball.x += ball.speedX;
  ball.y -= ball.speedY;
};

Game.prototype.ballCollisionWithWall = function() {
  if(ball.x > canvas.width - ball.radius){
    ball.changeDirectionX();
  }
  if(ball.x < 0 + ball.radius) {
    ball.changeDirectionX();
  }
  if(ball.y < 0 + ball.radius) {
    ball.changeDirectionY();
  }
  if(ball.y > 500 - ball.radius) {
    ball.changeDirectionY();
  }
};

//
//   if(ballY < ballRadius){
//     directionY = -directionY;
//     }
// };








  $(document).on('keydown', function(e) {
    if(e.keyCode === 37) { paddle.moveLeft(); }
    if(e.keyCode === 39) { paddle.moveRight(); }
  });


module.exports = Game;
