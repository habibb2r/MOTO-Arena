/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Form, Input, InputNumber, Spin } from "antd";
const { TextArea } = Input;
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import DashboardTitle from "../../LayOuts/DashboardTitle";
import UploadPhoto from "../../../components/UploadPhoto/UploadPhoto";
import { useAddProductMutation } from "../../../redux/features/products/productApi";
import GeneratePhotoURL from "../../../components/UploadPhoto/GeneratePhotoURL";

const AddProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [addproduct,{data,error,isLoading}] = useAddProductMutation();
  const navigate = useNavigate()
  const [form]= Form.useForm()
  useEffect(()=>{
    if(data){
      toast.success((data as any)?.data?.message||"Added Product Successfully")
      form.resetFields();
      navigate('/dashboard/admin/products')
    }
    if(error){
      toast.error((error as any)?.data?.message||"Added Product failed")
    }
  },[data,error,navigate,form])
  const handleAddProduct = async (values: any) => {
    if (fileList.length === 0) {
      return toast.error("Please provide an image");
    }

    if (!values?.productName) {
      return toast.error("Please provide a product name");
    }
    if (!values?.category) {
      return toast.error("Please provide a category");
    }
    if (!values?.brand) {
      return toast.error("Please provide a brand");
    }
    if (!values?.price) {
      return toast.error("Please provide a price");
    }
    if (!values?.description) {
      return toast.error("Please provide a description");
    }
    if (!values?.quantity) {
      return toast.error("Please provide a quantity");
    }

    const formData = new FormData();
    formData.append("file", fileList[0]);
    const imageUrl = await GeneratePhotoURL(fileList[0]);
    if (!imageUrl) {
      return toast.error("Failed to upload image");
    }

    const productDoc = {
      name: values.productName,
      category: values.category,
      brand: values.brand,
      price: values.price,
      description: values.description,
      quantity: values?.quantity,
      photo: imageUrl,
    };

    try {
      await addproduct(productDoc);
    } catch (error) {
      toast.error("An error occurred while adding the product");
      console.error(error);
    }
  };

  return (
    <div className="p-4 space-y-5">
      <DashboardTitle title="Add Product" subtitle="Add a new product" />
      <div>
       <Spin spinning={isLoading}>
       <Form
          name="productUpload"
          layout="vertical"
          onFinish={handleAddProduct}
        >
          <div className="grid grid-cols-1 place-items-center md:grid-cols-2 p-3 gap-3 bg-white">
            <Form.Item
              rules={[{ required: true, message: "Must be provide name" }]}
              className="w-full"
              name="productName"
              label="Product Name"
            >
              <Input placeholder="Product name" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide category" }]}
              className="w-full"
              name="category"
              label="Category"
            >
              <Input placeholder="Category" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide brand" }]}
              className="w-full"
              name="brand"
              label="Brand"
            >
              <Input placeholder="brand" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide price" }]}
              className="w-full"
              name="price"
              label="Price"
            >
              <InputNumber style={{ width: "100%" }} placeholder="price" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Must be provide price" }]}
              className="w-full"
              name="quantity"
              label="Quantity"
            >
              <InputNumber style={{ width: "100%" }} placeholder="Quantity" />
            </Form.Item>
            <Form.Item className="w-full" label="Upload photo" name="photoURL">
              <UploadPhoto fileList={fileList} setFileList={setFileList} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Must be provide description" },
              ]}
              className="w-full"
              name="description"
              label="Product desscription"
            >
              <TextArea placeholder="Enter product description" />
            </Form.Item>
          </div>
          <div className="flex justify-start items-center px-4 bg-white">
            <Form.Item>
              <Button className="bg-green-700 text-white" htmlType="submit" type="primary">
                Add Prodcut
              </Button>
            </Form.Item>
          </div>
        </Form>
       </Spin>
      </div>
    </div>
  );
};

export default AddProduct;
