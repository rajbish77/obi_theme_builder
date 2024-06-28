import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../app/store";
import { _post } from "../configs/api-config";
import { Auth } from "./types";
import { VIPER_CONST } from "../commonConstant";
import AuthApi from "../configs/auth-api";

interface AuthResponse {
  status: number;
  statusMessage: string;
  privilege: string;
  username: string;
}

const initialState: Auth = {
  auth: false,
  editor: "",
  publisher: "",
  username: "",
  loading: false,
  error: null,
  status: null,
  statusMessage: "",
};

const login = createAsyncThunk(
  "auth/login",
  async (
    data: { username: string; password: string; privilege: string },
    thunkApi
  ) => {
    let body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: data,
    };

    console.log(`Request For ${VIPER_CONST.base_url}getauthorizedlogin`, body);
    try {
      const responseData = await AuthApi.login(body);

      // const responseData = await user;

      console.log(
        `Response For ${VIPER_CONST.base_url}getauthorizedlogin`,
        responseData
      );

      // console.log(responseData.status);
      return thunkApi.fulfillWithValue({ ...responseData, ...data });
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
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
      state.status = action?.payload?.status;
      state.statusMessage = action?.payload?.statusMessage;
      if (action?.payload?.status === 0) {
        state.auth = true;
        state.editor = action?.payload?.privilege === "THEMEEDITOR" ? "Y" : "N";
        state.publisher = action?.payload?.privilege === "THEMEPUBLISHER" ? "Y" : "N";
        state.username = action?.payload?.username;
      }
      state.auth = true;
        // state.editor = action?.payload?.privilege === "THEMEEDITOR" ? "Y" : "N";
        // state.publisher = action?.payload?.privilege === "THEMEPUBLISHER" ? "Y" : "N";
        // state.username = action?.payload?.username;
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

export const { clearAuth } = loginSlice.actions;
export default loginSlice.reducer;
