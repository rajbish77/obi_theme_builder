import React, { useState, useEffect, MouseEvent, ClipboardEvent } from "react";
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
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [internalColor, setInternalColor] = useState<string>(color);

  useEffect(() => {
    setInternalColor(color);
  }, [color]);

  const handleOpenPopover = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    document.dispatchEvent(ThemeValueChangeEvent());
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
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
              <ColorSampleAdornment style={{ backgroundColor: internalColor }} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        size="small"
        className="py-3"
        value={internalColor}
        onPaste={handlePaste}
        onChange={(e) => onColorChange(e.target.value)} // Handle manual input changes
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
        <PopoverPaper>
          <ColorPicker color={internalColor} onChangeComplete={onColorChange} />
        </PopoverPaper>
      </Popover>
    </div>
  );
};

interface ColorPickerProps {
  color: string;
  onChangeComplete: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChangeComplete }) => {
  const [inputValue, setInputValue] = useState<string | null>(color);

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  const handleChangeComplete = (colorObject: any) => {
    const newColor = colorObject.hex;
    // console.log("Color selected:", newColor); // Debugging log
    onChangeComplete(newColor);
  };

  return (
    <>
      <MaterialColorPicker color={inputValue} onChangeComplete={handleChangeComplete} />
      <ChromePicker
        color={inputValue ?? "#fff"}
        onChange={(colorObject) => {
          // console.log("Color changing:", colorObject.hex); // Debugging log
          setInputValue(colorObject.hex);
        }}
        onChangeComplete={handleChangeComplete}
      />
    </>
  );
}

export default ColorInput;
