
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
var ballRadius = 10;
var ballX = canvas.width/2;
var ballY = canvas.height - (ballRadius * 8);
var directionX = 6;
var directionY = 6;
var paddleWidth = 150;
var paddleHeight = 20;
var paddle = new Block((canvas.width - paddleWidth)/2, 450, 150, 20);
var blocks = [];
var ball = {x: ballX, y: ballY};

drawBlocks();

function draw(){
  drawBall();
  paddle.draw();
  blocks.forEach(function(block) {
    block.draw();
  });
}

function blockCollisionDetection() {
  blocks.forEach(function(block, index) {
    if(ball.x <= block.x + block.width &&
      ball.x + ballRadius >= block.x &&
      ball.y <= block.y + block.height &&
      ballRadius + ball.y >= block.y) {
        block.x = -100;
        block.y = -100;
        block.state = false;
        directionY = -directionY;
      }
  });
}

function ballCollision() {
  canvasEdgeCollision();
  paddleAndBallCollision();
  blockCollisionDetection();
}

function ballMovement() {
ballX += directionX;
ballY -= directionY;
ball.x = ballX;
ball.y = ballY;
}

function canvasEdgeCollision() {
if(ballX > canvas.width - ballRadius || ballX < ballRadius){
  directionX = -directionX;
}
if(ballY < ballRadius){
  directionY = -directionY;
  }
}

function paddleAndBallCollision() {
if(ball.x <= paddle.x + paddle.width &&
  ball.x + ballRadius >= paddle.x &&
  ball.y <= paddle.y + paddle.height &&
  ballRadius + ball.y >= paddle.y) {
    directionY = -directionY;
  }
if(ball.x >= paddle.x &&
  ball.x <= paddle.x + paddle.width &&
  ball.y >= paddle.y &&
  ball.y <= paddle.y + paddle.height) {

  if(ball.x < paddle.x + paddle.width) {
    ball.x = paddle.x - ballRadius;
    directionX = -directionX;
  } else if(ball.x > paddle.x){
    ball.x = paddle.x + paddle.width + ballRadius;
    directionX = -directionX;
  }

// need to add if statement to shoot ball up if it gets stuck in body of paddle, may just shoot back up regardless.


}
}

if(ball.x + ballRadius > paddle.y && paddleAndBallCollision === false) {
  directionX = -directionX;
}


function drawBall(){
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = '#617';
  ctx.fill();
  ctx.closePath();
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  ballMovement();
  ballCollision();
  requestAnimationFrame(gameLoop);
});

$(document).on('keydown', function(e){
  //37 left, 39 right//
  if (e.keyCode === 37 && paddle.x > 0) {
    paddle.x -= 40;
  } else if (e.keyCode === 39 && paddle.x < canvas.width - paddle.width) {
    paddle.x += 40;
  } else if (e.keyCode === 38 || e.keyCode === 40){
    e.preventDefault();
  }
});

Block.prototype.draw = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};





// } || ballX < ballRadius){
//     directionX = -directionX;
//   }
//   if(ball > canvas.height - ballRadius || ballY < ballRadius){
//     directionY = -directionY;
// }

function drawBlocks() {
  for(i = 0; i < 8; i++){
    for(j = 0; j < 4; j++) {
    this.blocks.push(new Block(2 + i * 100, 50 + j * 25, 96, 20));
    }
  }
}
