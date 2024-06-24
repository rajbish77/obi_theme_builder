import { useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { EditorRefType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { updateEditorState, saveEditorToTheme } from '../../../slices/editor/editorSlice';
import { RootStateType } from '../../../slices/types';
import { RootState, AppDispatch  } from '../../../app/store';
import { verbose } from '../../../utils';

interface EmitOutput {
  outputFiles: Array<{ name: string; text: string }>;
}

/**
 * Transpile the editor and return any semantic or syntactic
 * errors as well as the emitted code
 * @param editorRef - ref of the monaco-editor
 * @returns [semanticDiagnostics: monaco.languages.typescript.Diagnostic[], syntacticDiagnostics: monaco.languages.typescript.Diagnostic[], emittedOutput: EmitOutput]
 */
async function validateInput(editorRef: EditorRefType): Promise<[monaco.languages.typescript.Diagnostic[], monaco.languages.typescript.Diagnostic[], EmitOutput | null]> {
  const model = editorRef.current?.getModel();
  if (!model) return [[], [], null];
  const worker = await monaco.languages.typescript.getTypeScriptWorker();
  const proxy = await worker(model.uri);

  return await Promise.all([
    proxy.getSemanticDiagnostics(model.uri.toString()),
    proxy.getSyntacticDiagnostics(model.uri.toString()),
    proxy.getEmitOutput(model.uri.toString()),
  ]) as [monaco.languages.typescript.Diagnostic[], monaco.languages.typescript.Diagnostic[], EmitOutput];
}

/**
 * Run the formatDocument action on the monaco editor
 * @param editorRef - ref of the monaco-editor
 * @returns true if document was formatted, false otherwise
 */
async function formatInput(editorRef: EditorRefType) {
  try {
    const action = editorRef.current?.getAction('editor.action.formatDocument');
    if (action) {
      await action.run();
      return true;
    }
  } catch (err) {
    verbose('MonacoThemeCodeEditor/hooks/useSave -> formatInput: Error formatting document', err);
  }
  return false;
}

/**
 * Create a handler for saving the code editor contents to the theme options,
 * create an event listener for the Ctrl + S key combo, and return the
 * handler for saving code editor contents
 * @param editorRef
 * @returns Function that handles saving code editor contents
 */
export default function useSave(editorRef: EditorRefType) {
  const formatOnSave = useSelector((state: RootStateType) => state.editor.formatOnSave);
  const dispatch = useDispatch<AppDispatch>();
  const handleSave = useCallback(async () => {
    dispatch(updateEditorState({ errors: [] }));

    if (formatOnSave) await formatInput(editorRef);

    const [semanticDiagnostics, syntacticDiagnostics, emittedOutput] = await validateInput(editorRef);

    const errors = [...(syntacticDiagnostics ?? []), ...(semanticDiagnostics ?? [])];
    if (errors.length > 0) {
      dispatch(updateEditorState({ errors }));
    } else if (emittedOutput && emittedOutput.outputFiles.length > 0) {
      dispatch(saveEditorToTheme(emittedOutput.outputFiles[0].text));
      dispatch(updateEditorState({
        savedVersion: editorRef.current?.getModel()?.getAlternativeVersionId(),
      }));
    }
  }, [dispatch, formatOnSave, editorRef]);

  useSaveKey(editorRef, handleSave);

  return handleSave;
}

/**
 * Add an event listener for the Ctrl + S key combo that saves the editor contents
 * to the saved theme options
 * @param editorRef
 * @param onSave
 */
export const useSaveKey = (editorRef: EditorRefType, onSave: Function) => {
  useEffect(() => {
    const actionBinding = editorRef.current?.addAction({
      id: 'save-editor-contents',
      label: 'Save Editor Theme Contents',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => onSave(),
    });

    const handleGlobalSave = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'KeyS') {
        event.preventDefault();
        onSave();
      }
    };
    window.addEventListener('keydown', handleGlobalSave);

    return () => {
      actionBinding?.dispose();
      window.removeEventListener('keydown', handleGlobalSave);
    };
  }, [onSave, editorRef]);
};
