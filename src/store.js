import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import channels from './Components/Chat/channelsSlice.js';
import messages from './Components/Chat/messagesSlice.js';
import modalType from './Components/Chat/modalTypeSlice.js';

const reducer = combineReducers({
  channels, messages, modalType,
});

export default configureStore({
  reducer,
});

// export default configureStore({
//   reducer: {
//     channels: channelsReducer,
//     messages: messagesReducer,
//   },
// });
