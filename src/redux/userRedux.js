import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    success: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    reset: (state) => {
      state.isFetching = false;
      state.error = false;
      state.success = false;
    },

    //Register
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.success = true;
      state.currentUser = null;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.success = false;
    },

    //Delete
    deleteStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.currentUser = null;
    },
    deleteFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Update
    updateStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.success = false;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.success = true;
    },
    updateFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  reset,
  registerStart,
  registerSuccess,
  registerFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  updateStart,
  updateSuccess,
  updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
