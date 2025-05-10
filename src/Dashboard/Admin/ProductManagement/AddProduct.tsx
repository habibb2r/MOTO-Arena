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
    <div className="p-4 space-y-5 bg-gray-50 min-h-screen">
      <DashboardTitle title="Add Product" subtitle="Add a new product to your inventory" />
      <div className="max-w-4xl mx-auto">
        <Spin spinning={isLoading}>
          <Form
            name="productUpload"
            layout="vertical"
            onFinish={handleAddProduct}
            form={form}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="border-b border-gray-100 px-8 py-6">
              <h2 className="text-xl font-semibold text-gray-800">Product Information</h2>
              <p className="text-sm text-gray-500 mt-1">Fill in the details of your new product</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <Form.Item
                rules={[{ required: true, message: "Must provide product name" }]}
                className="w-full mb-2"
                name="productName"
                label={<span className="text-gray-700 font-semibold text-sm">Product Name</span>}
              >
                <Input 
                  placeholder="Enter product name" 
                  className="h-11 text-base border-2 rounded-lg shadow-sm hover:border-green-400 focus:border-green-500 transition-all duration-300 ease-in-out placeholder:text-gray-400"
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide category" }]}
                className="w-full mb-2"
                name="category"
                label={<span className="text-gray-700 font-semibold text-sm">Category</span>}
              >
                <Input 
                  placeholder="Enter product category" 
                  className="h-11 text-base border-2 rounded-lg shadow-sm hover:border-green-400 focus:border-green-500 transition-all duration-300 ease-in-out placeholder:text-gray-400"
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide brand" }]}
                className="w-full mb-2"
                name="brand"
                label={<span className="text-gray-700 font-semibold text-sm">Brand</span>}
              >
                <Input 
                  placeholder="Enter product brand" 
                  className="h-11 text-base border-2 rounded-lg shadow-sm hover:border-green-400 focus:border-green-500 transition-all duration-300 ease-in-out placeholder:text-gray-400"
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide price" }]}
                className="w-full mb-2"
                name="price"
                label={<span className="text-gray-700 font-semibold text-sm">Price</span>}
              >
                <InputNumber 
                  style={{ width: "100%" }} 
                  placeholder="Enter product price"
                  className="h-11 text-base border-2 rounded-lg shadow-sm hover:border-green-400 focus:border-green-500 transition-all duration-300 ease-in-out [&_.ant-input-number-input]:h-11 placeholder:text-gray-400" 
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide quantity" }]}
                className="w-full mb-2"
                name="quantity"
                label={<span className="text-gray-700 font-semibold text-sm">Quantity</span>}
              >
                <InputNumber 
                  style={{ width: "100%" }} 
                  placeholder="Enter product quantity"
                  className="h-11 text-base border-2 rounded-lg shadow-sm hover:border-green-400 focus:border-green-500 transition-all duration-300 ease-in-out [&_.ant-input-number-input]:h-11 placeholder:text-gray-400" 
                />
              </Form.Item>
              <Form.Item 
                className="w-full mb-2 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-400 transition-all duration-300" 
                label={<span className="text-gray-700 font-semibold text-sm">Upload Photo</span>} 
                name="photoURL"
              >
                <UploadPhoto fileList={fileList} setFileList={setFileList} />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Must provide description" }]}
                className="w-full md:col-span-2 mb-2"
                name="description"
                label={<span className="text-gray-700 font-semibold text-sm">Product Description</span>}
              >
                <TextArea 
                  placeholder="Enter product description" 
                  className="text-base border-2 rounded-lg shadow-sm hover:border-green-400 focus:border-green-500 transition-all duration-300 ease-in-out placeholder:text-gray-400"
                  rows={4}
                />
              </Form.Item>
            </div>
            <div className="flex justify-end items-center px-8 py-6 bg-gray-50 border-t">
              <Form.Item className="mb-0">
                <Button 
                  className="h-11 px-8 bg-green-600 text-white text-base font-medium rounded-lg shadow-sm hover:bg-green-700 transition-colors gap-2 flex items-center" 
                  htmlType="submit" 
                  type="primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Add Product
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
