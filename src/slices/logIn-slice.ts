import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "../configs/auth-api";
import { Auth } from "./types";
import { VIPER_CONST } from "../commonConstant";

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

export const login = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string; privilege: string }, thunkApi) => {
    const body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: data,
    };

    try {
      const responseData = await AuthApi.login(body);
      return thunkApi.fulfillWithValue({ ...responseData, ...data });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => initialState,
    logOut: (state) => {
      state.auth = false;
      state.editor = "N";
      state.publisher = "N";
      state.username = "";
      state.status = null;
      state.statusMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status ?? null;
        state.statusMessage = action.payload?.statusMessage ?? "";
        if (action.payload?.status === 2) {
          state.auth = true;
          state.editor = action.payload?.privilege === "THEMEEDITOR" ? "Y" : "N";
          state.publisher = action.payload?.privilege === "THEMEPUBLISHER" ? "Y" : "N";
          state.username = action.payload?.username;
        } else {
          state.auth = false;
          state.editor = "N";
          state.publisher = "N";
          state.username = "";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.auth = false;
        state.editor = "N";
        state.publisher = "N";
        state.username = "";
      });
  },
});

export const { clearAuth, logOut } = loginSlice.actions;
export default loginSlice.reducer;
