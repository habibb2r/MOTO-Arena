import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  isAuthenticated,
  logout,
  useCurrentUser,
} from "../redux/features/auth/authSlice";
import { Drawer } from "antd";
import { useState } from "react";
import "./nav.css";
import { toast } from "sonner";
import { AppstoreOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const isLogin = useAppSelector(isAuthenticated);
  const user = useAppSelector(useCurrentUser);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    toast.success("Logout Successfully");
  };

  return (
    <nav className="fixed w-full mx-auto flex justify-between items-center px-6 py-3 bg-white/95 backdrop-blur-sm shadow-md z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img className="h-12" src={logo} alt="Moto Arena Logo" />
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:block">
        <ul className="flex gap-8 items-center font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "About Us", path: "/about-us" },
          ].map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-2 py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-orange-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500"
                      : "text-gray-700 hover:text-orange-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Login/Profile Button */}
      <div className="flex gap-4">
        {isLogin ? (
          <div className="flex gap-4 items-center">
            <button onClick={showDrawer}>
              <img
                className="w-10 h-10 rounded-full border-2 border-orange-500 shadow-lg hover:border-orange-600 transition-all duration-200"
                src={user?.photoURL}
                alt={user?.name || "Profile"}
              />
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <AppstoreOutlined
              onClick={showDrawer}
              className="text-3xl text-orange-600 hover:text-orange-700 block lg:hidden"
            />
            <Link to="/login" className="hidden lg:block">
              <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200">
                Login
              </button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Drawer */}
        <Drawer title="Menu" onClose={onClose} open={open}>
          <ul className="lg:hidden space-y-4">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "About Us", path: "/about-us" },
            ].map((link) => (
              <li key={link.name}>
                <NavLink
                  onClick={onClose}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-orange-50 text-orange-600 font-medium"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-4">
            {isLogin && (
              <>
                <Link
                  onClick={onClose}
                  to={`/dashboard/${user?.role}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                    className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!isLogin && (
              <Link to="/login" onClick={onClose}>
                <button className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200">
                  Login
                </button>
              </Link>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
