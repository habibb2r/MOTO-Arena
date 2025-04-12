import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import SideBar from "../SideBar/SideBar";
import logo from "../../assets/logo.png";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: open ? "240px" : "0px" }}
        className={`fixed top-0 left-0 h-screen bg-white shadow-xl z-50 overflow-hidden`}
      >
        <div className="p-4">
          <Link to="/">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logo}
              alt="logo"
              className="h-12"
            />
          </Link>
        </div>
        <SideBar />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={{ marginLeft: open ? "240px" : "0px" }}
        className="min-h-screen transition-all duration-300"
      >
        {/* Header */}
        <motion.div
          className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              type="text"
              icon={open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => setOpen(!open)}
              className="text-xl hover:bg-gray-100 transition-colors"
            />
            <div className="text-sm text-gray-500">
              Welcome to your dashboard
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
