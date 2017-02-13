"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogSVG = function (_Component) {
    (0, _inherits3.default)(LogSVG, _Component);

    function LogSVG() {
        (0, _classCallCheck3.default)(this, LogSVG);
        return (0, _possibleConstructorReturn3.default)(this, (LogSVG.__proto__ || (0, _getPrototypeOf2.default)(LogSVG)).apply(this, arguments));
    }

    (0, _createClass3.default)(LogSVG, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "svg",
                (0, _extends3.default)({ version: "1.1" }, this.props, { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", width: "32", height: "32", viewBox: "0 0 32 32", fill: "darkgrey" }),
                _react2.default.createElement("path", { d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z" })
            );
        }
    }]);
    return LogSVG;
}(_react.Component);

exports.default = LogSVG;
;