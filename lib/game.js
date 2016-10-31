var canvas = $('#canvas')[0];
var context = canvas.getContext('2d');

var paddle = {
  x: 350,
  y: 450,
  width: 100,
  height: 15,
};


requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  blocks.forEach(function(block) {
    block.draw();
   });
  requestAnimationFrame(gameLoop);
});

function Block (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Block.prototype.draw = function() {
  context.fillRect(this.x, this.y, this.width, this.height);
};

var blocks = [];

function createBlocks() {
  for(i = 0; i < 8; i++){
    for(j = 4; j < 8; j++)
    this.blocks.push(new Block(100 * i, 25 * j, 90, 20));
}
}

createBlocks();

$(document).on('keydown', function(e){
  if (e.keyCode === 37) {
    paddle.x -= 15;
  } else if (e.keyCode === 39) {
    paddle.x += 15;
  } else if (e.keyCode === 38 || e.keyCode === 40){
    e.preventDefault();
  }

});
