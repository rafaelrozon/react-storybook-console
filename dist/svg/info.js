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

var InfoSVG =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InfoSVG, _Component);

  function InfoSVG() {
    (0, _classCallCheck2.default)(this, InfoSVG);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InfoSVG).apply(this, arguments));
  }

  (0, _createClass2.default)(InfoSVG, [{
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
        fill: "blue"
      }), _react.default.createElement("path", {
        d: "M16 3c-3.472 0-6.737 1.352-9.192 3.808s-3.808 5.72-3.808 9.192c0 3.472 1.352 6.737 3.808 9.192s5.72 3.808 9.192 3.808c3.472 0 6.737-1.352 9.192-3.808s3.808-5.72 3.808-9.192c0-3.472-1.352-6.737-3.808-9.192s-5.72-3.808-9.192-3.808zM16 0v0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16s7.163-16 16-16zM14 22h4v4h-4zM14 6h4v12h-4z"
      }));
    }
  }]);
  return InfoSVG;
}(_react.Component);

exports.default = InfoSVG;
;