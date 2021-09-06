import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import channels from './stateSlices/channelsSlice.js';
import messages from './stateSlices/messagesSlice.js';
import errors from './stateSlices/errorSlice.js';
import modal from './stateSlices/modalSlice.js';

const reducer = combineReducers({
  channels, messages, modal, errors,
});

const store = configureStore({
  reducer,
});

export default store;
