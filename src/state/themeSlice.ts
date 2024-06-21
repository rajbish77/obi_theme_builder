import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, PreviewSize, Auth, Affiliate } from '../slices/types';
import { createTheme, ThemeOptions } from '@mui/material';
import { generateThemeId, isSetEq, setByPath } from '../utils';
import { defaultThemeOptions } from '../siteTheme';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { THEMEEDITOR, THEMEPUBLISHER } from '../commonConstant';
import deepmerge from 'deepmerge';
import { initialState as editorInitialState } from "../slices/editor/editorSlice";
import { createBreakpoints } from '@mui/system';
import WebFont from 'webfontloader';

// Initial States
const defaultThemeId = generateThemeId({});
const initialFonts = ["Poppins", "Droid Sans", "Droid Serif", "Open Sans", "Roboto", "Source-sans-pro"];
const initialAuthState: Auth = {
  auth: false,
  editor: "",
  publisher: "",
  userName: "",
  loading: false,
  error: null
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

const initialState: RootState = {
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
  affiliateTheme: defaultThemeOptions,
};

// Helper Functions
const getFontsFromThemeOptions = (
  themeOptions: ThemeOptions,
  previousFonts: string[] | undefined,
  loadedFonts: Set<string>
) => {
  const typography = themeOptions.typography as TypographyOptions | undefined;

  const fontList: string[] = [
    typography?.fontFamily || "Roboto",
    typography?.h1?.fontFamily,
    typography?.h2?.fontFamily,
    typography?.h3?.fontFamily,
    typography?.h4?.fontFamily,
    typography?.h5?.fontFamily,
    typography?.h6?.fontFamily,
    typography?.subtitle1?.fontFamily,
    typography?.subtitle2?.fontFamily,
    typography?.body1?.fontFamily,
    typography?.body2?.fontFamily,
    typography?.button?.fontFamily,
    typography?.caption?.fontFamily,
    typography?.overline?.fontFamily,
  ]
    .flatMap(x => (x == null ? [] : x.replace(/"/g, "").split(",")))
    .map(x => x.trim());

  const fontSet = new Set<string>();
  fontList.forEach(x => loadedFonts.has(x) && fontSet.add(x));

  if (previousFonts && isSetEq(new Set(previousFonts), fontSet)) {
    return previousFonts;
  }

  return [...fontSet];
};

const loadWebFonts = async (fontsToLoad: string[]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      WebFont.load({
        google: {
          families: fontsToLoad,
        },
        active: () => {
          console.log(`Fonts loaded: ${fontsToLoad}`);
          resolve(true);
        },
        inactive: () => {
          console.error(`Failed to load fonts: ${fontsToLoad}`);
          reject(false);
        },
      });
    } catch (error) {
      console.error('Error loading fonts:', error);
      reject(false);
    }
  });
};

const loadFonts = async (
  fonts: string[],
  loadedFonts: Set<string>
): Promise<Set<string>> => {
  const fontsToLoad = fonts.filter((x) => !loadedFonts.has(x));

  if (!fontsToLoad.length) return loadedFonts;

  const fontsLoaded: boolean = await loadWebFonts(fontsToLoad);
  if (fontsLoaded) {
    return new Set([...loadedFonts, ...fontsToLoad].sort());
  } else {
    throw new Error("Fonts could not be loaded");
  }
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

// Thunks
export const addFonts = createAsyncThunk(
  'theme/addFonts',
  async (fonts: string[], { dispatch, getState }) => {
    const state = getState() as RootState;
    const loadedFonts = await loadFonts(fonts, state.loadedFonts);
    return Array.from(loadedFonts);
  }
);

// Slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeOption: (state:any, action: PayloadAction<{ path: string; value: any }>) => {
      state.themeOptions = setByPath(state.themeOptions, action.payload.path, action.payload.value);
      state.themeObject = createPreviewMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = true;
      state.savedThemes[state.themeId] = {
        ...state.savedThemes[state.themeId],
        themeOptions: state.themeOptions,
        fonts: getFontsFromThemeOptions(
          state.themeOptions,
          state.savedThemes[state.themeId]?.fonts,
          state.loadedFonts
        ),
        lastUpdated: new Date().toISOString(),
      };
    },
    setThemeOptions: (state:any, action: PayloadAction<{ path: string; value: any }[]>) => {
      action.payload.forEach(({ path, value }) => {
        state.themeOptions = setByPath(state.themeOptions, path, value);
      });
      state.themeObject = createPreviewMuiTheme(state.themeOptions, state.previewSize);
      state.editorThemeState = true;
      state.savedThemes[state.themeId] = {
        ...state.savedThemes[state.themeId],
        themeOptions: state.themeOptions,
        fonts: getFontsFromThemeOptions(
          state.themeOptions,
          state.savedThemes[state.themeId]?.fonts,
          state.loadedFonts
        ),
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
    logInState: (state:any, action: PayloadAction<{ loginType: any; userName: string }>) => {
      if (action.payload.loginType === THEMEEDITOR) {
        state.auth = {
          auth: true,
          editor: "Y",
          publisher: "N",
          userName: action.payload.userName,
        };
      } else if (action.payload.loginType === THEMEPUBLISHER) {
        state.auth = {
          auth: true,
          editor: "N",
          publisher: "Y",
          userName: action.payload.userName,
        };
      }
    },
    logOutState: (state) => {
      state.auth = initialAuthState;
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
  extraReducers: (builder) => {
    builder.addCase(addFonts.fulfilled, (state, action) => {
      state.loadedFonts = new Set(action.payload);
    });
  },
});

export const {
  setThemeOption,
  setThemeOptions,
  setAffiliateId,
  loadSavedTheme,
  setActiveTab,
  resetSiteData,
  logInState,
  logOutState,
  fetchAffiliate,
  affiliateTheme,
  editorThemeState,
} = themeSlice.actions;

export default themeSlice.reducer;
