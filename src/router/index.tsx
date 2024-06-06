import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../PreviewWindow/Login";
import Publisher from "../PreviewWindow/Publisher";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
    children: [
      {
        path: "",
        element: (
        //   <ProtectedRoute>
        //     <PostLoginLayout />
        //   </ProtectedRoute>
        <>
        
        </>
        ),
        children: [
          {
            path: "/publisher-dashboard",
            element: <Publisher />,
          },
        //   {
        //     path: "/products",
        //     element: <ProductsListPage />,
        //   },
        //   {
        //     path: "/category",
        //     element: <CategoryList />,
        //   },
        //   {
        //     path: "/sub-category",
        //     element: <SubCategoryList />,
        //   },
        //   {
        //     path: "/users",
        //     element: <UsersListPage />,
        //   },
        //   {
        //     path: "/vendors",
        //     element: <VendorsListPage />,
        //   },
        ],
      },
      
    ],
  },
]);
