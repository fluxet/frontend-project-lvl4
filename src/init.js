// @ts-check
import Rollbar from 'rollbar';
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Provider, useDispatch } from 'react-redux';

import store from './store.js';
import App from './App.jsx';
import { addMessage } from './Components/Chat/messagesSlice.js';
import {
  addChannel, removeChannel, setCurrentChannelId, renameChannel,
} from './Components/Chat/channelsSlice.js';
import { ContextWs } from './contextWs.js';

const WsProvider = ({ wsClient }) => {
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
    dispatch(setCurrentChannelId({ currentChannelId: 1 }));
  });
  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });

  return (
    <ContextWs.Provider value={{ wsClient }}>
      <App />
    </ContextWs.Provider>
  );
};

export default async (wsClient) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const vdom = (
    <Provider store={store}>
        <WsProvider wsClient={wsClient}/>
    </Provider>
  );

  return vdom;
};
