const chai = require('chai');
const assert = chai.assert;
const Ball = require('../lib/ball');
const Paddle = require('../lib/paddle');
const Block = require('../lib/block');
const Game = require('../lib/game');



describe('Game', function() {
  context('with default attributes', function() {
    var canvas = { width:800, height:500 };
    var game = new Game({});
    var ball = new Ball({});

    it('should be a thing that holds all the stuffs', function() {
      assert.isObject(game);
    });

    it('should know when the ball is at the right wall', function() {
      if(ball.x + ball.radius === 800) {
        assert.equal(ball.x, canvas.width);
      };
    });

    it('should know when the ball is at the left wall', function() {
      if(ball.x - ball.radius === 0) {
        assert.equal(ball.x, canvas.width - canvas.width);
      };
    });

    it('should know when the ball is at the bottom wall', function() {
      if(ball.y + ball.radius === 500) {
        assert.equal(ball.y, canvas.height);
      };
    });

    it('should know when the ball is at the top wall', function() {
      if(ball.y - ball.radius === 0) {
        assert.equal(ball.y, canvas.height - canvas.height)
      };
    });

    it('should change ball direction if ball hits top wall', function() {
      if(ball.y - ball.radius === canvas.height - canvas.height) {
        ball.changeDirectionY();
        assert.equal(ball.y, ball.y +6);
      };
    });

    it('should change ball direction if ball hits bottom wall', function() {
      if(ball.y + ball.radius === canvas.height) {
        ball.changeDirectionY();
        assert.equal(ball.y, ball.y -6);
      };
    });

    it('should change ball direction if ball hits right wall', function() {
      if(ball.x + ball.radius === canvas.width) {
        ball.changeDirectionX();
        assert.equal(ball.x, ball.x -6);
      };
    });

    it('should change ball direction if ball hits left wall', function() {
      if(ball.x - ball.radius === canvas.width - canvas.width) {
        ball.changeDirectionX();
        assert.equal(ball.x, ball.x +6);
      };
    });

    

  });
});
