import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface notification {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: boolean;
}

const initialState: notification = {
  data: [],
  loading: false,
  error: false,
};

const token = localStorage.getItem("authToken");
// Asynchronous thunk to fetch subject list data
export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://lynspeed.pythonanywhere.com/api/v1/notifications/",
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

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotification.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      });
  },
});

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;
