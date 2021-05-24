import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    value: {},
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.value.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const { setData, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
