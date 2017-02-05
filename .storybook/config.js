import { configure } from '@kadira/storybook';
import React from 'react';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
