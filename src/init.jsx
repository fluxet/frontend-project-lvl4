// @ts-check
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import io from 'socket.io-client';
import ru from './locales/ru.js';

import debug from '../lib/logger.js';
import store from './store.js';
import App from './App.jsx';
import { ContextWs } from './context.js';
import {
  addChannel, removeChannel, renameChannel,
} from './stateSlices/channelsSlice.js';
import { addMessage } from './stateSlices/messagesSlice.js';

const log = debug('init');
log.enabled = true;

const socket = io();
socket.on('newMessage', (message) => {
  store.dispatch((addMessage(message)));
});
socket.on('newChannel', (channel) => {
  store.dispatch(addChannel(channel));
});
socket.on('removeChannel', (channel) => {
  store.dispatch(removeChannel(channel));
});
socket.on('renameChannel', (channel) => {
  store.dispatch(renameChannel(channel));
});

const WsProvider = ({ wsClient, children }) => (
  <ContextWs.Provider value={{ wsClient }}>{children}</ContextWs.Provider>
);
export default (wsClient) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const i18Instance = i18next
    .createInstance({
      lng: 'ru',
      debug: true,
      resources: {
        ru,
      },
    }, (err, t) => ((err) ? log('i18next error: ', err) : t('key')));

  const vdom = (
    <I18nextProvider i18n={i18Instance.use(initReactI18next)}>
      <Provider store={store}>
        <WsProvider wsClient={wsClient}>
          <App />
        </WsProvider>
      </Provider>
    </I18nextProvider>
  );

  return vdom;
};
