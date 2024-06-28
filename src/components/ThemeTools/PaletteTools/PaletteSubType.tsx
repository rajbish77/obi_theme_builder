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
import styled from "@mui/material/styles/styled";

interface PaletteSubTypeProps {
  title: string;
  path: string;
  paletteValues: [string, string][]; // [name, path]
}

const AccordionWrapper = styled(Accordion)({
  marginBottom: "1rem",
});

const AccordionSummaryWrapper = styled(AccordionSummary)(({ theme }) => ({
  "& .MuiTypography-body2": {
    textTransform: "capitalize",
  },
}));

const AccordionDetailsWrapper = styled(AccordionDetails)({
  flexDirection: "column",
  "& > *": {
    marginBottom: "1rem",
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
  // border: `1px solid ${theme.palette.divider}`,
}));

const PaletteSubType: React.FC<PaletteSubTypeProps> = ({
  title,
  path,
  paletteValues,
}) => {
  const themeValues = useThemeValue(path);

  return (
    <AccordionWrapper>
      <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2">{title}</Typography>
        {/* Uncomment to display color thumbnails */}
        {/* <ColorThumbnailContainer>
          {paletteValues.map(([name, subPath]) => (
            <ColorThumbnail
              key={name}
              style={{ backgroundColor: themeValues?.[subPath] }}
            />
          ))}
        </ColorThumbnailContainer> */}
      </AccordionSummaryWrapper>
      <AccordionDetailsWrapper>
        {paletteValues.map(([name, subPath]) => (
          <PaletteInput
            key={`${title}-${name}`}
            label={name}
            path={`${path}.${subPath}`}
            // className="py-3"
          />
        ))}
      </AccordionDetailsWrapper>
    </AccordionWrapper>
  );
};

export default PaletteSubType;
