var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height;
var directionX = 7;
var directionY = 7;

var paddle = new Block( 350, 450, 150, 20);

function draw(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  paddle.draw();
  if(x + directionX > canvas.width - ballRadius || x + directionX < ballRadius){
    directionX = -directionX;
  }
  if(y + directionY > canvas.height - ballRadius || y + directionY < ballRadius){
    directionY = -directionY;
  }
  x += directionX;
  y += directionY;
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = '#617';
  ctx.fill();
  ctx.closePath();
}

requestAnimationFrame(function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  draw();
  blocks.forEach(function(block) {
    block.draw();
   });
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




var blocks = [];

function Block (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Block.prototype.draw = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

function createBlocks() {
  for(i = 0; i < 8; i++){
    for(j = 4; j < 8; j++)
    this.blocks.push(new Block(100 * i, 25 * j, 90, 20));
  }
}

createBlocks();
