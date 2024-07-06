import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { VIPER_CONST } from "../commonConstant";
import { HandleAPIError } from "../commonFunction";
import { UpdateTheme } from "../slices/types";

interface ThemeState {
  loading: boolean;
  error: string | null;
  data: any | null;
}

const initialState: ThemeState = {
  loading: false,
  error: null,
  data: null,
};

export const updateThemeThunk = createAsyncThunk<any, UpdateTheme>(
  "theme/update",
  async (request: UpdateTheme, thunkApi) => {
    const body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: request,
    };

    console.log(`Request For ${VIPER_CONST.base_url}updatetheme`, body);
    try {
      const response = await fetch(`${VIPER_CONST.base_url}updatetheme`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      console.log(`Response For ${VIPER_CONST.base_url}updatetheme`, responseData);
      if (responseData?.status === 0) {
        return responseData;
      } else {
        return thunkApi.rejectWithValue(responseData?.statusMessage);
      }
    } catch (error) {
      HandleAPIError(error);
      return thunkApi.rejectWithValue((error as Error).message);
    }
  }
);

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateThemeThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateThemeThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateThemeThunk.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default themeSlice.reducer;