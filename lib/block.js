function Block(options) {
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = options.width || 90;
  this.height = options.height || 20;
  this.state = true; //will change this to false when we want to remove it from the canvas//
}

module.exports = Block;
