var url = 	 require('url');
var http = 	 require('http');
var https =  require('https');

// create validator object to house url test methods
var validator = {

	iterate: function(URLarray) {

		// applies test to every URL in array
		var urlMap = URLarray.map(this.networkTest);

		// waits until all promises have been returned from networkTest function
		Promise.all(urlMap).then(function(results) {
			var problemURLs = [];
			for (var i = 0; i < results.length; i++ ) {

				// check results for status codes other than 200
				if (results[i][0] !== 200) {
					problemURLs.push(results[i]);
				}
			};
			return problemURLs;
		})	
	},

	formatTest: function(testUrl) {




	},

	networkTest: function(testUrl) {

		return new Promise(function(resolve, reject) {

		// Test for URL issues
			// check URL for illegal characters, return error
			var illegalChar = new RegExp('["<>\\^`{}|]');
			var illegal = illegalChar.test(testUrl);
			if(illegal) { resolve(['URL contains an illegal character', testUrl]); };


			// check for url protocol
			var urlObj = url.parse(testUrl);
			if(urlObj.protocol == undefined) { resolve(['URL is missing protocol', testUrl]);};


		// Test for http status
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
validator.iterate(["http://www.google.com",
	"http://www.yahoo.com",
	"https://github.com",
	"http://www.prodigy.net",
	"http://www.starwars.com",
	"http://www.homestarrunner.com",
	"http://www.mtv.com"
	]);

module.exports = validator;