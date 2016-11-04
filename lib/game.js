//knows where player is in the game, ie.e what level player is on etc.
//game constantly being called on in animation loop
const Ball = require('./ball');
const Paddle = require('./paddle');
const Block = require('./block');
const blocks = [];
var ctx = canvas.getContext('2d');



var paddle = new Paddle({}, ctx, canvas);
var ball = new Ball({}, ctx, canvas);

function Game(ctx, canvas) {
  var blocks = [];
}

Game.prototype.run = function() {
  paddle.draw(ctx, canvas);
  ball.draw(ctx, canvas);
};

Game.prototype.createBlocks = function() {

};


module.exports = Game;
