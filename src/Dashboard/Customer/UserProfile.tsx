import { Avatar, Spin } from "antd";
import { EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetsinglecustomerQuery } from "../../redux/features/auth/authApi";
import DashboardTitle from "../LayOuts/DashboardTitle";
import { skipToken } from "@reduxjs/toolkit/query";
import { motion } from "framer-motion";

interface CustomerData {
  name: string;
  email: string;
  photoURL: string;
}

interface ApiResponse {
  data: CustomerData;
  success: boolean;
  message: string;
}

const Profile = () => {
  const user = useAppSelector(useCurrentUser);
  const { data, isLoading } = useGetsinglecustomerQuery(
    user ? { email: user.email } : skipToken
  );
  const singleCustomer = (data as ApiResponse)?.data;
  console.log("singleCustomer", singleCustomer);
  if (!user) {
    return null;
  }

  return (
    <Spin spinning={isLoading || !user}>
      <div className="p-4 space-y-8">
        <DashboardTitle
          title="Profile Management"
          subtitle="View and manage your profile information"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
            >
              <Avatar
                size={120}
                src={singleCustomer?.photoURL}
                className="border-4 border-white shadow-lg"
              />
            </motion.div>
          </div>

          {/* Edit Button */}
          <div className="absolute top-4 right-4">
            <Link to="update">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <EditOutlined className="text-gray-700 text-xl" />
              </motion.button>
            </Link>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Name */}
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  {singleCustomer?.name}
                </motion.h1>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <UserOutlined className="text-green-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{singleCustomer?.name}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <MailOutlined className="text-green-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{singleCustomer?.email}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Spin>
  );
};

export default Profile;
