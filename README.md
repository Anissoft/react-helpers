# React Helpers

Just bunch of helpers and hooks, that I commonly use in my code

## Installation

Just run [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install @anissoft/react-helpers
```

## Components:

### - \<If [condition] />

Conditional render in jsx format

```js
import * as React from 'react';
import { render } from 'react-dom';
import { If, Then, Else } from '@anissoft/react-helpers/components/If'

import MainApp from 'Components/Main';
import Error from 'Components/Error';

...

render(
  <div>
    <If condition={!isErrored}>
      <Then><MainApp/></Then>
      <Else><Error/></Else>
    </If>
  </div>,
  document.getElementById('app-root'),
);
```

also, there is a shortener for case without else:

```js
  <div>
    <If condition={!isErrored}>
      <MainApp/>
    </If>
  </div>
```

Then and Else can receive a callbacks as children - that allows you to safely use inside them methods, props and variables

```js
  <div>
    <If condition={!!foo} >
      <Then>{() => <p>{`Here some value for you ${foo.bar()}`}</p>}</Then>
    </If>
  </div>
}
```

### - \<Memo [deps]>

Update it's children only if deps was changed

```js
import * as React from 'react';
import { render } from 'react-dom';
import Memo from '@anissoft/react-helpers/components/Memo'

...

const Example = () => {
  const [state1, setState1] = React.useState(0);
  const [state2, setState2] = React.useState(0);

  React.useEffect(
    () => {
      const interval = setInterval(() => {
        setState2(old => old + 1);
      }, 100);
      return () => {
        clearInterval(interval);
      };
    },
    [],
  );

  return (
    <div>
      <Memo deps={[state1]}>
        <span>
          {state2}
          &nbsp;
        </span>
        <span>This value doesn&apos;t change, until you press &nbsp;</span>
        <button role="button" onClick={() => setState1(v => v + 1)}>Increment</button>
      </Memo>
    </div>
  );
};
```

### - \<Wrapper [condition] />

Conditional render like in < If />, but this time for wrapping components

```js
import * as React from 'react';
import { render } from 'react-dom';
import { Wrapper } from '@anissoft/react-helpers/components/Wrapper'

import MainApp from 'Components/Main';
import MobleViewWrapper from 'Components/Mobile';

...

render(
  <div>
    <Wrapper condition={isMobile} wrapper={MobleViewWrapper}>
      <MainApp/>
    </Wrapper>
  </div>,
  document.getElementById('app-root'),
);
```

also, can be used with function `wrap` as wrapper

```js
import * as React from 'react';
import { render } from 'react-dom';
import { Wrapper } from '@anissoft/react-helpers/components/Wrapper'

import MainApp from 'Components/Main';
import MobleViewWrapper from 'Components/Mobile';

...
const wrapIn = (children) => {
  ...
  return <MobleViewWrapper>{children}</MobleViewWrapper>
}

render(
  <div>
    <Wrapper condition={isMobile} wrap={wrapIn}>
      <MainApp/>
    </Wrapper>
  </div>,
  document.getElementById('app-root'),
);
```

### - \<Switch>

Conditional render, but for several conditions. Simple implementation of javascript switch 

```js
import * as React from 'react';
import { render } from 'react-dom';
import { Switch, Case, Default } from '@anissoft/react-helpers/components/Switch'

import AdminView from 'Components/Admin';
import UserView from 'Components/User';
import DefaultView from 'Components/Default';

...

render(
  <div>
    <Switch>
      <Case condition={ userRole === 'admin' }>
        <AdminView />
      </Case>
      <Case condition={ userRole === 'regular' }>
        <UserView />
      </Case>
      <Default>
        <DefaultView />
      </Default>
    </Switch>
  </div>,
  document.getElementById('app-root'),
);
```

Can render several positive cases

```js
render(
  <div>
    <Switch>
      <Case condition={ userRoles.includes('admin') }>
        <AdminView />
      </Case>
      <Case condition={ userRole.includes('regular') }>
        <UserView />
      </Case>
      <Default>
        <DefaultView />
      </Default>
    </Switch>
  </div>,
  document.getElementById('app-root'),
);
```

### - \<Try [onCatch, silent]>

A react [error boundarie component](https://reactjs.org/docs/error-boundaries.html), for catching errors from its own children

```js
import * as React from 'react';
import { render } from 'react-dom';
import Try from '@anissoft/react-helpers/components/Try'

...

const ErrorComponent = ({ shouldThrow }: { shouldThrow?: boolean }) => {
    if (shouldThrow) {
      throw new Error('💣');
    } else {
      return null;
    }
  }

const Example = () => {
  return (
    <div>
      <Try onCatch={(error: Error) => <p>Smth went wrong</p>}>
        <ErrorComponent shouldThrow/>
      </Try>
    </div>
  )
};
```

### - \<Freeze [enabled]>

Stops re-render its children if ```enabled = true```

```js
import * as React from 'react';
import { render } from 'react-dom';
import Freeze from '@anissoft/react-helpers/components/Freeze'

...

const Example = () => {
  const [state, setState] = React.useState(0);

  React.useEffect(
    () => {
      setInterval(() => setState(old => old + 1), 1000);
    },
    [],
  );

  return (
    <div>
      <Freeze enabled={state >= 10}>
        <span>Will update this number, until it became 10 - [{state}]</span>
      </Freeze>
    </div>
  )
};
```

### - \<EventProxy [direction]>

Just render this component inside DOM, set direction to target DOM element and track any of these events on that element.

- onResize
- onMutation
- onScroll
- onClick
- onClickCapture
- onFocus
- onBlur
- onMouseOver
- onMouseOut

```js
import * as React from 'react';
import { render } from 'react-dom';
import EventProxy from '@anissoft/react-helpers/components/EventProxy'

...

const Example = () => {
  return (
    <div>
      <EventProxy
        direction="child"
        component="i"
        onResize={(event) => console.log('resize', event)}
        onMutation={(event) => console.log('mutation', event)}
        onScroll={(event) => console.log('scroll', event)}
        onBlur={(event) => console.log('blur', event)}
        onFocus={(event) => console.log('focus', event)}
        onClick={(event) => console.log('click', event)}
        onClickCapture={(event) => console.log('click-capture', event)}
        onMouseOver={(event) => console.log('hover', event)}
        onMouseOut={(event) => console.log('mouseout', event)}
      >
        <span>Target child</span>
      </EventProxy>
    </div>
  )
};
```

You can pass *onEvent*=true, if you want just rerender your component
> Note that you can create an infinity loop of rerender, if you content depends on element size

```js
export default () => {
  return (
    <div>
      <EventProxy direction="parent" onResize />
      My width: {node.offsetWidth} and height: {node.offsetHeight}
    </div>
  );
}
```

Also, you can specify path to target component with query selector string.

```js
export default () => {
  return (
    <div>
      <EventProxy direction="span > .class" onClick={() => console.log('Gotcha' )}>
        <UnbelievableStupidComponent/>
      </EventProxy>
    </div>
  );
}
```

### - \<Countdown [enabled]>

Return coundown in minutes or/and seconds. Supports locales `"en"` and `"ru"`

```js
import * as React from 'react';
import { render } from 'react-dom';
import Countdown from '@anissoft/react-helpers/components/Countdown'

...

const Example = () => {
  return (
    <div>
      You have <Countdown seconds={120} format="mm ss"/> left
    </div>
  )
};
```

## Hooks

### - useRouter()

React hook, which allows you to use [`match`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md), [`location`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) and [`history`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md) from React-Router. Should be used in components under \<Router />, \<BrowserRouter> etc.
```js
import * as React from 'react';
import useRouter from '@anissoft/react-helpers/hooks/useRouter';

export default () => {
  const {match, location, history} = useRouter();

  return (
    <div>
     <p>Current route path: <b>{match.path}</b></p>
     <p>Whole pathname of page: <b>{location.pathname}</b></p>
     <input 
        type="button"
        onCLick={() => history.push(`${match.path}/directory`)}
      >
        Add directory
      </>
    </div>
  );
}
```

### - useDebounced(value, delay)

Debounce the [value] for [delay] (in ms)
```js
import * as React from 'react';
import useDebounced from '@anissoft/react-helpers/hooks/useDebounced';

export default ({initial}) => {
  const [value, setValue] = useState(initial);
  const [debouncedValue, setDebouncedValue] = useDebounced(initial, 300);

  const handleChange = (e) => {
     setValue(e.target.value);
     setDebouncedValue(e.target.value);
  }

  return (
    <div>
      <input
        onChange={handleChange}
      />
      <p>Value: {value}</p>
      <p>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}
```

### - useThrottled(value, delay)

Throttle the [value] for [delay] (in ms)
```js
import * as React from 'react';
import useThrottled from '@anissoft/react-helpers/hooks/useThrottled';

export default ({initial}) => {
  const [value, setValue] = useState(initial);
  const [throttledValue, setThrottledValue] = useThrottled(initial, 300);

  const handleChange = (e) => {
     setValue(e.target.value);
     setThrottledValue(e.target.value);
  }

  return (
    <div>
      <input
        onChange={handleChange}
      />
      <p>Value: {value}</p>
      <p>ThrottledValue: {throttledValue}</p>
    </div>
  );
}
```

### - useMounted()

Shortway for 'didMount' property
```js
import * as React from 'react';
import If from '@anissoft/react-helpers/components/If';
import useMounted from '@anissoft/react-helpers/hooks/useMounted';

export default () => {
  const isMounted = useMounted();

  return (
    <div>
      <If 
        condition={isMounted()}
        then={() => <p>Component just renders</p>}
        else={() => <p>Component was rendered before</p>}
      />
    </div>
  );
}
```

Since version 2.0.0 useMounted returns function - that allows you to use it in async effects to check, if component still mounted and prevent memory leak

```js
export default () => {
  const isMounted = useMounted();
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    fetch('/some/api').then((res) => {
      if (isMounted()) {
        setState(res.ok);
      }
    })
  }, [])

  return (
    <div>💣</div>
  );
}
```

### - useRefFor([React.Component])

Returns enhanced component and ref for it;
```js
import * as React from 'react';
import useRefFor from '@anissoft/react-helpers/hooks/useRefFor';

import CustomInput from 'Components/MyInput';

export default () => {
  const [ref, Input] = useRefFor(CustomInput);

  React.useEffect(
    () => {
      console.log('Value in input was changed since last render')
    },
    [ref.current.value],
  );

  return (
    <div>
     <Input />
    </div>
  );
}
```
