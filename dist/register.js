'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybookAddons = require('@kadira/storybook-addons');

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _index = require('./index');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            text: ''
        };

        _this.onConsoleLog = _this.onConsoleLog.bind(_this);
        _this.clearConsole = _this.clearConsole.bind(_this);
        _this.resetState = _this.resetState.bind(_this);

        return _this;
    }

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
                _this2.resetState();
            });
        }
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
            this.setState({ text: '' });
        }
    }, {
        key: 'onConsoleLog',
        value: function onConsoleLog(text, type) {
            this.setState({ text: this.state.text + '[' + type + '] ' + text + '<br/>' });
        }
    }, {
        key: 'clearConsole',
        value: function clearConsole() {
            this.setState({ text: '' });
        }
    }, {
        key: 'render',
        value: function render() {
            var text = this.state.text;


            return _react2.default.createElement(
                'div',
                { style: _styles2.default.consolePanel },
                _react2.default.createElement(
                    'button',
                    { style: _styles2.default.clearButton, onClick: this.clearConsole },
                    'Clear'
                ),
                _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: text } })
            );
        }
    }]);

    return StorybookConsolePanel;
}(_react2.default.Component);

_storybookAddons2.default.register(_index.ADDON_ID, function (api) {
    _storybookAddons2.default.addPanel(_index.PANEL_ID, {
        title: 'Console',
        render: function render() {
            return _react2.default.createElement(StorybookConsolePanel, { channel: _storybookAddons2.default.getChannel(), api: api });
        }
    });
});