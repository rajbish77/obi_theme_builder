import React, {ReactNode } from "react"
import { makeStyles, Theme, createStyles } from "@mui/material/styles"
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux"
import { RootStateType } from "../../slices/types"
import ThemeWrapper from "./ThemeWrapper"

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    previewWrapper: {
      height: "100%",
      position: "relative",
    },
    letterBox: {
      backgroundColor: "#212121",
      height: "100%",
    },
  })
)

interface PreviewWrapperProps {
    children: ReactNode;
  }

/**
 * Wraps children in ThemeWrapper and creates a letterbox around the component
 */
const PreviewWrapper: React.FC<PreviewWrapperProps> = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <div className={`${classes.previewWrapper}`}>
        {/* <PreviewSizeControls /> */}
        <ThemeWrapper>
          <div className={classes.letterBox}>
            <PreviewBackground>{children}</PreviewBackground>
          </div>
        </ThemeWrapper>
      </div>
    </>
  )
}

export default PreviewWrapper

const useBackgroundStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    previewArea: {
      backgroundColor: theme.palette.background.default,
      maxWidth: "none",
      height: "100%",
      overflowY: "scroll",
      margin: "auto",
      position: "relative", // for FAB positioning
      "&.xs": {
        maxWidth: 375,
      },
      "&.sm": {
        maxWidth: 650,
      },
      "&.md": {
        maxWidth: 1000,
      },
    },
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
  })
)

/**
 * Creates a Paper component with a backgroundColor of `palette.background.default`
 * adds 'rtl' as a className if required by the theme to enable RTL styles.
 */
const PreviewBackground: React.FC<PreviewWrapperProps> = ({ children }) => {
  const classes = useBackgroundStyles()

  // if the theme has `direction` set to 'rtl', then add 'rtl' as a classname
  // to the Paper component, so that RTL styles will be enabled
  const directionIsRTL = useSelector(
    (state: RootStateType) => state.themeOptions.direction === "rtl"
  )

  return (
    <Paper
      elevation={8}
      square
      className={`${classes.previewArea}`}
      dir={directionIsRTL ? "rtl" : ""}
    >
      {children}
    </Paper>
  )
}
