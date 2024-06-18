// import React, { useCallback } from "react"
// import ColorInput from "src/components/ColorInput"
// import { useDispatch } from "react-redux"
// import { setThemeOption } from "src/state/actions"
// import {
//   Grid,
// } from "@material-ui/core"
// import { useThemeValueInfo } from "src/state/selectors"

// export default function PaletteInput({ label, path }) {

//   const themeValueInfo = useThemeValueInfo(path)
//   const dispatch = useDispatch()

//   const handleColorChange = useCallback(
//     color => dispatch(setThemeOption(path, color)),
//     [dispatch]
//   )

//   return (
//     <Grid container justify="space-between" alignItems="flex-end">
//       <Grid item>
//         <ColorInput
//           label={label}
//           color={themeValueInfo.value}
//           onColorChange={handleColorChange}
//         />
//       </Grid>
//     </Grid>
//   )
// }
