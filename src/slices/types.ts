import { Theme, ThemeOptions } from "@mui/material/styles";
import { EditorState } from "./editor/types";
import { StringHeaderIdentifier } from "@tanstack/react-table";

export interface AffiliateDataResponse {
  affiliateid: number;
  affiliatename: string;
  callbackurl: string;
  distributorid: string;
  languageid: string;
  marketid: string;
  status: string;
}

export interface AffiliateState {
  themebuilder: string;
  loading: boolean;
  error: string | undefined;
  data: AffiliateDataResponse | null;
  id: number | null;
  name: string | null;
  username: string | null;
}

export interface RootStateType {
  editor: EditorState;
  themeId: string;
  id?: number | null;
  themeObject: Theme;
  themeOptions: ThemeOptions;
  loadedFonts: Set<string>;
  activeTab: string;
  themeConfigOpen: boolean;
  auth: Auth;
  affiliate: AffiliateState;
  updateThemeButton: UpdateThemeData | null;
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
  affiliate: AffiliateState;
  editorThemeState: boolean;
  affiliateTheme: ThemeOptions;
}

export interface IUser {
  themeId: string;
  id?: number | null;
  savedThemes: Record<string, SavedTheme>;
  loadedFonts: Set<string>;
  activeTab: string;
  themeConfigOpen: boolean;
  auth: Auth;
  affiliate: AffiliateState;
  editorThemeState: boolean;
  __v?: number;
  updatedBy: {
    id?: number | null;
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

export interface affilateDataBody {
  username: string;
  sessionid: string;
  failstatus: number;
  request: {
    themebuilder?: string | null;
  };
}

export interface requestType {
  affiliateid?: number | null;
  affiliatename?: string;
  theme?: {
    live?: any;
    preview?: any;
  };
}

export interface affilatiRequestId {
  themebuilder?: string | null;
  live?: any;
  data: {
    affiliates?: requestType[];
  };
}

export interface affilatiDataRequest {
  data: {
    affiliates?: {
      affiliateid?: number | null;
      affiliatename?: string;
    };
  };
}

export interface affilateRequest {
  affiliateid: number | null;
  affiliatename: string;
  loading: boolean;
  error: string | null;
  status: string | null;
  live: ThemeOptionsType | null;
  preview: ThemeOptionsType | null;
  username: string | null,
}

export interface AffiliateItem {
  id: number|null;
  name: string|null;
}
export interface AffiliateResponse {
  data: {
    affiliates: any[];
  };
}
export interface affilateData {
  affiliates: any;
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

export interface UpdateThemeData {
  username: string;
    sessionid: string;
    failstatus: number;
    request: {
        username: string;
        theme: {
            live: any;
            preview: any;
        };
    };
}

export interface UpdateThemeRequest {
  themebuilder: string;
  loading: boolean;
  error: string | null;
  data?: string; 
}

export interface UpdateTheme {
  action: string;
  username: string;
  theme: {
    live: any;
    preview: any;
  };
}
