import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AffiApi from "../configs/affiliateTheme-api";
import { VIPER_CONST } from "../commonConstant";
import { affilateRequest } from "./types";

interface AffiliateState {
  themebuilder: string;
  loading: boolean;
  error: string | null;
  data: any | null;
}

const initialState: AffiliateState = {
  themebuilder: "Y",
  loading: false,
  error: null,
  data: null,
};

export const affiliate = createAsyncThunk(
  "affiliate/fetch",
  async (data: { affiliateid: number }, thunkApi) => {
    const body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: { affiliateid: data.affiliateid },
    };

    console.log(`Request For ${VIPER_CONST.base_url}getaffiliates`, body);
    try {
      const responseData = await AffiApi.affilateData(body);
      console.log(`Response For ${VIPER_CONST.base_url}getaffiliates`, responseData);
      return thunkApi.fulfillWithValue(responseData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const affiliateSlice = createSlice({
  name: "affiliate",
  initialState,
  reducers: {
    clearAuth: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(affiliate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(affiliate.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(affiliate.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearAuth } = affiliateSlice.actions;
export default affiliateSlice.reducer;
