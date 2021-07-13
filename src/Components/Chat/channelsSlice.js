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
    setCurrentChannelId: (state, action) => {
      state.value.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const {
  setChannels, addChannel, removeChannel, setCurrentChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;
