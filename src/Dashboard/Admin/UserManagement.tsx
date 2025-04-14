import { Table, Button, Space, Avatar, Tag, Tooltip } from "antd";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import DashboardTitle from "../LayOuts/DashboardTitle";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";

interface User {
  _id: {
    $oid: string;
  };
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  isActive: boolean;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
}

const UserManagement = () => {
  const { data: getAllUsers, isLoading } = useGetAllUserQuery({});
  const users = getAllUsers?.data || [];
  console.log("users", users);

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

  const handleToggleBlock = (userId: string, currentStatus: boolean) => {
    console.log(
      `Toggling block status for user ${userId} to ${!currentStatus}`
    );
  };

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: User) => (
        <Space>
          <Avatar src={record.photoURL} />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "blue" : "green"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (isActive: boolean, record: User) => (
        <Space>
          {record.isBlocked ? (
            <Tag color="red">Blocked</Tag>
          ) : (
            <Tag color={isActive ? "success" : "warning"}>
              {isActive ? "Active" : "Inactive"}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (dateString: string) => <span>{formatDate(dateString)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <Space>
          <Tooltip title={record.isBlocked ? "Unblock User" : "Block User"}>
            <Button
              type="link"
              icon={
                record.isBlocked ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaBan className="text-red-600" />
                )
              }
              onClick={() =>
                handleToggleBlock(record._id.$oid, record.isBlocked)
              }
              className={
                record.isBlocked ? "hover:text-green-700" : "hover:text-red-700"
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="py-8">
          <DashboardTitle title="User Management" subtitle="Manage Users" />
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={users}
            rowKey={(record) => record._id.$oid}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
