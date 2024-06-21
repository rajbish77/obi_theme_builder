import React, { ReactNode } from "react"
import Typography from "@mui/material/Typography"
import { makeStyles, Theme, createStyles } from "@mui/material/styles"

const useStyles:any = makeStyles((theme: any) =>
  createStyles({
    toolPanel: {
      backgroundColor: "#212121",
      flexGrow: 1,
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    toolPanelTitle: {
      paddingLeft: 16,
      paddingRight: 16,
      borderBottom: `1px solid ${theme.palette.divider}`,
      borderTop: "1px solid grey",
    },
    toolPanelContent: {
      flex: 1,
      overflowY: "auto",
      overflowX: "hidden",
    },
  })
)

export const toolPanelId = "theme-tool-panel"

interface ToolPanelProps {
  panelTitle: string
  children: ReactNode
}

function ToolPanel({ panelTitle, children }: ToolPanelProps) {
  const classes = useStyles()
  return (
    <div id={toolPanelId} className={classes.toolPanel}>
      <div className={classes.toolPanelTitle}>
        <Typography variant="overline">{panelTitle}</Typography>
      </div>
      <div className={classes.toolPanelContent}>{children}</div>
    </div>
  )
}

export default ToolPanel
