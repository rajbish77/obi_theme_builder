interface CustomPaletteOptions {
  header?: {
    backgroundColor: string;
    textColor: string;
    button: {
      background: string;
      color: string;
      border: string;
      hoverBackground: string;
      hoverColor: string;
    };
  };
  navbar?: {
    backgroundColor: string;
    textColor: string;
  };
  body?: {
    backgroundColor: string;
    textColor: string;
  };
  button?: {
    primary?: {
      background: string;
      color: string;
      border: string;
      boxShadow: string;
      hoverBackground: string;
      hoverColor: string;
      hoverBorder: string;
      boxHoverShadow: string;
    };
    secondary?: {
      background: string;
      color: string;
      hoverBackground: string;
      hoverColor: string;
    };
  };
  subfooter?: {
    backgroundColor: string;
    textColor: string;
  };
  footer?: {
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
}

// Define the NewSavedTheme interface extending from CustomPaletteOptions
interface NewSavedTheme {
  name: string;
  themeOptions: {
    palette: CustomPaletteOptions;
  };
  fonts: string[];
  lastUpdated?: Date;
}

const defaultThemeList: Omit<NewSavedTheme, "lastUpdated">[] = [
  {
    name: "Default Theme",
    themeOptions: {
      palette: {
        header: {
          backgroundColor: "#212529",
          textColor: "#fff",
          button: {
            background: "#fff",
            color: "#000",
            border: "#000",
            hoverBackground: "#000",
            hoverColor: "#fff"
          }
        },
        navbar: {
          backgroundColor: "#f5f5f5",
          textColor: "#000",
        },
        body: {
          backgroundColor: "#fff",
          textColor: "#000",
        },
        button: {
          primary: {
            background: "#9f004f",
            color: "#fff",
            border: "#ccc",
            boxShadow: "#fff",
            hoverBackground: "#fff",
            hoverColor: "#9f004f",
            hoverBorder: "#ccc",
            boxHoverShadow: "#ccc",
          },
          secondary: {
            background: "#6e7881",
            color: "#fff",
            hoverBackground: "#fff",
            hoverColor: "#000"
          }
        },
        subfooter: {
          backgroundColor: "#f0f0f0",
          textColor: "#000000",
        },
        footer: {
          backgroundColor: "#212529",
          textColor: {
            primary: {
              textColor: "#fff"
            },
            secondary: {
              textColor: "#fff"
            }
          },
        }
      },
    },
    fonts: ["Poppins"],
  },
]

export default defaultThemeList;
