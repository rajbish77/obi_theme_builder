import React, { useEffect } from "react"
import {
  TextField,
  InputAdornment,
  Popover,
  styled,
  Theme,
} from "@mui/material"
import { ChromePicker } from "react-color"
import MaterialColorPicker from "./MaterialColorPicker"
import { colorFromString } from "./utils"
import { ThemeValueChangeEvent } from "../../components/ThemeTools/events"

// Define styled components
const PopoverPaper = styled('div')((theme:Theme) =>({
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  alignItems: "center",
}));

const ColorSampleAdornment = styled('div')(({ theme }) => ({
  width: "1em",
  height: "1em",
  border: "1px solid grey",
}));

/**
 * The base TextField input for selecting colors.
 * onClick opens a popover with components to help pick colors
 */
export default function ColorInput({ label, color, onColorChange }:any) {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)

  const handleOpenPopover = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
    document.dispatchEvent(ThemeValueChangeEvent())
  }

  const handleColorChange = (value: string) => onColorChange(value)

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const pastedText = event.clipboardData.getData("text")
    const color = colorFromString(pastedText)
    if (color) {
      handleColorChange(color)
    }
  }

  const popoverOpen = Boolean(anchorEl)
  return (
    <div>
      <TextField
        label={label}
        onClick={handleOpenPopover}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ColorSampleAdornment
                style={{
                  backgroundColor: color,
                }}
              />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        size="small"
        className="py-3"
        value={color}
        onPaste={handlePaste}
      />
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          component: PopoverPaper,
        }}
        disableAutoFocus
        disableEnforceFocus
      >
        <ColorPicker color={color} onChangeComplete={handleColorChange} />
      </Popover>
    </div>
  )
}

function ColorPicker({ color, onChangeComplete }:any) {
  const [inputValue, setInputValue] = React.useState<string | null>("#fff")
  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleChange = (colorObject:any, event:any) => {
    if (colorObject.rgb.a === 1) {
      setInputValue(colorObject.hex)
      return colorObject.hex
    } else {
      const rgb = `rgba(${colorObject.rgb.r},${colorObject.rgb.g},${colorObject.rgb.b},${colorObject.rgb.a})`
      setInputValue(rgb)
      return rgb
    }
  }

  const handleChangeComplete = (colorObject:any, event:any) => {
    const colorString = handleChange(colorObject, event)
    onChangeComplete(colorString || undefined)
  }

  return (
    <>
      <MaterialColorPicker
        color={inputValue}
        onChangeComplete={onChangeComplete}
      />
      <ChromePicker color={inputValue ?? "#fff"}
        onChange={handleChange}
        onChangeComplete={handleChangeComplete}
      />
    </>
  )
}
