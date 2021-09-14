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
  const netState = {
    status: 'connectionOk', // ['connectionOk', 'connectionError']
  };

  socket.on('connect', () => {
    netState.status = 'connectionOk';
  });

  socket.on('newMessage', (message) => {
    netState.status = 'connectionOk';
    store.dispatch((addMessage(message)));
  });
  socket.on('newChannel', (channel) => {
    netState.status = 'connectionOk';
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', (channel) => {
    netState.status = 'connectionOk';
    store.dispatch(removeChannel(channel));
  });
  socket.on('renameChannel', (channel) => {
    netState.status = 'connectionOk';
    store.dispatch(renameChannel(channel));
  });

  socket.on('connect_error', () => {
    netState.status = 'connectionError';
    socket.connect();
  });

  const socketEmitPromisify = (typeEmit) => (messageBody) => {
    const promise = new Promise((resolve, reject) => {
      if (netState.status === 'connectionError') {
        const err = new Error('errors.network');
        err.response = {
          status: 408,
        };
        reject(err);
      }
      socket.emit(typeEmit, messageBody, (resp) => ((resp.error)
        ? reject(resp)
        : resolve(resp)));
    });

    return promise;
  };

  const onReconnection = (cb) => {
    const timerId = setTimeout(() => {
      const { status } = netState;
      if (status === 'connectionError') {
        onReconnection(cb);
      } else {
        cb();
      }
      clearTimeout(timerId);
    }, 1000);
  };

  const chatApi = {
    sendMessage: socketEmitPromisify('newMessage'),
    addChannel: socketEmitPromisify('newChannel'),
    renameChannel: socketEmitPromisify('renameChannel'),
    removeChannel: socketEmitPromisify('removeChannel'),
    onReconnection,
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
