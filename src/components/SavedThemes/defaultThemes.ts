import { NewSavedTheme } from "../../slices/types"

const defaultThemeList: Omit<NewSavedTheme, "lastUpdated">[] = [
  {
    name: "Default Theme",
    themeOptions: {
      palette: {
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
        // card: {
        //   backgroundcolor: "#ffffff",
        //   textcolor: "#000",
        // },
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
      },
    },
    fonts: ["Poppins"],
  },
]

export default defaultThemeList
