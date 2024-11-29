import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SubjectList {
  data: [];
  loading: boolean;
  error: boolean;
}

const initialState: SubjectList = {
  data: [],
  loading: false,
  error: false,
};

// Asynchronous thunk to fetch subject list data
export const fetchSubjectList = createAsyncThunk(
  "subjectList/fetchSubjectList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://lynspeed.pythonanywhere.com/api/v1/subjects",
        {
          headers: {
            "Content-Type": "application/json",
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

const subjectListSlice = createSlice({
  name: "SubjectList",
  initialState,
  reducers: {
    clearSubjectListData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectList.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSubjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubjectList.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
      });
  },
});

export const { clearSubjectListData } = subjectListSlice.actions;
export default subjectListSlice.reducer;
