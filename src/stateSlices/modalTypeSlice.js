/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modalType',
  initialState: {
    id: null,
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
    setModalId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalId } = modalSlice.actions;
export default modalSlice.reducer;
