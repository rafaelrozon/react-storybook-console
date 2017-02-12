'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _reactInspector = require('react-inspector');

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _info = require('./svg/info.js');

var _info2 = _interopRequireDefault(_info);

var _log = require('./svg/log.js');

var _log2 = _interopRequireDefault(_log);

var _warn = require('./svg/warn.js');

var _warn2 = _interopRequireDefault(_warn);

var _error = require('./svg/error.js');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *  Create a panel to display messages sent to the console
 */
var StorybookConsolePanel = function (_React$Component) {
    _inherits(StorybookConsolePanel, _React$Component);

    function StorybookConsolePanel() {
        var _ref;

        _classCallCheck(this, StorybookConsolePanel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = StorybookConsolePanel.__proto__ || Object.getPrototypeOf(StorybookConsolePanel)).call.apply(_ref, [this].concat(args)));

        _this.state = {
            history: []
        };

        _this.onConsoleLog = _this.onConsoleLog.bind(_this);
        _this.clearConsole = _this.clearConsole.bind(_this);
        _this.resetState = _this.resetState.bind(_this);
        _this.getSVG = _this.getSVG.bind(_this);

        return _this;
    }

    /**
     *  Call onConsoleLog when any of the LOG_EVENTS is fired up.
     *  If user changes the story stop listenening and clear state.
     */


    _createClass(StorybookConsolePanel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                channel = _props.channel,
                api = _props.api;


            Object.keys(_index.LOG_EVENTS).forEach(function (event) {
                channel.on(_index.LOG_EVENTS[event], _this2.onConsoleLog);
            });

            // Clear the current log on every story change.
            this.stopListeningOnStory = api.onStory(function () {
                return _this2.resetState();
            });
        }

        /**
         * Remove channel listeners and reset state when story changes.
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this3 = this;

            var _props2 = this.props,
                channel = _props2.channel,
                api = _props2.api;


            if (this.stopListeningOnStory) {
                this.stopListeningOnStory();
            }

            Object.keys(_index.LOG_EVENTS).forEach(function (event) {
                channel.removeListener(_index.LOG_EVENTS[event], _this3.onConsoleLog);
            });
        }
    }, {
        key: 'resetState',
        value: function resetState() {
            this.setState({ history: [] });
        }

        /**
         *  Handle events emmitted from the channel when console functions are called.
         *
         *  @param [Array]  consoleArgs     arguments passed to console functions
         *  @param [string] type            console function type, one of LOG_TYPES
         *
         */

    }, {
        key: 'onConsoleLog',
        value: function onConsoleLog(consoleArgs, type) {

            var currentHistory = this.state.history;

            var createItemKey = function createItemKey(txt) {
                return '' + txt + Math.random().toString(16).slice(2);
            };

            var elements = consoleArgs.map(function (arg, ndx) {

                var key = createItemKey('log_item_ndx_');

                if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {

                    return _react2.default.createElement(
                        'div',
                        { style: _styles2.default.inspector, key: key },
                        _react2.default.createElement(_reactInspector.ObjectInspector, {
                            data: arg,
                            showNonenumerable: true
                        })
                    );
                } else {
                    return _react2.default.createElement(
                        'span',
                        { style: _styles2.default.element, key: key },
                        arg
                    );
                }
            });

            var SvgIcon = this.getSVG(type);

            var newText = _react2.default.createElement(
                'div',
                { key: createItemKey('log_ndx_'), style: _styles2.default.logMsg },
                _react2.default.createElement(SvgIcon, { style: _styles2.default.logIcon }),
                elements,
                _react2.default.createElement('br', null)
            );

            this.setState({
                history: currentHistory.concat(newText)
            });
        }

        /**
         * Clear content of console panel, but keep the original mensages in the browser console.
         */

    }, {
        key: 'clearConsole',
        value: function clearConsole() {
            this.resetState();
        }
    }, {
        key: 'getSVG',
        value: function getSVG(logType) {

            switch (logType) {
                case _index.LOG:
                    return _log2.default;
                case _index.INFO:
                    return _info2.default;
                case _index.WARN:
                    return _warn2.default;
                case _index.ERROR:
                    return _error2.default;
                default:
                    return _log2.default;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var history = this.state.history;


            return _react2.default.createElement(
                'div',
                { style: _styles2.default.consolePanel },
                _react2.default.createElement(
                    'button',
                    { style: _styles2.default.clearBtn, onClick: this.clearConsole },
                    'Clear'
                ),
                _react2.default.createElement(
                    'pre',
                    null,
                    _react2.default.createElement(
                        'div',
                        null,
                        history
                    )
                )
            );
        }
    }]);

    return StorybookConsolePanel;
}(_react2.default.Component);

/**
 *  Register the panel in the addons.
 */


_storybookAddons2.default.register(_index.ADDON_ID, function (api) {
    _storybookAddons2.default.addPanel(_index.PANEL_ID, {
        title: 'Console',
        render: function render() {
            return _react2.default.createElement(StorybookConsolePanel, { channel: _storybookAddons2.default.getChannel(), api: api });
        }
    });
});