/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    errorMessage: null,
  },
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { setErrorMessage } = errorsSlice.actions;
export default errorsSlice.reducer;
