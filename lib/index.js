var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
// const World = require('./world');
const Ball = require('./ball');
const Paddle = require('./paddle');

var ball = new Ball({ ctx:ctx }, canvas);
var paddle = new Paddle({ ctx:ctx });


function start() {
  requestAnimationFrame(function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.draw();
    requestAnimationFrame(gameLoop);
  });
}

start();
