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

const MonacoThemeCodeEditor = ({ themeInput }:any) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEditor(editorRef); // Pass themeInput to useEditor hook

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
      <EditorErrors editorRef={themeInput} />
    </MonacoThemeEditorRoot>
  );
}

export default MonacoThemeCodeEditor;
