import React from "react";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../auth/protected-router";
import LoginForm from "../components/PreviewWindow/Samples/Login";
// import PostLoginLayout from "../post-login-layout";
import PublisherListing from "../components/PreviewWindow/Publisher";
import MainWindow from "../components/MainWindow";
import ThemeConfigDrawer from "../components/ThemeConfigDrawer";
import IndexPage from "../page";
import PaletteInput from "../components/ThemeTools/PaletteTools/PaletteInput";
import { enableMapSet } from "immer";
import PaletteSubType from "../components/ThemeTools/PaletteTools/PaletteSubType";
import PaletteTools from "../components/ThemeTools/PaletteTools/PaletteTools";
import MainWindowProps from "../components/MainWindowProps";
import PublicerPropes from "../components/PublisherProps";

enableMapSet();


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainWindowProps />,
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
