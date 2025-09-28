import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface user {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: boolean;
  success: boolean;
}

const initialState: user = {
  data: [],
  loading: false,
  error: false,
  success: false,
};

// Asynchronous thunk to fetch subject list data
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (token: string | null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/v1/users/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
