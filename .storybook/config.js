import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
//   req.keys().forEach((filename) => req(filename));
    require('./../stories/index')
}

configure(loadStories, module);
