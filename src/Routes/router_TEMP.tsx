import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AboutUs from "../pages/AboutUs"
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../Dashboard/LayOuts/DashboardLayout";
import UserProfile from "../Dashboard/Customer/UserProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails/>,
      },
      {
        path: "/about-us",
        element: <AboutUs/>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard/customer",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
      { path: '/dashboard/customer', element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
      // { path: 'orders', element: <ProtectedRoute> <Orders /></ProtectedRoute> },
      // { path: 'update', element: <ProtectedRoute> <UpdateProfile /></ProtectedRoute> },


    ]
  },
]);
