export const ADDON_ID = 'rozon/storybook-console';
export const PANNEL_ID = `${ADDON_ID}/console-panel`;

const createEventId = eventName => `${ADDON_ID}/${eventName}`;

export const LOG = 'log';
export const ERROR = 'error';
export const WARN = 'warn';
export const INFO = 'info';

export const LOG_TYPES = {
    [ERROR]: ERROR,
    [INFO]: INFO,
    [LOG]: LOG,
    [WARN]: WARN
};

export const LOG_EVENTS = {
    [ERROR]: createEventId('error-event'),
    [INFO]: createEventId('info-event'),
    [LOG]: createEventId('log-event'),
    [WARN]: createEventId('warn-event')
};
