import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
  SearchOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

interface MenuItem {
  name: string;
  icon: typeof UserOutlined;
  path?: string;
  children?: MenuItem[];
}

const SideBar = () => {
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);

  const adminMenu: MenuItem[] = [
    {
      name: "My Profile",
      icon: UserOutlined,
      path: "/dashboard/admin",
    },
    {
      name: "User Management",
      icon: TeamOutlined,
      path: "/dashboard/admin/users",
    },
    {
      name: "Product Management",
      icon: ShoppingCartOutlined,
      children: [
        {
          name: "Add Product",
          icon: FileAddOutlined,
          path: "/dashboard/admin/add-product",
        },
        {
          name: "All Products",
          icon: SearchOutlined,
          path: "/dashboard/admin/products",
        },
      ],
    },
    {
      name: "Order Management",
      icon: SolutionOutlined,
      children: [
        {
          name: "All Orders",
          icon: ShoppingCartOutlined,
          path: "/dashboard/admin/all-orders",
        },
        {
          name: "Pending Orders",
          icon: ShoppingCartOutlined,
          path: "/dashboard/admin/pending-orders",
        },
      ],
    },
    
  ];

  const customerMenu: MenuItem[] = [
    {
      name: "My Profile",
      icon: UserOutlined,
      path: "/dashboard/profile",
    },
    {
      name: "My Orders",
      icon: ShoppingCartOutlined,
      path: "/dashboard/my-orders",
    },
  ];

  const renderMenuItem = (item: MenuItem) => {
    const isActive = item.path ? location.pathname === item.path : false;

    if (item.children) {
      return (
        <div key={item.name} className="space-y-1">
          <div className="flex items-center gap-3 px-4 py-2 text-gray-600">
            <item.icon className="text-xl text-gray-400" />
            <span className="font-medium">{item.name}</span>
          </div>
          <div className="ml-6 space-y-1">
            {item.children.map((child) => renderMenuItem(child))}
          </div>
        </div>
      );
    }

    return (
      <Link key={item.name} to={item.path || "#"}>
        <motion.div
          className={`flex items-center gap-3 px-4 py-2 transition-colors duration-200 ${
            isActive
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          whileHover={{ x: 4 }}
        >
          <item.icon
            className={`text-xl ${
              isActive ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <span className="font-medium">{item.name}</span>
        </motion.div>
      </Link>
    );
  };

  return (
    <div className="h-screen w-64 border-r bg-white p-4">
      <div className="space-y-4">
        {user?.role === "admin"
          ? adminMenu.map(renderMenuItem)
          : customerMenu.map(renderMenuItem)}
      </div>
    </div>
  );
};

export default SideBar;
