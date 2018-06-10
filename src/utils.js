import uuid from 'uuid';
import * as Constants from './constants';
import ErrorSVG from './svg/error';
import InfoSVG from './svg/info';
import LogSVG from './svg/log';
import WarnSVG from './svg/warn';


export const getOriginalConsoleFunctions = () => {

    const backup = {};

    Object.keys(Constants.LOG_TYPES).forEach((type) => {
        backup[type] = window.console[type];
    });

    return backup;
};


export const replaceConsoleFunctions = (channel, orignalConsoleFunctions, interceptFn) => {

    const config = Object.keys(Constants.LOG_TYPES).map(type =>
        [
            LOG_TYPES[type],
            LOG_EVENTS[type],
            orignalConsoleFunctions[LOG_TYPES[type]],
            channel
        ]
    );

    config.forEach(conf => interceptFn(...conf));
}

export const intercept = (logType, eventType, originalFunc, channel) => {

    window.console[logType] = function() {

        const text = Array.prototype.slice.call(arguments);

        originalFunc.apply(this, text);
        channel.emit(eventType, text, logType);
    };

};

export const restoreConsole = (originalConsoleFunctions) => {
    Object.keys(originalConsoleFunctions).forEach(logType => {
        window.console[logType] = originalConsoleFunctions[logType];
    });
};

export const getSVG = (logType) => {

    switch (logType) {
    case LOG:
        return LogSVG;
    case INFO:
        return InfoSVG;
    case WARN:
        return WarnSVG;
    case ERROR:
        return ErrorSVG;
    default:
        return LogSVG;
    }
};

export const createItemKey = txt => `${txt}${uuid.v1()}`;



export const processConsoleArgsForPanel = (consoleArgs, ObjComp, TextComp) => {

    const elements = consoleArgs.map((arg) => {

        const key = createItemKey('log_item_ndx_');

        let item;

        if (typeof arg === 'object') {

            item = <ObjComp style={styles.inspector} key={key} data={arg}>;

        } else {

            item = <TextComp style={styles.element} key={key} data={arg}/>;

        }

        return item;
    });

    return elements;
};

export const getNewTextForPanel = (orignalState, consoleArgs, ObjComp, ItemComp, type) => {

    const elements = processConsoleArgsForPanel(consoleArgs, ObjComp, ItemComp);
    const newText = <TextLog elements={elements} type={type} />

    const newState = orignalState.concat([newText]);

    return newState;
}