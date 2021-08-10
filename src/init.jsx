// @ts-check
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import ru from './locales/ru.js';

import debug from '../lib/logger.js';
import store from './store.js';
import App from './App.jsx';
import { addMessage } from './stateSlices/messagesSlice.js';
import {
  addChannel, removeChannel, renameChannel,
} from './stateSlices/channelsSlice.js';
import ContextWs from './contextWs.js';

const log = debug('init');
log.enabled = true;

const WsProvider = ({ wsClient, children }) => {
  const dispatch = useDispatch();
  const socket = wsClient;

  socket.on('newMessage', (message) => {
    dispatch((addMessage(message)));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });
  socket.on('removeChannel', (channel) => {
    dispatch(removeChannel(channel));
    // dispatch(setCurrentChannelId({ currentChannelId: 1 }));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });

  return <ContextWs.Provider value={{ wsClient }}>{children}</ContextWs.Provider>;
};

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
