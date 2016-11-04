//knows where player is in the game, ie.e what level player is on etc.
//game constantly being called on in animation loop
const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const blocks = [];
var ctx = canvas.getContext('2d');



var paddle = new Paddle({}, ctx, canvas);
var ball = new Ball({}, ctx, canvas);

function Game() {
  this.ctx = ctx;
  this.canvas = canvas;
  var blocks = [];
}

Game.prototype.run = function() {
  paddle.draw();
  ball.draw();
};

Game.prototype.createBlocks = function() {

};

$(document).on('keydown', function(e) {
  if(e.keyCode === 37) { paddle.moveLeft(); }
  if(e.keyCode === 39) { paddle.moveRight(); }
});










module.exports = Game;
