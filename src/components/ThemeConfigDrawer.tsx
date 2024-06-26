import React from "react";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { AuthState, RootStateType } from "../slices/types";
import MonacoThemeCodeEditor from "./MonacoThemeCodeEditor";
import ThemeTools from "./ThemeTools/ThemeTools";

const drawerWidth = 300;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  height: "100vh",
  maxWidth: "90vw",
});

const StyledDrawerPaper = styled("div")(({ theme }) => ({
  width: drawerWidth,
  overflowY: "visible",
  maxWidth: "90vw",
}));

const StyledGridContainer = styled(Grid)({
  height: "100vh",
});

const StyledGridItem = styled(Grid)(({ theme }) => ({
  minHeight: "30vh",
  height: "100%",
}));

const ThemeConfigDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const themeId = useSelector((state: RootStateType) => state.themeId);
  const open = useSelector((state: AuthState) => state.themeConfigOpen);

  const permanent = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledDrawer
      variant={permanent ? "permanent" : "temporary"}
      anchor="right"
      open={open}
      onClose={() => dispatch({ type: "TOGGLE_THEME_CONFIG" })}
    >
      <StyledDrawerPaper>
        <StyledGridContainer container direction="column" wrap="nowrap">
          <StyledGridItem item>
            {/* Use themeId as key so that editor is torn down and rebuilt with new theme */}
            <MonacoThemeCodeEditor key={themeId} />
          </StyledGridItem>

          <StyledGridItem item>
            <ThemeTools />
          </StyledGridItem>
        </StyledGridContainer>
      </StyledDrawerPaper>
    </StyledDrawer>
  );
};

export default ThemeConfigDrawer;
