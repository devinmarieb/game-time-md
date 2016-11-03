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
      var ball = new Ball({ x:400, y:350, radius:10 });
      ball.directionX();
      assert.equal(ball.x, 406);
    });

    it('should move left', function() {
      var ball = new Ball({ x:400, y:350, radius:10 });
      ball.directionY();
      assert.equal(ball.y, 344);
    });




  });
});
