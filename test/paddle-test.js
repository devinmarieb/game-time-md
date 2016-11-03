const chai = require('chai');
const assert = chai.assert;
const Paddle = require('../lib/paddle');

describe('Paddle', function(){
  context('with default attributes', function() {
    var canvas = { width:800, height:500 }

    it('should be a thing', function() {
      var paddle = new Paddle({ x:325, y:450, width:150, height:10 });
      assert.isObject(paddle);
    });

    it('should moveLeft()', function() {
      var paddle = new Paddle({ x:325 });
      paddle.moveLeft();
      assert.equal(paddle.x, 324);
    });

    it('should not be able to move left if at left canvas edge', function() {
      var paddle = new Paddle({ x:0 });
      paddle.moveLeft();
      assert.equal(paddle.x, 0);
    });

    it('should moveRight()', function() {
      var paddle = new Paddle({ x:325 }, canvas);
      paddle.moveRight();
      assert.equal(paddle.x, 326);
    });


    it('should not be able to move right if at left canvas edge', function() {
      var paddle = new Paddle({ x:650, y:450, width:150 }, canvas);
      paddle.moveRight();
      assert.equal(paddle.x, 650);
    });

  });
});
