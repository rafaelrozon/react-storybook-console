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
        fill: "darkgrey"
      }), _react.default.createElement("path", {
        d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"
      }));
    }
  }]);
  return LogSVG;
}(_react.Component);

exports.default = LogSVG;
;