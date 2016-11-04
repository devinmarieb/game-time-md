const chai = require('chai');
const assert = chai.assert;
const Oracle = require('../lib/oracle');


describe('Oracle', function(){
  context('with default attributes', function() {
    var canvas = { width:800, height:500 }

    it('should be a thing', function() {
      var oracle = new Oracle();
      assert.isObject(oracle);
    });

  });
});
