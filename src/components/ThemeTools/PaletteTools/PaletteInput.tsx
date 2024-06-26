import React, { useCallback } from "react"
import ColorInput from "../../../components/ColorInput"
import { useDispatch } from "react-redux"
import { setThemeOption } from "../../../state/themeSlice"
import {
  Grid,
} from "@mui/material"
import { useThemeValueInfo } from "../../../state/selectors"

export default function PaletteInput({ label, path }: { label: string, path: string }) {

  const themeValueInfo = useThemeValueInfo(path)
  const dispatch = useDispatch()

  const handleColorChange = useCallback(
    (color: any) => dispatch(setThemeOption({ path, value: color })),
    [dispatch]
  )

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
  )
}
