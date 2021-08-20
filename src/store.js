import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import io from 'socket.io-client';

import channels, {
  addChannel, removeChannel, renameChannel,
} from './stateSlices/channelsSlice.js';
import messages, { addMessage } from './stateSlices/messagesSlice.js';
import modalType from './stateSlices/modalTypeSlice.js';

const reducer = combineReducers({
  channels, messages, modalType,
});

const store = configureStore({
  reducer,
});

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

export default store;
