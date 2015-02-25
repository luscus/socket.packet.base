/* jshint node:true */
/* global require */
/* global exports */
'use strict';

var loader         = require('package.loader');
var pless          = require('prototype-less');
var constants      = require('./constants');
var formats        = require('./data/formats');
var validation     = require('./format/validation');
var commonTemplate = require('./format/rawTemplate');
var rawTemplate    = require('./format/rawTemplate');
var tools          = require('./tools');
var loadedFormat   = {};

try {
  // load packet format package
  loadedFormat = loader.loadFromRoot(constants.FORMAT_REGEX);
}
catch (error) {
  // no format package found,
}

// load the raw template
loadedFormat[rawTemplate.format] = rawTemplate;

// validate all templates
var templateNames = Object.getOwnPropertyNames(loadedFormat);

templateNames.forEach(function formatTemplateIterator (templateName) {
  var template = pless.mixin({}, commonTemplate);

  pless.mixin(template, loadedFormat[templateName]);

  validation.validate(template);

  formats[templateName] = template;
});

// set default template
formats[constants.DEFAULT_FORMAT_NAME] = formats[rawTemplate.format];


/**
 * Initialise a new packet
 *
 * @param {*} data any data to be transported through the network
 * @param {String} [targetFormatName] name of the wanted packet format type
 * @param {Object} [options] set of option needed on packet initialisation
 * @returns {Object} returns a packet
 */
exports.instantiate = function instantiate (data, targetFormatName, options) {

  if (typeof targetFormatName !== 'string' && !options) {
    // options but no format name has been provided
    options          = targetFormatName;
    targetFormatName = '';
  }

  if (!targetFormatName) {
    // no format name has been provided
    // check data for format information
    targetFormatName = tools.findFormat(data);
  }

  return tools.transform(data, targetFormatName, options);
};

/**
 * Transforms a packet into the wanted packet format
 *
 * @param {(*|Object)} data any data or a packet
 * @param {String} targetFormatName the wanted format type
 * @param {Object} [options] set of option needed on packet initialisation
 * @returns {Object}
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

  // check provided format name
  tools.isFormatName(formatName, true);

  // load specified format as default format
  formats[constants.DEFAULT_FORMAT_NAME] = tools.getFormat(formatName);
};
