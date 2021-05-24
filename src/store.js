import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './Components/Chat/channelsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
  },
});
