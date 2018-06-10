import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import StorybookConsole from '../src';

storiesOf('Button StorybookConsole', module)
    .addDecorator(StorybookConsole)
    .add('with text', () =>
        (
            <Button onClick={() => {

                    // normal log message, one argument
                    console.log('test!!!!')

                    // normal log message, multiple arguments
                    console.log(1,2,3,4);

                    // error message, multiple arguments
                    console.error('error1 ', 'error2 ', 'error3');

                    // log objects
                    console.log({
                        a: {
                            b: {
                                c: {
                                    d: 'some deep thought....'
                                }
                            }
                        }
                    }, 'test');

                    // info messages
                    console.info('info log');

                    // warn messages
                    console.warn('warning log');

                }}>Hello Button
            </Button>
        )
    );
