// editorWindowSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorWindowState {
  activeTab: string;
}

const initialState: EditorWindowState = {
  activeTab: 'preview',
};

const editorWindowSlice = createSlice({
  name: 'editorWindow',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = editorWindowSlice.actions;
export default editorWindowSlice.reducer;
