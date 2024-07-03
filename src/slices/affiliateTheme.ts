import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../app/store";
import { _post } from "../configs/api-config";
import { affilateRequest, Auth } from "./types";
import { VIPER_CONST } from "../commonConstant";
import AuthApi from "../configs/auth-api";
import AffiApi from "../configs/affiliateTheme-api";

interface AuthResponse {
  status: number;
  statusMessage: string;
  privilege: string;
  username: string;
}

const initialState: affilateRequest = {
  // affiliatename: null,
  themebuilder: "Y",
  loading: false,
  error: null,
};

const affiliate = createAsyncThunk(
  "affiliateData",
  async (data: { affiliateid: number }, thunkApi) => {
    let body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: {affiliateid: 1},
    };

    console.log(`Request For ${VIPER_CONST.base_url}getaffiliates`, body);
    try {
      const responseData = await AffiApi.affilateData(body);

      console.log(
        `Response For ${VIPER_CONST.base_url}getaffiliates`,
        responseData
      );

      // console.log(responseData.status);
      return thunkApi.fulfillWithValue({ ...responseData, ...data });
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const affiliateSlice = createSlice({
  name: "affiliateData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(affiliate.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(affiliate.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(affiliate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
  reducers: {
    clearAuth: (state) => initialState,
  },
});

export { affiliate };

export const { clearAuth } = affiliateSlice.actions;
export default affiliateSlice.reducer;
