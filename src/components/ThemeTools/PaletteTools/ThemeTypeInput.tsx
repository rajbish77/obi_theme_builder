import React, { useCallback } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Switch,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setThemeOption } from "../../../state/themeSlice";
import { useThemeValue } from "../../../state/selectors";
import { ThemeValueChangeEvent } from "../events";

const useStyles:any = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      display: "flex",
      alignItems: "center",
    },
    switchBase: {
      color: "#fff",
      // "&$checked": {
      //   color: "#212121",
      // },
      // "&$checked + $track": {
      //   backgroundColor: "#303030",
      // },
    },
    checked: {},
    track: {},
  })
);

export default function ThemeTypeInput() {
  const classes = useStyles();
  const themeIsDark = useThemeValue("palette.type") === "dark";
  const dispatch = useDispatch();

  const toggleThemeType = useCallback(() => {
    const newThemeType = themeIsDark ? "light" : "dark";
    dispatch(setThemeOption({ path: "palette.type", value: newThemeType }));
    document.dispatchEvent(ThemeValueChangeEvent());
  }, [dispatch, themeIsDark]);

  return (
    <div className={classes.inputRoot}>
      <Typography
        variant="body2"
        color={themeIsDark ? "textSecondary" : "textPrimary"}
      >
        Light
      </Typography>
      <Switch
        checked={themeIsDark}
        onClick={toggleThemeType}
        classes={{
          switchBase: classes.switchBase,
          checked: classes.checked,
          track: classes.track,
        }}
        color="default"
      />
      <Typography
        variant="body2"
        color={!themeIsDark ? "textSecondary" : "textPrimary"}
      >
        Dark
      </Typography>
    </div>
  );
}
