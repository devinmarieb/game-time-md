const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');
const Game = require('./game');

var mouseClick = true;
var game = new Game(ctx, canvas);
game.startScreen();


$('canvas').on('click', function(event) {
  if(mouseClick === true) {
    start();
    return mouseClick = false;
  }
  });

function start() {
  requestAnimationFrame(function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.run();
    requestAnimationFrame(gameLoop);
  });
}

$('#backgroundOne').on('click', function () {
  $('.body').css('background-color', '#C0FFEE');
  $('.background-theme').text('#C0FFEE');
});

$('#backgroundTwo').on('click', function () {
  $('.body').css('background-color', '#C00C00');
  $('.background-theme').text('#C00C00');
});

$('#backgroundThree').on('click', function () {
  $('.body').css('background-color', '#BADA55');
  $('.background-theme').text('#BADA55');
});


  $('.start-over-button').on('click', function() {
    game = new Game(ctx, canvas);
  });
