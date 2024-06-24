import * as monaco from "monaco-editor"
export type EditorState = {
  themeInput: string
  initialVersion: number
  lastVersion: number
  currentVersion: number
  savedVersion: number
  canUndo: boolean
  canRedo: boolean
  errors: monaco.languages.typescript.Diagnostic[]
  // user modified settings
  formatOnSave: boolean
  outputTypescript: boolean
}

export type EditorWindo = {
  themeInput: string
  initialVersion: number
  lastVersion: number
  currentVersion: number
  savedVersion: number
  canUndo: boolean
  canRedo: boolean
  errors: monaco.languages.typescript.Diagnostic[]
  // user modified settings
  formatOnSave: boolean
  outputTypescript: boolean
  activeTab: string
}

export type EditorStateOptions = Partial<EditorState>
