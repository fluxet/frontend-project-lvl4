// @ts-check
import Rollbar from 'rollbar';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';

export default async (wsClient) => {
  const socket = wsClient;

  const rollbar = new Rollbar({
    accessToken: '6a1bca2b15284ca8b12e0edc8adcd0d8',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });

  rollbar.log('Hello');

  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const vdom = (
    <Provider store={store}>
        <App wsClient={socket}/>
    </Provider>
  );

  return vdom;
};
