import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface analysisList {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: boolean;
}

const initialState: analysisList = {
  data: [],
  loading: false,
  error: false,
};

const token = localStorage.getItem("authToken");
// Asynchronous thunk to fetch subject list data
export const fetchAnalysis = createAsyncThunk(
  "analysis/fetchAnalysis",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}analysis/`,
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

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    resetAnalysis: (state) => {
      state.data = [];
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysis.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalysis.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      });
  },
});

export const { resetAnalysis } = analysisSlice.actions;
export default analysisSlice.reducer;
