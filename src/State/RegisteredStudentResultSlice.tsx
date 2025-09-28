import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface results {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: any;
  success: boolean;
  result: any[];
}

const initialState: results = {
  data: [],
  loading: false,
  error: false,
  success: false,
  result: [],
};

// Asynchronous thunk to fetch subject list data
export const fetchStudentsResult = createAsyncThunk(
  "studentsResult/fetchStudentsResult",
  async (token: string | null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/v1/enterprise/results/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "failed to load"
      );
    }
  }
);

const RegisteredStudentResultSlice = createSlice({
  name: "studentsResult",
  initialState,
  reducers: {
    getResult: (state, action) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsResult.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchStudentsResult.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchStudentsResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
        state.success = false;
      });
  },
});

export const { getResult } = RegisteredStudentResultSlice.actions;
export default RegisteredStudentResultSlice.reducer;
