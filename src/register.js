import { ObjectInspector } from 'react-inspector';
import {
    ADDON_ID,
    ERROR,
    INFO,
    LOG,
    LOG_EVENTS,
    PANEL_ID,
    LOG_TYPES,
    WARN
} from './constants';
import addons from '@storybook/addons';
import ErrorSVG from './svg/error';
import InfoSVG from './svg/info';
import LogSVG from './svg/log';
import React from 'react';
import styles from './styles';
import WarnSVG from './svg/warn';


/**
 *  Create a panel to display messages sent to the console
 */
class StorybookConsolePanel extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = { history: [], isMounted: false };

        this.onConsoleLog = this.onConsoleLog.bind(this);
        this.clearConsole = this.clearConsole.bind(this);
        this.resetState = this.resetState.bind(this);
        this.getSVG = this.getSVG.bind(this);
        this.saveOriginalConsoleFunctions = this.saveOriginalConsoleFunctions.bind(this);
        this.replaceConsoleFunctions = this.replaceConsoleFunctions.bind(this);
        this.intercept = this.intercept.bind(this);

        this.originalConsoleFunctions = {};

        Object.keys(LOG_TYPES).forEach((type) => {
            this.originalConsoleFunctions[type] = window.console[type];
        });

        // this.replaceConsoleFunctions(this.props.channel);

        Object.keys(LOG_EVENTS).forEach((event) => {
            this.props.channel.on(LOG_EVENTS[event], this.onConsoleLog);
        });
    }

    /**
     *  Call onConsoleLog when any of the LOG_EVENTS is fired up.
     *  If user changes the story stop listenening and clear state.
     */
    componentDidMount() {

        const { channel, api } = this.props;
        console.log('panel mounted', channel, api, LOG_EVENTS);
        

        

        // Clear the current log on every story change.
        this.stopListeningOnStory = api.onStory(() => this.resetState());

    }

    /**
     * Remove channel listeners and reset state when story changes.
     */
    componentWillUnmount() {

        const { channel, api } = this.props;

        if (this.stopListeningOnStory) {
            this.stopListeningOnStory();
        }

        Object.keys(LOG_EVENTS).forEach((event) => {
            channel.removeListener(LOG_EVENTS[event], this.onConsoleLog);
        });

    }

    resetState() {
        this.setState({ history: [] });
    }

    /**
     *  Handle events emmitted from the channel when console functions are called.
     *
     *  @param [Array]  consoleArgs     arguments passed to console functions
     *  @param [string] type            console function type, one of LOG_TYPES
     *
     */
    onConsoleLog(consoleArgs, type) {
        const currentHistory = this.state.history;

        const createItemKey = txt => `${txt}${Math.random().toString(16).slice(2)}`;

        const elements = consoleArgs.map((arg) => {

            const key = createItemKey('log_item_ndx_');

            let item;

            if (typeof arg === 'object') {

                item = (
                    <div style={styles.inspector} key={key}>
                        <ObjectInspector data={arg} showNonenumerable={true}/>
                    </div>
                );


            } else {

                item = (<span style={styles.element} key={key}>{arg}</span>);

            }

            return item;
        });

        const SvgIcon = this.getSVG(type);

        const newText = (
            <div key={createItemKey('log_ndx_')} style={styles.logMsg}>
                <SvgIcon style={styles.logIcon}/> {elements}
                <br/>
            </div>
        );

        this.setState({ history: currentHistory.concat(newText) });
    }

    /**
     * Clear content of console panel, but keep the original mensages in the browser console.
     */
    clearConsole() {
        this.resetState();
    }

    getSVG(logType) {

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
    }

    saveOriginalConsoleFunctions() {
        Object.keys(LOG_TYPES).forEach((type) => {
            this.originalConsoleFunctions[type] = window.console[type];
        });
    }

    replaceConsoleFunctions(channel) {

        const config = Object.keys(LOG_TYPES).map(type =>
            [
                LOG_TYPES[type],
                LOG_EVENTS[type],
                this.originalConsoleFunctions[LOG_TYPES[type]],
                channel
            ]
        );

        config.forEach(conf => this.intercept(...conf));
    }

    intercept(logType, eventType, originalFunc, channel) {

        window.console[logType] = function () {

            const text = Array.prototype.slice.call(arguments);

            originalFunc.apply(this, text);
            channel.emit(eventType, text, logType);
        };

    }


    render() {

        if(this.props.active) {
            const { history } = this.state;
            console.log('>> here register');
            return (
                <div style={styles.consolePanel}>
                    <button style={styles.clearBtn} onClick={this.clearConsole}>Clear</button>
                    <pre>
                        <div>{history}</div>
                    </pre>
                </div>
            );
        } else {
            return <div/>
        }
        
    }

}

/**
 *  Register the panel in the addons.
 */
addons.register(ADDON_ID, (api) => {
    addons.addPanel(PANEL_ID, {
        title: 'Console',
        render: ({ active }) => <StorybookConsolePanel channel={addons.getChannel()} api={api} active={active}/>
    });
});
