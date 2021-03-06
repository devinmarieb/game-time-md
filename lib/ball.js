const Paddle = require('./paddle');
var paddle = new Paddle({});

function Ball(options, ctx, canvas) {
  this.radius = options.radius || 10;
  this.x = options.x || paddle.x + paddle.width/2;
  this.y = options.y || paddle.y - this.radius;
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
