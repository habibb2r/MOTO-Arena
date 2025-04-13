import { Table, Button, Space, Avatar, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import DashboardTitle from '../LayOuts/DashboardTitle';

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
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
}

const UserManagement = () => {
  // Mock data for demonstration
  const [users] = useState<User[]>([
    {
      _id: { $oid: "67fadb1e159f66a70dace684" },
      name: "Yo Soy De Habib",
      email: "testuser@mail.usm",
      role: "admin",
      isBlocked: false,
      isActive: true,
      photoURL: "https://res.cloudinary.com/dairs3nkn/image/upload/v1744097456/habibb2r/zuoz1s1iqhzf8t0ioylo.jpg",
      createdAt: { $date: "2025-04-12T21:29:02.141Z" },
      updatedAt: { $date: "2025-04-13T18:18:42.322Z" }
    },
    {
      _id: { $oid: "67fadb1e159f66a70dace685" },
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      isBlocked: true,
      isActive: true,
      photoURL: "https://res.cloudinary.com/dairs3nkn/image/upload/v1744097456/default-avatar.jpg",
      createdAt: { $date: "2025-04-10T15:00:00.000Z" },
      updatedAt: { $date: "2025-04-13T16:30:00.000Z" }
    },
  ]);

  const handleToggleBlock = (userId: string, currentStatus: boolean) => {
    console.log(`Toggling block status for user ${userId} to ${!currentStatus}`);
    // Here you would typically make an API call to update the user's blocked status
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive: boolean, record: User) => (
        <Space>
          {record.isBlocked ? (
            <Tag color="red">Blocked</Tag>
          ) : (
            <Tag color={isActive ? 'success' : 'warning'}>
              {isActive ? 'Active' : 'Inactive'}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: { $date: string }) => (
        <span>{new Date(date.$date).toLocaleDateString()}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: User) => (
        <Space>
          <Tooltip title={record.isBlocked ? 'Unblock User' : 'Block User'}>
            <Button
              type="link"
              icon={record.isBlocked ? <FaCheckCircle className="text-green-600" /> : <FaBan className="text-red-600" />}
              onClick={() => handleToggleBlock(record._id.$oid, record.isBlocked)}
              className={record.isBlocked ? 'hover:text-green-700' : 'hover:text-red-700'}
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