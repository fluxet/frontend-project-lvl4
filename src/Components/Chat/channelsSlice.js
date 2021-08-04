/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: '',
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;

      console.log('state: ', state);
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels
        .filter((channel) => channel.id !== action.payload.id);
    },
    renameChannel: (state, action) => {
      console.log('renamed channel: ', action.payload);
      const channelId = action.payload.id;
      const currentIndex = state.channels.findIndex((channel) => channel.id === channelId);
      state.channels[currentIndex] = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const {
  setChannels, addChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
