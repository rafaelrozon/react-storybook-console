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

var ErrorSVG =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ErrorSVG, _Component);

  function ErrorSVG() {
    (0, _classCallCheck2.default)(this, ErrorSVG);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ErrorSVG).apply(this, arguments));
  }

  (0, _createClass2.default)(ErrorSVG, [{
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
        fill: "red"
      }), _react.default.createElement("path", {
        d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"
      }), _react.default.createElement("path", {
        d: "M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"
      }));
    }
  }]);
  return ErrorSVG;
}(_react.Component);

exports.default = ErrorSVG;
;