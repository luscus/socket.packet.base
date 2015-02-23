/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

var formats   = require('./formats');
var constants = require('../constants');
var pless     = require('prototype-less');

exports.isFormatName = function isFormatName (formatName) {
  return (formatName.match(constants.FORMAT_REGEX) === null);
};

exports.isFormatLoaded = function isFormatLoaded (formatName) {
  if (!exports.isFormatName(formatName)) {
    return false;
  }

  return (formats[formatName]);
};

exports.getFormat = function getFormat (formatName) {
  if (!exports.isFormatLoaded(formatName)) {
    throw new Error(
      'Packet format "' + data.format + '" not loaded:' +
      '  npm install ' + data.format + ' --save'
    );
  }
  else {
    return formats[formatName];
  }
};

exports.findFormat = function findFormat (data) {
  if (!data.format || exports.isFormatName(data.format)) {
    return constants.RAW_PACKET_NAME;
  }
  else {
    var formatNames = Object.getOwnPropertyNames(formats);
    var index       = formatNames.length;
    var formatName;

    while (index--) {
      formatName = formatNames[index];

      if (data.format === formatName && formats[formatName].valid(data)) {
        return formatName;
      }
    }

    throw new Error(
      'Packet format "' + data.format + '" unknown:' +
      '  npm install ' + data.format + ' --save' +
      '  or implement it...'
    );
  }
};

exports.transform = function transform (data, targetFormatName) {

  var actualFormatName = exports.findFormat(data);
  var targetFormat     = exports.getFormat(targetFormatName);

  if (actualFormatName === constants.RAW_PACKET_NAME) {
    // raw data
    return targetFormat.init(data);
  }
  else {
    // packet transformation
    pless.mixin(data, targetFormat);

    return data;
  }
};
