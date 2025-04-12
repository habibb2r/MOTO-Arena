/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, InputNumber, Modal, Select } from "antd";
import FilterFormTitle from "./FilterFormTitle";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTrash } from "react-icons/fa";

interface FilterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleFillter: (values: FilterValues) => void;
  handleFillterFailed: (error: any) => void;
  categories?: { value: string; name: string }[];
  brands?: { value: string; name: string }[];
}

interface FilterValues {
  maxPrice?: number;
  minPrice?: number;
  brand?: string;
  model?: string;
}

export function FilterModal({
  open,
  setOpen,
  handleFillter,
  handleFillterFailed,
  categories = [],
  brands = [],
}: FilterModalProps) {
  const [form] = Form.useForm<FilterValues>();

  return (
    <Modal
      title={
        <div className="flex items-center gap-3 text-gray-800">
          <FaFilter className="text-orange-500" />
          <span className="text-xl font-semibold">Filter Products</span>
        </div>
      }
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="filter-modal"
      width={600}
    >
      <Form
        form={form}
        name="product-filter"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleFillter}
        onFinishFailed={handleFillterFailed}
        layout="vertical"
        className="pt-4"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
        
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Price Range
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <FilterFormTitle title="Minimum Price" />
                  <Form.Item name="minPrice">
                    <InputNumber
                      placeholder="Min price"
                      className="w-full hover:border-orange-500 focus:border-orange-500"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </div>
                <div>
                  <FilterFormTitle title="Maximum Price" />
                  <Form.Item name="maxPrice">
                    <InputNumber
                      placeholder="Max price"
                      className="w-full hover:border-orange-500 focus:border-orange-500"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

        
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <FilterFormTitle title="Brand" />
                <Form.Item name="brand">
                  <Select
                    loading={!brands}
                    placeholder="Select Brand"
                    className="w-full"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    {brands?.map((brand, idx) => (
                      <Select.Option key={idx} value={brand.value}>
                        {brand.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <FilterFormTitle title="Category" />
                <Form.Item name="model">
                  <Select
                    loading={!categories}
                    placeholder="Select Category"
                    className="w-full"
                    allowClear
                    showSearch
                    optionFilterProp="children"
                  >
                    {categories?.map((category, idx) => (
                      <Select.Option key={idx} value={category.value}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

        
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  form.resetFields();
                }}
                className="px-4 py-2 flex items-center gap-2 text-gray-600 bg-gray-100 hover:bg-gray-200 
                           rounded-lg transition-colors duration-200"
              >
                <FaTrash className="text-sm" />
                Clear Filter
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  form.submit();
                  setOpen(false);
                }}
                className="px-6 py-2 flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 
                           rounded-lg transition-colors duration-200"
              >
                <FaFilter className="text-sm" />
                Apply Filter
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </Form>
    </Modal>
  );
}
