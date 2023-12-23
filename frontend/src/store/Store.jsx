import { configureStore } from "@reduxjs/toolkit";
import documentReducer from '../features/documentSlice';
import otpReducer from '../features/otpSlice';

const store = configureStore({
    reducer: {
      documentReducer:documentReducer,
      otpReducer:otpReducer,
    },
  });

export default store;