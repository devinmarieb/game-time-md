function Paddle(x, y, width, height, canvas, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.canvas = canvas;
  this.center = { x:canvas.width/2, y:this.y + (this.height/2) };
  this.ctx = ctx;
};

Paddle.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.canMoveLeft = function() {
  return this.x > 0;
};

Paddle.prototype.moveLeft = function() {
  if(this.canMoveLeft()){
    this.center.x--;
  }
};

Paddle.prototype.canMoveRight = function() {
  return this.x + this.width < canvas.width;
};

Paddle.prototype.moveRight = function() {
  if(this.canMoveRight()){
    this.center.x++;
  }
};
