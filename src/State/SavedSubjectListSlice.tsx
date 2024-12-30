import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SavedSubjectList {
  data: [];
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: SavedSubjectList = {
  data: [],
  loading: false,
  error: false,
  success: false,
};
const token = localStorage.getItem("authToken");
// Asynchronous thunk to fetch subject list data
export const fetchSavedSubjectList = createAsyncThunk(
  "savedSubjectList/fetchSavedSubjectList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://lynspeed.pythonanywhere.com/api/v1/user/subjects/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      return response.data.selected_subjects;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const savedSubjectListSlice = createSlice({
  name: "SavedSubjectList",
  initialState,
  reducers: {
    resetSavedSubject: (state) => {
      state.data = [];
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedSubjectList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSavedSubjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchSavedSubjectList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export const { resetSavedSubject } = savedSubjectListSlice.actions;
export default savedSubjectListSlice.reducer;
