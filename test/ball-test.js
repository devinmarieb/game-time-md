const chai = require('chai');
const assert = chai.assert;
const Ball = require('../lib/ball');

//in the context of testing the Y cooridinate, the tests treat Y as a decrement
//where as our Y in canvas is an increment.

describe('Ball', function(){
  context('with default attributes', function() {
    var canvas = { width:800, height:500 }
    var ball = new Ball({});

    it('should be a thing', function() {
      assert.isObject(ball);
    });

    it('should have a default radius', function() {
      assert.equal(ball.radius, 10);
    });

    it('should have a default x coordinate', function() {
      assert.equal(ball.x, 400);
    });

    it('should have a default y coordinate', function() {
      assert.equal(ball.y, 480);
    });

    it('should have a default speed parameter', function() {
      assert.equal(ball.speed, 6);
    });

    it('should have a default speedX of 0', function() {
      assert.equal(ball.speedX, 0);
    });

    it('should have a default speedY of 0', function() {
      assert.equal(ball.speedY, 0);
    });

    it('should have a change directionX method', function() {
      assert.isFunction(ball.changeDirectionX);
    });

    it('should have a change directionY method', function() {
      assert.isFunction(ball.changeDirectionY);
    });


    it('should change direction on X axis if method is called', function() {
      var ball = new Ball({ speedX: 6 })
      ball.changeDirectionX();
      assert.equal(ball.speedX, -6);
    });

    it('should change direction on Y axis if method is called', function() {
      var ball = new Ball({ speedY: 6 })
      ball.changeDirectionY();
      assert.equal(ball.speedY, -6)
    })

  });
});
