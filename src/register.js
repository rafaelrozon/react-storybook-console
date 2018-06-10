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
import addons from '@storybook/addons';
import ErrorSVG from './svg/error';
import InfoSVG from './svg/info';
import LogSVG from './svg/log';
import React from 'react';
import styles from './styles';
import WarnSVG from './svg/warn';
import * as Constants from './constants';
import * as utils from './utils';

const ObjComp = props => {
    const { style, key, data } = props;
    return (
        <div style={style} key={key}>
            <ObjectInspector data={data} showNonenumerable={true}/>
        </div>
    );
};

const ItemComp = props => {
    const { style, key, data } = props;
    return (
        <span style={style} key={key}>{data}</span>
    );
};

const TextLog = props => {

    const { elements, type } = props;

    const SvgIcon = utils.getSVG(type);

    return (
        <div key={utils.createItemKey('log_ndx_')} style={styles.logMsg}>
            <SvgIcon style={styles.logIcon}/> {elements}
            <br/>
        </div>
    );
};


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
    }

    /**
     *  Call onConsoleLog when any of the LOG_EVENTS is fired up.
     *  If user changes the story stop listenening and clear state.
     */
    componentDidMount() {

        const { channel, api } = this.props;

        Object.keys(Constants.LOG_EVENTS).forEach((event) => {
            channel.on(Constants.LOG_EVENTS[event], this.onConsoleLog);
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

        Object.keys(Constants.LOG_EVENTS).forEach((event) => {
            channel.removeListener(Constants.LOG_EVENTS[event], this.onConsoleLog);
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

        const elements = utils.processConsoleArgsForPanel(consoleArgs, ObjComp, ItemComp);

        const newText = <TextLog elements={elements} type={type} />

        this.setState({ history: currentHistory.concat(newText) });
    }

    /**
     * Clear content of console panel, but keep the original mensages in the browser console.
     */
    clearConsole() {
        this.resetState();
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
