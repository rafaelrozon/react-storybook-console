'use strict';

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
        margin: '1em',
        overflow: 'auto',
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
        margin: '0 15px 0 0',
        display: 'inline-block'
    },
    clearBtn: {
        margin: '.5em',
        padding: '.5em',
        background: 'lightgray',
        border: '1px solid darkgray',
        position: 'fixed',
        right: '4em'
    },
    logIcon: {
        display: 'inline-block',
        marginRight: '2em',
        width: '1em',
        height: '1em',
        verticalAlign: 'top'
    }
};