import React, { useCallback } from "react";
import ColorInput from "../../../components/ColorInput";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { useThemeValueInfo } from "../../../state/selectors";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setPreview } from "../../../slices/Common Slice/preview";
import { setThemeOption } from "../../../state/themeSlice";
import { setThemeInput } from "../../../slices/editor/editorSlice";

export default function PaletteInput({ label, path }: { label: string; path: string }) {
  const themeValueInfo = useThemeValueInfo(path);
  const previewData = useAppSelector(state => state.preview)
  const dispatch = useAppDispatch();

  const handleColorChange = useCallback(
    (color: string) => {
      dispatch(setThemeInput({ path, value: color }));
      // dispatch(setPreview({ path, value: color }));
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