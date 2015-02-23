/* jshint node:true */
/* global require */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var packets    = require('../lib/socket.packet.base.js');

var packet = new packets.Packet({test:true}, {uri:'test'});

console.log(packet);

packet.destroy();
