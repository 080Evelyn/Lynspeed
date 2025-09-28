import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface students {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: any;
  success: boolean;
  sub: any[];
  dataById: any[];
  subId: any;
}

const initialState: students = {
  data: [],
  loading: false,
  error: false,
  success: false,
  sub: [],
  dataById: [],
  subId: "",
};

// Asynchronous thunk to fetch subject list data
export const fetchRegisteredStudents = createAsyncThunk(
  "students/fetchRegisteredStudents",
  async (token: string | null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/v1/enterprise/students/`,
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

export const fetchRegisteredStudentsById = createAsyncThunk(
  "studentsbyid/fetchRegisteredStudentsById",
  async (
    { token, id }: { token: string | null; id: string | number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }api/v1/enterprise/students/?subscription_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSub = createAsyncThunk(
  "sub/fetchSub",
  async (token: string | null, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/v1/enterprise/subscriptions/`,
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

const StudentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    getSubId: (state, action) => {
      state.subId = action.payload;
    },
    resetStudents: (state) => {
      state.data = [];
      state.loading = false;
      state.error = false;
      state.success = false;
      state.sub = [];
      state.dataById = [];
      state.subId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredStudents.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchRegisteredStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchRegisteredStudents.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
        state.success = false;
      })
      .addCase(fetchRegisteredStudentsById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchRegisteredStudentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.dataById = action.payload;
        state.success = true;
      })
      .addCase(fetchRegisteredStudentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.dataById = [];
        state.success = false;
      })
      .addCase(fetchSub.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSub.fulfilled, (state, action) => {
        state.loading = false;
        state.sub = action.payload;
        state.success = true;
      })
      .addCase(fetchSub.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.sub = [];
        state.success = false;
      });
  },
});

export const { getSubId, resetStudents } = StudentSlice.actions;
export default StudentSlice.reducer;
