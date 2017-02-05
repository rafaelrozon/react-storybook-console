import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import StorybookConsole  from '../src';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
    .addDecorator(StorybookConsole)
    .add('with text', () => (
    <Button onClick={() => {
            action('click!!!');
            console.log('test!!!!')
            console.error(1,2,3,4);
            console.log(
                {
                    a: {
                        b: {
                            c: 44,
                            d: 'ha!'
                        }
                    }
                }, 'rafa'
            );
            console.info('nem');
            console.warn('spift');
        }}>Hello Button</Button>


    ))
    .add('with some emoji', () => (
    <Button onClick={ action('bla') }>😀 😎 👍 💯</Button>
));
