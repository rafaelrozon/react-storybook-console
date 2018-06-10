'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _index = require('./index');

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _error = require('./svg/error');

var _error2 = _interopRequireDefault(_error);

var _info = require('./svg/info');

var _info2 = _interopRequireDefault(_info);

var _log = require('./svg/log');

var _log2 = _interopRequireDefault(_log);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _warn = require('./svg/warn');

var _warn2 = _interopRequireDefault(_warn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Create a panel to display messages sent to the console
 */
var StorybookConsolePanel = function (_React$Component) {
    (0, _inherits3.default)(StorybookConsolePanel, _React$Component);

    function StorybookConsolePanel() {
        var _ref;

        (0, _classCallCheck3.default)(this, StorybookConsolePanel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = StorybookConsolePanel.__proto__ || (0, _getPrototypeOf2.default)(StorybookConsolePanel)).call.apply(_ref, [this].concat(args)));

        _this.state = { history: [] };

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


    (0, _createClass3.default)(StorybookConsolePanel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                channel = _props.channel,
                api = _props.api;


            (0, _keys2.default)(_index.LOG_EVENTS).forEach(function (event) {
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

            (0, _keys2.default)(_index.LOG_EVENTS).forEach(function (event) {
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

            var elements = consoleArgs.map(function (arg) {

                var key = createItemKey('log_item_ndx_');

                var item = void 0;

                if ((typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object') {

                    item = _react2.default.createElement(
                        'div',
                        { style: _styles2.default.inspector, key: key },
                        _react2.default.createElement(ObjectInspector, { data: arg, showNonenumerable: true })
                    );
                } else {

                    item = _react2.default.createElement(
                        'span',
                        { style: _styles2.default.element, key: key },
                        arg
                    );
                }

                return item;
            });

            var SvgIcon = this.getSVG(type);

            var newText = _react2.default.createElement(
                'div',
                { key: createItemKey('log_ndx_'), style: _styles2.default.logMsg },
                _react2.default.createElement(SvgIcon, { style: _styles2.default.logIcon }),
                ' ',
                elements,
                _react2.default.createElement('br', null)
            );

            this.setState({ history: currentHistory.concat(newText) });
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


_addons2.default.register(_index.ADDON_ID, function (api) {
    _addons2.default.addPanel(_index.PANEL_ID, {
        title: 'Console',
        render: function render() {
            return _react2.default.createElement(StorybookConsolePanel, { channel: _addons2.default.getChannel(), api: api });
        }
    });
});