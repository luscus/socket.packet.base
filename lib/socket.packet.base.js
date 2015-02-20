/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

var pless     = require('prototype-less');
var loader    = require('package.loader');
var template  = require('./template');
var defaultT  = require('./format/default');
var format;

try {
  // load packet format package
  format = loader.requireFromRoot(/packet\.format\.[a-z0-9A-Z]*/);
}
catch (error) {
  // no format package found,
  // load default
  format = defaultT;
}


module.exports = function Packet (data, connection) {

  if (!this instanceof Packet) {
    return new Packet(data, connection);
  }

  pless.mixin(this, template);
  pless.mixin(this, format);
  
  return this;
};
