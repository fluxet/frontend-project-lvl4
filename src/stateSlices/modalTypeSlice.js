/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modalType',
  initialState: {
    type: '',
    isOpened: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
