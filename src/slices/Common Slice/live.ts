import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface liveState {
  live: any;
}

const initialState: liveState = {
  live: "",
};

const liveWork = createSlice({
  name: "live Slice",
  initialState,
  reducers: {
    setlive: (state, action: PayloadAction<any>) => {
      state.live = action.payload;
    },
  },
});

export const { setlive } = liveWork.actions;
export default liveWork.reducer;
