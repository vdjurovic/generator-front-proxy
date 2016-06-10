var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('express-http-proxy');

var config = require('./config.json');

var app = express();

app.use(logger('dev'));
app.use(cookieParser());

/**
 * Use this function for decorating proxied request. For example,
 * you can add or delete request headers, examine request body etc.
 */
function onDecorateRequest(req) {
  // example of adding custom header
  //req.headers['my-custom-header'] = 'someHeaderValue';
}


app.all(config.proxyPathPattern, proxy(config.targetUrl, {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  },
  decorateRequest: function(req) {
      onDecorateRequest(req);
       req.bodyContent = req.bodyContent;
       return req;
  }
}));



// This will allow or reject self-signed certificates. In config.json, set rejectUnsignedCerts to 0 to allow,
// or to 1 to reject. By default, unsigned cetificates are allowed (for development purposes)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.rejectUnsignedCerts;
app.use(express.static(path.join(__dirname, '../src')));
app.use('/bower_components',  express.static( path.join(__dirname, '../bower_components')));
	
app.use(favicon(path.join(__dirname, '../src/favicon.ico')));

// Error Handling
app.use(function(err, req, res, next) {
  console.log(err);
 res.status(err.status || 500);
});




module.exports = app;
