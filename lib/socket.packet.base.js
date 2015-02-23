/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

var pless     = require('prototype-less');
var loader    = require('package.loader');
var template  = require('./template');
var constants = require('./constants');
var tools     = require('./format/tools');
var formats   = require('./format/formats');

// load default behaviour
formats[constants.DEFAULT_FORMAT_NAME] = require('./format/default');

try {
  // load packet format package
  formats = loader.loadFromRoot(constants.FORMAT_REGEX);
}
catch (error) {
  // no format package found,
}

/**
 *
 * @param data
 * @param format
 * @param connection
 * @returns {module}
 * @constructor
 */
exports.Packet = function Packet (data, targetFormatName, connection) {

  if (!this instanceof Packet) {
    return new Packet(data, connection);
  }

  var dataFormatName = tools.findFormat(data);

  if (typeof targetFormatName !== 'string' && !connection) {
    // no format has been provided
    connection       = targetFormatName;
    targetFormatName = undefined;
  }

  if (!targetFormatName) {
    targetFormatName = constants.DEFAULT_FORMAT_NAME;
  }

  var formatTemplate = tools.getFormat(targetFormatName);

  if (dataFormatName === constants.RAW_PACKET_NAME) {
    // Raw data: init packet
    return formatTemplate.init(data, connection);
  }
  else {
    // Packet: apply the wanted format template
    return pless.mixin(data, formatTemplate);
  }
};

/**
 * Set the default packet format
 *
 * @param formatName
 */
exports.setDefaultFormat = function setDefaultFormat (formatName) {

  if (tools.isFormatLoaded(formatName)) {
    formats[constants.DEFAULT_FORMAT_NAME] = require(formatName);
  }
};
