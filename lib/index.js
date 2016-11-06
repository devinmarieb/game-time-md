var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
var Game = require('./game');

var game = new Game(ctx, canvas);

function start() {
  requestAnimationFrame(function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.run();

    requestAnimationFrame(gameLoop);
  });
}


start();
