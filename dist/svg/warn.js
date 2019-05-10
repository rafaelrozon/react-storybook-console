"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var LogSVG =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LogSVG, _Component);

  function LogSVG() {
    (0, _classCallCheck2.default)(this, LogSVG);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LogSVG).apply(this, arguments));
  }

  (0, _createClass2.default)(LogSVG, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("svg", (0, _extends2.default)({
        version: "1.1"
      }, this.props, {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        width: "32",
        height: "32",
        viewBox: "0 0 32 32",
        fill: "orange"
      }), _react.default.createElement("path", {
        d: "M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z"
      }), _react.default.createElement("path", {
        d: "M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"
      }), _react.default.createElement("path", {
        d: "M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z"
      }));
    }
  }]);
  return LogSVG;
}(_react.Component);

exports.default = LogSVG;
;