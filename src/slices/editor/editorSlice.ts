import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import JSON5 from 'json5';
import { ThemeOptions } from '@material-ui/core';
import { EditorState, EditorStateOptions } from './types';
import { parseEditorOutput } from './parser';

const stringify = (themeOptions: ThemeOptions) => {
  return `let theme: ${JSON5.stringify(themeOptions, null, 2)};`;
};

const initialState: EditorState = {
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
    } catch (err) {
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
