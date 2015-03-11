/*jshint node:true*/
/*global describe, it*/
'use strict';

/**
 * dependencies
 */
var assert   = require('assert');
var request  = require('supertest');
var app      = require('../');
var services = require('../services');
var fixtures = require('./fixtures');

/**
 * tests
 */
describe('Middle Ho Tests', function () {
  describe('App Core', function () {
    it('should get a 500', function (done) {
      request(app)
        .post('/baz')
        .send(fixtures.foo)
        .expect(500, done);
    });

    it('should get a 200', function (done) {
      request(app)
        .post('/bar/foo')
        .send(fixtures.foo)
        .expect(200, done);
    });
  });

  describe('Services', function () {
    it('Foo to Bar', function () {
      assert.deepEqual(services.foo('bar', fixtures.foo), {
        name : 'Renan Couto'
      });
    });

    it('Codeship to Hall', function () {
      assert.deepEqual(services.codeship('hall', fixtures.codeship), {
        title   : 'testing: codeship/docs',
        message : 'Merge pull request #34 from codeship/feature/shallow-clone',
        image   : 'https://codeship.com/apple-touch-icon.png'
      });
    });
  });

  describe('Integration', function () {
    it('should get a 200 (Codeship to Hall)', function (done) {
      this.timeout(5000);

      request(app)
        .post('/codeship/hall')
        .send(fixtures.codeship)
        .expect(200, done);
    });
  });
});
