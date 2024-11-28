import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserData } from "./userSlice"; // Import the fetchUserData action

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccessful(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.error = null;
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

export const { loginSuccessful, setError } = authSlice.actions;
export default authSlice.reducer;
