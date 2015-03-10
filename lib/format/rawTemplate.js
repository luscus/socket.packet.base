/* jshint node:true */
/* global require */
/* global exports */
'use strict';

exports.format   = 'packet.format.raw';

exports.validate          = function validate (packet) {
  packet = packet || this;

  return (packet.data && packet.format === exports.format);
};

exports.init = function init (data) {
  this.data = data;

  return this;
};

exports.toString = function toString () {
  return JSON.stringify(this.data);
};
