import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggingIn: false,
    isPatient: false,
    isDoc: false,
    user: {},
  },
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.isLoggingIn = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.isDoc = false;
      state.isPatient = true;
      state.user = action.payload;
      state.isLoggingIn = false;
    },
    LOGIN_FAILURE: (state) => {
      state.isLoggingIn = false;
    },
    DOC_LOGIN_SUCCESS: (state, action) => {
      state.isDoc = true;
      state.isPatient = false;
      state.user = action.payload;
      state.isLoggingIn = false;
    },
    LOGOUT_SUCCESS: (state) => {
      state.isDoc = false;
      state.isPatient = false;
      state.user = null;
    },
  },
});

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  DOC_LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} = authSlice.actions;

export default authSlice.reducer;
