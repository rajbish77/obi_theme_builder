import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../slices/types";
import { files as muiTypeFiles } from "../../../muiTypeStrings";
import { EditorRefType, MutableEditorRefType } from "../types";
import monokai from "../../../components/MonacoThemeCodeEditor/monaco-themes/monokai";
import { Plugin } from "prettier"
import * as babelParser from "prettier/parser-babel"

// Define Monaco Environment in the main script
window.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css') {
      return './css.worker.js';
    }
    if (label === 'html') {
      return './html.worker.js';
    }
    return './editor.worker.js';
  }
};

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  language: "typescript",
  theme: "monokai",
  selectOnLineNumbers: true,
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
  matchBrackets: "never",
  lineNumbersMinChars: 3,
  fontSize: 12,
};

const languageDiagnosticsOptions: monaco.languages.typescript.DiagnosticsOptions = {
  noSemanticValidation: false,
  noSyntaxValidation: false,
};

const languageCompilerOptions: monaco.languages.typescript.CompilerOptions = {
  target: monaco.languages.typescript.ScriptTarget.ES5,
  allowNonTsExtensions: true,
  suppressExcessPropertyErrors: true,
};

export default function useEditor(editorRef: MutableEditorRefType) {
  const themeInput = useSelector((state: RootStateType) => state.editor.themeInput);

  useEffect(() => {
    monaco.editor.defineTheme("monokai", monokai as monaco.editor.IStandaloneThemeData);

    setLanguageDiagnosticOptions();
    setLanguageCompilerOptions();
    setPrettierFormatting();
    setMuiThemeTypeData();

    editorRef.current = monaco.editor.create(document.getElementById("container")!, {
      ...editorOptions,
      value: themeInput,
      model:
        monaco.editor.getModel(monaco.Uri.parse("file:///main.tsx")) ||
        monaco.editor.createModel(themeInput, "typescript", monaco.Uri.parse("file:///main.tsx")),
    });

    return () => {
      editorRef.current?.getModel()?.dispose();
      editorRef.current?.dispose();
    };
  }, []);

  useEditorResizeListener(editorRef);
}

const setLanguageDiagnosticOptions = () => {
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(languageDiagnosticsOptions);
};

const setLanguageCompilerOptions = () => {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(languageCompilerOptions);
};

const setPrettierFormatting = () => {
  monaco.languages.registerDocumentFormattingEditProvider("typescript", {
    async provideDocumentFormattingEdits(model, options, token) {
      const prettier = await import("prettier/standalone");
      const babel = (await import("prettier/parser-babel")).default;
      const text = (await prettier
        .format(model.getValue(), {
          parser: "babel",
          plugins: [babelParser] as unknown as Plugin[],
          singleQuote: true,
        }))
        .replace(/[\r\n]+$/, ""); // remove new line at end of prettier format

      return [
        {
          range: model.getFullModelRange(),
          text,
        },
      ];
    },
  });
};

const setMuiThemeTypeData = () => {
  for (const fileName in muiTypeFiles) {
    const fakePath = `file:///node_modules/${fileName}`;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(muiTypeFiles[fileName], fakePath);
  }
};

export const useEditorResizeListener = (editorRef: EditorRefType) => {
  const resizeEditor = () => editorRef.current?.layout();
  useEffect(() => {
    window.addEventListener("resize", resizeEditor);
    return () => {
      window.removeEventListener("resize", resizeEditor);
    };
  }, []);
};
