import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType, PreviewSize, AffiliateItem, Auth } from '../slices/types';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { generateThemeId } from '../utils';
import { defaultThemeOptions } from '../siteTheme';
import { THEMEEDITOR, THEMEPUBLISHER } from '../commonConstant';
import deepmerge from 'deepmerge';
import { initialState as editorInitialState } from "../slices/editor/editorSlice";
import { createBreakpoints } from '@mui/system';
import AffiApi from '../configs/affiliateTheme-api';
import { setByPath } from '../commonFunction';
import JSON5 from 'json5';

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
  statusMessage: ""
};

// const breakpoints = createBreakpoints({
//   values: {
//     xs: 0,
//     sm: 600,
//     md: 960,
//     lg: 1280,
//     xl: 1920,
//   },
// });

const initialState: RootStateType = {
  id: null,
  editor: editorInitialState,
  themeId: defaultThemeOptions as string,
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
  loadedFonts: new Set(),
  activeTab: "preview",
  themeConfigOpen: false,
  auth: initialAuthState,
  affiliate: {
    id: null, name: null,
    themebuilder: '',
    loading: false,
    error: undefined,
    data: null,
    username: null
  },
  editorThemeState: false,
  affiliateTheme: defaultThemeOptions,
  updateThemeButton: null,
  themeInput: stringify(defaultThemeOptions),
};

const createMuiTheme = (
  themeOptions: ThemeOptions,
  previewSize: PreviewSize
) => {
  if (!previewSize) return createTheme({ ...themeOptions });

  return createTheme(
    deepmerge(
      {},
      themeOptions
    )
  );
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeOption: (state:any, action: PayloadAction<{ path: string; value: any }>) => {
      const { path, value } = action.payload;
      setByPath(state.themeOptions, path, value);
      console.log(state.themeOptions, path, value)
      state.themeObject = createMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = true;
      state.savedThemes[state.themeId] = {
        ...state.savedThemes[state.themeId],
        themeOptions: state.themeOptions,
        lastUpdated: new Date().toISOString(),
      };
      state.themeInput = stringify(state.themeOptions);
      console.log(state.themeInput)
    },
    setAffiliateId: (state:any, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    loadSavedTheme: (state:any, action: PayloadAction<ThemeOptions>) => {
      state.themeOptions = action.payload;
      state.themeObject = createMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = false;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    resetSiteData: (state) => { localStorage.clear(); },
    // setThemeId: (state, action: PayloadAction<string>) => {
    //   state.themeId = action.payload;
    // },
    toggleThemeConfig: (state) => {
      state.themeConfigOpen = !state.themeConfigOpen;
    },
    // fetchAffiliate: (state:any, action: PayloadAction<AffiliateItem[]>) => {
    //   state.affiliate = action.payload;
    // },
    affiliateTheme: (state:any, action: PayloadAction<ThemeOptions>) => {
      state.affiliateTheme = action.payload;
    },
    editorThemeState: (state, action: PayloadAction<boolean>) => {
      state.editorThemeState = action.payload;
    },
  },
});

export const {
  setThemeOption,
  // setAffiliateId,
  // loadSavedTheme,
  // setActiveTab,
  resetSiteData,
  // fetchAffiliate,
  affiliateTheme,
  editorThemeState,
  // setThemeId,
  toggleThemeConfig,
} = themeSlice.actions;

export default themeSlice.reducer;
