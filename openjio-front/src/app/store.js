import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import activityReducer from '../features/activity/activitySlice'
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activityReducer,
    loginmodal: modalReducer,
  },
})