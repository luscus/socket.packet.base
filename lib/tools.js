/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

var formats   = require('./data/formats');
var constants = require('constants');
var pless     = require('prototype-less');

exports.isFormatName = function isFormatName (formatName) {
  return (
    formatName.match(constants.FORMAT_REGEX) !== null ||
    formatName === constants.DEFAULT_FORMAT_NAME
  );
};

exports.isInstantiated = function isInstantiated (packet) {
  return (
    typeof packet.init === 'function' &&
    typeof packet.validate === 'function'
  );
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
      'Packet format "' + formatName + '" not loaded:' +
      '  npm install ' + formatName + ' --save'
    );
  }
  else {
    return formats[formatName];
  }
};

exports.findFormat = function findFormat (data) {
  if (!data.format || !exports.isFormatName(data.format)) {
    // Raw data: no valid format name found
    return constants.RAW_PACKET_NAME;
  }
  else {
    var formatNames = Object.getOwnPropertyNames(formats);
    var index       = formatNames.length;
    var formatName;

    while (index--) {
      formatName = formatNames[index];

      if (
        data.format === formatName &&
        formatName !== constants.DEFAULT_FORMAT_NAME &&
        formats[formatName].validate(data)
      ) {
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

/**
 * Transforms a packet into the wanted packet format
 *
 * @param {(*|Packet)} data any data or a packet
 * @param {String} targetFormatName the wanted format type
 * @param {Object} [options] set of option needed on packet initialisation
 * @returns {Packet}
 */
exports.transform = function transform (data, targetFormatName, options) {

  var currentFormatName = exports.findFormat(data);

  if (currentFormatName !== constants.RAW_PACKET_NAME && !exports.isInstantiated(data)) {
    // data is no raw data but a stringified packet
    // add packet format methods
    pless.mixin(data, exports.getFormat(currentFormatName));
  }

  if (currentFormatName === targetFormatName) {
    // current and target format names are identical
    return data;
  }
  else {
    // current and target format names are unequal
    // transform into the specified target format
    var targetFormat     = exports.getFormat(targetFormatName);
    var targetPacket;
    var targetData;

    if (currentFormatName === constants.RAW_PACKET_NAME) {
      // Raw data: create packet
      targetPacket = pless.mixin({}, targetFormat);
      targetData   = data;
    }
    else {
      // Packet: start transformation
      // retrieve data from the current packet format
      targetData   = data.getData();

      // overwrite current methods with target format methods
      targetPacket = pless.mixin(data, targetFormat);
    }

    // initialise new format with data and options
    return targetPacket.init(targetData, options);
  }
};
