import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface analysisList {
  data: any[]; // Changed from [] to any[] for flexibility
  loading: boolean;
  error: boolean;
  success: boolean;
  skillId: any;
}

const initialState: analysisList = {
  data: [],
  loading: false,
  error: false,
  success: false,
  skillId: "",
};

const token = localStorage.getItem("authToken");
// Asynchronous thunk to fetch subject list data
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}api/v2/skills/`,
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

const SkillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    resetSkill: (state) => {
      state.data = [];
      state.error = false;
      state.success = false;
      state.loading = false;
      state.skillId = "";
    },
    setSkillId: (state, action) => {
      state.skillId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchSkills.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.data = [];
        state.success = false;
      });
  },
});

export const { resetSkill, setSkillId } = SkillsSlice.actions;
export default SkillsSlice.reducer;
