/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    value: {},
  },
  reducers: {
    setChannels: (state, action) => {
      state.value = {
        channels: action.payload.channels,
        currentChannelId: action.payload.currentChannelId,
      };
    },
    addChannel: (state, action) => {
      state.value.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.value.channels = state.value.channels
        .filter((channel) => channel.id !== action.payload.id);
    },
    renameChannel: (state, action) => {
      console.log('renamed channel: ', action.payload);
      const channelId = action.payload.id;
      const currentIndex = state.value.channels.findIndex((channel) => channel.id === channelId);
      state.value.channels[currentIndex] = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.value.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const {
  setChannels, addChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
