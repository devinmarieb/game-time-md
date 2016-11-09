function Paddle(options, ctx, canvas) {
  this.x = options.x !== undefined ? options.x : 325;
  this.y = options.y || 490;
  this.width = options.width || 150;
  this.height = options.height || 10;
  this.paddleSpeed = 10;
  this.ctx = ctx;
  this.canvas = canvas;
}

Paddle.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.canMoveLeft = function() {
  this.x > 0;
  return this;
};

Paddle.prototype.canMoveRight = function() {
  return (this.x + this.width) < this.canvas.width;
};

Paddle.prototype.move = function() {
  if(this.canMoveLeft()){
    this.x += this.paddleSpeed;
  }
  if(this.canMoveRight()) {
    this.x -= this.paddleSpeed;
  }
};


module.exports = Paddle;
