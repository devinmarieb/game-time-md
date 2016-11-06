const Paddle = require('./paddle');
var paddle = new Paddle({});

function Ball(options, ctx, canvas) {
  this.x = options.x || canvas.width/2;
  this.y = options.y || canvas.height - paddle.height * 8;
  this.radius = options.radius || 10;
  this.speed = options.speed || 6;
  this.speedX = options.speedX || 0;
  this.speedY = options.speedY || 0;
  this.ctx = ctx;
  this.canvas = canvas;
  this.paddle = paddle;
}

Ball.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  this.ctx.fillStyle = '#617';
  this.ctx.fill();
  this.ctx.closePath();
};

Ball.prototype.directionRight = function () {
  this.x += this.speedX;
};

Ball.prototype.directionLeft = function() {
  this.x -= this.speedX;
};

Ball.prototype.directionUp = function () {
  this.y -= this.speedY;
};

Ball.prototype.directionDown = function () {
  this.y += this.speedY;
};

Ball.prototype.changeDirectionX = function() {
  if(this.speedX) {
    this.speedX = -this.speedX
  }
};

Ball.prototype.changeDirectionY = function() {
  if(this.speedY) {
    this.speedY = -this.speedY
  }
};

module.exports = Ball;
