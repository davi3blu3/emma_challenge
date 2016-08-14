'use strict';
// import test tools
var expect = require('chai').expect;

// import test file
var validator = require('../validate.js');


describe('validator object', function() {
	// Test 1 - basic setup
	it('should exist', function() {
		expect(validator).to.not.be.undefined;
	});

	// Test 2 - detect illegal character
	it('should accept URL, and return a message if it contains illegal characters', function() {
		var expErr = "URL contains an illegal character";
		expect(validator.formatTest('http://www.go|ogle.com/')).to.eql(expErr);
	})

	// Test 3 - detect missing protocol
	it('should accept URL, and return a message if protocol is missing', function() {
		var expErr = "URL is missing a protocol like 'http'";
		expect(validator.formatTest('www.google.com/lolwut')).to.eql(expErr);
	});

	// Test 4 - detect missing dot in hostname
	it('should accept URL, and return a message if hostname has no dot', function() {
		var expErr = "URL hostname not formatted correctly";
		expect(validator.formatTest('http://ihavenoideawhatimdoing/')).to.eql(expErr);
	});

	//Test 5 - test url network call
	it('should accept URL, and return promise object', function() {
		expect(validator.networkTest('http://www.google.com')).then.to.be.an('object');
	})
});