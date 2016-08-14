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

	// Test 2 - detect illegal character
	it('should accept URL, and return an error if it contains illegal characters', function() {
		var expErr = "Error, an illegal character was detected";
		expect(validator.tester('http://www.go|ogle.com/')).to.eql(expErr);
	})

	// Test 3 - detect missing protocol
	it('should accept URL, and return an error if protocol is missing', function() {
		var expErr = "Error, your URL is missing a protocol like 'http'";
		expect(validator.tester('www.google.com/lolwut')).to.eql(expErr);
	});

	// Test 4 - detect missing dot in hostname
	it('should accept URL, and return an error if hostname has no dot', function() {
		var expErr = "your URL hostname doesn't look quite right";
		expect(validator.tester("http://ihavenoideawhatimdoing/")).to.eql(expErr);
	});
});