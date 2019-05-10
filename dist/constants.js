"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _LOG_TYPES, _LOG_EVENTS;

var ADDON_ID = 'rozon/storybook-console';
var PANNEL_ID = "".concat(ADDON_ID, "/console-panel");
var LOG = 'log';
var ERROR = 'error';
var WARN = 'warn';
var INFO = 'info';
var LOG_TYPES = (_LOG_TYPES = {}, (0, _defineProperty2.default)(_LOG_TYPES, ERROR, ERROR), (0, _defineProperty2.default)(_LOG_TYPES, INFO, INFO), (0, _defineProperty2.default)(_LOG_TYPES, LOG, LOG), (0, _defineProperty2.default)(_LOG_TYPES, WARN, WARN), _LOG_TYPES);

var createEventId = function createEventId(eventName) {
  return "".concat(ADDON_ID, "/").concat(eventName);
};

var LOG_EVENTS = (_LOG_EVENTS = {}, (0, _defineProperty2.default)(_LOG_EVENTS, ERROR, createEventId('error-event')), (0, _defineProperty2.default)(_LOG_EVENTS, INFO, createEventId('info-event')), (0, _defineProperty2.default)(_LOG_EVENTS, LOG, createEventId('log-event')), (0, _defineProperty2.default)(_LOG_EVENTS, WARN, createEventId('warn-event')), _LOG_EVENTS);
module.exports = {
  ADDON_ID: ADDON_ID,
  PANNEL_ID: PANNEL_ID,
  LOG: LOG,
  ERROR: ERROR,
  WARN: WARN,
  INFO: INFO,
  LOG_TYPES: LOG_TYPES,
  LOG_EVENTS: LOG_EVENTS
};