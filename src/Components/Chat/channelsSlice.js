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
    setCurrentChannelId: (state, action) => {
      state.value.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const { setChannels, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
