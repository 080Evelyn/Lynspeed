import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SubjectList {
  data: [];
  loading: boolean;
  error: any;
}

const initialState: SubjectList = {
  data: [],
  loading: false,
  error: false,
};

const token = window.localStorage.getItem("authToken");

// Asynchronous thunk to fetch subject list data
export const fetchSubjectList = createAsyncThunk(
  "subjectList/fetchSubjectList",
  async (_, { rejectWithValue }: any) => {
    try {
      const response = await axios.get(
        "https://lynspeed.pythonanywhere.com/api/v1/subjects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error);
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
      .addCase(fetchSubjectList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      });
  },
});

export const { clearSubjectListData } = subjectListSlice.actions;
export default subjectListSlice.reducer;
