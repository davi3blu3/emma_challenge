var http = require('http');
var express = require('express');
var rp = require('request-promise');
var errors = require('request-promise/errors');

var app = express();

// allow cross origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// handle get requests
app.get('/', function(req, res) {
	// clean up req url data
	var url = 'http://' + req.originalUrl.substr(2);


	var html = getHtmlBody(url).then(function(val) {
		res.send(val);
	});
});

function getHtmlBody(url) {
	// returns raw html data
	return rp(url)
		.then(function(response){
			return(response);
		})
		.catch(errors.StatusCodeError, function(reason){
			return(reason.statusCode);
		})
		.catch(errors.RequestError, function(reason){
			return(reason.cause);
		});
};

app.listen(process.env.PORT || 3000);