/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: '',
    defaultChannelId: '',
  },
  reducers: {
    setDefaultChannelid: (state, action) => {
      state.defaultChannelId = action.payload.id;
    },
    setChannels: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels
        .filter((channel) => channel.id !== action.payload.id);

      if (state.currentChannelId === action.payload.id) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
    renameChannel: (state, action) => {
      _.remove(state.channels, (channel) => (channel.id === action.payload.id));
      state.channels.push(action.payload);
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const {
  setChannels, addChannel, removeChannel, renameChannel, setCurrentChannelId, setDefaultChannelid,
} = channelsSlice.actions;
export default channelsSlice.reducer;
