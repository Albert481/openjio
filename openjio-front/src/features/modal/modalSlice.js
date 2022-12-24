import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginOpen: false,
};

const modalSlice = createSlice({
  name: 'loginmodal',
  initialState,
  reducers: {
    openLoginModal: (state, action) => {
      state.isLoginOpen = true;
    },
    closeLoginModal: (state, action) => {
      state.isLoginOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = modalSlice.actions;

export default modalSlice.reducer;