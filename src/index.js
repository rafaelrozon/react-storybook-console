require('raf/polyfill');
const React = require('react');
const addons = require('@storybook/addons').default;
const { makeDecorator } = require('@storybook/addons');
const Constants = require('./constants');

console.log('INDEX ROOT');
class StorybookConsole extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMounted: false
        };
        console.log('StorybookConsole constructor');
        this.channel = this.props.channel;
        this.intercept = this.intercept.bind(this);
        this.restoreConsole = this.restoreConsole.bind(this);
        this.saveOriginalConsoleFunctions = this.saveOriginalConsoleFunctions.bind(this);
        this.replaceConsoleFunctions = this.replaceConsoleFunctions.bind(this);

        this.originalConsoleFunctions = {};

        Object.keys(Constants.LOG_TYPES).forEach((type) => {
            this.originalConsoleFunctions[type] = undefined;
        });

    }

    componentDidMount() {
        console.log('index mounted');
        this.saveOriginalConsoleFunctions();

        this.replaceConsoleFunctions(this.channel);

        this.setState({ isMounted: true });
    }

    componentWillUnmount() {
        this.restoreConsole();
    }

    saveOriginalConsoleFunctions() {
        Object.keys(Constants.LOG_TYPES).forEach((type) => {
            this.originalConsoleFunctions[type] = window.console[type];
        });
    }

    replaceConsoleFunctions(channel) {

        const config = Object.keys(Constants.LOG_TYPES).map(type =>
            [
                Constants.LOG_TYPES[type],
                Constants.LOG_EVENTS[type],
                this.originalConsoleFunctions[Constants.LOG_TYPES[type]],
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

    restoreConsole() {
        Object.keys(this.originalConsoleFunctions).forEach((logType) => {
            window.console[logType] = this.originalConsoleFunctions[logType];
        });
    }

    render() {

        const { children } = this.props;
        const { isMounted } = this.state;
        console.log('>> index render ', isMounted);
        return isMounted ? children : <div/>

    }

}
const withConsoleX = storyFn => React.createElement(
    class Delay extends React.Component {
      constructor(props) {
        super(props);
        this.state = {mounted: false};
      }
  
      componentDidMount() {
        this.setState({mounted: true});
      }
  
      componentWillUnmount() {
        this.setState({mounted: false});
      }
  
      render() {
        return this.state.mounted ? <StorybookConsole channel={addons.getChannel()}>{storyFn()}</StorybookConsole> : <div />;
      }
    }
  );



const withConsole = makeDecorator({
    name: 'StorybookConsoleX',
    parameterName: 'console',
    allowDeprecatedUsage: true,
    // This means don't run this decorator if the notes decorator is not set
    skipIfNoParametersOrOptions: false,
    wrapper: (getStory, context, { parameters }) => {

        const channel = addons.getChannel();
        const story = getStory(context);
        console.log('>> wrapper ', parameters)
        channel.emit('rozon/storybook-console/log', {a: 123});

        return <StorybookConsole>{story}</StorybookConsole>
    }
});

module.exports = {
    withConsole
}