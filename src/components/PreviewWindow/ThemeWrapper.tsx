import React, { useEffect, useState } from "react"
import { ThemeProvider, Theme, makeStyles } from "@mui/material/styles"
import { useSelector } from "react-redux"
import { RootStateType } from "../../slices/types"
import Paper from "@mui/material/Paper"

interface ThemeWrapperProps {
  children: React.ReactNode | React.ReactNodeArray
}

/**
 *
 * Wraps example content in the dynamically controlled theme
 * set by the theme editor sidebar
 */
const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const themeObject = useSelector((state: RootStateType) => state.themeObject)

  return (
    <ThemeProvider theme={themeObject}>
      <ThemeContainer>{children}</ThemeContainer>
    </ThemeProvider>
  )
}

const useStyles: any = makeStyles((theme: Theme) => ({
  themeContainer: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100%",
  },
}))

/**
 *
 * CssBa
 *
 */
const ThemeContainer = ({ children }: ThemeWrapperProps) => {
  const classes = useStyles()
  return (
    <Paper className={classes.themeContainer} elevation={0} square>
      {children}
    </Paper>
  )
}

export default ThemeWrapper
