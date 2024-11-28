// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Auth/Reducer"; // Import auth reducer
// import userReducer from "../Components/userSlice"; // Import user reducer
// import subjectListReducer from "./SubjectListSlice";

// // Configure the Redux store
// export const store = configureStore({
//   reducer: {
//     auth: authReducer, // Register auth slice
//     user: userReducer, // Register user slice
//     subjectList: subjectListReducer,
//   },
// });

// // Type for the entire state
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage
import { combineReducers } from "redux";
import authReducer from "../Components/authSlice"; // Import auth reducer
import userReducer from "../Components/userSlice"; // Import user reducer
import subjectListReducer from "./SubjectListSlice";
import authMiddleware from "./Auth/Authmiddleware";

// Create persist config
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Which storage to use (localStorage, sessionStorage, etc.)
  whitelist: ["subjectList", "auth"], // List the reducers you want to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  subjectList: subjectListReducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
});

// Create persistor (used for initializing persistence)
export const persistor = persistStore(store);

// Export the store
export default store;
// Type for the entire state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
