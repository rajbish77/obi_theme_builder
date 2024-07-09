import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaletteInput from "./PaletteInput";
import { useThemeValue } from "../../../state/selectors";
import { styled } from "@mui/material/styles";

interface PaletteSubTypeProps {
  title: string;
  path: string;
  paletteValues: [string, string][];
}

const AccordionWrapper = styled(Accordion)({
  border: "1px solid rgba(255, 255, 255, .125)",
  backgroundColor: "#424242",
});

const AccordionSummaryWrapper = styled(AccordionSummary)(({ theme }) => ({
  "&.MuiAccordionSummary-root": {
    minHeight: 60,
  },
  "&.Mui-expanded": {
    minHeight: 60,
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "& .MuiTypography-body2": {
    textTransform: "capitalize",
    color: "white",
  },
}));

const AccordionDetailsWrapper = styled(AccordionDetails)({
  flexDirection: "column",
  "& > *": {
    marginBottom: "2rem",
    color: "white",
  },
  "& .MuiFormLabel-root": {
    color: "white",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& input": {
      color: "white",
    },
  },
});

const ColorThumbnailContainer = styled("div")({
  display: "flex",
  alignSelf: "stretch",
});

const ColorThumbnail = styled("div")(({ theme }) => ({
  height: "100%",
  width: 15,
  marginLeft: 4,
}));

const StyledExpandMoreIcon = styled(ExpandMoreIcon)({
  color: "white",
});

const PaletteSubType: React.FC<PaletteSubTypeProps> = ({
  title,
  path,
  paletteValues,
}) => {

  // const themeValues = useThemeValue(path);
  // console.log(themeValues)

  return (
    <AccordionWrapper>
      <AccordionSummaryWrapper expandIcon={<StyledExpandMoreIcon />}>
        <Typography variant="body2">{title}</Typography>
      </AccordionSummaryWrapper>
      <AccordionDetailsWrapper>
        {paletteValues.map(([name, subPath]) => (
          <PaletteInput
            key={`${title}-${name}`}
            label={name}
            path={`${path}.${subPath}`}
          />
        ))}
      </AccordionDetailsWrapper>
    </AccordionWrapper>
  );
};

export default PaletteSubType;
