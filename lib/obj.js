var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');


//PADDLE//
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.center = { x: canvas.width/2, y: this.y + (this.height/2)};
};

Paddle.prototype.drawPaddle = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.moveLeft = function() {

};

Paddle.prototype.moveRight = function() {

};



//BALL//
function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
};

Ball.prototype.drawBall = function() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height - (10 * 8), 10, 0, Math.PI*2);
  ctx.fillStyle = '#617';
  ctx.fill();
  ctx.closePath();
}

// Ball.prototype.moveBall = function() {
//   this.canvas.width/2 = canvas.width/2 + 6
//   this.canvas.height - (10 * 8) + 6
// }



//BLOCKS//
var blocks = {};




var Game = function(canvas) {
  this.paddle = new Paddle(canvas.width/2 - 75, 450, 150, 20);
  this.ball = new Ball(canvas.width/2, canvas.height - (10 * 8), 10)
  this.paddle.drawPaddle();
  this.ball.drawBall();
  // moveBall();
};

new Game(canvas);
