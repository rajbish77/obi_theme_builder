import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../app/store";
import { _post } from "../configs/api-config";
import { affilateRequest } from "./types";
import { VIPER_CONST } from "../commonConstant";
import AuthApi from "../configs/auth-api";
import AffiApi from "../configs/affiliateTheme-api";

const initialState: affilateRequest = {
  affiliateid: 0,
  affiliatename: "",
  loading: false,
  error: null,
  status: null,
  live: null,
  preview: null,
};

const affiliate = createAsyncThunk(
  "affiliateData",
  async (datas: { affiliateid: number }, thunkApi) => {
    let body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: datas,
    };

    console.log(`Request For ${VIPER_CONST.base_url}getaffiliates`, body);
    try {
      const responseData = await AffiApi.affilateData(body);
      console.log(`Response For ${VIPER_CONST.base_url}getaffiliates`, responseData);

      return thunkApi.fulfillWithValue({ ...responseData, ...datas });
    } catch (error) {
      throw thunkApi.rejectWithValue(error);
    }
  }
);

const affiliateSlice = createSlice({
  name: "affiliateData",
  initialState,
  reducers: {
    clearAuth: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(affiliate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(affiliate.fulfilled, (state, action) => {
      state.loading = false;

      const affiliates = action.payload.data?.affiliates;
      if (affiliates) {
        const affiliateData = affiliates[0];
        state.affiliateid = affiliateData.affiliateid;
        state.affiliatename = affiliateData.affiliatename;
        state.live = affiliateData.theme?.live || null;
        state.preview = affiliateData.theme?.preview || null;
      };
    });
    builder.addCase(affiliate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearAuth } = affiliateSlice.actions;
export default affiliateSlice.reducer;
export { affiliate };
