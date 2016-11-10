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

    it('should have default width of 150px', function() {
      var paddle = new Paddle({});
      assert.equal(paddle.width, 150);
    });

    it('should have default height of 10', function() {
      var paddle = new Paddle({});
      assert.equal(paddle.height, 10);
    });

    it('should accept a new width if defined on new instance', function() {
      var paddle = new Paddle({ width:39 });
      assert.equal(paddle.width, 39);
    });

    it('should accept a new height if defined on new instance', function() {
      var paddle = new Paddle({ height:67 });
      assert.equal(paddle.height, 67);
    });


    it('should have default x coordinate', function() {
      var paddle = new Paddle({});
      assert.equal(paddle.x, 325);
    });

    it('should have default y coordinate', function() {
      var paddle = new Paddle({});
      assert.equal(paddle.y, 490);
    });

    it('should accept a new x coordinate if defined on new instance', function() {
      var paddle = new Paddle({ x:39 });
      assert.equal(paddle.x, 39);
    });

    it('should accept a new y coordinate if defined on new instance', function() {
      var paddle = new Paddle({ y:67 });
      assert.equal(paddle.y, 67);
    });

    it('should have a method to draw itself', function() {
      var paddle = new Paddle({});
      assert.isFunction(paddle.draw);
    });



  });
});
