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
});

describe('networkTest method - URL issues', function() {
	// Test 2 - detect illegal character
	it('should accept URL, and return a message if it contains illegal characters', function() {
		var expErr = "URL contains an illegal character";
		var expSuc = "URL looks ok"
		expect(validator.networkTest('http://www.go|ogle.com/')).to.eql(expErr);
		expect(validator.networkTest('http://www.google.com/')).to.eql(expSuc);
	})

	// Test 3 - detect missing protocol
	it('should accept URL, and return a message if protocol is missing', function() {
		var expErr = "URL is missing a protocol like 'http'";
		expect(validator.networkTest('www.google.com/lolwut')).to.eql(expErr);
	});

	// Test 4 - good URL should pass
	it('should accept URL, and return a message that URL is OK', function() {
		var expWin = "URL looks ok"
		expect(validator.networkTest('http://www.google.com/')).to.eql(expWin);
	})	
});

describe('networkTest method - http call issues', function() {
	// Test 5 - return string
	it('clean URLs should return an array', function(done) {
		var promiseTest = validator.networkTest('http://myemma.com').then(function(val) {
			expect(val).to.be.an('array');
			done();
		});
	})

	// Test 6 - should return status code
	it('clean URLs should return numerical status code at index 0', function(done) {
		var promiseTest = validator.networkTest('http://www.starwars.com').then(function(val) {
			expect(val[0]).to.be.a('number');
			done();
		})
	})
});