function Block(options, ctx, canvas) {
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = options.width || 90;
  this.height = options.height || 20;
  this.ctx = ctx;
  this.canvas = canvas;
}

Block.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Block;
