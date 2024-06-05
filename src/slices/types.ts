// import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme"
// import { withStyles, createTheme } from '@material-ui/core/styles';
// import { EditorState } from "./editor/types"

export interface RootState {
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
}

export type Auth = {
  auth: boolean;
  editor: string;
  publisher: string;
  userName: string;
};

export type SavedTheme = {
  id: string;
  name: string;
  // themeOptions: ThemeOptions
  fonts: string[];
  lastUpdated: string;
};

export type NewSavedTheme = Omit<SavedTheme, "id">;

export type PreviewSize = "xs" | "sm" | "md" | "lg" | "xl" | false;

export type Affiliate = {
  id: number | null;
  name: string | null;
};
