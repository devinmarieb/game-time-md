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
  requestAnimationFrame(gameLoop);
});

$(document).on('keydown', function(e){
  if (e.keyCode === 37) {
    paddle.x -= 10;
  } else if (e.keyCode === 39) {
    paddle.x += 10;
  } else {
    e.preventDefault();
  }
});
