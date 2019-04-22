import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../../reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware()
  )
);

it('App renders without crashing', () => {
  // App will make a call to get events. Mock with an empty list
  fetch.mockResponse(JSON.stringify({events: []}));

  // Load the app
  const div = document.createElement('div');
  ReactDOM.render(<App store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
