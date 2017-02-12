'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StorybookConsole = exports.LOG_EVENTS = exports.LOG_TYPES = exports.INFO = exports.WARN = exports.ERROR = exports.LOG = exports.PANNEL_ID = exports.ADDON_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LOG_TYPES, _LOG_EVENTS;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ADDON_ID = exports.ADDON_ID = 'rozon/storybook-console';
var PANNEL_ID = exports.PANNEL_ID = ADDON_ID + '/console-panel';

var createEventId = function createEventId(eventName) {
    return ADDON_ID + '/' + eventName;
};

var LOG = exports.LOG = 'log';
var ERROR = exports.ERROR = 'error';
var WARN = exports.WARN = 'warn';
var INFO = exports.INFO = 'info';

var LOG_TYPES = exports.LOG_TYPES = (_LOG_TYPES = {}, _defineProperty(_LOG_TYPES, LOG, LOG), _defineProperty(_LOG_TYPES, ERROR, ERROR), _defineProperty(_LOG_TYPES, INFO, INFO), _defineProperty(_LOG_TYPES, WARN, WARN), _LOG_TYPES);

var LOG_EVENTS = exports.LOG_EVENTS = (_LOG_EVENTS = {}, _defineProperty(_LOG_EVENTS, LOG, createEventId('log-event')), _defineProperty(_LOG_EVENTS, ERROR, createEventId('error-event')), _defineProperty(_LOG_EVENTS, INFO, createEventId('info-event')), _defineProperty(_LOG_EVENTS, WARN, createEventId('warn-event')), _LOG_EVENTS);

var StorybookConsole = exports.StorybookConsole = function (_React$Component) {
    _inherits(StorybookConsole, _React$Component);

    function StorybookConsole() {
        var _ref;

        _classCallCheck(this, StorybookConsole);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = StorybookConsole.__proto__ || Object.getPrototypeOf(StorybookConsole)).call.apply(_ref, [this].concat(args)));

        _this.intercept = _this.intercept.bind(_this);
        _this.restoreConsole = _this.restoreConsole.bind(_this);
        _this.saveOriginalConsoleFunctions = _this.saveOriginalConsoleFunctions.bind(_this);
        _this.replaceConsoleFunctions = _this.replaceConsoleFunctions.bind(_this);

        _this.originalConsoleFunctions = {};
        Object.keys(LOG_TYPES).forEach(function (type) {
            return _this.originalConsoleFunctions[type] = undefined;
        });

        return _this;
    }

    _createClass(StorybookConsole, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            var channel = _storybookAddons2.default.getChannel();

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

            Object.keys(LOG_TYPES).forEach(function (type) {
                _this2.originalConsoleFunctions[type] = window.console[type];
            });
        }
    }, {
        key: 'replaceConsoleFunctions',
        value: function replaceConsoleFunctions(channel) {
            var _this3 = this;

            var config = Object.keys(LOG_TYPES).map(function (type) {
                return [LOG_TYPES[type], LOG_EVENTS[type], _this3.originalConsoleFunctions[LOG_TYPES[type]], channel];
            });

            config.forEach(function (conf) {
                return _this3.intercept.apply(_this3, _toConsumableArray(conf));
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

            Object.keys(this.originalConsoleFunctions).forEach(function (logType) {
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