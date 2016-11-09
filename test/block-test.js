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

    it('should have a default x coordinate', function() {
      var block = new Block({});
      assert.equal(block.x, 0);
    });

    it('should have a default y coordinate', function() {
      var block = new Block({});
      assert.equal(block.y, 0);
    });

    it('should accept a new x coordinate', function() {
      var block = new Block({ x: 543 });
      assert.equal(block.x, 543);
    });

    it('should accept a new y coordinate', function() {
      var block = new Block({ y:43 });
      assert.equal(block.y, 43);
    });

    it('should have a default width', function() {
      var block = new Block({});
      assert.equal(block.width, 90);
    });

    it('should have a default height', function() {
      var block = new Block({});
      assert.equal(block.height, 20);
    });

    it('should accept a new width', function() {
      var block = new Block({ width: 113 });
      assert.equal(block.width, 113);
    });

    it('should accept a new height', function() {
      var block = new Block({ height: 12});
      assert.equal(block.height, 12);
    });

    it('should have a draw method', function() {
      var block = new Block({});
      assert.isFunction(block.draw);
    });
  });
});
