/* jshint node:true */
/* global require */
/* global exports */
/* global module */
'use strict';

var pless       = require('prototype-less');
var loader      = require('package.loader');
var constants   = require('./constants');
var tools       = require('./format/tools');
var formats     = require('./data/formats');
var validation  = require('./format/validation');
var rawTemplate = require('./format/rawTemplate');

// load the raw template
formats[rawTemplate.format] = rawTemplate;

// load default behaviour
formats[constants.DEFAULT_FORMAT_NAME] = rawTemplate;

try {
  // load packet format package
  formats = loader.loadFromRoot(constants.FORMAT_REGEX);
}
catch (error) {
  // no format package found,
}

// validate all templates
var templateNames = Object.getOwnPropertyNames(formats);

templateNames.forEach(function formatTemplateIterator (templateName) {
  var template = formats[templateName];
  validation.validate(template);
});

/**
 *
 * @param data
 * @param format
 * @param connection
 * @returns {module}
 * @constructor
 */
exports.Packet = function Packet (data, targetFormatName, options) {

  var dataFormatName = tools.findFormat(data);

  if (typeof targetFormatName !== 'string' && !options) {
    // no format has been provided
    options          = targetFormatName;
    targetFormatName = undefined;
  }

  if (!targetFormatName) {
    targetFormatName = constants.DEFAULT_FORMAT_NAME;
  }

  var formatTemplate = tools.getFormat(targetFormatName);

  if (dataFormatName === constants.RAW_PACKET_NAME) {
    // Raw data: init packet
    var packet = pless.mixin({}, formatTemplate);
    return packet.init(data, options);
  }
  else {
    // Packet: apply the wanted format template
    return pless.mixin(data, formatTemplate);
  }
};

exports.transform = tools.transform;

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
