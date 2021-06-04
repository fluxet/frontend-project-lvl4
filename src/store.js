import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './Components/Chat/channelsSlice.js';
import messagesReducer from './Components/Chat/messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
