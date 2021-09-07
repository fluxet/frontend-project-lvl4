import { configureStore } from '@reduxjs/toolkit';

import channels from './stateSlices/channelsSlice.js';
import messages from './stateSlices/messagesSlice.js';
import errors from './stateSlices/errorSlice.js';
import modal from './stateSlices/modalSlice.js';

const store = configureStore({
  reducer: {
    channels, messages, modal, errors,
  },
});

export default store;
