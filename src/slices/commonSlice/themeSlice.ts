import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PreviewSize, Auth, ThemeChanges } from "../../types";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { generateThemeId } from "../../utils";
import { defaultThemeOptions } from "../../defaultTheme";
import { THEMEEDITOR, THEMEPUBLISHER } from "../../commonConstant";
import deepmerge from "deepmerge";
import { initialState as editorInitialState } from "../editor/editorSlice";
import { createBreakpoints } from "@mui/system";
import AffiApi from "../../api/affiliate-theme-api";
import { setByPath } from "../../commonFunction";
import JSON5 from "json5";

const stringify = (themeOptions: ThemeOptions) => {
  return `let theme: ${JSON5.stringify(themeOptions, null, 2)}`;
};

const defaultThemeId = generateThemeId({});
const initialAuthState: Auth = {
  auth: false,
  editor: "",
  publisher: "",
  username: "",
  loading: false,
  error: null,
  status: null,
  statusMessage: "",
};

const initialState: ThemeChanges = {
  id: null,
//   themeId: defaultThemeOptions as string,
  themeOptions: defaultThemeOptions,
  themeObject: createTheme({
    ...defaultThemeOptions,
  }),
  savedThemes: {
    [defaultThemeId]: {
      id: defaultThemeId,
      name: "My Theme",
      themeOptions: defaultThemeOptions,
      fonts: ["Poppins"],
      lastUpdated: new Date().toISOString(),
    },
  },
  themeConfigOpen: false,
  editorThemeState: false,
  affiliateTheme: defaultThemeOptions,
  themeInput: stringify(defaultThemeOptions),
};

const createMuiTheme = (
  themeOptions: ThemeOptions,
  previewSize: PreviewSize
) => {
  if (!previewSize) return createTheme({ ...themeOptions });

  return createTheme(deepmerge({}, themeOptions));
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeOption: (
      state: any,
      action: PayloadAction<{ path: string; value: any }>
    ) => {
      const { path, value } = action.payload;
      setByPath(state.themeOptions, path, value);
      state.themeObject = createMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = true;
    //   state.savedThemes[state.themeId] = {
    //     ...state.savedThemes[state.themeId],
    //     themeOptions: state.themeOptions,
    //     lastUpdated: new Date().toISOString(),
    //   };
      state.themeInput = stringify(state.themeOptions);
    },
    setAffiliateId: (state: any, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    loadSavedTheme: (state: any, action: PayloadAction<string | object>) => {
      let themeOptions;
      try {
        if (typeof action.payload === "string") {
          themeOptions = JSON.parse(action.payload);
        } else if (typeof action.payload === "object") {
          themeOptions = action.payload; // Already a parsed object, assign directly
        } else {
          themeOptions = defaultThemeOptions; // Fallback in case of incorrect data
        }
      } catch (error) {
        console.error("Invalid theme data provided to loadSavedTheme:", error);
        themeOptions = defaultThemeOptions; // Fallback in case of incorrect data
      }
    
      state.themeOptions = themeOptions;
      state.themeObject = createMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = false;
      state.themeInput = stringify(state.themeOptions);
    },    
    resetSiteData: (state) => {
      localStorage.clear();
    },
    toggleThemeConfig: (state) => {
      state.themeConfigOpen = !state.themeConfigOpen;
    },
    affiliateTheme: (state: any, action: PayloadAction<ThemeOptions>) => {
      state.affiliateTheme = action.payload;
    },
    editorThemeState: (state, action: PayloadAction<boolean>) => {
      state.editorThemeState = action.payload;
    },
  },
});

export const {
  setThemeOption,
  setAffiliateId,
  resetSiteData,
  loadSavedTheme,
  affiliateTheme,
  editorThemeState,
  toggleThemeConfig,
} = themeSlice.actions;

export default themeSlice.reducer;
