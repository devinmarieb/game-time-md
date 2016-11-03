//require ball, paddle, blocks

function World(ctx) {






}


//PADDLE//






//BALL//
function Ball(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
};

Ball.prototype.drawBall = function() {
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height - (10 * 8), 10, 0, Math.PI*2);
  ctx.fillStyle = '#617';
  ctx.fill();
  ctx.closePath();
}

// Ball.prototype.moveBall = function() {
//   this.canvas.width/2 = canvas.width/2 + 6
//   this.canvas.height - (10 * 8) + 6
// }



//BLOCKS//
var blocks = {};




var Game = function(canvas) {
  this.paddle = new Paddle(canvas.width/2 - 75, 450, 150, 20);
  this.ball = new Ball(canvas.width/2, canvas.height - (10 * 8), 10)
  this.paddle.drawPaddle();
  this.ball.drawBall();
  // moveBall();
};

new Game(canvas);
