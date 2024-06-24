import React, { useCallback } from "react";
import {
  Theme,
  createStyles,
  Typography,
  Switch,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { useDispatch } from "react-redux";
import { setThemeOption } from "../../../state/themeSlice";
import { useThemeValue } from "../../../state/selectors";
import { ThemeValueChangeEvent } from "../events";

const InputRoot = styled("div")({
  display: "flex",
  alignItems: "center",
});

// Define a type for the custom props that Typography will accept
interface StyledTypographyProps {
  isDark: boolean; // Define isDark prop
}

// Use styled function with the defined props
const StyledTypography = styled(Typography)<StyledTypographyProps>(({ theme, isDark }) => ({
  color: isDark ? theme.palette.text.secondary : theme.palette.text.primary,
  marginRight: theme.spacing(1), // Adjust margin as needed
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#fff", // Adjust color when switch is checked
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#303030", // Adjust background color of the track when switch is checked
  },
}));

export default function ThemeTypeInput() {
  const themeIsDark = useThemeValue("palette.type") === "dark";
  const dispatch = useDispatch();

  const toggleThemeType = useCallback(() => {
    const newThemeType = themeIsDark ? "light" : "dark";
    dispatch(setThemeOption({ path: "palette.type", value: newThemeType }));
    document.dispatchEvent(ThemeValueChangeEvent());
  }, [dispatch, themeIsDark]);

  return (
    <InputRoot>
      <StyledTypography variant="body2" isDark={themeIsDark}>
        Light
      </StyledTypography>
      <StyledSwitch
        checked={themeIsDark}
        onChange={toggleThemeType}
        color="default"
      />
      <StyledTypography variant="body2" isDark={!themeIsDark}>
        Dark
      </StyledTypography>
    </InputRoot>
  );
}
