import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UpdateTheme, UpdateThemeData, UpdateThemeResponse, UpdateThemeRequest, isValidResponse } from "./types";
import { VIPER_CONST } from "../commonConstant";
import SaveThemeApi from "../Api Work/saveThemeApi";

const initialState: UpdateThemeRequest = {
  live: null,
  preview: null,
  themebuilder: "",
  loading: false,
  error: null,
  data: undefined,
};

export const updateTheme = createAsyncThunk<UpdateThemeResponse, UpdateTheme, { rejectValue: string }>(
  "affiliate/updateTheme",
  async (data, thunkApi) => {
    const body: UpdateThemeData = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: {
        action: data.action,
        affiliateid: data.affiliateid,
        theme: data.theme,
      },
    };
    console.log(`Request For ${VIPER_CONST.base_url}updatetheme`, body);

    try {
      const response = await SaveThemeApi.updateThemeData(body);
      console.log(`Request For ${VIPER_CONST.base_url}updatetheme`, response)
      if (!isValidResponse(response)) {
        throw new Error("Invalid response format");
      }
      return response;
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
    builder.addCase(updateTheme.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTheme.fulfilled, (state, action: PayloadAction<UpdateThemeResponse>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateTheme.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearAffiliate } = affiliateSlice.actions;
export default affiliateSlice.reducer;
