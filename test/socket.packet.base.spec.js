/* jshint node:true */
/* global require */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var Packet    = require('../lib/socket.packet.base.js');

var packet = new Packet({bla:true}, null);

console.log(packet);

packet.destroy();

console.log(packet);
