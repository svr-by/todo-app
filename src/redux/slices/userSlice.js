import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
export const { storeUserData } = userSlice.actions;
