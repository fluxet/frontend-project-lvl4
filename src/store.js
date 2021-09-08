import { configureStore } from '@reduxjs/toolkit';

import channels from './stateSlices/channelsSlice.js';
import messages from './stateSlices/messagesSlice.js';
import modal from './stateSlices/modalSlice.js';

const store = configureStore({
  reducer: {
    channels, messages, modal,
  },
});

export default store;
