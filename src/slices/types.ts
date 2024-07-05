import { Theme, ThemeOptions } from "@mui/material/styles";
// import { withStyles, createTheme } from '@material-ui/core/styles';
import { EditorState } from "./editor/types";
import { StringHeaderIdentifier } from "@tanstack/react-table";

export interface RootStateType {
  editor: EditorState;
  themeId: string;
  id?: number | null;
  themeObject: Theme;
  themeOptions: ThemeOptions;
  // savedThemes: Record<string, SavedTheme>
  loadedFonts: Set<string>;
  activeTab: string;
  themeConfigOpen: boolean;
  auth: Auth;
  affiliate: Affiliate;
  editorThemeState: boolean;
  affiliateTheme: ThemeOptions;
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
  editor: EditorState;
  themeId: string;
  id?: number | null;
  themeObject: Theme;
  themeOptions: ThemeOptions;
  savedThemes: Record<string, SavedTheme>;
  loadedFonts: Set<string>;
  activeTab: string;
  themeConfigOpen: boolean;
  auth: Auth;
  affiliate: Affiliate;
  editorThemeState: boolean;
  affiliateTheme: ThemeOptions;
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
  userEmail: string;
  auth: boolean;
  privilege: string;
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
  themeOptions: ThemeOptions;
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

export interface Requestpublish {
  affiliateid: any;
  action: string;
  status: number | null;
  statusMessage: string;
}

export interface body {
  username: string;
  sessionid: string;
  failstatus: number;
  request: {
    username?: string;
    password?: string;
    privilege?: string;
  };
}

export interface buttonBody {
  username: string;
  sessionid: string;
  failstatus: number;
  request: {
    affiliateid: number;
    action: string;
    message?: StringHeaderIdentifier;
  };
}

export interface Palette {
  header: {
    backgroundcolor: string;
    textcolor: string;
    button: {
      background: string;
      color: string;
      border: string;
      hoverbackground: string;
      hovercolor: string;
    };
  };
}

export interface PaletteOptions {
  header?: {
    backgroundcolor?: string;
    textcolor?: string;
    button?: {
      background?: string;
      color?: string;
      border?: string;
      hoverbackground?: string;
      hovercolor?: string;
    };
  };
}

export interface affilateBody {
  username: string;
  sessionid: string;
  failstatus: number;
  request: {
    affiliateid?: number | null;
    themebuilder?: string | null;
  };
}

export interface affilatiRequestId {
  themebuilder?: string | null;
  live?: any;
  data: {
    affiliates?: {
      affiliateid?: number | null;
      affiliatename?: string;
      theme?: {
        live?: any;
        preview?: any;
      };
    };
  };
}

export interface affilateRequest {
  affiliateid: number;
  affiliatename: string;
  loading: boolean;
  error: string | null;
  status: string | null;
  live: ThemeOptionsType | null;
  preview: ThemeOptionsType | null;
}

export interface AffiliateItem {
  id: number;
  name: string;
}

export interface AffiliateResponse {
  data: {
    affiliates: any[];
  };
}
export interface affilateData {
  affiliates: any;
  loading: boolean;
  error: string | null;
}

export interface ThemeOptionsType {
  themeOptions: {
    palette: {
      header: {
        backgroundColor: string;
        textColor: string;
        button: {
          buttonBackground: string;
          buttonColor: string;
          buttonHoverBackground: string;
          buttonHoverColor: string;
        };
      };
      navbar: {
        backgroundColor: string;
        textColor: string;
      };
      body: {
        backgroundColor: string;
        textColor: string;
      };
      button: {
        primary: {
          buttonBackground: string;
          buttonColor: string;
          buttonHoverBackground: string;
          buttonHoverColor: string;
        };
        secondary: {
          buttonBackground: string;
          buttonColor: string;
          buttonHoverBackground: string;
          buttonHoverColor: string;
        };
      };
      card: {
        backgroundColor: string;
        textColor: string;
      };
      subfooter: {
        backgroundColor: string;
        textColor: string;
      };
      footer: {
        backgroundColor: string;
        textColor: {
          primary: {
            textColor: string;
          };
          secondary: {
            textColor: string;
          };
        };
      };
    };
    typography?: {
      fontFamily: string;
    };
  };
}

export type affiliateThym ={
  live: any;
  preview: any;
}
