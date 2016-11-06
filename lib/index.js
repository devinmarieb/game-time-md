var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
var Game = require('./game');
var Block = require('./block');

var game = new Game(ctx, canvas);
var blocksArray = [];

function start() {
  requestAnimationFrame(function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.run();
    blocksArray.forEach(function(block) {
      ctx.fillRect(block.x, block.y, block.width, block.height)
    })
    requestAnimationFrame(gameLoop);
  });
}

function createBlocks() {
  for(i = 0; i < 8; i++){
    for(j = 0; j < 4; j++) {
    blocksArray.push(new Block({ x:2 + i * 100, y:50 + j * 25, width:96, height:20 } ));
    }
  }
};

createBlocks();
start();
