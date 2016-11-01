var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');

var ballRadius = 10;
var canvasX = canvas.width/2;
var canvasY = canvas.height;
var directionX = 7;
var directionY = 7;

var paddle = new Block( 350, 450, 150, 20);
var blocks = [];

function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  paddle.draw();
  drawBlocks();
  if(canvasX + directionX > canvas.width - ballRadius || canvasX + directionX < ballRadius){
    directionX = -directionX;
  }
  if(canvasY + directionY > canvas.height - ballRadius || canvasY + directionY < ballRadius){
    directionY = -directionY;
  }
  canvasX += directionX;
  canvasY += directionY;
}

function drawBlocks() {
  for(i = 0; i < 8; i++){
    for(j = 0; j < 4; j++)
    this.blocks.push(new Block(2 + i * 100, 50 + j * 25, 96, 20));
  }
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(canvasX, canvasY, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = '#617';
  ctx.fill();
  ctx.closePath();
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  draw();
  //THIS IS CONSTANTLY PUSHING THOUSANDS OF BLOCKS INTO ARRAY//
  // blocks.forEach(function(block) {
  //   block.draw();
  //  });
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

function Block (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Block.prototype.draw = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};
