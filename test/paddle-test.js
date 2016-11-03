const chai = require('chai');
const assert = chai.assert;
const Paddle = require('../lib/paddle');

describe('Paddle', function(){
  context('with default attributes', function() {
    var canvas = { width:800, height:500 }

    it('should be a thing', function() {
      var paddle = new Paddle(400, 450, 150, 20, canvas);
      assert.isObject(paddle);
    });

    it('should moveLeft()', function() {
      var paddle = new Paddle(400, 450, 150, 20, canvas);
      paddle.moveLeft();
      assert.equal(paddle.x, 399);
    });

    it('should not be able to move left if at left canvas edge', function() {
      var paddle = new Paddle(0, 450, 150, 20, canvas);
      paddle.moveLeft();
      assert.equal(paddle.x, 0);
    });

    it('should moveRight()', function() {
      var paddle = new Paddle(400, 450, 150, 20, canvas);
      paddle.moveRight();
      assert.equal(paddle.x, 401);
    });

    it('should not be able to move left if at left canvas edge', function() {
      var paddle = new Paddle(650, 450, 150, 20, canvas);
      paddle.moveRight();
      assert.equal(paddle.x, 650);
    });

  });
});
