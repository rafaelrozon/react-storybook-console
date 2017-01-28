import React from 'react';
import addons from '@kadira/storybook-addons';
import { ADDON_ID, PANEL_ID, LOG_EVENTS } from './index';
import styles from './styles';


class StorybookConsolePanel extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            text: ''
        };

        this.onConsoleLog = this.onConsoleLog.bind(this);
        this.clearConsole = this.clearConsole.bind(this);
        this.resetState = this.resetState.bind(this);

    }

    componentDidMount() {

        const { channel, api } = this.props;

        Object.keys(LOG_EVENTS).forEach((event) => {
            channel.on(LOG_EVENTS[event], this.onConsoleLog);
        });

        // Clear the current log on every story change.
        this.stopListeningOnStory = api.onStory(() => {
            this.resetState();
        });

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
        this.setState({text: ''});
    }

    onConsoleLog(text, type) {
        this.setState({text: `${this.state.text}[${type}] ${text}<br/>`});
    }

    clearConsole() {
        this.setState({text: ''});
    }

    render() {

        const { text } = this.state;

        return (
            <div style={styles.consolePanel}>
                <button style={styles.clearButton} onClick={this.clearConsole}>Clear</button>
                <div dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
        );
    }

}

addons.register(ADDON_ID, (api) => {
    addons.addPanel(PANEL_ID, {
        title: 'Console Panel',
        render: () => <StorybookConsolePanel channel={addons.getChannel()} api={api}/>
    });
});
