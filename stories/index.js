import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import StorybookConsole  from '../src/notes-addon';


storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
    .addDecorator(StorybookConsole)
    .add('with text', () => (
    <Button onClick={() => { console.log('test!!!!') } }>Hello Button</Button>


    ))
    .add('with some emoji', () => (
    <Button onClick={() => { console.error('test 22!!!!') }}>😀 😎 👍 💯</Button>
));
