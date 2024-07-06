import React from "react";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth/protected-router";
import LoginForm from "../components/PreviewWindow/Samples/Login";
import { enableMapSet } from "immer";
import MainWindowProps from "../components/MainWindowProps";
import PublicerPropes from "../components/PublisherProps";

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
        <PublicerPropes />
      </ProtectedRoute>
    ),
  },
  {
    path: '/editor-dashboard',
    element: (
      <ProtectedRoute allowedRole="editor">
        <MainWindowProps />
      </ProtectedRoute>
    ),
  },
]);
