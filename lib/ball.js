function Ball(options, canvas) {
  this.x = options.x || canvas.width/2;
  this.y = options.y || 350;
  this.radius = options.radius || 10;
  this.speed = options.speed || 6;
  this.canvas = canvas;
  this.ctx = options.ctx;
};

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
