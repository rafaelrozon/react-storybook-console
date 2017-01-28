import { configure, addDecorator } from '@kadira/storybook';
import WithNotes from '../src/notes-addon/index';
import React from 'react';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
