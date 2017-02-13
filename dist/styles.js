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
    clearBtn: {
        background: 'rgba(255, 255, 255, 0.498039)',
        borderBottom: 'none',
        borderImage: 'initial',
        borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
        borderRight: 'none',
        borderRadius: '4px 0px 0px',
        borderTop: '1px solid rgba(0, 0, 0, 0.2)',
        bottom: '0px',
        color: 'orange',
        fontSize: '.9em',
        outline: 'none',
        padding: '5px 10px',
        position: 'absolute',
        right: '0px'
    },
    logIcon: {
        display: 'inline-block',
        height: '1em',
        marginRight: '2em',
        verticalAlign: 'top',
        width: '1em'
    }
};