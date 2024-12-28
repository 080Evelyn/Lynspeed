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
  },
});

export const { setValidate } = paymentValidationSlice.actions;
export default paymentValidationSlice.reducer;
