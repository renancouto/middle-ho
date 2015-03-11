/*jshint node:true*/
'use strict';

/**
 * bar destination service
 * @param  {object} data [data object]
 * @return {object}      [parsed data]
 */
function bar (data) {
  return { name : [ data.firstname, data.lastname ].join(' ') };
}

/**
 * destinations services index
 * @type {Object}
 */
var destinations = {
  bar : bar
};

/**
 * foo service
 * @param  {string} destination [destination service]
 * @param  {object} data        [request body object]
 * @return {object}             [destination service method]
 */
function foo (destination, data) {
  return destinations[destination](data, destination);
}

/**
 * public
 */
module.exports = foo;
