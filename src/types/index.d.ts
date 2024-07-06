import { StateReconciler } from "redux-persist/lib/types";

type ThemeOptionsType = {
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
  [];
};

type Theme = {
  affiliate_id?: number;
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
  [];
};

type GetTheme = {
  affiliate_id?: number;
};

type LoginRequest = {
  username: string;
  password: string;
  privilege: string;
};
