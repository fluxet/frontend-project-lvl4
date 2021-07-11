// @ts-check
import Rollbar from 'rollbar';
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import initTranslation from './initTranslation.js';
import store from './store.js';
import App from './App.jsx';
import { addMessage } from './Components/Chat/messagesSlice.js';
import { ContextWs } from './contextWs.js';

const WsProvider = ({ wsClient }) => {
  const dispatch = useDispatch();
  const socket = wsClient;
  socket.on('newMessage', (message) => {
    dispatch((addMessage(message)));
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

  initTranslation();

  const vdom = (
    <Provider store={store}>
        <WsProvider wsClient={wsClient}/>
    </Provider>
  );

  return vdom;
};
