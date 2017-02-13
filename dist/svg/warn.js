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
                (0, _extends3.default)({ version: "1.1" }, this.props, { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", width: "32", height: "32", viewBox: "0 0 32 32", fill: "orange" }),
                _react2.default.createElement("path", { d: "M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z" }),
                _react2.default.createElement("path", { d: "M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z" }),
                _react2.default.createElement("path", { d: "M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z" })
            );
        }
    }]);
    return LogSVG;
}(_react.Component);

exports.default = LogSVG;
;