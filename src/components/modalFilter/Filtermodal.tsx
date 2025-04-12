/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, InputNumber, Modal, Select } from "antd";
import FilterFormTitle from "./FilterFormTitle";

interface FilterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleFillter: (values: any) => void;
  handleFillterFailed: (values: any) => void;
  categories?: { value: string; name: string }[];
  brands?: { value: string; name: string }[];
}

export function FilterModal({
  open,
  setOpen,
  handleFillter,
  handleFillterFailed,
  categories = [],
  brands = [],
}: FilterModalProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Filter Product"
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleFillter}
        onFinishFailed={handleFillterFailed}
      >
        <div className="grid grid-cols-2 gap-2 place-items-center text-black">
          <div className="w-full">
            <FilterFormTitle title="Max price" />
            <Form.Item name="maxPrice" style={{ width: "100%" }}>
              <InputNumber
                placeholder="max price"
                style={{ width: "100%", borderColor: "blue", color: "black" }}
              />
            </Form.Item>
          </div>
          <div className="w-full">
            <FilterFormTitle title="Min price" />
            <Form.Item name="minPrice" style={{ width: "100%" }}>
              <InputNumber
                placeholder="min price"
                style={{ width: "100%", borderColor: "blue", color: "black" }}
              />
            </Form.Item>
          </div>
          <div className="w-full text-gray-400">
            <FilterFormTitle title="Brand" />
            <Form.Item name="brand" style={{ width: "100%" }}>
              <Select loading={!!!brands} placeholder="Select a Brand">
                {brands ? (
                  brands.map((brand, idx) => (
                    <Select.Option key={idx} value={brand?.value}>
                      {brand?.name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value="">No brand</Select.Option>
                )}
              </Select>
            </Form.Item>
          </div>
          <div className="w-full ">
            <FilterFormTitle title="Category" />
            <Form.Item name="model" style={{ width: "100%" }}>
              <Select loading={!!!categories} placeholder="Select a Category">
                {categories ? (
                  categories.map((category, idx) => (
                    <Select.Option key={idx} value={category?.value}>
                      {category?.name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value="">No model</Select.Option>
                )}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <Button onClick={() => form.resetFields()} type="default">
            Clear Filter
          </Button>
          <Form.Item>
            <Button
              onClick={() => setOpen(false)}
              className="bg-green-600 hover:bg-green-700"
              type="primary"
              htmlType="submit"
            >
              Filter
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
