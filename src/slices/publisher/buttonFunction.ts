import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PublishersResponse, Publish } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import PubApi from "../../Api Work/pub-api";
import { VIPER_CONST } from "../../commonConstant";

const publish = createAsyncThunk(
  "publisher",
  async (data , thunkApi) => {
    let body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      failstatus: 0,
      request: {}
    };
    console.log(`Request from api ${VIPER_CONST.base_url}getauthorizedlogin:`, body);
    try {
      const requestData = await PubApi.PublishReq(body);

      console.log(`API Response: ${VIPER_CONST.base_url}getauthorizedlogin`, requestData );

      return thunkApi.fulfillWithValue(requestData);
    } catch (error: any) {
      console.error("No response:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

type PInitialState = {
    publisher: { data: Publish[] | null };
    loading: boolean;
    auth: boolean;
};

const initialState: PInitialState = {
    publisher: {
        data: null,
    },
    loading: false,
    auth: true,
};

const buttonFunction = createSlice({
    name: "Get Publisher Data",
    initialState,
    reducers: {
        clearAuth: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(publish.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(publish.fulfilled, (state, action) => {
            state.loading = false;
            state.auth = true;
            // console.log("Fulfilled action payload:", action.payload);
            const response = action.payload as PublishersResponse;
            state.publisher.data = response.data.themes || null;
        });
        builder.addCase(publish.rejected, (state) => {
            state.loading = false;
        });

        
    },
});


export { publish };

export default buttonFunction.reducer;
