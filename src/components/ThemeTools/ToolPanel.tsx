import React, { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { Theme, styled } from "@mui/material/styles";

const ToolPanelRoot = styled("div")(( { theme: Theme }) => ({
  backgroundColor: "#212121",
  flexGrow: 1,
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
}));

const ToolPanelTitle = styled("div")(({ theme }: { theme: Theme }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderTop: "1px solid grey",
}));

const ToolPanelContent = styled("div")({
  flex: 1,
  overflowY: "auto",
  overflowX: "hidden",
});

export const toolPanelId = "theme-tool-panel";

interface ToolPanelProps {
  panelTitle: string;
  children: ReactNode;
}

function ToolPanel({ panelTitle, children }: ToolPanelProps) {
  return (
    <ToolPanelRoot id={toolPanelId}>
      <ToolPanelTitle>
        <Typography variant="overline">{panelTitle}</Typography>
      </ToolPanelTitle>
      <ToolPanelContent>{children}</ToolPanelContent>
    </ToolPanelRoot>
  );
}

export default ToolPanel;
