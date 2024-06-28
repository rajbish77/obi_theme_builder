import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import JSON5 from 'json5';
import { ThemeOptions } from '@mui/material';
import { EditorState, EditorStateOptions } from './types';
import { parseEditorOutput } from './parser';
import { defaultThemeOptions } from '../../siteTheme';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

const stringify = (themeOptions: ThemeOptions) => {
  return `let theme: ${JSON5.stringify(themeOptions, null, 2)};`;
};

export const useUpdateEditorState = () => {
  const dispatch = useDispatch();
  return useCallback(
    (editorState: EditorStateOptions) =>
      dispatch(updateEditorState(editorState)),
    [dispatch]
  );
};

export const initialState: EditorState = {
  themeInput: stringify(defaultThemeOptions),
  initialVersion: 0,
  currentVersion: 0,
  lastVersion: 0,
  savedVersion: 0,
  canRedo: false,
  canUndo: false,
  errors: [],
  formatOnSave: true,
  outputTypescript: true,
};

export const saveEditorToTheme = createAsyncThunk(
  'editor/saveEditorToTheme',
  async (code: string, { rejectWithValue }) => {
    try {
      const themeOptions = parseEditorOutput(code);
      return themeOptions;
    } catch (err:any) {
      return rejectWithValue(`Error while JSON5 parsing code: ${err.message}`);
    }
  }
);

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateEditorState: (state, action: PayloadAction<EditorStateOptions>) => {
      return { ...state, ...action.payload };
    },
    updateVersionStates: (state, action: PayloadAction<number>) => {
      const nextVersionId = action.payload;
      const { initialVersion, lastVersion, currentVersion } = state;

      if (nextVersionId < currentVersion) {
        state.canRedo = true;
        state.canUndo = nextVersionId !== initialVersion;
      } else {
        state.canUndo = true;
        state.canRedo = nextVersionId < lastVersion;
        state.lastVersion = Math.max(currentVersion, lastVersion);
      }
      state.currentVersion = nextVersionId;
    }
  }
});

export const {
  updateEditorState,
  updateVersionStates
} = editorSlice.actions;

export default editorSlice.reducer;
