function Paddle(options, ctx, canvas) {
  this.x = options.x !== undefined ? options.x : 325;
  this.y = options.y || 490;
  this.width = options.width || 150;
  this.height = options.height || 10;
  this.ctx = ctx;
  this.canvas = canvas;
}

Paddle.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.canMoveLeft = function() {
  return this.x > 0;
};

Paddle.prototype.moveLeft = function() {
  if(this.canMoveLeft()){
    this.x -= 30;
    return this;
  }
};

Paddle.prototype.canMoveRight = function() {
  return this.x + this.width < this.canvas.width;
};

Paddle.prototype.moveRight = function() {
  if(this.canMoveRight()){
    this.x += 30;
    return this;
  }
};


module.exports = Paddle;
