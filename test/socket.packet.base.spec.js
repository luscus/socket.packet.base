/* jshint node:true */
/* global require */
/* jshint expr:true*/
/* global describe */
/* global it */
'use strict';

require('chai').should();

var packets    = require('../lib/socket.packet.base');

//var packet = new packets.instantiate({format: 'packet.format.raw', data:{test:true}}, {uri:'test'});
var packet = new packets.instantiate({test:true}, {uri:'test'});

console.log(packet);
console.log('-------------------');
console.log(packet.toString());
console.log(packet.validate());
console.log(packet.transform('packet.format.raw'));

console.log('-------------------');
console.log(packets.instantiate({test:true}, {uri:'test'}).id);
console.log(packets.instantiate({test:true}, {uri:'test'}).id);
console.log(packets.instantiate({test:true}, {uri:'test'}).id);
console.log(packets.instantiate({test:true}, {uri:'test'}).id);
