import { useCallback } from "react";
import ColorInput from "../../../components/ColorInput";
import { Grid } from "@mui/material";
import { useThemeValueInfo } from "../../../state/selectors";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setThemeOption } from "../../../slices/Common Slice/themeUpdate";

export default function PaletteInput({ label, path }: { label: string; path: string }) {
  const themeValueInfo = useThemeValueInfo(path);
  const dispatch = useAppDispatch();

  const handleColorChange = useCallback(
    (color: string) => {
      dispatch(setThemeOption({ path, value: color }));
    },
    [dispatch, path]
  );

  return (
    <Grid container justifyContent="space-between" alignItems="flex-end">
      <Grid item>
        <ColorInput
          label={label}
          color={themeValueInfo.value}
          onColorChange={handleColorChange}
        />
      </Grid>
    </Grid>
  );
}