import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    value: {},
  },
  reducers: {
    setChannels: (state, action) => ({
      ...state,
      value: {
        channels: action.payload.channels,
        currentChannelId: action.payload.currentChannelId,
      },
    }),
    addChannel: (state, action) => {
      state.value.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      const newChannels = state.value.channels
        .filter((channel) => channel.id !== action.payload.id);

      return {
        ...state,
        value: {
          ...state.value,
          channels: newChannels,
        },
      };
    },
    renameChannel: (state, action) => {
      console.log('renamed channel: ', action.payload);
      const channelId = action.payload.id;
      const currentIndex = state.value.channels.findIndex((channel) => channel.id === channelId);

      const newChannels = update(
        state.value.channels,
        { [currentIndex]: { $set: action.payload } },
      );

      return {
        ...state,
        value: {
          ...state.value,
          channels: newChannels,
        },
      };
    },
    setCurrentChannelId: (state, action) => ({
      ...state,
      value: {
        ...state.value,
        currentChannelId: action.payload.currentChannelId,
      },
    }),
  },
});

export const {
  setChannels, addChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
