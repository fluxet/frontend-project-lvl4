// @ts-check
import Rollbar from 'rollbar';
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';

export default async (wsClient) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const vdom = (
    <Provider store={store}>
        <App wsClient={wsClient}/>
    </Provider>
  );

  return vdom;
};
