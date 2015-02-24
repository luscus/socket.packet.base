/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var loader      = require('package.loader');
var constants   = require('./constants');
var formats     = require('./data/formats');
var validation  = require('./format/validation');
var rawTemplate = require('./format/rawTemplate');
var tools       = require('./tools');

// load the raw template
formats[rawTemplate.format] = rawTemplate;

// set default template
formats[constants.DEFAULT_FORMAT_NAME] = formats[rawTemplate.format];

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
 * Initialise a new packet
 *
 * @param {*} data any data to be transported through the network
 * @param {String} [targetFormatName] name of the wanted packet format type
 * @param {Object} [options] set of option needed on packet initialisation
 * @returns {Packet} returns a packet
 */
exports.instantiate = function instantiate (data, targetFormatName, options) {

  if (typeof targetFormatName !== 'string' && !options) {
    // options but no format name has been provided
    options          = targetFormatName;
    targetFormatName = '';
  }

  if (!targetFormatName) {
    // no format name has been provided
    targetFormatName = constants.DEFAULT_FORMAT_NAME;
  }

  return tools.transform(data, targetFormatName, options);
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
  return tools.transform(data, targetFormatName, options);
};

/**
 * Set the default packet format
 *
 * @param {String} formatName
 */
exports.setDefaultFormat = function setDefaultFormat (formatName) {

  if (tools.isFormatLoaded(formatName)) {
    formats[constants.DEFAULT_FORMAT_NAME] = require(formatName);
  }
};
