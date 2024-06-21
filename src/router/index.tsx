import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../auth/protected-router";
import LoginForm from "../PreviewWindow/Login";
// import PostLoginLayout from "../post-login-layout";
import PublisherListing from "../PreviewWindow/Publisher";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
    children: [
      {
        // path: "",
        // element: (
        //   <ProtectedRoute>
        //     <PostLoginLayout />
        //   </ProtectedRoute>
        // ),
        children: [
          {
            path: "/publisher-dashboard",
            element: <PublisherListing />,
          },
          // {
          //   path: "/publisher-dashboard",
          //   element: <PublisherListing />,
          // },
        ],
      },
    ],
  },
]);
