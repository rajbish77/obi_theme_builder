import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser(state, action) {
        // state.user = action.payload;
      },
      clearUser(state) {
        // state.user = null;
      },
    },
  });