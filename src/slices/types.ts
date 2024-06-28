import { Theme, ThemeOptions } from "@mui/material/styles"
// import { withStyles, createTheme } from '@material-ui/core/styles';
import { EditorState } from "./editor/types"

export interface RootStateType {
  editor: EditorState
  themeId: string
  id?:number | null
  themeObject: Theme
  themeOptions: ThemeOptions
  // savedThemes: Record<string, SavedTheme>
  loadedFonts: Set<string>
  activeTab: string
  themeConfigOpen: boolean
  auth: Auth
  affiliate: Affiliate
  editorThemeState: boolean
  affiliateTheme: ThemeOptions
  savedThemes: {
    [themeId: string]: {
      id: string;
      name: string;
      themeOptions: ThemeOptions;
      fonts: string[];
      lastUpdated: string;
    };
  };
}

export interface AuthState {
  editor: EditorState
  themeId: string;
  id?: number | null;
  themeObject: Theme
  themeOptions: ThemeOptions
  savedThemes: Record<string, SavedTheme>;
  loadedFonts: Set<string>;
  activeTab: string;
  themeConfigOpen: boolean;
  auth: Auth;
  affiliate: Affiliate;
  editorThemeState: boolean;
  affiliateTheme: ThemeOptions
}

export interface IUser {
  // editor: EditorState
  themeId: string;
  id?: number | null;
  // themeObject: Theme
  // themeOptions: ThemeOptions
  savedThemes: Record<string, SavedTheme>;
  loadedFonts: Set<string>;
  activeTab: string;
  themeConfigOpen: boolean;
  auth: Auth;
  affiliate: Affiliate;
  editorThemeState: boolean;
  // affiliateTheme: ThemeOptions
  __v?: number;
  updatedBy: {
    id?: number | null;
    // firstName: string;
    // lastName: string;
  };
}
export interface IAuth {
  userEmail: string,
  auth: boolean,
  privilege: string,
}
export interface IUpdateUserPayload {
  editor: string;
  publisher: string;
  userName: string;
}

export type Auth = {
  auth: boolean;
  editor: string;
  publisher: string;
  username: string;
  loading: boolean;
  error: string | null;
  status: number | null;
  statusMessage: string;
};

export type SavedTheme = {
  id: string;
  name: string;
  themeOptions: ThemeOptions
  fonts: string[];
  lastUpdated: string;
};

export type NewSavedTheme = Omit<SavedTheme, "id">;

export type PreviewSize = "xs" | "sm" | "md" | "lg" | "xl" | false;

export type Affiliate = {
  id: number | null;
  name: string | null;
};

export interface LoginPayload {
  userName: string;
  privilege: string;
}