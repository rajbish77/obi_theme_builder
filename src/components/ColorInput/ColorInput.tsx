import React from "react";
import { TextField, InputAdornment, Popover, styled, Theme } from "@mui/material";
import { ChromePicker } from "react-color";
import MaterialColorPicker from "./MaterialColorPicker";
import { colorFromString } from "./utils";
import { ThemeValueChangeEvent } from "../../components/ThemeTools/events";

const PopoverPaper = styled('div')(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  alignItems: "center",
}));

const ColorSampleAdornment = styled('div')(({ theme }: { theme: Theme }) => ({
  width: "1em",
  height: "1em",
  border: "1px solid grey",
}));

interface ColorInputProps {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, color, onColorChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleOpenPopover = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    document.dispatchEvent(ThemeValueChangeEvent());
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const pastedText = event.clipboardData.getData("text");
    const parsedColor = colorFromString(pastedText);
    if (parsedColor) {
      onColorChange(parsedColor);
    }
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <div>
      <TextField
        label={label}
        onClick={handleOpenPopover}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ColorSampleAdornment style={{ backgroundColor: color }} />
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
        disableAutoFocus
        disableEnforceFocus
      >
        <ColorPicker color={color} onChangeComplete={onColorChange} />
      </Popover>
    </div>
  );
};

interface ColorPickerProps {
  color: string;
  onChangeComplete: (color: string) => void;
}

function ColorPicker({ color, onChangeComplete }: ColorPickerProps) {
  const [inputValue, setInputValue] = React.useState<string | null>(color);

  React.useEffect(() => {
    setInputValue(color);
  }, [color]);

  const handleChangeComplete = (colorObject: any) => {
    const newColor = colorObject.hex;
    onChangeComplete(newColor);
  };

  return (
    <>
      <MaterialColorPicker color={inputValue} onChangeComplete={handleChangeComplete} />
      <ChromePicker
        color={inputValue ?? "#fff"}
        onChange={(colorObject) => setInputValue(colorObject.hex)}
        onChangeComplete={handleChangeComplete}
      />
    </>
  );
}

export default ColorInput;
