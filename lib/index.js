const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');
const Game = require('./game');

var mouseClick = true;
var game = new Game(ctx, canvas);

game.startScreen();

$('canvas').on('click', function(event) {
  if(mouseClick === true) {
    start();
    game.level = 1;
    return mouseClick = false;

  }
  });

function start() {
    requestAnimationFrame(function gameLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.run();
      requestAnimationFrame(gameLoop);
    });
};

$('#background-one').on('click', function () {
  $('.body').css({'background-color': '#BADA55', 'color': 'black'});
  $('.background-theme').text('#BADA55');
});

$('#background-two').on('click', function () {
  $('.body').css({'background-color': '#C00C00', 'color': 'white'});
  $('.background-theme').text('#C00C00');
});

$('#background-three').on('click', function () {
  $('.body').css({'background-color': '#C0FFEE', 'color': 'black'});
  $('.background-theme').text('#C0FFEE');
});

$('#background-four').on('click', function () {
  $('.body').css({'background-color': '#0B5E55', 'color': 'white'});
  $('.background-theme').text('#0B5E55');
});

  $('.start-over-button').on('click', function() {
    location.reload();
  });
