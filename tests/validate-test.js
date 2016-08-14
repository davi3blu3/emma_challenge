'use strict';
// import test tools
var expect = require('chai').expect;

// import test file
var validator = require('../validate.js');


describe('validator() function', function() {
	// Test 1 - basic setup
	it('should exist', function() {
		expect(validator).to.not.be.undefined;
	});

	it('should accept URL string, and return an error if it contains illegal characters', function() {
		expect(validator.tester('http://www.google.com/'))
	})
});