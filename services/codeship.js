/*jshint node:true*/
'use strict';

/**
 * hall destination service
 * @param  {object} data [data object]
 * @return {object}      [parsed data]
 */
function hall (data) {
  data = data.build || null;

  return {
    title   : data ? [ data.status, data.project_full_name ].join(': ') : 'title',
    message : data ? data.message : 'message',
    image   : 'https://codeship.com/apple-touch-icon.png'
  };
}

/**
 * destinations services index
 * @type {Object}
 */
var destinations = {
  hall : hall
};

/**
 * codeship service
 * @param  {string} destination [destination service]
 * @param  {object} data        [request body object]
 * @return {object}             [destination service method]
 */
function codeship (destination, data) {
  return destinations[destination](data, destination);
}

/**
 * public
 */
module.exports = codeship;
