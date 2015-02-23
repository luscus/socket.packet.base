/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

var Crypto = require('crypto');

exports.isPacket = function isPacket (packet) {
  return (packet);
};

exports.getId = function getId (packet) {
  return packet;
};

exports.init = function init (data) {
  return data;
};

exports.requestStart = function requestStart (packet) {
  return packet;
};

exports.responseStart = function responseStart (packet) {

  if (packet.header && packet.header.requestStart) {
    var timestamp  = exports.now(packet.header.requestStart);

    packet.header.responseStart  = timestamp;
  }

  return packet;
};

exports.responseEnd = function responseEnd (packet) {

  if (packet.header && packet.header.responseStart) {
    var timestamp  = exports.now(packet.header.responseStart);

    packet.header.responseEnd   = timestamp;
  }

  return packet;
};

exports.complete = function stats (packet) {

  return packet;
};

exports.destroy = function destroy () {
  delete this;
  //this = undefined;
};
