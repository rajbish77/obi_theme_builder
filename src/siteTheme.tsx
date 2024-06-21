import {
    createTheme,
    ThemeOptions,
    Theme,
} from "@mui/material/styles"

export const defaultThemeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#333',
        },
        secondary: {
            main: '#666',
        },
    },
};

const customThemeProperties = ({
    header: {
        backgroundcolor: "#212529",
        textcolor: "#fff",
        button: {
            background: "#fff",
            color: "#000",
            border: "#000",
            hoverbackground: "#000",
            hovercolor: "#fff"
        }
    },
    navbar: {
        backgroundcolor: "#f5f5f5",
        textcolor: "#000",
    },
    body: {
        backgroundcolor: "#fff",
        textcolor: "#000",

    },
    button: {
        primary: {
            background: "#9f004f",
            color: "#fff",
            border: "#ccc",
            boxshadow: "#fff",
            hoverbackground: "#fff",
            hovercolor: "#9f004f",
            hoverborder: "#ccc",
            boxhovershadow: "#ccc",
        },
        secondary: {
            background: "#6e7881",
            color: "#fff",
            hoverbackground: "#fff",
            hovercolor: "#000"
        }
    },
    card: {
        backgroundcolor: "#ffffff",
        textcolor: "#000",
    },
    subfooter: {
        backgroundcolor: "#f0f0f0",
        textcolor: "#000000",
    },
    footer: {
        backgroundcolor: "#212529",
        textcolor: {
            primary: {
                textcolor: "#fff"
            },
            secondary: {
                textcolor: "#fff"
            }
        },
    }
})

export const defaultTheme: ThemeOptions = createTheme()

export const themeConfig: any = {
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        secondary: {
            main: "#f48fb1",
        },
    },
    components: {
        MuiAccordion: {
            defaultProps: {
                square: true,
                TransitionProps: {
                    unmountOnExit: true,
                }
            },
            styleOverrides: {
                root: {
                    border: "1px solid rgba(255, 255, 255, .125)",
                    boxShadow: "none",
                    transition: defaultTheme.transitions.create("margin-left"),
                    "&:not(:last-child)": {
                        borderBottom: 0,
                    },
                    "&:before": {
                        display: "none",
                    },
                    "&$expanded": {
                        margin: "auto",
                    },
                    "&$disabled": {
                        marginLeft: 32,
                    },
                },
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid rgba(255, 255, 255, .125)",
                    minHeight: 56,
                    "&$expanded": {
                        minHeight: 56,
                    },
                },
                content: {
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&$expanded": {
                        margin: "12px 0",
                    },
                },
            },
        },

        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    backgroundColor: "#212121",
                },
            }
        },
        MuiDrawer: {
            styleOverrides: {
                docked: {
                  "& $paper": {
                    position: "static",
                  },
                },
                paper: {},
              },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#000",
                },
            },
        },
    },

}

export default createTheme({ ...defaultThemeOptions, ...customThemeProperties })
