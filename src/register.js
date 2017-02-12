import { ObjectInspector } from 'react-inspector';
import {
    ADDON_ID,
    ERROR,
    INFO,
    LOG,
    LOG_EVENTS,
    PANEL_ID,
    WARN
} from './index';
import addons from '@kadira/storybook-addons';
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

        this.state = { history: [] };

        this.onConsoleLog = this.onConsoleLog.bind(this);
        this.clearConsole = this.clearConsole.bind(this);
        this.resetState = this.resetState.bind(this);
        this.getSVG = this.getSVG.bind(this);
    }

    /**
     *  Call onConsoleLog when any of the LOG_EVENTS is fired up.
     *  If user changes the story stop listenening and clear state.
     */
    componentDidMount() {

        const { channel, api } = this.props;

        Object.keys(LOG_EVENTS).forEach((event) => {
            channel.on(LOG_EVENTS[event], this.onConsoleLog);
        });

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

    render() {

        const { history } = this.state;

        return (
            <div style={styles.consolePanel}>
                <button style={styles.clearBtn} onClick={this.clearConsole}>Clear</button>
                <pre>
                    <div>{history}</div>
                </pre>
            </div>
        );
    }

}

/**
 *  Register the panel in the addons.
 */
addons.register(ADDON_ID, (api) => {
    addons.addPanel(PANEL_ID, {
        title: 'Console',
        render: () => <StorybookConsolePanel channel={addons.getChannel()} api={api}/>
    });
});
