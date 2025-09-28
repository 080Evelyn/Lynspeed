import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface payHistory {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: boolean;
  success: boolean;
}

const initialState: payHistory = {
  data: [],
  loading: false,
  error: false,
  success: false,
};

export const fetchPayhistory = createAsyncThunk(
  "paymentHistory/fetchPayhistory",
  async (token: string | null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/v1/payments/`,
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

const paymantHistorySlice = createSlice({
  name: "paymentHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayhistory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPayhistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPayhistory.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      });
  },
});

// export const {} = paymantHistorySlice.actions;
export default paymantHistorySlice.reducer;
