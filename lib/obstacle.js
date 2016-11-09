function Obstacle(options, ctx, canvas) {
  this.x = options.x !== undefined ? options.x : 325;
  this.y = options.y || 150;
  this.width = options.width || 200;
  this.height = options.height || 10;
  this.speed = 3;
  this.ctx = ctx;
  this.canvas = canvas;
}

Obstacle.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Obstacle.prototype.changeDirection = function () {
  if(this.speed) {
    this.speed = -this.speed;
  }
}



module.exports = Obstacle;
