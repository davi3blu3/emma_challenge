var http = require('http');
var express = require('express');
var rp = require('request-promise');
var errors = require('request-promise/errors');

var app = express();
app.use('/', function(req, res) {
	var url = 'http://' + req.originalUrl.substr(2);
	var html = getHtmlBody(url).then(function(val) {
		console.log(val);
	});
});

function getHtmlBody(url) {
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