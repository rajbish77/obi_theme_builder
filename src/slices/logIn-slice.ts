import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthApi from "../Api Work/auth-api";
import { RootState } from "../app/store";
import UserApi from "../Api Work/user-api";
import { _post } from "../configs/api-config";
import { Auth } from "./types";

const initialState: Auth = {
  auth: false,
  editor: "",
  publisher: "",
  userName: "",
  loading: false,
  error: null,
  privilege: "",
};

const login = createAsyncThunk(
  "auth/login",
  async (
    data: { username: string; password: string; privilege: string },
    thunkApi
  ) => {
    try {
      const response = await _post<{
        status: number;
        statusMessage: string;
        data: Auth;
      }>("getauthorizedlogin", data);

      if (!response) {
        throw new Error("No response from API");
      }

      console.log('Login response:', response);
      
      if (response.status !== 0) {
        throw new Error(response.statusMessage);
      }
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "Login auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = true;
      state.editor = action.payload.privilege === "THEMEEDITOR" ? "Y" : "N";
      state.publisher = action.payload.privilege === "THEMEPUBLISHER" ? "Y" : "N";
      state.userName = action.payload.userName;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
  reducers: {
    clearAuth: (state) => initialState,
  },
});

export { login };

export const auth = (state: RootState) => state.logIn.auth;
export const userName = (state: RootState) => state.logIn.userName;
export const publisher = (state: RootState) => state.logIn.publisher;
export const editor = (state: RootState) => state.logIn.editor;
export const loading = (state: RootState) => state.logIn.loading;
export const error = (state: RootState) => state.logIn.error;
export const { clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
