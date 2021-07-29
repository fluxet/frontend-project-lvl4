/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modalType',
  initialState: {
    value: {
      type: '',
      isOpened: false,
    },
  },
  reducers: {
    setType: (state, action) => {
      state.value = {
        type: action.payload,
        isOpened: true,
      };
    },
    setVisibility: (state, action) => {
      state.value.isOpened = action.payload;
    },
  },
});

export const { setType, setVisibility } = modalSlice.actions;
export default modalSlice.reducer;
