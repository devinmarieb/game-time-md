
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
var ballRadius = 10;
var ballX = 30;
var ballY = canvas.height - ballRadius;
var directionX = 5;
var directionY = 5;
var paddleWidth = 150;
var paddleHeight = 20;
var paddle = new Block((canvas.width - paddleWidth)/2, 450, 150, 20);
var blocks = [];
var ball = {x: ballX, y: ballY};


function draw(){
  drawBall();
  paddle.draw();
  // drawBlocks();
}

function containBallInCanvas() {
  if(ballX > canvas.width - ballRadius || ballX < ballRadius){
    directionX = -directionX;
  }
  if(ballY > canvas.height - ballRadius || ballY < ballRadius){
    directionY = -directionY;
  }
  ballX += directionX;
  ballY += directionY;
  ball.x = ballX;
  ball.y = ballY;

  if(ball.x < paddle.x + paddle.width &&
     ball.x + ballRadius > paddle.x &&
     ball.y < paddle.y + paddle.height &&
     ballRadius + ball.y > paddle.y) {
       directionY = -directionY;
     }
}



// } || ballX < ballRadius){
//     directionX = -directionX;
//   }
//   if(ball > canvas.height - ballRadius || ballY < ballRadius){
//     directionY = -directionY;
// }

// function drawBlocks() {
//   for(i = 0; i < 8; i++){
//     for(j = 0; j < 4; j++) {
//     }  if (blocks.length < 32) {
//     this.blocks.push(new Block(2 + i * 100, 50 + j * 25, 96, 20));
//   } else {
//     return blocks;
//   }
// }}
function drawBall(){
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = '#617';
  ctx.fill();
  ctx.closePath();
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  draw();
  containBallInCanvas();
  // THIS IS CONSTANTLY PUSHING THOUSANDS OF BLOCKS INTO ARRAY//
  // blocks.forEach(function(block) {
  //   block.draw();
  //  });

  requestAnimationFrame(gameLoop);
});

$(document).on('keydown', function(e){
  //37 left, 39 right//
  if (e.keyCode === 37 && paddle.x > 0) {
    paddle.x -= 20;
  } else if (e.keyCode === 39 && paddle.x < canvas.width - paddle.width) {
    paddle.x += 20;
  } else if (e.keyCode === 38 || e.keyCode === 40){
    e.preventDefault();
  }

});



Block.prototype.draw = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};
