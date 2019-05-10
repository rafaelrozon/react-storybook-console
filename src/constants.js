const ADDON_ID = 'rozon/storybook-console';
const PANNEL_ID = `${ADDON_ID}/console-panel`;

const LOG = 'log';
const ERROR = 'error';
const WARN = 'warn';
const INFO = 'info';

const LOG_TYPES = {
    [ERROR]: ERROR,
    [INFO]: INFO,
    [LOG]: LOG,
    [WARN]: WARN
};

const createEventId = eventName => `${ADDON_ID}/${eventName}`;

const LOG_EVENTS = {
    [ERROR]: createEventId('error-event'),
    [INFO]: createEventId('info-event'),
    [LOG]: createEventId('log-event'),
    [WARN]: createEventId('warn-event')
};

module.exports = {
    ADDON_ID,
    PANNEL_ID,
    LOG,
    ERROR,
    WARN,
    INFO,
    LOG_TYPES,
    LOG_EVENTS
};
