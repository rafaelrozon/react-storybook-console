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

var ErrorSVG = function (_Component) {
    (0, _inherits3.default)(ErrorSVG, _Component);

    function ErrorSVG() {
        (0, _classCallCheck3.default)(this, ErrorSVG);
        return (0, _possibleConstructorReturn3.default)(this, (ErrorSVG.__proto__ || (0, _getPrototypeOf2.default)(ErrorSVG)).apply(this, arguments));
    }

    (0, _createClass3.default)(ErrorSVG, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "svg",
                (0, _extends3.default)({ version: "1.1" }, this.props, { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", width: "32", height: "32", viewBox: "0 0 32 32", fill: "red" }),
                _react2.default.createElement("path", { d: "M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z" }),
                _react2.default.createElement("path", { d: "M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z" })
            );
        }
    }]);
    return ErrorSVG;
}(_react.Component);

exports.default = ErrorSVG;
;