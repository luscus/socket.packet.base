/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

exports.isPacket = function isPacket () {
  throw new Error('Packet format has to implement a "isPacket" method');
};

exports.getId = function getId (connection, now) {
  throw new Error('Packet format has to implement a "getId" method');
};

exports.now = function now (limitInThePast) {

  var timestamp = Date.now();

  if (timestamp < limitInThePast) {
    timestamp = limitInThePast + 1;
  }

  return timestamp;
};

exports.init = function init (packet) {
  throw new Error('Packet format has to implement a "init" method');
};

exports.requestStart = function requestStart (packet) {
  throw new Error('Packet format has to implement a "requestStart" method');
};

exports.responseStart = function responseStart (packet) {
  throw new Error('Packet format has to implement a "responseStart" method');
};

exports.responseEnd = function responseEnd (packet) {
  throw new Error('Packet format has to implement a "responseEnd" method');
};

exports.stats = function stats (packet) {
  throw new Error('Packet format has to implement a "stats" method');
};

exports.destroy = function destroy (packet) {
  throw new Error('Packet format has to implement a "destroy" method');
};
