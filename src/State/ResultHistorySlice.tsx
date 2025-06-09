import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Result {
  data: any;
  loading: boolean;
  error: boolean;
  //   success: boolean;
}

const initialState: Result = {
  data: null,
  loading: false,
  error: false,
  //   success: false,
};
const token = localStorage.getItem("authToken");

// Asynchronous thunk to fetch subject list data
export const fetchResultHstory = createAsyncThunk(
  "testResultHistory/fetchTestResultHistory",
  async (_, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}records/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      //   return rejectWithValue(error.message);
      console.log(error);
    }
  }
);

const resultHistorySlice = createSlice({
  name: "subjectList",
  initialState,
  reducers: {
    resetResultHistory: (state) => {
      state.data = null;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultHstory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchResultHstory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // state.success = true;
      })
      .addCase(fetchResultHstory.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = null;
      });
  },
});

export const { resetResultHistory } = resultHistorySlice.actions;
export default resultHistorySlice.reducer;
