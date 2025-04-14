import { Table, Tag, Spin, Select, message } from "antd";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/order/orderApi";
import DashboardTitle from "../../LayOuts/DashboardTitle";
import { LoadingOutlined } from "@ant-design/icons";

interface OrderTrackItem {
  title: string;
  description: string;
  _id: string;
}

interface UserInfo {
  name: string;
  email: string;
  role: string;
  _id: string;
}

interface Order {
  _id: string;
  productName: string;
  productId: string;
  price: number;
  quantity: number;
  userInfo: UserInfo;
  orderId: string;
  orderTrack: OrderTrackItem[];
  orderActiveTrack: number;
  createdAt: string;
  updatedAt: string;
}

const PendingOrders = () => {
  const { data: allOrders, isLoading } = useGetAllOrdersQuery({});
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const orders =
    allOrders?.data.filter((order: Order) => order.orderActiveTrack !== 3) ||
    [];
//   console.log("orders", orders);
  const getStatusColor = (index: number) => {
    const statusColors: Record<number, string> = {
      0: "gold",
      1: "blue",
      2: "cyan",
      3: "green",
    };
    return statusColors[index] || "default";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "N/A";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleStatusChange = async (orderId: string, newStatus: number) => {
    try {
      await updateOrderStatus({ id: orderId, trackId: newStatus }).unwrap();
    // console.log(orderId, newStatus);
      message.success("Order status updated successfully");
    } catch (error) {
      message.error("Failed to update order status");
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text: string) => (
        <span className="font-mono text-sm">{text}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "userInfo",
      key: "customer",
      render: (userInfo: UserInfo) => (
        <div>
          <div className="font-medium">{userInfo.name}</div>
          <div className="text-sm text-gray-500">{userInfo.email}</div>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "product",
    },
    {
      title: "Amount",
      key: "amount",
      render: (record: Order) => (
        <span className="font-medium">
          ${(record.price * record.quantity).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      key: "status",
      render: (record: Order) => (
        <Tag color={getStatusColor(record.orderActiveTrack)}>
          {record.orderTrack[record.orderActiveTrack].title}
        </Tag>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (dateString: string) => <span>{formatDate(dateString)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Order) => (
        <Select
          defaultValue={record.orderActiveTrack}
          style={{ width: 130 }}
          onChange={(value) => handleStatusChange(record._id, value)}
          loading={isUpdating}
        >
          <Select.Option value={0}>Pending</Select.Option>
          <Select.Option value={1}>Processing</Select.Option>
          <Select.Option value={2}>Shipped</Select.Option>
          <Select.Option value={3}>Delivered</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="py-8">
          <DashboardTitle
            title="Pending Orders"
            subtitle="Manage orders which are not yet delivered"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 48, color: "#f97316" }}
                    spin
                  />
                }
              />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={orders}
              rowKey={(record: Order) => record?._id}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} orders`,
              }}
              className="w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingOrders;
