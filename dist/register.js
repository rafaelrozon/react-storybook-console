"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _reactInspector = require("react-inspector");

var _constants = require("./constants");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _error = _interopRequireDefault(require("./svg/error"));

var _info = _interopRequireDefault(require("./svg/info"));

var _log = _interopRequireDefault(require("./svg/log"));

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles"));

var _warn = _interopRequireDefault(require("./svg/warn"));

/**
 *  Create a panel to display messages sent to the console
 */
var StorybookConsolePanel =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(StorybookConsolePanel, _React$Component);

  function StorybookConsolePanel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, StorybookConsolePanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(StorybookConsolePanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      history: [],
      isMounted: false
    };
    _this.onConsoleLog = _this.onConsoleLog.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearConsole = _this.clearConsole.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resetState = _this.resetState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getSVG = _this.getSVG.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.saveOriginalConsoleFunctions = _this.saveOriginalConsoleFunctions.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.replaceConsoleFunctions = _this.replaceConsoleFunctions.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.intercept = _this.intercept.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.originalConsoleFunctions = {};
    Object.keys(_constants.LOG_TYPES).forEach(function (type) {
      _this.originalConsoleFunctions[type] = window.console[type];
    }); // this.replaceConsoleFunctions(this.props.channel);

    Object.keys(_constants.LOG_EVENTS).forEach(function (event) {
      _this.props.channel.on(_constants.LOG_EVENTS[event], _this.onConsoleLog);
    });
    return _this;
  }
  /**
   *  Call onConsoleLog when any of the LOG_EVENTS is fired up.
   *  If user changes the story stop listenening and clear state.
   */


  (0, _createClass2.default)(StorybookConsolePanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          channel = _this$props.channel,
          api = _this$props.api;
      console.log('panel mounted', channel, api, _constants.LOG_EVENTS); // Clear the current log on every story change.

      this.stopListeningOnStory = api.onStory(function () {
        return _this2.resetState();
      });
    }
    /**
     * Remove channel listeners and reset state when story changes.
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      var _this$props2 = this.props,
          channel = _this$props2.channel,
          api = _this$props2.api;

      if (this.stopListeningOnStory) {
        this.stopListeningOnStory();
      }

      Object.keys(_constants.LOG_EVENTS).forEach(function (event) {
        channel.removeListener(_constants.LOG_EVENTS[event], _this3.onConsoleLog);
      });
    }
  }, {
    key: "resetState",
    value: function resetState() {
      this.setState({
        history: []
      });
    }
    /**
     *  Handle events emmitted from the channel when console functions are called.
     *
     *  @param [Array]  consoleArgs     arguments passed to console functions
     *  @param [string] type            console function type, one of LOG_TYPES
     *
     */

  }, {
    key: "onConsoleLog",
    value: function onConsoleLog(consoleArgs, type) {
      var currentHistory = this.state.history;

      var createItemKey = function createItemKey(txt) {
        return "".concat(txt).concat(Math.random().toString(16).slice(2));
      };

      var elements = consoleArgs.map(function (arg) {
        var key = createItemKey('log_item_ndx_');
        var item;

        if ((0, _typeof2.default)(arg) === 'object') {
          item = _react.default.createElement("div", {
            style: _styles.default.inspector,
            key: key
          }, _react.default.createElement(_reactInspector.ObjectInspector, {
            data: arg,
            showNonenumerable: true
          }));
        } else {
          item = _react.default.createElement("span", {
            style: _styles.default.element,
            key: key
          }, arg);
        }

        return item;
      });
      var SvgIcon = this.getSVG(type);

      var newText = _react.default.createElement("div", {
        key: createItemKey('log_ndx_'),
        style: _styles.default.logMsg
      }, _react.default.createElement(SvgIcon, {
        style: _styles.default.logIcon
      }), " ", elements, _react.default.createElement("br", null));

      this.setState({
        history: currentHistory.concat(newText)
      });
    }
    /**
     * Clear content of console panel, but keep the original mensages in the browser console.
     */

  }, {
    key: "clearConsole",
    value: function clearConsole() {
      this.resetState();
    }
  }, {
    key: "getSVG",
    value: function getSVG(logType) {
      switch (logType) {
        case _constants.LOG:
          return _log.default;

        case _constants.INFO:
          return _info.default;

        case _constants.WARN:
          return _warn.default;

        case _constants.ERROR:
          return _error.default;

        default:
          return _log.default;
      }
    }
  }, {
    key: "saveOriginalConsoleFunctions",
    value: function saveOriginalConsoleFunctions() {
      var _this4 = this;

      Object.keys(_constants.LOG_TYPES).forEach(function (type) {
        _this4.originalConsoleFunctions[type] = window.console[type];
      });
    }
  }, {
    key: "replaceConsoleFunctions",
    value: function replaceConsoleFunctions(channel) {
      var _this5 = this;

      var config = Object.keys(_constants.LOG_TYPES).map(function (type) {
        return [_constants.LOG_TYPES[type], _constants.LOG_EVENTS[type], _this5.originalConsoleFunctions[_constants.LOG_TYPES[type]], channel];
      });
      config.forEach(function (conf) {
        return _this5.intercept.apply(_this5, (0, _toConsumableArray2.default)(conf));
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
    key: "render",
    value: function render() {
      if (this.props.active) {
        var history = this.state.history;
        console.log('>> here register');
        return _react.default.createElement("div", {
          style: _styles.default.consolePanel
        }, _react.default.createElement("button", {
          style: _styles.default.clearBtn,
          onClick: this.clearConsole
        }, "Clear"), _react.default.createElement("pre", null, _react.default.createElement("div", null, history)));
      } else {
        return _react.default.createElement("div", null);
      }
    }
  }]);
  return StorybookConsolePanel;
}(_react.default.Component);
/**
 *  Register the panel in the addons.
 */


_addons.default.register(_constants.ADDON_ID, function (api) {
  _addons.default.addPanel(_constants.PANEL_ID, {
    title: 'Console',
    render: function render(_ref) {
      var active = _ref.active;
      return _react.default.createElement(StorybookConsolePanel, {
        channel: _addons.default.getChannel(),
        api: api,
        active: active
      });
    }
  });
});