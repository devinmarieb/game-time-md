const Ball = require('./ball');
const Paddle = require('./paddle');
const Blocks = require('./blocks');

var paddle = new Paddle({});
var ball = new Ball({});
var blocks = [];

function Oracle(canvas, ctx) {

}



Oracle.prototype.drawGameElements = function() {
  this.paddle.draw();
  this.fillBlockArray();
  this.ball.draw();
  this.drawBlocks();
};


oracle.prototype.fillBlockArry = function() {
  for(i = 0; i < 8; i++){
    for(j = 0; j < 4; j++) {
      blocks.push(new Block({ x: i * 100, y: j * 25}));
    }
  }
};

oracle.prototype.drawBlocks = function() {
  blocks.ctx.fillRect(this.x, this.y, this.width, this.height);
};



module.exports = Oracle;
