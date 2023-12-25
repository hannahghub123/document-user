import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  otp: "",
  email: "",
};

const otpSlice = createSlice({
  name: "otpSlice",
  initialState: {
    value: INITITALSTATE,
  },
  reducers: {
    changeOTP: (state, action) => {
      state.value.otp = action.payload;
    },
    changeEmail: (state, action) => {
      state.value.email = action.payload;
    },
  },
});

export const { changeOTP, changeEmail } = otpSlice.actions;

export default otpSlice.reducer;
