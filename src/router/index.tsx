import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/protected-route";
import LoginForm from "../components/PreviewWindow/Samples/Login";
import { enableMapSet } from "immer";
import Publisher from "../page/publisher";
import Editor from "../page/editor";

enableMapSet();


export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/publisher-dashboard',
    element: (
      <ProtectedRoute allowedRole="publisher">
        <Publisher/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/editor-dashboard',
    element: (
      <ProtectedRoute allowedRole="editor">
        <Editor/>
      </ProtectedRoute>
    ),
  },
]);
