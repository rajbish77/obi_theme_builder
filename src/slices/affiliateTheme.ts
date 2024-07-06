import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _post } from "../configs/api-config";
import { affilateRequest } from "./types";
import { VIPER_CONST } from "../commonConstant";
import AffiApi from "../configs/affiliateTheme-api";
import SaveThemeApi from "../Api Work/saveThemeApi";

const initialState: affilateRequest = {
  affiliateid: null,
  affiliatename: "",
  loading: false,
  error: null,
  username: "",
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

      return thunkApi.fulfillWithValue({ ...responseData, ...datas, username: VIPER_CONST.alwaysOnUsername });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateTheme = createAsyncThunk(
  "affiliate/updateTheme",
  async (
    {
      username,
      theme,
    }: { username: string; theme: { live: any; preview: any } },
    thunkApi
  ) => {
    const body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: {
        username,
        theme,
      },
    };

    console.log(`Request For ${VIPER_CONST.base_url}updatetheme`, body);
    try {
      const response = await SaveThemeApi.updateThemeData(body);
      console.log(`Response For ${VIPER_CONST.base_url}updatetheme`, response);
      return thunkApi.fulfillWithValue(response);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message || "An error occurred");
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

      const affiliates = action.payload.data?.affiliates;
      if (affiliates) {
        state.affiliateid = affiliates.affiliateid ?? null;
        state.affiliatename = affiliates.affiliatename ?? "";
        state.username = action.payload.username ?? null;
        state.live = affiliates.theme?.live || null;
        state.preview = affiliates.theme?.preview || null;
      }
    });
    builder.addCase(affiliate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateTheme.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTheme.fulfilled, (state, action) => {
      state.loading = false;
      // Handle the updated theme response if needed
    });
    builder.addCase(updateTheme.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearAffiliate } = affiliateSlice.actions;
export default affiliateSlice.reducer;
