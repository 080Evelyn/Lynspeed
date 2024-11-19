import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

// Asynchronous thunk to fetch user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  try {
    const response = await axios.get('https://lynspeed.pythonanywhere.com/api/v1/profile/');
    return response.data;
  } catch (error) {
    return null;  
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load user data';
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
