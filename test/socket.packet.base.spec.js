/* jshint node:true */
/* global require */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var packets    = require('../lib/socket.packet.base.js');

var packet = new packets.Packet({format: 'packet.format.raw', data:{test:true}}, {uri:'test'});

console.log(packet);
console.log('-------------------');
console.log(packet.toString());
console.log(packet.validate());

