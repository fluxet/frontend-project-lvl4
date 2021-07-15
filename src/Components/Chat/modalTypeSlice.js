import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modalType',
  initialState: {
    value: '',
  },
  reducers: {
    setType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setType } = modalSlice.actions;
export default modalSlice.reducer;
