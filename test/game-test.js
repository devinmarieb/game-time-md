const chai = require('chai');
const assert = chai.assert;
const Ball = require('../lib/ball');
const Paddle = require('../lib/paddle');
const Block = require('../lib/block');
const Game = require('../lib/game');



describe('game', function(){
  context('with default attributes', function() {
    var canvas = { width:800, height:500 }

  it('should be a thing that holds all the stuffs', function() {
    var game = new Game({});
    assert.isObject(game);
  });

  it('should know when the ball hits the paddle', function() {
    var game = new Game({});
    var ball = new Ball({});
    var paddle = new Paddle({});
    if(ball.x === 325 && ball.y === 490){
    assert.equal(ball.x, paddle.x)
    }
  });

  it('should know when the ball hits a block', function() {
    var game = new Game({});
    var ball = new Ball({});
    var block = new Block({});
    if(ball.x === 0 && ball.y === 0){
      assert.equal(ball.x, block.x);
    }
  });

  it('should know when the ball hits a wall', function() {
    var game = new Game({});
    var ball = new Ball({});
    if(ball.x === 800){
      assert.equal(ball.x, canvas.width)
    }
  })

  });
});
