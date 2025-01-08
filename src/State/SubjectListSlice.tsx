import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface SubjectList {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: boolean;
  saved: boolean;
  success: boolean;
}

const initialState: SubjectList = {
  data: [],
  loading: false,
  error: false,
  saved: false,
  success: false,
};

// Asynchronous thunk to fetch subject list data
export const fetchSubjectList = createAsyncThunk(
  "subjectList/fetchSubjectList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://lynspeed.pythonanywhere.com/api/v1/subjects/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const subjectListSlice = createSlice({
  name: "subjectList",
  initialState,
  reducers: {
    saveSubject: (state) => {
      state.saved = true;
    },
    unSaveSubject: (state) => {
      state.saved = false;
    },
    setSubjectList: (state, action) => {
      state.data = action.payload; // Allows direct setting of subject list from another component
    },
    resetSubjectList: (state) => {
      state.data = [];
      state.error = false;
      state.saved = false;
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
        state.success = true;
      })
      .addCase(fetchSubjectList.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
        state.success = false;
      });
  },
});

export const { saveSubject, unSaveSubject, setSubjectList, resetSubjectList } =
  subjectListSlice.actions;
export default subjectListSlice.reducer;
