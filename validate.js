var url = require('url');
var http = require('http');

var validator = {

	formatTest: function(testUrl) {

		// check URL for illegal characters, return error
		var illegalChar = new RegExp('["<>\\^`{}|]');
		var illegal = illegalChar.test(testUrl);
		if(illegal) { return "URL contains an illegal character" };

		// check for url protocol
		var urlObj = url.parse(testUrl);
		if(urlObj.protocol == undefined) { return "URL is missing a protocol like 'http'" };

		// check if hostname contains '.'
		var dot = new RegExp('.');
		var dotFound = dot.test(urlObj.hostname);
		if(!dotFound) { return "URL hostname not formatted correctly"};

		// make an http request
		// this.networkTest(testUrl)
		// 	.then(function(response){
		// 		console.log(response);
		// 	})
		// 	.catch(function(err){
		// 		console.log(error);
		// 	})
	},

	networkTest: function(testUrl) {
		// return pending promise
		return new Promise(function(resolve){

			var request = http.get(testUrl, function(response){
				if (response.statusCode < 200 || response.statusCode > 299) {
					resolve(new Error('Failed to load page, status code: ' + response.statusCode))
				} else {
					resolve('Success');
				};
			});
		});
	}
};

console.log(validator.formatTest('http://w2.ww.goo.asdgle.com/'));

module.exports = validator;