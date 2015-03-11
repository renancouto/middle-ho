/*jshint node:true*/
'use strict';

/**
 * dependencies
 */
var express    = require('express');
var bodyParser = require('body-parser');
var config     = require('./config');
var router     = require('./router');

/**
 * settings
 */
var app  = express();
var port = process.env.PORT || config.app.PORT;
var server;

/**
 * setup
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use('/', router);

/**
 * init
 */
server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('%s is up and running on http://%s/%s', config.app.NAME, host, port);
});

/**
 * public
 */
module.exports = app;
