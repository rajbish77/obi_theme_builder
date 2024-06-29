import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType, PreviewSize, Affiliate, Auth } from '../slices/types';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { generateThemeId, setByPath } from '../utils';
import { defaultThemeOptions } from '../siteTheme';
import { THEMEEDITOR, THEMEPUBLISHER } from '../commonConstant';
import deepmerge from 'deepmerge';
import { initialState as editorInitialState } from "../slices/editor/editorSlice";
import { createBreakpoints } from '@mui/system';

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

const breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
});

const initialState: RootStateType = {
  id: null,
  editor: editorInitialState,
  themeId: defaultThemeId,
  themeOptions: defaultThemeOptions,
  themeObject: createTheme({
    ...defaultThemeOptions,
    breakpoints,
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
  affiliate: { id: null, name: null },
  editorThemeState: false,
  affiliateTheme: defaultThemeOptions
};

const createPreviewMuiTheme = (
  themeOptions: ThemeOptions,
  previewSize: PreviewSize
) => {
  if (!previewSize) return createTheme({ ...themeOptions, breakpoints });

  return createTheme(
    deepmerge(
      { breakpoints },
      themeOptions
    )
  );
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeOption: (state:any , action: PayloadAction<{ path: string; value: any }>) => {
      state.themeOptions = setByPath(state.themeOptions, action.payload.path, action.payload.value);
      state.themeObject = createPreviewMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = true;
      state.savedThemes[state.themeId] = {
        ...state.savedThemes[state.themeId],
        themeOptions: state.themeOptions,
        lastUpdated: new Date().toISOString(),
      };
    },
    setAffiliateId: (state:any, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    loadSavedTheme: (state:any, action: PayloadAction<ThemeOptions>) => {
      state.themeOptions = action.payload;
      state.themeObject = createPreviewMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = false;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    resetSiteData: (state) => {
      return initialState;
    },
    // logInState: (state:any, action: PayloadAction<{ loginType: any; userName: string }>) => {
    //   if (action.payload.loginType === THEMEEDITOR) {
    //     state.auth = {
    //       auth: true,
    //       editor: "Y",
    //       publisher: "N",
    //       userName: action.payload.userName,
    //     };
    //   } else if (action.payload.loginType === THEMEPUBLISHER) {
    //     state.auth = {
    //       auth: true,
    //       editor: "N",
    //       publisher: "Y",
    //       userName: action.payload.userName,
    //     };
    //   }
    // },
    logOutState: (state) => {
      state.auth = {...state.auth,...initialAuthState };
      state.id = null;
    },
    fetchAffiliate: (state:any, action: PayloadAction<Affiliate[]>) => {
      state.affiliate = action.payload;
    },
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
  setAffiliateId,
  loadSavedTheme,
  setActiveTab,
  resetSiteData,
  // logInState,
  logOutState,
  fetchAffiliate,
  affiliateTheme,
  editorThemeState,
} = themeSlice.actions;

export default themeSlice.reducer;
