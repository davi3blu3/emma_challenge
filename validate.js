var url = 	 require('url');
var http = 	 require('http');
var https =  require('https');

// create validator object to house url test methods
var validator = {

	formatTest: function(testUrl) {

		// check URL for illegal characters, return error
		var illegalChar = new RegExp('["<>\\^`{}|]');
		var illegal = illegalChar.test(testUrl);
		if(illegal) { return "URL contains an illegal character" };

		// check for url protocol
		var urlObj = url.parse(testUrl);
		if(urlObj.protocol == undefined) { return "URL is missing a protocol like 'http'" };

		return "URL looks ok";
	},

	networkTest: function(testUrl) {

		return new Promise(function(resolve, reject) {

			// match correct library with protocol
			var proto = testUrl.startsWith('https') ? https : http;

			// make http 'GET' request
			var request = proto.get(testUrl, function(response) {
				resolve([response.statusCode, testUrl]);
			});

			// even errors resolve promise, so map function will work
			request.on('error', function(err) {
				resolve(['Error connecting to page', testUrl]);
			});
		});
	}
};


module.exports = validator;