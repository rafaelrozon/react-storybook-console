import React from 'react';
import addons from '@kadira/storybook-addons';
import styles from './styles';

export const ADDON_ID = 'rozon/storybook-console';
export const PANNEL_ID = `${ADDON_ID}/console-panel`;

const createEventId = (eventName) => `${ADDON_ID}/${eventName}`;

const LOG = 'log';
const ERROR = 'error';
const WARN = 'warn';
const INFO = 'info';

export const LOG_TYPES = {
    [LOG]: 'log',
    [ERROR]: 'error',
    [INFO]: 'info',
    [WARN]: 'warn'
};

export const LOG_EVENTS = {
    [LOG]: createEventId('log-event'),
    [ERROR]: createEventId('error-event'),
    [INFO]: createEventId('info-event')
}

export class WithNotes extends React.Component {

    constructor(...args) {
        super(...args);

        this.intercept= this.intercept.bind(this);
        this.restoreConsole = this.restoreConsole.bind(this);
        this.saveOriginalConsoleFunctions = this.saveOriginalConsoleFunctions.bind(this);
        this.replaceConsoleFunctions = this.replaceConsoleFunctions.bind(this);

        this.originalConsoleFunctions = {};
        Object.keys(LOG_TYPES).forEach((type) => this.originalConsoleFunctions[type] = undefined);

    }

    componentDidMount() {

        const channel = addons.getChannel();

        this.saveOriginalConsoleFunctions();

        this.replaceConsoleFunctions(channel);

    }

    componentWillUnmount() {
        this.restoreConsole()
    }

    saveOriginalConsoleFunctions() {
        Object.keys(LOG_TYPES).forEach((type) => {
            this.originalConsoleFunctions[type] = window.console[type];
        });
    }

    replaceConsoleFunctions(channel) {

        const config = Object.keys(LOG_TYPES).map((type) => {
            return [
                LOG_TYPES[type],
                LOG_EVENTS[type],
                this.originalConsoleFunctions[LOG_TYPES[type]],
                channel
            ]
        });

        config.forEach((conf) => this.intercept(...conf));
    }

    intercept(func, eventType, originalFunc, channel) {
        window.console[func] = function() {
            const text = Array.prototype.slice.call(arguments);
            originalFunc.apply(this, text);
            channel.emit(eventType, text, func);
        }
    }

    restoreConsole() {
        Object.keys(this.originalConsoleFunctions).forEach((logType) => {
            window.console[logType] = this.originalConsoleFunctions[logType];
        });
    }

    render() {
        const { children } = this.props;
        return children;
    }
}

export default (story) => {
    return <WithNotes>{story()}</WithNotes>
}
