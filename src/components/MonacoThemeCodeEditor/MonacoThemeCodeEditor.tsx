import React, { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import useEditor from "./hooks/useEditor";
import useEditorStateSync from "./hooks/useEditorStateSync";
import useReadOnlyLines from "./hooks/useReadOnlyLines";
import "./editor.css";
import * as monaco from "monaco-editor";
import EditorControls from "./EditorControls";
import EditorErrors from "./EditorErrors";
import { verbose } from "../../utils";

// Create styled components using styled from @mui/material/styles
const MonacoThemeEditorRoot = styled('div')({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

const Container = styled('div')({
  height: "calc(100% - 48px)",
  width: "100%",
});

export const codeEditorId = "code-editor";

const MonacoThemeCodeEditor = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // set up editor and configure options
  useEditor(editorRef);
  useEditorStateSync(editorRef);
  useReadOnlyLines(editorRef);

  useEffect(() => {
    return () => {
      verbose("MonacoThemeCodeEditor unmounted");
    };
  }, []);

  return (
    <MonacoThemeEditorRoot id="code-editor">
      <EditorControls />
      <Container id="container" />
      <EditorErrors editorRef={editorRef} />
    </MonacoThemeEditorRoot>
  );
}

export default MonacoThemeCodeEditor;
