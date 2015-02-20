/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

var Crypto = require('crypto');

exports.isPacket = function isPacket () {
  return (this.header && this.data);
};

exports.getId = function getId (connection, now) {
  now = (now ? now.toString() : exports.now().toString());

  var target = (typeof connection === 'string' ? connection : connection.uri);
  var shasum = Crypto.createHash('sha1');

  shasum.update(target);
  shasum.update(now);

  return shasum.digest('hex');
};

exports.init = function init (data, connection) {
  var packet = {};

  packet.data                     = data;

  packet.header                   = {};
  packet.header.id                = exports.getId(connection);
  packet.header.created           = exports.now();

  return packet;
};

exports.requestStart = function requestStart (packet) {

  if (packet.header && packet.header.created) {
    var timestamp  = exports.now(packet.header.created);

    packet.header.requestStart = timestamp;
  }

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

exports.stats = function stats (packet) {

  if (packet.header && packet.header.responseStart && packet.header.responseTime !== undefined) {
    var responseSendTime = packet.header.responseStart + packet.header.responseTime;
    var timestamp = exports.now(responseSendTime);

    packet.header.queueLatency    = packet.header.requestStart - packet.header.created;
    packet.header.requestLatency  = packet.header.responseStart - packet.header.requestStart;
    packet.header.responseTime    = packet.header.responseStart - packet.header.responseEnd;
    packet.header.responseLatency = timestamp - responseSendTime;

    packet.header.latency         = packet.header.requestLatency + packet.header.responseLatency;
    packet.header.processTime     = packet.header.latency + packet.header.responseTime;
  }

  return packet;
};

exports.destroy = function destroy () {
  delete this;
  //this = undefined;
};
