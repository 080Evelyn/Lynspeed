import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default is localStorage
import { combineReducers } from "redux";
import authReducer from "../Components/authSlice"; // Import auth reducer
import userReducer from "../Components/userSlice"; // Import user reducer
import subjectListReducer from "./SubjectListSlice";
import savedSubjectListReducer from "./SavedSubjectListSlice";
import testQuestionsReducer from "./TestQuestionSlice";
import testResultReducer from "./TestResultSlice";
import resultHistoryReducer from "./ResultHistorySlice";
// import authMiddleware from "./Auth/Authmiddleware";

// Create persist config
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Which storage to use (localStorage)
  whitelist: [
    "auth",
    "subjectList",
    // "savedSubjectList",
    // "testQuestions",
    // "resultHistory",
    // "testResult",
  ], // Add savedSubjectList
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  subjectList: subjectListReducer,
  savedSubjectList: savedSubjectListReducer,
  testQuestions: testQuestionsReducer,
  testResult: testResultReducer,
  resultHistory: resultHistoryReducer,
});

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with middleware configuration to ignore non-serializable checks
const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific paths where non-serializable values are found
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }),
});

// Create persistor (used for initializing persistence)
export const persistor = persistStore(store);

// Export the store
export default store;

// Type for the entire state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
