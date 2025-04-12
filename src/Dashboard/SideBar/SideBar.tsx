import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const SideBar = () => {
  const location = useLocation();

  const customerLinks = [
    { name: "Profile", icon: UserOutlined, path: "/dashboard/customer" },
    {
      name: "My Orders",
      icon: ShoppingCartOutlined,
      path: "/dashboard/customer/my-orders",
    },
  ];

  return (
    <div className="flex flex-col h-full py-6">
      <nav className="flex-1 space-y-2 px-4">
        {customerLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                  isActive
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <link.icon
                  className={`text-xl ${
                    isActive ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <span className="font-medium">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-green-600 rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;
