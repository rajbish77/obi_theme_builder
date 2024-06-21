import React from "react"
import {
  Accordion,
  AccordionSummary,
  Typography,
  makeStyles,
  createStyles,
  AccordionDetails,
  Theme,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import PaletteInput from "./PaletteInput"
import { useThemeValue } from "../../../state/selectors"

const useStyles:any = makeStyles((theme: any) =>
  createStyles({
    title: {
      textTransform: "capitalize",
    },
    accordionDetails: {
      flexDirection: "column",
      "&> *": {
        marginBottom: theme.spacing(2),
      },
    },
    thumbnailContainer: {
      display: "flex",
      alignSelf: "stretch",
    },
    colorThumbnail: {
      height: "100%",
      width: 15,
      marginLeft: 4,
      border: "1px solid grey",
    },
  })
)

interface PaletteSubTypeProps {
  title: string
  path: string
  paletteValues: [string, string][] // [name, path]
}

export default function PaletteSubType({
  title,
  path,
  paletteValues,
}: PaletteSubTypeProps) {
  const classes = useStyles()
  const themeValues = useThemeValue(path)

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.title} variant="body2">
            {title}
          </Typography>
          {/* <div className={classes.thumbnailContainer}>
            {paletteValues.map(([name, subPath]) => (
              <div
                key={name}
                className={classes.colorThumbnail}
                style={{ backgroundColor: themeValues?.[subPath] }}
              />
            ))}
          </div> */}
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {paletteValues.map(([name, subPath]) => (
            <PaletteInput
              key={`${title}-${name}`}
              label={name}
              path={`${path}.${subPath}`}
              // className="py-3"
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
