function Obstacle(options, ctx, canvas) {
  this.x = options.x !== undefined ? options.x : 325;
  this.y = options.y || 450;
  this.width = options.width || 150;
  this.height = options.height || 10;
  this.ctx = ctx;
  this.canvas = canvas;
}

Obstacle.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};


module.exports = Obstacle;
