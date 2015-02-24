/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var tools        = require('./../tools');

exports.getData = function getData () {
  return this.data;
};

exports.setData = function setData (data) {
  this.data = data;
};

exports.toString = function toString () {
  return JSON.stringify(this.data);
};

exports.transform = function transform (targetFormatName, options) {
  return tools.transform(this, targetFormatName, options);
};
