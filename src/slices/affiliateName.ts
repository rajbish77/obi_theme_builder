import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../app/store";
import { _post } from "../configs/api-config";
import { affilateData } from "./types";
import { VIPER_CONST } from "../commonConstant";
import AuthApi from "../configs/auth-api";
import AffiApi from "../configs/affiliateTheme-api";


const initialState: affilateData = {
  affiliates: [],
  loading: false,
  error: null,
};

const affiliateData = createAsyncThunk(
  "affiliateData",
  async (data: { themebuilder: string }, thunkApi) => {
    let body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: data,
    };

    try {
      const responseData = await AffiApi.affilateData(body);

      return thunkApi.fulfillWithValue({ ...responseData, ...data });
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const affiliateIdData = createSlice({
  name: "affiliateData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(affiliateData.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(affiliateData.fulfilled, (state, action) => {
      state.loading = false;
      state.affiliates = action.payload.data?.affiliates;
    });
    builder.addCase(affiliateData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
  reducers: {
    clearAuth: (state) => initialState,
  },
});

export { affiliateData };

export const { clearAuth } = affiliateIdData.actions;
export default affiliateIdData.reducer;
