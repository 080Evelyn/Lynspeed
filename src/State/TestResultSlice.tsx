import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SubjectList {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: boolean;
}

const initialState: SubjectList = {
  data: [],
  loading: false,
  error: false,
};

const token = localStorage.getItem("authToken");
// Asynchronous thunk to fetch subject list data
export const fetchTestResults = createAsyncThunk<any, number>(
  "testResult/fetchTestResult",
  async (testID) => {
    try {
      const response = await axios.get(
        `https://lynspeed.pythonanywhere.com/api/v1/test-session/${testID}/results/`,
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

const testResultSlice = createSlice({
  name: "subjectList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestResults.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTestResults.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTestResults.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      });
  },
});

export default testResultSlice.reducer;