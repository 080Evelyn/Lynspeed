// authMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { expiredLogout, setError } from "../../Components/authSlice";
import { RootState } from "../Store";

// Custom Middleware to handle 401 errors globally
const authMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    if (action.type.includes("rejected") && action.payload?.status === 401) {
      store.dispatch(expiredLogout()); // Dispatch logout action
      store.dispatch(
        setError("Your session has expired. Please log in again.")
      );
      // Optionally, show a notification (e.g., using a toast)
    }
    return next(action);
  };

export default authMiddleware;
