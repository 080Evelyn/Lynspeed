import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Test {
  data: [];
  loading: boolean;
  error: boolean;
}

const initialState: Test = {
  data: [],
  loading: false,
  error: false,
};
const token = localStorage.getItem("authToken");
// Asynchronous thunk to fetch subject list data
export const fetchTestQuestions = createAsyncThunk(
  "testQuestion/fetchTestQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://lynspeed.pythonanywhere.com/api/v1/test-session/start/",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      return response.data.subjects;
    } catch (error: any) {
      // console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const testQuestionsSlice = createSlice({
  name: "testQuestions",
  initialState,
  reducers: {},
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
      .addCase(fetchTestQuestions.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      });
  },
});

export default testQuestionsSlice.reducer;
