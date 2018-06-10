'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorybookConsole = exports.LOG_EVENTS = exports.LOG_TYPES = exports.INFO = exports.WARN = exports.ERROR = exports.LOG = exports.PANNEL_ID = exports.ADDON_ID = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _LOG_TYPES, _LOG_EVENTS;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADDON_ID = exports.ADDON_ID = 'rozon/storybook-console';
var PANNEL_ID = exports.PANNEL_ID = ADDON_ID + '/console-panel';

var createEventId = function createEventId(eventName) {
    return ADDON_ID + '/' + eventName;
};

var LOG = exports.LOG = 'log';
var ERROR = exports.ERROR = 'error';
var WARN = exports.WARN = 'warn';
var INFO = exports.INFO = 'info';

var LOG_TYPES = exports.LOG_TYPES = (_LOG_TYPES = {}, (0, _defineProperty3.default)(_LOG_TYPES, ERROR, ERROR), (0, _defineProperty3.default)(_LOG_TYPES, INFO, INFO), (0, _defineProperty3.default)(_LOG_TYPES, LOG, LOG), (0, _defineProperty3.default)(_LOG_TYPES, WARN, WARN), _LOG_TYPES);

var LOG_EVENTS = exports.LOG_EVENTS = (_LOG_EVENTS = {}, (0, _defineProperty3.default)(_LOG_EVENTS, ERROR, createEventId('error-event')), (0, _defineProperty3.default)(_LOG_EVENTS, INFO, createEventId('info-event')), (0, _defineProperty3.default)(_LOG_EVENTS, LOG, createEventId('log-event')), (0, _defineProperty3.default)(_LOG_EVENTS, WARN, createEventId('warn-event')), _LOG_EVENTS);

var StorybookConsole = exports.StorybookConsole = function (_React$Component) {
    (0, _inherits3.default)(StorybookConsole, _React$Component);

    function StorybookConsole() {
        var _ref;

        (0, _classCallCheck3.default)(this, StorybookConsole);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = StorybookConsole.__proto__ || (0, _getPrototypeOf2.default)(StorybookConsole)).call.apply(_ref, [this].concat(args)));

        _this.intercept = _this.intercept.bind(_this);
        _this.restoreConsole = _this.restoreConsole.bind(_this);
        _this.saveOriginalConsoleFunctions = _this.saveOriginalConsoleFunctions.bind(_this);
        _this.replaceConsoleFunctions = _this.replaceConsoleFunctions.bind(_this);

        _this.originalConsoleFunctions = {};

        (0, _keys2.default)(LOG_TYPES).forEach(function (type) {
            _this.originalConsoleFunctions[type] = undefined;
        });

        return _this;
    }

    (0, _createClass3.default)(StorybookConsole, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            var channel = _addons2.default.getChannel();

            this.saveOriginalConsoleFunctions();

            this.replaceConsoleFunctions(channel);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.restoreConsole();
        }
    }, {
        key: 'saveOriginalConsoleFunctions',
        value: function saveOriginalConsoleFunctions() {
            var _this2 = this;

            (0, _keys2.default)(LOG_TYPES).forEach(function (type) {
                _this2.originalConsoleFunctions[type] = window.console[type];
            });
        }
    }, {
        key: 'replaceConsoleFunctions',
        value: function replaceConsoleFunctions(channel) {
            var _this3 = this;

            var config = (0, _keys2.default)(LOG_TYPES).map(function (type) {
                return [LOG_TYPES[type], LOG_EVENTS[type], _this3.originalConsoleFunctions[LOG_TYPES[type]], channel];
            });

            config.forEach(function (conf) {
                return _this3.intercept.apply(_this3, (0, _toConsumableArray3.default)(conf));
            });
        }
    }, {
        key: 'intercept',
        value: function intercept(logType, eventType, originalFunc, channel) {

            window.console[logType] = function () {

                var text = Array.prototype.slice.call(arguments);

                originalFunc.apply(this, text);
                channel.emit(eventType, text, logType);
            };
        }
    }, {
        key: 'restoreConsole',
        value: function restoreConsole() {
            var _this4 = this;

            (0, _keys2.default)(this.originalConsoleFunctions).forEach(function (logType) {
                window.console[logType] = _this4.originalConsoleFunctions[logType];
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;


            return children;
        }
    }]);
    return StorybookConsole;
}(_react2.default.Component);

exports.default = function (story) {
    return _react2.default.createElement(
        StorybookConsole,
        null,
        story()
    );
};