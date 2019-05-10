"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

require('raf/polyfill');

var React = require('react');

var addons = require('@storybook/addons').default;

var _require = require('@storybook/addons'),
    makeDecorator = _require.makeDecorator;

var Constants = require('./constants');

console.log('INDEX ROOT');

var StorybookConsole =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(StorybookConsole, _React$Component);

  function StorybookConsole(props) {
    var _this;

    (0, _classCallCheck2.default)(this, StorybookConsole);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StorybookConsole).call(this, props));
    _this.state = {
      isMounted: false
    };
    console.log('StorybookConsole constructor');
    _this.channel = _this.props.channel;
    _this.intercept = _this.intercept.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.restoreConsole = _this.restoreConsole.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.saveOriginalConsoleFunctions = _this.saveOriginalConsoleFunctions.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.replaceConsoleFunctions = _this.replaceConsoleFunctions.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.originalConsoleFunctions = {};
    Object.keys(Constants.LOG_TYPES).forEach(function (type) {
      _this.originalConsoleFunctions[type] = undefined;
    });
    return _this;
  }

  (0, _createClass2.default)(StorybookConsole, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('index mounted');
      this.saveOriginalConsoleFunctions();
      this.replaceConsoleFunctions(this.channel);
      this.setState({
        isMounted: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.restoreConsole();
    }
  }, {
    key: "saveOriginalConsoleFunctions",
    value: function saveOriginalConsoleFunctions() {
      var _this2 = this;

      Object.keys(Constants.LOG_TYPES).forEach(function (type) {
        _this2.originalConsoleFunctions[type] = window.console[type];
      });
    }
  }, {
    key: "replaceConsoleFunctions",
    value: function replaceConsoleFunctions(channel) {
      var _this3 = this;

      var config = Object.keys(Constants.LOG_TYPES).map(function (type) {
        return [Constants.LOG_TYPES[type], Constants.LOG_EVENTS[type], _this3.originalConsoleFunctions[Constants.LOG_TYPES[type]], channel];
      });
      config.forEach(function (conf) {
        return _this3.intercept.apply(_this3, (0, _toConsumableArray2.default)(conf));
      });
    }
  }, {
    key: "intercept",
    value: function intercept(logType, eventType, originalFunc, channel) {
      window.console[logType] = function () {
        var text = Array.prototype.slice.call(arguments);
        originalFunc.apply(this, text);
        channel.emit(eventType, text, logType);
      };
    }
  }, {
    key: "restoreConsole",
    value: function restoreConsole() {
      var _this4 = this;

      Object.keys(this.originalConsoleFunctions).forEach(function (logType) {
        window.console[logType] = _this4.originalConsoleFunctions[logType];
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var isMounted = this.state.isMounted;
      console.log('>> index render ', isMounted);
      return isMounted ? children : React.createElement("div", null);
    }
  }]);
  return StorybookConsole;
}(React.Component);

var withConsoleX = function withConsoleX(storyFn) {
  return React.createElement(
  /*#__PURE__*/
  function (_React$Component2) {
    (0, _inherits2.default)(Delay, _React$Component2);

    function Delay(props) {
      var _this5;

      (0, _classCallCheck2.default)(this, Delay);
      _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Delay).call(this, props));
      _this5.state = {
        mounted: false
      };
      return _this5;
    }

    (0, _createClass2.default)(Delay, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setState({
          mounted: true
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.setState({
          mounted: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        return this.state.mounted ? React.createElement(StorybookConsole, {
          channel: addons.getChannel()
        }, storyFn()) : React.createElement("div", null);
      }
    }]);
    return Delay;
  }(React.Component));
};

var withConsole = makeDecorator({
  name: 'StorybookConsoleX',
  parameterName: 'console',
  allowDeprecatedUsage: true,
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: false,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;
    var channel = addons.getChannel();
    var story = getStory(context);
    console.log('>> wrapper ', parameters);
    channel.emit('rozon/storybook-console/log', {
      a: 123
    });
    return React.createElement(StorybookConsole, null, story);
  }
});
module.exports = {
  withConsole: withConsole
};