// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import Rollbar from 'rollbar';
import io from 'socket.io-client';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';

const socket = io();

const rollbar = new Rollbar({
  accessToken: '6a1bca2b15284ca8b12e0edc8adcd0d8',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

rollbar.log('Hello');

const init = (socket) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const p = document.createElement('p');
  p.classList.add('card-text');
  p.textContent = 'It works!';

  const h5 = document.createElement('h5');
  h5.classList.add('card-title');
  h5.textContent = 'Project frontend l4 boilerplate';

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.append(h5, p);

  const card = document.createElement('div');
  card.classList.add('card', 'text-center');
  card.append(cardBody);

  const container = document.querySelector('#chat');
  container.append(card);

  ReactDom.render(
    <Provider store={store}>
      <App wsClient={socket}/>
    </Provider>,
    document.getElementById('chat'),
  );
};
init(socket);

export default init;
