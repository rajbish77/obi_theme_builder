import React from "react"
import Drawer from "@mui/material/Drawer"
import Grid from "@mui/material/Grid"
import { makeStyles, useTheme } from "@mui/material/styles"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from "react-redux"
import { AuthState } from "../slices/types"
// import ThemeTools from "./ThemTool/ThemeTools"
// import MonacoThemeCodeEditor from "src/components/MonacoThemeCodeEditor"

const drawerWidth: React.CSSProperties["width"] = 300

const useStyles: any = makeStyles({
  drawer: {
    width: drawerWidth,
    height: "100vh",
    maxWidth: "90vw",
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: "visible",
    // zIndex: zIndex.drawer + 2,
    maxWidth: "90vw",
  },
  editorWrapper: {
    flexGrow: 1,
    minHeight: "30vh",
    maxHeight: "50vh",
    height: "100%",
  },
  controlsWrapper: {
    minHeight: "30vh",
    height: "100%",
  },
  drawerContainer: {
    height: "100vh",
  },
})

const ThemeConfigDrawer = () => {
  const classes = useStyles()
  const themeId = useSelector((state: AuthState) => state.themeId)
  const open = useSelector((state: AuthState) => state.themeConfigOpen)
  const dispatch = useDispatch()

  const theme = useTheme()
  const permanent = useMediaQuery(theme.breakpoints.up("sm"))

  return (
    <Drawer
      variant={permanent ? "permanent" : "temporary"}
      anchor="right"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      onClose={() => dispatch({ type: "TOGGLE_THEME_CONFIG" })}
    >
      <Grid
        container
        direction="column"
        wrap="nowrap"
        className={classes.drawerContainer}
      >
         <Grid item className={classes.editorWrapper}>
          {/* Use themeId as key so that editor is torn down and rebuilt with new theme */}
          {/* <MonacoThemeCodeEditor key={themeId} /> */}
        </Grid>
        
        <Grid item className={classes.controlsWrapper}>
          {/* <ThemeTools /> */}
        </Grid>
      </Grid>
    </Drawer>
  )
}

export default ThemeConfigDrawer
