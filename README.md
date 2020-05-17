# Recoil-logger

Logger for state manager [recoil](https://recoiljs.org)

![Example of logs in browser's conosle](example.gif)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from "recoil";
import RecoilLogger from 'recoil-logger'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilLogger />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Install

```
npm install --save-dev recoil-logger
```
or
```
yarn add --dev recoil-logger
```

Now you could add `RecoilLogger` to your app:

```diff
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from "recoil";
import RecoilLogger from 'recoil-logger'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
+      <RecoilLogger /> {/* Please add this line inside `RecoilRoot` scope */}
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
```

After this you can see the events on **each** atom in browser's console:

![Example of logs in browser's conosle](console1.png)

But to see the values you need to add `persistence_UNSTABLE` key to atom properties:

```diff
const counterState = atom({
  key: "count",
  default: 0,
+  persistence_UNSTABLE: {
+    type: 'log'
+  },
});
```

The key `type` can has any value but not `none` (by default it is `none`).

![Example of logs in browser's conosle](console2.png)

## Notes

This package use unstable hook `useTransactionObservation_UNSTABLE`. 
As far it will be stable the package will be updated with new API.

## Demo

```
$ git clone git@github.com:polemius/recoil-logger.git
$ cd recoil-logger
$ npm install
$ npm run start
```

Please open [localhost:1234](http://localhost:1234)