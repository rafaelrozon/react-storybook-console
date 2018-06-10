import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import StoryBookConsole from './../src/index';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
.addDecorator(StoryBookConsole)
  .add('with text', () => <Button onClick={() => {
      console.log('here');
  }}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={() => {
      console.error({
          a: 1,
          b: {
              c: {
                  d: [1,2,3]
              }
          }
      });
  }}>😀 😎 👍 💯</Button>);
