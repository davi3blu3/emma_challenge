/*
*	Scroll to line 81 to input a custom array to test
*/

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

describe('networkTest - URL issues', function() {
	// Test 2 - detect illegal character
	it('should accept URL, and return a message if it contains illegal characters', function() {
		var expErr = "URL contains an illegal character";
		var promiseTest = validator.networkTest('http://www.go|ogle.com/').then(function(val) {
			expect(val).to.eql(expErr);
			done();
		});
	})

	// Test 3 - detect missing protocol
	it('should accept URL, and return a message if protocol is missing', function() {
		var expErr = "URL is missing a protocol like 'http'";
		var promiseTest = validator.networkTest('www.google.com/lolwut').then(function(val) {
			expect(val).to.eql(expErr);
			done();
		});
	});
	
});

describe('networkTest - http call issues', function() {
	// Test 4 - return string
	it('clean URLs should return an array', function(done) {
		var promiseTest = validator.networkTest('http://myemma.com').then(function(val) {
			expect(val).to.be.an('array');
			done();
		});
	})

	// Test 5 - should return status code
	it('clean URLs should return numerical status code at index 0', function(done) {
		var promiseTest = validator.networkTest('http://www.starwars.com').then(function(val) {
			expect(val[0]).to.be.a('number');
			done();
		})
	})
});

describe('iterate through array of urls', function() {
	// Test 6 - should return array of URLs with errors
	it('should accept an array, and return array of URLs with errors or non-200 statusCode', function(done) {

		// My test array - should return two errors and two non-200 codes, for 4 urls total
		var promiseTest = validator.iterate([
			"http://www.google.com",
			"yourmom.com",
			"http://www.yahoo.com",
			"https://github.com",
			"http://www.prodigy.net",
			"http://www.starwars.com",
			"http://www.|o|<ats.com",
			"http://www.homestarrunner.com",
			"http://www.mtv.com"
			]).then(function(val) {
				expect(val).to.be.an('array');
				expect(val.length).to.eql(4);
				console.log(val);
				done();
			});
			
		// Comment out the above array, and uncomment 'variable promiseTest' below and enter a new array of urls to test.

		// var promiseTest = validator.iterate([
		// 		// * Enter array of URLs to test HERE *
		// 	]).then(function(val) {
		// 		expect(val).to.be.an('array');
		// 		// function output will appear in the console of mocha test
		// 		console.log(val);
		// 		done();
		// 	});

	})
})