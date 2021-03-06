React Storybook Console
===================

# THIS PACKAGE IS DEPRECATED. PLEASE, USE THE OFFICIAL CONSOLE ADD-ON: https://storybook.js.org/addons

*Latest update includes support for React 16*

What
-------------
Adds a panel to storybook to display anything sent to console log, error, warn, or info functions.

![React Storybook Console Screenshot](https://rafaelrozon.github.io/react-storybook-console/docs/react_storybook_console_example.png "React Storybook Console Example")


How
-------------

Installation

 ```
npm install react-storybook-console --save-dev
 ```

Use

1 - Import the module in the addons.js file

```

// .storybook/addons.js
import '@kadira/storybook/addons';
import 'react-storybook-console/dist/register.js';

```

2  - Add the module in your stories as a decorator

```

import StorybookConsole  from 'react-storybook-console';

storiesOf('MyComponent', module)
    .addDecorator(StorybookConsole)
    .add('do stuff', () => { ...... });

```


Thanks
-------------
Thanks to Kadira for developing such a great tool as [React Storybook]  as well as to all the other developers of addons for React Storybook. I learned a lot reading their code.

Icons from: [IconMoon]


[React Storybook]: https://getstorybook.io/
[IconMoon]:https://icomoon.io
