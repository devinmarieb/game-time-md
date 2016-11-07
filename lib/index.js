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

$('.backgroundOne').on('click', function () {
  $('.body').css('background-color', '#C0FFEE');
  $('.background-theme').text('#C0FFEE');
});

$('.backgroundTwo').on('click', function () {
  $('.body').css('background-color', '#DEBB1E');
  $('.background-theme').text('#DEBB1E');
});

$('.backgroundThree').on('click', function () {
  $('.body').css('background-color', '#BADA55');
  $('.background-theme').text('#BADA55');
});


start();
