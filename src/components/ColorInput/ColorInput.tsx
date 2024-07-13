import React, { useState, useEffect, MouseEvent, ClipboardEvent } from "react";
import { TextField, InputAdornment, Popover, styled, Theme } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { colorFromString } from "./utils";
import { ThemeValueChangeEvent } from "../../components/ThemeTools/events";

const PopoverPaper = styled('div')(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  alignItems: "center",
  background: "white",
  padding: "4px",
}));

const ColorSampleAdornment = styled('div')(({ theme }: { theme: Theme }) => ({
  width: "1em",
  height: "1em",
  border: "1px solid grey",
}));

interface ColorInputProps {
  label: string;
  color: string;
  onColorChange: (color: string) => void; // Define onColorChange callback
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
        value={internalColor}
        onPaste={handlePaste}
        onChange={(e) => {
          setInternalColor(e.target.value);
          onColorChange(e.target.value);
        }} // Handle manual input changes
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
            <HexColorPicker color={internalColor} onChange={(color) => {
              setInternalColor(color);
              onColorChange(color);
            }} />
        </PopoverPaper>
      </Popover>
    </div>
  );
};

export default ColorInput;
