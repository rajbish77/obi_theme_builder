import React, { useState } from "react";
import { styled, Theme } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PaletteTools from "./PaletteTools/PaletteTools";
import PaletteIcon from "@mui/icons-material/Palette";
import ToolPanel from "./ToolPanel";

const themeToolsBottomNavBarHeight = "56px"; // Adjust as needed

const ThemeToolsRoot = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "auto",
}));

const ThemeToolsBottomNavBar = styled(BottomNavigation)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderTop: "1px solid",
  borderTopColor: theme.palette.divider,
  width: `calc(100% - 1px)`,
  height: themeToolsBottomNavBarHeight,
}));

const SelectedBottomNavigationAction = styled(BottomNavigationAction)(({ theme }: { theme: Theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#212121",
    "& .MuiBottomNavigationAction-wrapper": {
      color: "#fff",
    },
  },
  "& .MuiBottomNavigationAction-wrapper": {
    color: theme.palette.text.disabled,
  },
}));

export const paletteToolsId = "palette-tools-nav";
export const fontToolsId = "font-tools-nav";
export const typographyToolsId = "typography-tools-nav";
export const snippetToolsId = "snippet-tools-nav";

const toolPanels: Array<{
  label: string;
  icon: React.ReactNode;
  tools: any;
  id: string;
}> = [
  {
    label: "Palette",
    icon: <PaletteIcon />,
    tools: PaletteTools,
    id: paletteToolsId,
  },
  // {
  //   label: "Typography",
  //   icon: <TypographyIcon />,
  //   tools: TypographyTools,
  //   id: typographyToolsId,
  // }
];

const ThemeTools = () => {
  const [bottomNavIndex, setBottomNavIndex] = useState(0);

  const currentTool = toolPanels[bottomNavIndex];

  return (
    <ThemeToolsRoot>
      <ToolPanel panelTitle={currentTool.label}>
        <currentTool.tools />
      </ToolPanel>

      <ThemeToolsBottomNavBar
        value={bottomNavIndex}
        showLabels
        onChange={(event, newValue) => setBottomNavIndex(newValue)}
      >
        {toolPanels.map((panel, index) => (
          <SelectedBottomNavigationAction
            key={`${index}-${panel.label}`}
            id={panel.id}
            label={panel.label}
            value={index}
            icon={panel.icon}
          />
        ))}
      </ThemeToolsBottomNavBar>
    </ThemeToolsRoot>
  );
};

export default ThemeTools;
