import { Button, Form, Input, Spin, Tabs } from "antd";
import { toast } from "sonner";
import {
  ArrowLeftOutlined,
  EditOutlined,
  LockOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  useUpdateNameAndPhotoMutation,
  useUpdatepasswordMutation,
} from "../../redux/features/auth/authApi";
import DashboardTitle from "../LayOuts/DashboardTitle";

interface ApiError {
  data?: {
    message: string;
  };
}

const UpdateProfile = () => {
  const user = useAppSelector(useCurrentUser);
  const [updateUser, { data, isLoading, error }] =
    useUpdateNameAndPhotoMutation();
  const [
    updatePass,
    { data: passData, isLoading: passLoading, error: passError },
  ] = useUpdatepasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.name) {
      toast.success("Name updated successfully");
      navigate("/dashboard/customer");
    }
    if (error) {
      toast.error("Name updated failed");
    }
    if (passData) {
      toast.success(passData?.data?.message || "Password updated successfully");
      navigate("/dashboard/customer");
    }
    if (passError) {
      const typedError = passError as ApiError;
      toast.error(typedError?.data?.message || "Password update failed");
    }
  }, [data, error, passError, passData, navigate]);

  const handleUpdate = async (value: { name: string }) => {
    try {
      if (!value) {
        return toast.error("No change found");
      }
      const data = {
        name: value?.name,
        email: user?.email,
      };
      await updateUser(data);
    } catch (_err) {
      toast.error("Update Failed");
    }
  };

  const handlePassChange = async (value: {
    cpassword: string;
    npassword: string;
  }) => {
    if (!value?.cpassword) {
      return toast.error("Current password is required");
    }
    if (!value?.npassword) {
      return toast.error("New password is required");
    }
    if (value?.npassword === value?.cpassword) {
      return toast.error("Passwords are same");
    }
    try {
      const doc = {
        npassword: value.npassword,
        cpassword: value.cpassword,
        email: user?.email,
      };
      await updatePass(doc);
    } catch (_err) {
      toast.error("Failed to update password");
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <div>
          Profile Edit <EditOutlined />
        </div>
      ),
      children: (
        <div>
          <Form name="updateProfile" onFinish={handleUpdate} layout="vertical">
            <Form.Item label="Update Your Name" name="name">
              <Input placeholder="Enter your new name"></Input>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white border-none h-10 px-6 rounded-lg flex items-center gap-2"
              >
                <span>Save</span>
                <SaveOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          Change Password <LockOutlined />
        </div>
      ),
      children: (
        <div>
          <Form name="UpdatePass" onFinish={handlePassChange} layout="vertical">
            <Form.Item label="Current Password" name="cpassword">
              <Input placeholder="Current password"></Input>
            </Form.Item>
            <Form.Item label="New Password" name="npassword">
              <Input placeholder="New password"></Input>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white border-none h-10 px-6 rounded-lg flex items-center gap-2"
              >
                <span>Change Password</span>
                <SaveOutlined />
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <Spin spinning={!user || isLoading || passLoading}>
      <div className="p-4 space-y-5 bg-white">
        <DashboardTitle title="Update Profile" />
        <div className="bg-white text-black shadow rounded-lg relative">
          <Link to="/dashboard/customer" className="absolute top-0 right-0">
            <Button icon={<ArrowLeftOutlined />}></Button>
          </Link>
          <div className="shadow-md p-5">
            <Tabs
              defaultActiveKey="1"
              items={items}
              indicator={{
                size: (origin) => origin - 20,
              }}
            />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default UpdateProfile;
