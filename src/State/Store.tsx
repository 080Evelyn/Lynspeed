// src/State/Store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/Reducer';  // Import auth reducer

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,  // Register auth slice
  },
});

// Type for the entire state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
