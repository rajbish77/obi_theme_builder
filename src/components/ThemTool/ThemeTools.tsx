// import React, { useState } from "react"

// import { makeStyles, createStyles, Theme } from "@mui/material/styles"
// import BottomNavigation from "@mui/material/BottomNavigation"
// import BottomNavigationAction from "@mui/material/BottomNavigationAction"
// import PaletteTools from "./PaletteTools/PaletteTools"
// import PaletteIcon from "@material-ui/icons/Palette"
// import ToolPanel from "./ToolPanel"

// const useStyles: any = makeStyles((theme: Theme) =>
//   createStyles({
//     themeToolsRoot: {
//       display: "flex",
//       flexDirection: "column",
//       height: "100%",
//       overflow: "auto",
//     },
//     themeToolsBottomNavBar: {
//       backgroundColor: theme.palette.background.default,
//       borderTop: "1px solid",
//       borderTopColor: theme.palette.divider,
//       width: "calc(100% - 1px)", // to prevent scroll bar
//     },
//     selected: {
//       // color: "#fff",
//       "&$root": {
//         backgroundColor: "#212121",
//       },
//       "& $wrapper": {
//         color: "#fff",
//       },
//     },
//     wrapper: {
//       color: theme.palette.text.disabled,
//     },
//     root: {},
//   })
// )

// export const paletteToolsId = "palette-tools-nav"
// export const fontToolsId = "font-tools-nav"
// export const typographyToolsId = "typography-tools-nav"
// export const snippetToolsId = "snippet-tools-nav"


// const toolPanels: Array<{
//   label: string
//   icon: React.ReactNode
//   tools: any
//   id: string
// }> = [
//   {
//     label: "Palette",
//     icon: <PaletteIcon />,
//     tools: PaletteTools,
//     id: paletteToolsId,
//   },
//   // {
//   //   label: "Typography",
//   //   icon: <TypographyIcon />,
//   //   tools: TypographyTools,
//   //   id: typographyToolsId,
//   // }
// ]

// export default function ThemeTools() {
//   const classes = useStyles()
//   const [bottomNavIndex, setBottomNavIndex] = useState(0)

//   const bottomNavActionClasses = {
//     selected: classes.selected,
//     wrapper: classes.wrapper,
//     root: classes.root,
//   }

//   const currentTool = toolPanels[bottomNavIndex]

//   return (
//     <div className={classes.themeToolsRoot}>
//       <ToolPanel panelTitle={currentTool.label}>
//         <currentTool.tools />
//       </ToolPanel>

//       <BottomNavigation
//         value={bottomNavIndex}
//         showLabels
//         className={classes.themeToolsBottomNavBar}
//         onChange={(event, newValue) => setBottomNavIndex(newValue)}
//       >
//         {toolPanels.map((panel, index) => (
//           <BottomNavigationAction
//             key={`${index}-${panel.label}`}
//             id={panel.id}
//             label={panel.label}
//             value={index}
//             icon={panel.icon}
//             classes={bottomNavActionClasses}
//           />
//         ))}
//       </BottomNavigation>
//     </div>
//   )
// }
