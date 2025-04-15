import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  isAuthenticated,
  logout,
  useCurrentUser,
} from "../redux/features/auth/authSlice";
import { Divider, Drawer } from "antd";
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
    <nav className="fixed  w-full mx-auto flex justify-between items-center px-6 py-[1.3%] shadow-md navbar text-black font-semibold">
      {/* Logo */}
      <Link to="/">
        <img className="h-[50px]" src={logo} alt="Logo" />
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:block">
        <ul className="flex gap-6 items-center font-semibold">
          {[
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: "About Us", path: "/about-us" },
          ].map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "border-y-2 border-green-800 pb-1 rounded-md px-4"
                    : "hover:text-violet-800"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Login Button */}
      <div className="flex gap-4">
        {isLogin ? (
          <div className="flex gap-4 items-center">
            <button onClick={showDrawer}>
              <img
                className="w-10 h-10 shadow-xl shadow-green-500 rounded-full border-2 border-green-600"
                src={user?.photoURL}
                alt=""
              />
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <AppstoreOutlined
              onClick={showDrawer}
              className="text-4xl text-orange-600 block lg:hidden"
            />
            <Link to={"/login"} className="hidden lg:block">
              <button
                className="px-3 py-2 md:px-8 md:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full 
                        font-semibold shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                Login
              </button>
            </Link>
          </div>
        )}

        <Drawer title="Actions" onClose={onClose} open={open} className="">
          <ul className="lg:hidden font-semibold w-full flex flex-col gap-5">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "About Us", path: "/about-us" },
            ].map((link) => (
              <li className="w-[200px]" key={link.name}>
                <NavLink
                  onClick={() => setOpen(!open)}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-green-800 pb-1 rounded-md  px-[10%] bg-orange-50 py-[2%]"
                      : "hover:text-violet-800 w-full px-[8%] bg-orange-50 py-[2%]"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <Divider></Divider>
          </ul>

         {
          isLogin?  <Link
          onClick={() => setOpen(!open)}
          className="px-[10%] py-2 border-x-2 border-orange-500  transition-all duration-300 rounded-2xl font-semibold w-full"
          to={`/dashboard/${user?.role}`}
        >
          Dashboard
        </Link> : null
         }
          <Divider></Divider>

          {isLogin ? (
            <button
              onClick={() => handleLogout()}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full 
                        font-semibold shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"} >
              <button onClick={() => setOpen(!open)}
                className="px-8 py-3 md:px-8 md:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full 
                      font-semibold shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                Login
              </button>
            </Link>
          )}
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
