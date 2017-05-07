'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    log: {
        background: 'url(error.svg)',
        color: 'darkgrey'
    },
    error: {
        background: "url(error.svg')",
        color: 'red'
    },
    info: {
        background: "url('./svg/info.svg')",
        color: 'blue'
    },
    warn: {
        background: "url('./svg/info.svg')",
        color: 'orange'
    },
    consolePanel: {
        overflow: 'auto',
        padding: '1em 1em 0 1em',
        position: 'relative',
        width: '100%'
    },
    logMsg: {
        fontFamily: 'Menlo, monospace',
        fontSize: '13px',
        margin: '.7em 0',
        padding: '0',
        verticalAlign: 'top'
    },
    element: {
        verticalAlign: 'top'
    },
    inspector: {
        display: 'inline-block',
        margin: '0 15px 0 0'
    },
    clearBtn: (0, _defineProperty3.default)({
        background: 'none',
        border: 'none',
        bottom: '0px',
        color: 'orange',
        fontSize: '.9em',
        outline: 'none',
        padding: '5px 10px',
        position: 'fixed',
        right: '.8em'
    }, 'bottom', '.8em'),
    logIcon: {
        display: 'inline-block',
        height: '1em',
        marginRight: '2em',
        verticalAlign: 'top',
        width: '1em'
    }
};