const chai = require('chai');
const assert = chai.assert;
const Block = require('../lib/block');

describe('Block', function(){
  context('with default attributes', function() {
    var canvas = { width:800, height:500 };
    var block = new Block({});
    it('should be a thing', function() {
      var block = new Block({});
      assert.isObject(block);
    });

    it('should default to a width of 90', function() {
      var block = new Block({});
      assert.equal(block.width, 90);
    });

    it("should default to a state of 'true'", function() {
      assert.equal(block.state, true);
    });

    it("should accept a new x coordinate if given as an argument", function(){
      var block = new Block({x: 39});
      assert.equal(block.x, 39);
    });
  });
});
