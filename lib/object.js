var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');



var Paddle = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.center = { x: canvas.width/2, y: this.y + (this.height/2)};
};

Paddle.prototype.moveLeft = function() {

};

Paddle.prototype.moveRight = function() {

};

Paddle.prototype.drawPaddle = function() {
  ctx.fillRect(this.x, this.y, this.width, this.height);
};









var ball = {};

var blocks = {};

var Game = function(canvas) {
  this.paddle = new Paddle(canvas.width/2 - 75, 450, 150, 20);
  this.paddle.drawPaddle();
};

new Game(canvas);
