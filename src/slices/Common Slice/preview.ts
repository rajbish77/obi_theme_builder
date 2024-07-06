import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreviewState {
  preview: any;
}

const initialState: PreviewState = {
  preview: "",
};

const previewWork = createSlice({
  name: "preview Slice",
  initialState,
  reducers: {
    setPreview: (state, action: PayloadAction<any>) => {
      state.preview = action.payload;
    },
  },
});

export const { setPreview } = previewWork.actions;
export default previewWork.reducer;
