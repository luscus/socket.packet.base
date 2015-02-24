/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var tools        = require('./../tools');

exports.format   = 'packet.format.raw';

exports.validate = function validate (packet) {
  packet = packet || this;

  return (packet.data && packet.format === 'packet.format.raw');
};

exports.init = function init (data) {
  this.data = data;

  return this;
};

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
