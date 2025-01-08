import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserData } from "./userSlice"; // Import the fetchUserData action

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem("authToken"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccessful(state) {
      state.isAuthenticated = true;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      // console.log("setToken action payload:", action.payload);
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("authToken", action.payload);
      } else {
        localStorage.removeItem("authToken");
      }
    },
    // expiredLogout(state) {
    //   state.isAuthenticated = false;
    //   state.token = null;
    //   state.error = "Session expired. Please log in again.";
    //   console.log("token expired");
    // },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetAuth: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { loginSuccessful, setError, resetAuth, setToken } =
  authSlice.actions;
export default authSlice.reducer;
