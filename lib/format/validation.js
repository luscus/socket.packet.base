/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var assert = require('assert-plus');
var tools  = require('./tools');


exports.validate = function validate (template) {

  // check format name
  assert.string(template.format,         'template.format');
  tools.isFormatName(template.format);

  // check template methods
  assert.func(template.validate,         'template.validate');
  assert.func(template.init,             'template.init');
  assert.func(template.getData,          'template.getData');
  assert.func(template.setData,          'template.setData');
  assert.func(template.toString,         'template.toString');
  assert.func(template.requestReady,     'template.requestReady');
  assert.func(template.requestReceived,  'template.requestReceived');
  assert.func(template.responseReady,    'template.responseReady');
  assert.func(template.responseReceived, 'template.responseReceived');

  return true;
};