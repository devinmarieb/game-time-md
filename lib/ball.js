const Paddle = require('./paddle');
var paddle = new Paddle({});

function Ball(options, ctx, canvas) {
  this.x = options.x || canvas.width/2;
  this.y = options.y || canvas.height - paddle.height * 10;
  this.radius = options.radius || 10;
  this.speed = options.speed || 6;
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

Ball.prototype.directionX = function () {
  this.x += this.speed;
};

Ball.prototype.directionY = function () {
  this.y -= this.speed;
};


module.exports = Ball;
