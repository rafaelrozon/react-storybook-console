import React from 'react';
import addons from '@kadira/storybook-addons';
import { ADDON_ID, PANEL_ID, LOG_EVENTS, LOG_TYPES, LOG, ERROR, INFO, WARN } from './index';
import {ObjectInspector, TableInspector} from 'react-inspector';
import styles from './styles.js';

class StorybookConsolePanel extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            history: []
        };

        this.onConsoleLog = this.onConsoleLog.bind(this);
        this.clearConsole = this.clearConsole.bind(this);
        this.resetState = this.resetState.bind(this);

    }

    componentDidMount() {

        const { channel, api } = this.props;
        console.log('componentDidMount ', this.state);

        Object.keys(LOG_EVENTS).forEach((event) => {
            channel.on(LOG_EVENTS[event], this.onConsoleLog);
        });

        // Clear the current log on every story change.
        // this.stopListeningOnStory = api.onStory(() => {
        //     this.resetState();
        // });

    }

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
        this.setState({history: []});
    }

    onConsoleLog(consoleArgs, type) {

        const currentHistory = this.state.history;
        const createItemKey = (txt) => `${txt}${Math.random().toString(16).slice(2)}`;

        let elements = consoleArgs.map((arg, ndx) => {

            const key = createItemKey('log_item_ndx_');

            if (typeof arg === 'object') {

                return (
                    <div className="inspector" key={key}>
                        <ObjectInspector
                            data={arg}
                            showNonenumerable={true}
                        />
                    </div>
                );

            } else {
                return (<span style={styles.itemSpan} key={key}>{arg}</span>);
            }
        });

        const newText = (
            <div key={createItemKey('log_ndx_')} className="item">
              <span style={styles.itemSpan} className={`${LOG_TYPES[type]}`}></span>{elements}<br/>
            </div>
        );

        this.setState({
            history: currentHistory.concat(newText)
        });
    }

    clearConsole() {
        this.setState({history: []});
    }

    render() {

        const { history } = this.state;

        return (
            <div className="console-panel">
                <button className="clear-btn" onClick={this.clearConsole}>Clear</button>
                <pre>
                    <div>{history}</div>
                </pre>

            </div>
        );
    }

}

addons.register(ADDON_ID, (api) => {
    addons.addPanel(PANEL_ID, {
        title: 'Console',
        render: () => <StorybookConsolePanel channel={addons.getChannel()} api={api}/>
    });
});
