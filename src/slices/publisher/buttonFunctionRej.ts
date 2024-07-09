import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PublishersResponse, Publish } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import PubApi from "../../Api Work/pub-api";
import { VIPER_CONST } from "../../commonConstant";
import PublishAPI from "../../configs/pubButton";

// const publishButton = createAsyncThunk(
//   "publish/work",
//   async (data: {affiliateid: any; action: string;} , thunkApi) => {
//     let body = {
//       username: VIPER_CONST.alwaysOnUsername,
//       sessionid: VIPER_CONST.alwaysOnSessionid,
//       failstatus: 0,
//       request: data,
//     };

//     console.log(`Request from api ${VIPER_CONST.base_url}updatetheme:`, body);

//     try {
//       const requestData = await PublishAPI.RequestPublish(body);

//       console.log(
//         `API Response: ${VIPER_CONST.base_url}updatetheme`,
//         requestData
//       );

//       return thunkApi.fulfillWithValue({...requestData, ...data});
//     } catch (error: any) {
//       console.error("No response:", error);

//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

const rejectButton = createAsyncThunk(
  "publish/work",
  async (data: {affiliateid: any; action: string; message: any; } , thunkApi) => {
    let body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: data,
    };

    console.log(`Request from api ${VIPER_CONST.base_url}updatetheme:`, body);

    try {
      const requestData = await PublishAPI.RequestPublish(body);

      console.log(
        `API Response: ${VIPER_CONST.base_url}updatetheme`,
        requestData
      );

      return thunkApi.fulfillWithValue({...requestData, ...data});
    } catch (error: any) {
      console.error("No response:", error);

      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export type publishFunction = {
  status: number | null;
  statusMessage: string;
  loading: boolean;
  error: string | null ;
};

const initialState: publishFunction = {
  status: null,
  statusMessage: "",
  loading: false,
  error: null,
};

const rejButtonSlice = createSlice({
  name: "Login auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(rejectButton.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(rejectButton.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action?.payload?.status ?? null ;
      state.statusMessage = action?.payload?.statusMessage ?? "" ;
    });
    builder.addCase(rejectButton.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
  reducers: {
    clearAuth: (state) => initialState,
  },
});

export { rejectButton };

export default rejButtonSlice.reducer;
