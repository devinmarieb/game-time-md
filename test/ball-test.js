const chai = require('chai');
const assert = chai.assert;
const Ball = require('../lib/ball');

//in the context of testing the Y cooridinate, the tests treat Y as a decrement
//where as our Y in canvas is an increment.

describe('Ball', function(){
  context('with default attributes', function() {
    var canvas = { width:800, height:500 }

    it('should be a thing', function() {
      var ball = new Ball({ x:400, y:350, radius:10 });
      assert.isObject(ball);
    });

    it('should move right', function() {
      var ball = new Ball({ x:400, y:350 });
      ball.directionRight();
      assert.equal(ball.x, 406);
    });

    it('should move left', function() {
      var ball = new Ball({ x:400, y:350 });
      ball.directionDown();
      assert.equal(ball.x, 400);
    });

    it('should move up', function() {
      var ball = new Ball({ x:400, y:350 });
      ball.directionUp();
      assert.equal(ball.y, 344);
    });

    it('should move down', function() {
      var ball = new Ball({ x:400, y:350 })
      ball.directionDown();
      assert.equal(ball.y, 356);
    });

    it('should change direction on X axis', function() {
      var ball = new Ball({ x:400, y:350 })
      ball.changeDirectionX();
      assert.equal(ball.speedX, -6);
    });

    it('should change direction on Y axis', function() {
      var ball = new Ball({ x:400, y:350 })
      ball.changeDirectionY();
      assert.equal(ball.speedY, -6)
    })

  });
});
