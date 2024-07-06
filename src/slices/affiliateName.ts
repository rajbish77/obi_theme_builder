import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "../app/store";
import { _post } from "../configs/api-config";
import { affilateData, Affiliate } from "./types";
import { VIPER_CONST } from "../commonConstant";
import AffData from "../configs/affiliateApi";
import { _getAffiliate } from "../commonFunction";


const initialState: affilateData = {
  affiliates: [],
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
      const responseData = await AffData.affilate(body);

      const idName = responseData?.data?.affiliates
      
      await _getAffiliate(idName)

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
    builder.addCase(affiliateData.fulfilled, (state, action) => {
      state.affiliates = action.payload.data?.affiliates;
    });
  },
  reducers: {
    clearAuth: (state) => initialState,
  },
});

export { affiliateData };

export const { clearAuth } = affiliateIdData.actions;
export default affiliateIdData.reducer;
