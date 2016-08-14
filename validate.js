var url = require('url');
var http = require('http');

var validator = {

	tester: function(testUrl) {

		// check URL for illegal characters, return error
		var illegalChar = new RegExp('["<>\\^`{}|]');
		var illegal = illegalChar.test(testUrl);
		if(illegal) { return "Error, an illegal character was detected" };

		// check for url protocol
		var urlObj = url.parse(testUrl);
		if(urlObj.protocol == undefined) { return "Error, your URL is missing a protocol like 'http'" };

		// check if hostname contains '.'
		var dot = new RegExp('.');
		var dotMissing = dot.test(urlObj.hostname);
		if(dotMissing) { return "your URL hostname doesn't look quite right"};

		// make an http request

		// check if status code starts with 2

	}
};

// console.log(validator.tester('What in the world is this'));

module.exports = validator;