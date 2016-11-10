const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');
const Game = require('./game');

var mouseClick = true;
var game = new Game(ctx, canvas);

game.startScreen();

function start() {
  requestAnimationFrame(function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.run();
    requestAnimationFrame(gameLoop);
    if(game.level === 1){
      $('.body').css({'background-image': 'url(../images/level1.png)'});
    } else if(game.level === 2){
      $('.body').css({'background-image': 'url(../images/level2.png)'});
    } else if(game.level === 3){
      $('.body').css({'background-image': 'url(../images/level3.png)'});
    }
  });
};

$('canvas').on('click', function(event) {
  if(mouseClick === true) {
    game.setLevel(1);
    start();
    $('html, body').animate({scrollTop: $(document).height()}, 3000);
    return mouseClick = false;
  }
});

$('.start-over-button').on('click', function() {
  location.reload();
});

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
  $('.body').css({'background-color': '#0DD', 'color': 'white'});
  $('.background-theme').text('#0DD');
});

$(document).on('keydown', function(e) {
  if(e.keyCode === 79) {
    $('#canvas').toggleClass('rotateDatCanvas');
  }
})
