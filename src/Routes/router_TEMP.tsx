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
import UpdateProfile from "../Dashboard/Customer/UpdateProfile";
import MyOrders from "../Dashboard/Customer/MyOrders";
import AdminProtection from "./AdminProtectedRoute";
import CustomerProtectedRoute from "./CustomerProtectedRoute";
import AddProduct from "../Dashboard/Admin/ProductManagement/AddProduct";
import ManageProducts from "../Dashboard/Admin/ProductManagement/ManageProducts";
import UserManagement from "../Dashboard/Admin/UserManagement";
import AllOrders from "../Dashboard/Admin/OrderManagement/AllOrders";
import PendingOrders from "../Dashboard/Admin/OrderManagement/PendingOrders";
import OverView from "../Dashboard/Admin/OverView";


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
      { index: true, element: <CustomerProtectedRoute><UserProfile /></CustomerProtectedRoute> },
      { path: '/dashboard/customer', element: <CustomerProtectedRoute><UserProfile /></CustomerProtectedRoute> },
      { path: 'my-orders', element: <CustomerProtectedRoute> <MyOrders /></CustomerProtectedRoute> },
      { path: 'update', element: <CustomerProtectedRoute> <UpdateProfile /></CustomerProtectedRoute> },


    ]
  },

  {
    path: "/dashboard/admin",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminProtection> <UserProfile /></AdminProtection> },
      { path: '/dashboard/admin', element: <AdminProtection> <UserProfile /></AdminProtection> },
      { path: 'update', element: <AdminProtection> <UpdateProfile /></AdminProtection> },
      { path: "add-product", element: <AdminProtection><AddProduct /></AdminProtection> },
      { path: "products", element: <AdminProtection><ManageProducts /></AdminProtection> },
      { path: "users", element: <AdminProtection><UserManagement /></AdminProtection> },
      { path: "orders", element: <AdminProtection><AllOrders /></AdminProtection> },
      { path: "overview", element: <AdminProtection><OverView /></AdminProtection> },
      { path: "pending-orders", element: <AdminProtection><PendingOrders /></AdminProtection> },
      // { path: "product/edit/:id", element: <AdminProtection><EditProduct /></AdminProtection> },
      // { path: "orders", element: <AdminProtection><OrderManage /></AdminProtection> }
    ]
  },
]);
