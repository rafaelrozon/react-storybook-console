import { configure } from '@kadira/storybook';

const loadStories = () => {
    require('../stories');
};

configure(loadStories, module);
