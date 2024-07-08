import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _post } from "../configs/api-config";
import { affilateRequest } from "./types";
import { VIPER_CONST } from "../commonConstant";
import AffiApi from "../configs/affiliateTheme-api";
import SaveThemeApi from "../Api Work/saveThemeApi";
import { _getAffiliate } from "../commonFunction";

const initialState: affilateRequest = {
  affiliateid: null,
  affiliatename: "",
  loading: false,
  error: null,
  status: null,
  live: null,
  preview: null,
};

export const affiliate = createAsyncThunk(
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
      return thunkApi.rejectWithValue(error);
    }
  }
);


const affiliateSlice = createSlice({
  name: "affiliate",
  initialState,
  reducers: {
    clearAffiliate: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(affiliate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(affiliate.fulfilled, (state, action) => {
      state.loading = false;
      state.status= action.payload.status?.toString() ?? null;
      const affiliates = action.payload.data?.affiliates?.[0];
      if (affiliates) {
        state.affiliateid = affiliates.affiliateid ?? null;
        state.affiliatename = affiliates.affiliatename ?? "";
        state.live = affiliates.theme?.live || null;
        state.preview = affiliates.theme?.preview || null;
      }
    });
    builder.addCase(affiliate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const affiliateid = affiliateSlice.actions;

export const { clearAffiliate } = affiliateSlice.actions;
export default affiliateSlice.reducer;
