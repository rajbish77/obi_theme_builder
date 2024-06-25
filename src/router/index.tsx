import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../auth/protected-router";
import LoginForm from "../components/PreviewWindow/Samples/Login";
// import PostLoginLayout from "../post-login-layout";
import PublisherListing from "../components/PreviewWindow/Publisher";
import MainWindow from "../components/MainWindow";
import ThemeConfigDrawer from "../components/ThemeConfigDrawer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ThemeConfigDrawer />,

    // element: <LoginForm />,
    children: [
      {
        // path: "",
        // element: (
        //   <ProtectedRoute>
        //     <PostLoginLayout />
        //   </ProtectedRoute>
        // ),
        children: [
          // {
          //   path: "/publisher-dashboard",
          //   element: <PublisherListing />,
          // },
          // {
          //   path: "/editor-dashboard",
          //   element: <MainWindow />,
          // },
        ],
      },
    ],
  },
]);
