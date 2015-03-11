/*jshint node:true*/
'use strict';

/**
 * dependencies
 */
var express  = require('express');
var needle   = require('needle');
var debug    = require('debug')('router');
var services = require('./services');
var config   = require('./config');

/**
 * settings
 */
var router = express.Router();

/**
 * router
 */
router
  .post('/:from/:to?', function (req, res) {
    var destination = req.params.to;
    debug('destination', destination);

    if (!destination) {
      return res.status(500).send('Unknow destination webhook');
    }

    var toUrl = config.destinations[destination];
    debug('toUrl', toUrl);

    if (!toUrl) {
      return res.status(500).send('Destination webhook doesn\'t have a URL');
    }

    var service  = services[req.params.from];
    var response = service ? service(destination, req.body) : req.body;

    debug('params', req.params);
    debug('body', req.body);
    debug('response', response);

    needle.post(toUrl, response, null, function (error, response) {
      debug('error', error);
      debug('response body', response.body);

      res.status(error ? 500 : 200).send(error || 'The request to "' + destination + '" (destination webhook) was successful');
    });
  });

/**
 * public
 */
module.exports = router;
