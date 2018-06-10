import 'raf/polyfill';
import React from 'react';
import addons from '@storybook/addons';
import * as Constants from './constants';
import * as utils from './utils';

export class StorybookConsole extends React.Component {

    constructor(...args) {
        super(...args);

        this.originalConsoleFunctions = {};

        Object.keys(Constants.LOG_TYPES).forEach((type) => {
            this.originalConsoleFunctions[type] = undefined;
        });

    }

    componentDidMount() {

        const channel = addons.getChannel();

        this.originalConsoleFunctions = utils.getOriginalConsoleFunctions();

        utils.replaceConsoleFunctions(channel, this.originalConsoleFunctions, this.intercept)

    }

    componentWillUnmount() {
        utils.restoreConsole(this.originalConsoleFunctions);
    }

    render() {

        const { children } = this.props;

        return children;

    }

}

export default story => <StorybookConsole>{ story() }</StorybookConsole>;
