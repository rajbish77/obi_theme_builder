import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/protected-router";
import LoginForm from "../components/PreviewWindow/Samples/Login";
import PublisherListing from "../components/PreviewWindow/Publisher";
import MainWindow from "../components/MainWindow";
import IndexPage from "../page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    // children: [
    //   {
    //     path: "",
    //     element: (
    //       <ProtectedRoute>
    //         {/* <PostLoginLayout /> */}
    //       </ProtectedRoute>
    //     ),
    //     children: [
    //       {
    //         path: "/publisher-dashboard",
    //         element: <PublisherListing />,
    //       },
    //       {
    //         path: "/editor-dashboard",
    //         element: <MainWindow />,
    //       },
    //     ],
    //   },
    // ],
  },
]);

export default router;
