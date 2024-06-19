import React, { useEffect, useRef } from "react"

import useEditor from "./hooks/useEditor"
import useEditorStateSync from "./hooks/useEditorStateSync"
import useReadOnlyLines from "./hooks/useReadOnlyLines"
import "./editor.css"
import * as monaco from "monaco-editor"
import EditorControls from "./EditorControls"
import EditorErrors from "./EditorErrors"
import { makeStyles, Theme, createStyles } from "@material-ui/core"
import { verbose } from "src/utils"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    monacoThemeEditorRoot: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    container: {
      height: "calc(100% - 48px)",
      width: "100%",
    },
  })
)

export const codeEditorId = "code-editor"

const MonacoThemeCodeEditor = () => {
  const classes = useStyles()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  // set up editor and configure options
  useEditor(editorRef)
  useEditorStateSync(editorRef)
  useReadOnlyLines(editorRef)

  useEffect(() => {
    return () => {
      verbose("MonacoThemeCodeEditor unmounted")
    }
  }, [])

  return (
    <div id="code-editor" className={classes.monacoThemeEditorRoot}>
      <EditorControls />
      <div id="container" className={classes.container} />
      <EditorErrors editorRef={editorRef} />
    </div>
  )
}

export default MonacoThemeCodeEditor
