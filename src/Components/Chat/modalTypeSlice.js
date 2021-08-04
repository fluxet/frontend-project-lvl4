/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modalType',
  initialState: {
    type: '',
    isOpened: false,
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
      state.isOpened = true;
    },
    setVisibility: (state, action) => {
      state.isOpened = action.payload;
    },
  },
});

export const { setType, setVisibility } = modalSlice.actions;
export default modalSlice.reducer;
