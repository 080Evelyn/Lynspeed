import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/Reducer';  // Import auth reducer
import userReducer from '../Components/userSlice';  // Import user reducer

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,  // Register auth slice
    user: userReducer,  // Register user slice
  },
});

// Type for the entire state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
