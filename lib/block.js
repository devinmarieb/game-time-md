function Block(options, ctx, canvas) {
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = options.width || 90;
  this.height = options.height || 20;
  this.state = true; //will change this to false when we want to remove it from the canvas//
  this.ctx = ctx;
  this.canvas = canvas;
}

//this is no longer doing anything//
  // Block.prototype.draw = function() {
  //   this.ctx.fillRect(this.x, this.y, this.width, this.height);
  // };



module.exports = Block;
