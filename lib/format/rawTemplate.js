/* jshint node:true */
/* global require */
/* global exports */
'use strict';


exports.format   = 'packet.format.raw';

exports.validate = function validate () {
  return (this.data && this.format === 'packet.format.raw');
};

exports.init = function init (data) {
  this.data = data;

  return this;
};

exports.getData = function getData () {
  return packet.data;
};

exports.setData = function setData (data) {
  this.data = data;
};

exports.toString = function toString () {
  return JSON.stringify(this.data);
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
