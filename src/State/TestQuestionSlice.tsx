import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Test {
  data: [];
  loading: boolean;
  error: any;
  test_id: any;
}

const initialState: Test = {
  data: [],
  loading: false,
  error: false,
  test_id: "",
};
const token = localStorage.getItem("authToken");
// Asynchronous thunk to fetch subject list data
export const fetchTestQuestions = createAsyncThunk(
  "testQuestion/fetchTestQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}api/v1/test-session/start/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const testQuestionsSlice = createSlice({
  name: "testQuestions",
  initialState,
  reducers: {
    resetTestQuestions: (state) => {
      state.data = [];
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestQuestions.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTestQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTestQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});
export const { resetTestQuestions } = testQuestionsSlice.actions;
export default testQuestionsSlice.reducer;
