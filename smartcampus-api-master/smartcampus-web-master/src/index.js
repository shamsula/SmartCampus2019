import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import App from './components/App';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
    createLogger()
  )
);

ReactDOM.render(
  <App store={store}/>, document.getElementById('root')
);

registerServiceWorker();
