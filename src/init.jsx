// @ts-check
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import ru from './locales/ru.js';

import debug from '../lib/logger.js';
import store from './store.js';
import {
  addChannel, removeChannel, renameChannel,
} from './stateSlices/channelsSlice.js';
import { addMessage } from './stateSlices/messagesSlice.js';
import App from './App.jsx';
import { ContextChatApi } from './context.js';

const log = debug('init');
log.enabled = true;

const ApiProvider = ({ chatApi, children }) => (
  <ContextChatApi.Provider value={{ chatApi }}>{children}</ContextChatApi.Provider>
);

export default async (wsClient) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const socket = wsClient;

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

  const socketEmitPromisify = (typeEmit) => (messageBody) => {
    const promise = new Promise((resolve, reject) => {
      socket.emit(typeEmit, messageBody, (resp) => ((resp.error)
        ? reject(resp)
        : resolve(resp)));
    });

    return promise;
  };

  const chatApi = {
    sendMessage: socketEmitPromisify('newMessage'),
    addChannel: socketEmitPromisify('newChannel'),
    renameChannel: socketEmitPromisify('renameChannel'),
    removeChannel: socketEmitPromisify('removeChannel'),
  };

  const i18Instance = i18next.createInstance();
  await i18Instance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: true,
      resources: {
        ru,
      },
    });

  const vdom = (
    <I18nextProvider i18n={i18Instance}>
      <Provider store={store}>
        <ApiProvider chatApi={chatApi}>
          <App />
        </ApiProvider>
      </Provider>
    </I18nextProvider>
  );

  return vdom;
};
