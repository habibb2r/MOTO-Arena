import { useState, useEffect } from "react";
import { Spin, Empty, Table, Button, Space, Tooltip } from "antd";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import { FaFilter, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  useAllbrandandcategoryQuery,
  useGetAllProductsQuery,
} from "../../../redux/features/products/productApi";
import { FilterModal } from "../../../components/modalFilter/Filtermodal";
import DashboardTitle from "../../LayOuts/DashboardTitle";
import { TProduct } from "../../../redux/types/product";

interface FilterValues {
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  model?: string;
  isAvailable?: boolean;
}

const ManageProducts = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [getminPrice, setMinPrice] = useState(0);
  const [getmaxPrice, setMaxPrice] = useState(Infinity);
  const [getCategory, setCategory] = useState("");
  const [getbrand, setBrand] = useState("");
  const [available, setAvailable] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { data: getAllProducts, isLoading } = useGetAllProductsQuery({
    inStock: available,
    search: searchTerm,
    brand: getbrand,
    category: getCategory,
    maxPrice: getmaxPrice,
    minPrice: getminPrice,
  });

  const { data: allbrandandcategory, isLoading: filterLoading } =
    useAllbrandandcategoryQuery({});

  const allBrand = allbrandandcategory?.data[0]?.brands;
  const allCategory = allbrandandcategory?.data[0]?.categories;

  useEffect(() => {
    const filters: string[] = [];
    if (getbrand) filters.push(getbrand);
    if (getCategory) filters.push(getCategory);
    if (getminPrice > 0) filters.push(`Min: $${getminPrice}`);
    if (getmaxPrice < Infinity) filters.push(`Max: $${getmaxPrice}`);
    setActiveFilters(filters);
  }, [getbrand, getCategory, getminPrice, getmaxPrice]);

  const handleFillter = async (value: FilterValues) => {
    setMinPrice(value?.minPrice || 0);
    setMaxPrice(value?.maxPrice || Infinity);
    setCategory(value?.model || "");
    setBrand(value?.brand || "");
    setAvailable(value?.isAvailable ?? true);
    toast.success("Filters applied successfully");
  };

  const categoryArray = allCategory?.map((cate: string) => ({
    name: cate,
    value: cate,
  }));
  const brandArray = allBrand?.map((brand: string) => ({
    name: brand,
    value: brand,
  }));

  const handleFillterFailed = (error: Error) => {
    if (error) {
      toast.error("Failed to apply filters");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(Infinity);
    setCategory("");
    setBrand("");
    setSearchTerm("");
    setAvailable(true);
    toast.success("Filters cleared");
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => (
        <img
          src={photo}
          alt="product"
          className="w-16 h-16 object-cover rounded-lg"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: TProduct, b: TProduct) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: allCategory?.map((cat: string) => ({ text: cat, value: cat })),
      onFilter: (value: unknown, record: TProduct) => record.category === value,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: allBrand?.map((brand: string) => ({
        text: brand,
        value: brand,
      })),
      onFilter: (value: unknown, record: TProduct) => record.brand === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toLocaleString()}`,
      sorter: (a: TProduct, b: TProduct) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => (
        <span className={quantity > 0 ? "text-green-600" : "text-red-600"}>
          {quantity}
        </span>
      ),
      sorter: (a: TProduct, b: TProduct) => a.quantity - b.quantity,
    },
    {
      title: "Status",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            inStock ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      ),
      filters: [
        { text: "In Stock", value: true },
        { text: "Out of Stock", value: false },
      ],
      onFilter: (value: unknown, record: TProduct) => record.inStock === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: TProduct) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<FaEdit className="text-blue-600" />}
              onClick={() => handleEdit(record._id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="link"
              icon={<FaTrash className="text-red-600" />}
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (id?: string) => {
    // TODO: Implement edit functionality
    console.log("Edit product:", id);
  };

  const handleDelete = (id?: string) => {
    // TODO: Implement delete functionality
    console.log("Delete product:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 lg:px-8 pb-12">
      <FilterModal
        open={openFilter}
        setOpen={setOpenFilter}
        handleFillter={handleFillter}
        categories={categoryArray}
        brands={brandArray}
        handleFillterFailed={handleFillterFailed}
      />

      <div className="max-w-7xl mx-auto">
        <div className="py-8">
          <DashboardTitle title="Manage Products" subtitle="All Products" />
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by name, brand, or category..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {activeFilters.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenFilter(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <FaFilter />
                <span>Filter</span>
              </motion.button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <motion.span
                    key={filter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                  >
                    {filter}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>

        {isLoading || filterLoading ? (
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
        ) : getAllProducts?.data?.length ? (
          <div className="bg-white rounded-xl shadow-sm">
            <Table
              columns={columns}
              dataSource={getAllProducts.data}
              rowKey="_id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} products`,
              }}
              className="w-full"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Empty
              description={
                <span className="text-gray-500">
                  No products found matching your criteria
                </span>
              }
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
