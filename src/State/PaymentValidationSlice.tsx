import { createSlice } from "@reduxjs/toolkit";

interface analysisList {
  validate: boolean;
}

const initialState: analysisList = {
  validate: false,
};

const paymentValidationSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setValidate: (state, action) => {
      state.validate = action.payload;
    },
    resetValidate: (state) => {
      state.validate = false;
    },
  },
});

export const { setValidate, resetValidate } = paymentValidationSlice.actions;
export default paymentValidationSlice.reducer;
