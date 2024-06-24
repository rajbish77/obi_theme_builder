import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import JSON5 from 'json5';
import { ThemeOptions } from '@mui/material';
import { EditorState, EditorStateOptions } from './types';
import { parseEditorOutput } from './parser';
import { defaultThemeOptions } from '../../siteTheme';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { useCallback } from 'react'; // Import useCallback from react

const stringify = (themeOptions: ThemeOptions) => {
  return `let theme: ${JSON5.stringify(themeOptions, null, 2)};`;
};

// Export the hook directly
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
    updateTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.themeInput = stringify(action.payload);
    },
    addNewTheme: (state, action: PayloadAction<{ themeOptions: ThemeOptions }>) => {
      state.themeInput = stringify(action.payload.themeOptions);
    },
    loadTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.themeInput = stringify(action.payload);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveEditorToTheme.fulfilled, (state, action) => {
        state.themeInput = stringify(action.payload);
      })
      .addCase(saveEditorToTheme.rejected, (state, action) => {
        state.errors.push({
          category: 1,
          messageText: action.payload as string,
          code: 0,
          file: undefined,
          start: undefined,
          length: undefined
        });
      });
  }
});

export const {
  updateEditorState,
  updateTheme,
  addNewTheme,
  loadTheme,
  updateVersionStates
} = editorSlice.actions;

export default editorSlice.reducer;
