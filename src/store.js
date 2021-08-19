import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import channels from './stateSlices/channelsSlice.js';
import messages from './stateSlices/messagesSlice.js';
import modalType from './stateSlices/modalTypeSlice.js';

const reducer = combineReducers({
  channels, messages, modalType,
});

const store = configureStore({
  reducer,
});

export default store;
// export default configureStore({
//   reducer: {
//     channels: channelsReducer,
//     messages: messagesReducer,
//   },
// });
