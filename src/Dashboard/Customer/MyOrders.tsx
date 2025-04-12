import { Input, Spin, Steps, Table, Tag } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import DashboardTitle from "../LayOuts/DashboardTitle";
import { useAppSelector } from "../../redux/hooks";
import {
  useGetOrdersQuery,
  useGetsingleorderQuery,
} from "../../redux/features/order/orderApi";
import {
  ClockCircleOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

interface Order {
  _id: string;
  userInfo: {
    name: string;
  };
  productName: string;
  orderId: string;
  orderTrack: Array<{
    title: string;
  }>;
  orderActiveTrack: number;
}

const MyOrders = () => {
  const user = useAppSelector(useCurrentUser);
  const [search, setSearch] = useState("");
  const { data: allOrders, isLoading: orderTableLoading } = useGetOrdersQuery({
    email: user?.email || "",
  });
  const { data: orderSingleData, isLoading: singleOrderLoading } =
    useGetsingleorderQuery({ email: user?.email || "", search: search });

  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: "orange",
      processing: "blue",
      shipped: "cyan",
      delivered: "green",
      cancelled: "red",
    };
    return statusMap[status.toLowerCase()] || "default";
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (text: string) => (
        <div className="font-medium text-gray-800">{text}</div>
      ),
    },
    {
      title: "Order No.",
      dataIndex: "orderId",
      render: (text: string) => (
        <div className="font-mono text-sm text-gray-600">{text}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="px-3 py-1 rounded-full">
          {status}
        </Tag>
      ),
    },
  ];

  const { Search } = Input;
  const dataSource = allOrders?.data?.map((order: Order) => ({
    key: `${order._id}`,
    name: `${order.userInfo?.name}`,
    productName: `${order.productName}`,
    orderId: `${order.orderId}`,
    status: `${order.orderTrack[order.orderActiveTrack]?.title}`,
  }));

  const handleSearch = (values: string) => {
    setSearch(values);
  };

  return (
    <div className="p-6 space-y-8">
      <DashboardTitle
        title="My Orders"
        subtitle="Track and manage your orders"
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Track Order Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <ClockCircleOutlined className="text-2xl text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Track Order
              </h2>
            </div>

            <Search
              onSearch={handleSearch}
              placeholder="Enter your order number..."
              enterButton={
                <div className="flex items-center gap-2">
                  <SearchOutlined />
                  <span>Track</span>
                </div>
              }
              size="large"
              className="custom-search-button"
            />

            {orderSingleData?.data?.productName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">
                      {orderSingleData?.data?.productName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono text-sm">
                      {orderSingleData?.data?.orderId}
                    </span>
                  </div>
                </div>

                <Spin spinning={singleOrderLoading}>
                  <Steps
                    direction="vertical"
                    current={orderSingleData?.data?.orderActiveTrack}
                    items={orderSingleData?.data?.orderTrack}
                    className="custom-steps"
                  />
                </Spin>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Order History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 border-b pb-4 mb-6">
              <ShoppingCartOutlined className="text-2xl text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Order History
              </h2>
            </div>

            <Spin spinning={orderTableLoading}>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  pageSize: 7,
                  position: ["bottomCenter"],
                  className: "custom-pagination",
                }}
                className="custom-table"
                onRow={() => ({
                  className:
                    "hover:bg-gray-50 transition-colors cursor-pointer",
                })}
              />
            </Spin>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyOrders;
