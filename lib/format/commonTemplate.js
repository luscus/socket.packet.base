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
  return JSON.stringify(this);
};

exports.transform = function transform (targetFormatName, options) {
  return tools.transform(this, targetFormatName, options);
};

exports.requestReady = function requestReady () {
  return this;
};

exports.requestReceived = function requestReceived () {
  return this;
};

exports.responseReady = function responseReady () {
  return this;
};

exports.responseReceived = function responseReceived () {
  return this;
};
